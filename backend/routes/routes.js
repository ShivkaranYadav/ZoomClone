const express = require('express');
const router = express.Router();
const { userRegister, userLogin, ScheduleMeeting, getScheduleMeeting } = require('../controller/userController')


router.post('/api/userRegister', userRegister);
router.post('/api/userLogin', userLogin);
router.post('/api/scheduleMeeting', ScheduleMeeting);
router.get('/api/getScheduleMeeting/:id', getScheduleMeeting);


module.exports = router