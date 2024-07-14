const bookSchema=require("../models/bookSchema");
const userSchema=require("../models/userSchema");
const jwt = require('jsonwebtoken');
const secret="odoo"
module.exports.addBook=(async (req,res)=>{
    try{
        const token = req.headers['authorization'];
        console.log(token);
        const decoded = jwt.verify(token, secret);
    req.userRole = decoded.role; 
    console.log(req.userRole)
    if(req.userRole=='admin' || req.userRole=='librarian')
    {
            bookSchema.create(req.body).then((data)=>{
                res.status(200).json({message:"Book Added Successfully",data:data});
            })
            .catch((error)=>{
                res.status(400).json({message:"Not Able to add book",error:error});
            })
    }
    else{
        res.status(401).json({message:"Unauthorized User"});
    }
        
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal Server Error",error:error })
    }
})


module.exports.getAllBooks=(async (req,res)=>{
    try{
        
        bookSchema.find().then((data)=>{
                res.status(200).json({message:"Fetch All book Successfully",data:data});
        })
        .catch((err)=>{
            res.status(404).jsoN({message:"Books Not Found",error:err});
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal Server Error",error:error })
    }
})


module.exports.searchBook=(async (req,res)=>{
    try{
        var typed = req.params.typed
        var titles=await bookSchema.distinct('title',{title:{$regex:`${typed}`,$options:'i'}}).exec()
        const books = await bookSchema.find({ title: { $in: titles } }).exec();
        if(books.length>0){
            res.status(200).json({message:"fetch the book",data:books});
        }
        else{
            res.status(404).json({message:"No Data found",data:books});
        }
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal Server Error",error:error })
    }
})