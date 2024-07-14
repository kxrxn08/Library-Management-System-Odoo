const express=require("express");
const router=express.Router();

const userController=require("../controllers/userController");


router.post('/getuser',userController.getUser);
router.get('/getuserdet/:userId',userController.getUserDet)
router.put('/updateuser',userController.updateUser)
router.post('/adduser',userController.addUser)


module.exports=router;