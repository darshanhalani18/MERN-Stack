const Students = require('../Models/Student');

//------get all Students
const getAllStudents = async (req, res) => {
    try {
        const ans = await Students.find().sort('RollNo');
        if (!ans) {
            return res.status(404).send('Student not found');
        }
        res.send(ans);
    }
    catch (error) {
        res.status(500).send('Internal Server Error');
    }
};

//-------- get student by RollNo
const getStudentByRollNo = async (req, res) => {
    try {
        const ans = await Students.findOne({ RollNo: req.params.rollno });
        if (!ans) {
            console.log(`Student with RollNo ${req.params.rollno} not found`);
            return res.status(404).send('Student not found');
        }
        res.send(ans);
    }
    catch (error) {
        res.status(500).send('Internal Server Error');
    }
};

// -------- get student by Name
// const getStudentByName = async (req, res) => {
//     try {
//         const ans = await Students.findOne({ name: req.params.name });
//         if (!ans) {
//             console.log(`Student with name ${req.params.name} not found`);
//             return res.status(404).send('Student not found');
//         }
//         res.send(ans);
//     }
//     catch (error) {
//         res.status(500).send('Internal Server Error');
//     }
// };

//------Add New Student
const addStudent = async (req, res) => {
    try {
        const newstu = new Students({ ...req.body });
        const ans = await newstu.save();
        res.status(201).send('New Student Added');
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};

//------Delete Students by RollNo
const deleteStudent = async (req, res) => {
    try {
        const ans = await Students.findOne({ RollNo: req.params.rollNo });
        if (!ans) {
            return res.status(404).send('Student not found');
        }
        await Students.deleteOne({ RollNo: req.params.rollNo });
        res.status(200).send('Student Deleted Successfully!!');
    }
    catch (error) {
        res.status(500).send('Internal Server Error');
    }
};

//-------Update Student Details by RollNo
const updateStudent = async (req, res) => {
    try {
        const stu = await Students.findOne({ RollNo: req.params.rollno });
        if (!stu) {
            return res.status(404).send('Student not found');
        }
        stu.name = req.body.name;
        stu.RollNo = req.body.RollNo;
        const ans = await stu.save();
        res.send('Data Updated Successfully!!');
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};

//------Update Student Details by RollNo
// updateStudent = async (req, res) => {
//     try {
//         const ans = await Students.findOneAndUpdate(
//             { RollNo: req.params.rollno },
//             { $set: req.body },
//             { new: true }
//         );
//         if (!ans) {
//             return res.status(404).send('Student not found');
//         }
//         res.send('Data Updated Successfully!!');
//     } catch (error) {
//         res.status(500).send('Internal Server Error');
//     }
// });


//------Search Students
const searchStudents = async (req, res) => {
    try {
        const ans = await Students.find(
            {
                name: {
                    $regex: req.params.text,
                    $options: "i"       // Here i stands for case-insensitive
                }
            });
        if (!ans) {
            res.status(404).send('Student not found');
        }
        res.send(ans);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};


//-------Fetch students with Pagination
const getStudentsWithPagination = async (req, res) => {
    try {
        const page = parseInt(req.params.page) || 1;    // Default to page 1 if not provided
        const limit = parseInt(req.params.limit) || 2; // Default to 2 items per page if not provided
        const skip = (page - 1) * limit;
        // console.log(`Page: ${page}, Limit: ${limit}`);
        const ans = await Students.find().sort('RollNo').skip(skip).limit(limit);

        res.send(ans);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};

module.exports = {
    getAllStudents,
    getStudentByRollNo,
    addStudent,
    deleteStudent,
    updateStudent,
    searchStudents,
    getStudentsWithPagination
};