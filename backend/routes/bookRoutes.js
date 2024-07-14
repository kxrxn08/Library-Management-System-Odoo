const express=require("express");
const router=express.Router();
// const middleware=require("../ut")
const bookController=require("../controllers/bookController");


router.post("/addbook",bookController.addBook);
router.get("/getbooks",bookController.getAllBooks);

module.exports=router;