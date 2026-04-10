var router = require("express").Router();
var mongoose = require("mongoose");
let auth = require("../auth");
var writeXlsxFile = require('write-excel-file/node')
let {
  OkResponse,
  BadRequestResponse,
  UnauthorizedResponse,
} = require("express-http-response");
var Schedule = mongoose.model("Schedule");

router.post('/', auth.required, auth.admin, async (req, res, next) => {
    let schedule = new Schedule(req.body);
    try {
        // Room Capacity Validation
        const Room = mongoose.model("Room");
        const assignedRoom = await Room.findOne({ name: req.body.room });
        if (assignedRoom && assignedRoom.capacity < 60) { // Assuming average class size is 60
             return next(new BadRequestResponse(`Capacity Error: Room ${req.body.room} only has ${assignedRoom.capacity} seats, but the class requires 60.`));
        }

        const savedSchedule = await schedule.save();
        
        // Notify all students
        const User = mongoose.model("User");
        const Notification = mongoose.model("Notification");
        const students = await User.find({ role: 3 });
        
        const notifications = students.map(student => ({
            user: student._id,
            title: "New Exam Schedule Published",
            message: `A new exam schedule "${req.body.title || 'Examination'}" has been published. Please check your timetable.`,
            type: 'schedule'
        }));
        
        await Notification.insertMany(notifications);
        
        next(new OkResponse("Schedule created successfully and students notified"));
    } catch (err) {
        next(new BadRequestResponse(err.message));
    }
});

router.get('/', auth.required, auth.user, (req, res, next) => {
  Schedule.find({}).sort({_id: -1}).limit(1).exec((err, schedule) => {
    if (err) {
      next(new BadRequestResponse(err));
    }
    if(req.query.class){
      schedule[0].subjects = schedule[0].subjects.filter(subject => subject.className === req.query.class);
    }
    next(new OkResponse(schedule[0]));
  })
})

router.get('/teacher', auth.required, auth.user, (req, res, next) => {
  Schedule.find({}).sort({_id: -1}).limit(1).exec((err, schedule) => {
    if (err) {
      next(new BadRequestResponse(err));
    }
    
    let filtered = schedule[0].subjects.filter(subject => {
      return subject.teacher === req.user.fullName;
    });

    schedule[0].subjects = filtered;

    next(new OkResponse(schedule[0]));
  })
})

router.get('/export', (req, res, next) => {
  Schedule.find({}).sort({_id: -1}).limit(1).exec(async (err, schedule) => {
    const schema = [
      {
          column: 'Subject',
          type: String,
          value: subject => subject.name
      },
      {
        column: 'Class',
        type: String,
        value: subject => subject.className
      },
      {
          column: 'Teacher',
          type: String,
          value: subject => subject.teacher
      },
      {
          column: 'Room',
          type: String,
          value: subject => subject.room
      },
      {
          column: 'Slot',
          type: String,
          value: subject => subject.slot
      },
      {
          column: 'Date',
          type: String,
          value: subject => subject.date.toString()
      }
    ];

    await writeXlsxFile(schedule[0].subjects, {
      schema,
      filePath: process.cwd() + '/server/public/downloads/Schedule.xlsx'
    })

    res.download(process.cwd() + '/server/public/downloads/Schedule.xlsx');
  })
});

router.post('/attendance', auth.required, auth.user, async (req, res, next) => {
  console.log(req.body);
  Schedule.find({}).sort({_id: -1}).limit(1).exec((err, schedule) => {
    if (err) {
      next(new BadRequestResponse(err));
    }

    schedule[0].subjects.forEach(subject => {
      if (subject.name === req.body.subject && subject.className === req.body.className && subject.teacher === req.user.fullName) {
        subject.attendance = req.body.attendance;
      }
    })

    schedule[0].save((err, schedule) => {
      next(new OkResponse("Attendance updated successfully"));
    })
  })
})

router.get('/analytics', auth.required, auth.admin, async (req, res, next) => {
    try {
        const Room = mongoose.model("Room");
        const Subject = mongoose.model("Subject");
        const Complaint = mongoose.model("Complaint");
        
        const schedule = await Schedule.findOne({}).sort({_id: -1});
        const roomCount = await Room.countDocuments({});
        const subjectCount = await Subject.countDocuments({});
        const complaintCount = await Complaint.countDocuments({ status: 1 }); // Active complaints
        
        const examCount = schedule ? schedule.subjects.length : 0;
        
        // Group by room to see utilization
        const roomUtilization = {};
        if (schedule) {
            schedule.subjects.forEach(s => {
                roomUtilization[s.room] = (roomUtilization[s.room] || 0) + 1;
            });
        }

        next(new OkResponse({
            counts: {
                rooms: roomCount,
                subjects: subjectCount,
                complaints: complaintCount,
                exams: examCount
            },
            roomUtilization
        }));
    } catch (err) {
        next(new BadRequestResponse(err.message));
    }
});

module.exports = router;