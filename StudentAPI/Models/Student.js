const mongoose = require('mongoose');

const studentschema = mongoose.Schema({
    RollNo: {
        type: Number,
        required: true,
        min: 3,
    },
    name: String,
    class: String,
    semester: Number,
});
module.exports = mongoose.model('students', studentschema);