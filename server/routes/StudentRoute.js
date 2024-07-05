const express = require('express')
const {addStudent,getAllStudent,getAllUser} = require('../controllers/StudentController')
const router = express.Router();

router.post('/register', addStudent)
router.get('/getallregister', getAllStudent)
router.get('/getalluser', getAllUser)
// router.post('/login', loginUser)
// router.post('/userData', userData)


module.exports = router;