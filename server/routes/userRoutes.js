const express = require('express');
const router = express.Router();
const { getAllUsers, updateUserRole, deleteUser } = require('../controllers/userController');
const authMiddleware= require('../middleware/authMiddleware');
const adminMiddleware = require("../middleware/adminMiddleware");


router.get('/admin/users', authMiddleware, adminMiddleware, getAllUsers);
router.patch('/admin/user/:id/role', authMiddleware, adminMiddleware, updateUserRole);
router.delete('/admin/user/:id', authMiddleware, adminMiddleware, deleteUser)

module.exports = router;