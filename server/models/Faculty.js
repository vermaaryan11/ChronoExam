const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FacultySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    assignedExams: [{
        type: Schema.Types.ObjectId,
        ref: 'Schedule'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Faculty', FacultySchema);
