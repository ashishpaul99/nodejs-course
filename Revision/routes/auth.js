const express=require('express');
const router=express.Router();
const authController=require('../controller/authController');
router.get('/',authController.handleLogin);
module.exports=router;