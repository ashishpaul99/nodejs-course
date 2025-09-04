const express=require('express');
const router=express.Router()
// pull the register controller
const registerController=require('../controllers/registerController');

router.post('/',registerController.handleNewUser);
module.exports=router;




