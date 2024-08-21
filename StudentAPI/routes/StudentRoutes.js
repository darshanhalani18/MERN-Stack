const express = require('express');
const router = express.Router();

const {
    getAllStudents,
    getStudentByRollNo,
    addStudent,
    deleteStudent,
    updateStudent,
    searchStudents,
    getStudentsWithPagination
} = require('../controllers/StudentController');

// Routes
router.get('/', getAllStudents);
router.get('/:rollno', getStudentByRollNo);
router.post('/', addStudent);
router.delete('/:rollNo', deleteStudent);
router.patch('/:rollno', updateStudent);
router.get('/search/:text', searchStudents);
router.get('/:page/:limit', getStudentsWithPagination);

module.exports = router;
