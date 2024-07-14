const express=require("express");
const router=express.Router();

const borrowHistoryController=require("../controllers/borrowHistoryController");


router.post('/borrowbook',borrowHistoryController.addBorrow);
router.get("/getborrowbook",borrowHistoryController.getAllBorrowBooks);
// router.get('/getuserdet/:userId',userController.getUserDet)
// router.put('/updateuser',userController.updateUser)
// router.post('/adduser',userController.addUser)


module.exports=router;