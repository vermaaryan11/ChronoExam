require('dotenv').config();
const mongoose = require('mongoose');

require('./models/Schedule');
require('./models/Faculty');

const Schedule = mongoose.model('Schedule');
const Faculty = mongoose.model('Faculty');

async function seedData() {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/EXAM?retryWrites=false', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
        console.log("Connected to DB for seeding.");

        // 1. Add Faculty
        const faculties = [
            { name: 'Dr. Alok Chauhan', department: 'Computer Science', email: 'alok.chauhan@university.edu' },
            { name: 'Dr. Mary Shamala', department: 'Information Technology', email: 'mary.shamala@university.edu' }
        ];

        for (let f of faculties) {
            await Faculty.findOneAndUpdate({ email: f.email }, f, { upsert: true, new: true });
        }
        console.log("Faculty seeded.");

        // 2. Add Schedule
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);

        const dayAfter = new Date();
        dayAfter.setDate(dayAfter.getDate() + 2);

        const subjects = [
            {
                name: 'Software Engineering',
                subject: 'Software Engineering',
                teacher: 'Dr. Alok Chauhan',
                room: 'Room 301',
                slot: 'Morning',
                startTime: '09:00',
                endTime: '12:00',
                date: tomorrow,
                className: 'CSE-A'
            },
            {
                name: 'AI ML',
                subject: 'AI ML',
                teacher: 'Dr. Mary Shamala',
                room: 'Room 302',
                slot: 'Morning',
                startTime: '09:00',
                endTime: '12:00',
                date: tomorrow,
                className: 'CSE-B'
            },
            {
                name: 'DSA',
                subject: 'DSA',
                teacher: 'Dr. Alok Chauhan',
                room: 'Room 303',
                slot: 'Morning',
                startTime: '09:00',
                endTime: '12:00',
                date: dayAfter,
                className: 'CSE-A'
            },
            {
                name: 'Embedded Systems',
                subject: 'Embedded Systems',
                teacher: 'Dr. Mary Shamala',
                room: 'Room 304',
                slot: 'Morning',
                startTime: '09:00',
                endTime: '12:00',
                date: dayAfter,
                className: 'CSE-B'
            }
        ];

        const newSchedule = {
            title: "Default Exam Schedule - April 2026",
            subjects: subjects
        };

        const sched = new Schedule(newSchedule);
        sched.slugify();
        await sched.save();
        
        console.log("Schedule seeded.");
    } catch (e) {
        console.error(e);
    } finally {
        mongoose.connection.close();
        process.exit(0);
    }
}

seedData();
