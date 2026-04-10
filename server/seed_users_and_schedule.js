require('dotenv').config();
const mongoose = require('mongoose');

require('./models/User');
require('./models/Schedule');

const User = mongoose.model('User');
const Schedule = mongoose.model('Schedule');

async function seedData() {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/EXAM?retryWrites=false', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
        console.log("Connected to DB for user and schedule seeding.");

        const usersToCreate = [
            // Admins
            { fullName: 'Dr. Alok Chauhan', userName: 'alok', email: 'alok.chauhan@test.com', role: 1 },
            { fullName: 'Dr. Mary Shamala', userName: 'mary', email: 'mary.shamala@test.com', role: 1 },
            // Students
            { fullName: 'Aryan Verma', userName: 'aryan', email: 'aryan@test.com', role: 3 },
            { fullName: 'Aditya Sharma', userName: 'aditya', email: 'aditya@test.com', role: 3 },
            { fullName: 'Lay Gupta', userName: 'lay', email: 'lay@test.com', role: 3 },
            { fullName: 'Ravi Sharma', userName: 'ravi', email: 'ravi@test.com', role: 3 }
        ];

        for (let u of usersToCreate) {
            let existing = await User.findOne({ userName: u.userName });
            if (!existing) {
                let user = new User(u);
                user.setPassword('password123'); // Default password for all
                await user.save();
                console.log(`Created user: ${u.fullName}`);
            } else {
                console.log(`User already exists: ${u.fullName}`);
            }
        }

        // Random Dates (2 exams a day)
        const date1 = new Date();
        date1.setDate(date1.getDate() + 5); 
        
        const date2 = new Date();
        date2.setDate(date2.getDate() + 10);

        const subjects = [
            {
                name: 'Software Engineering',
                subject: 'Software Engineering',
                teacher: 'Dr. Alok Chauhan',
                room: 'Room A',
                slot: 'Morning',
                startTime: '09:00',
                endTime: '12:00', // 3 hours
                date: date1,
                className: 'CSE Core'
            },
            {
                name: 'AI ML',
                subject: 'AI ML',
                teacher: 'Dr. Mary Shamala',
                room: 'Room B',
                slot: 'Afternoon',
                startTime: '13:00',
                endTime: '16:00', // 3 hours
                date: date1,
                className: 'CSE Core'
            },
            {
                name: 'DSA',
                subject: 'DSA',
                teacher: 'Dr. Alok Chauhan',
                room: 'Room C',
                slot: 'Morning',
                startTime: '09:00',
                endTime: '12:00', // 3 hours
                date: date2,
                className: 'CSE Core'
            }
        ];

        // Replace existing schedule with this specific one
        await Schedule.deleteMany({});
        const sched = new Schedule({
            title: "Randomized 3-Hour Exams",
            subjects: subjects
        });
        sched.slugify();
        await sched.save();
        
        console.log("Schedule seeded with 2 exams a day (3 hours duration).");
    } catch (e) {
        console.error(e);
    } finally {
        mongoose.connection.close();
        process.exit(0);
    }
}

seedData();
