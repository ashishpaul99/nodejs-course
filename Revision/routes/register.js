const express=require('express');
const router=express.Router();

const registerController=require('../controller/registerController');

router.get('/',registerController.handleNewUser);
module.exports=router;