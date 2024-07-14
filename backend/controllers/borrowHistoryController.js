const bookSchema = require("../models/bookSchema");
const borrowHistorySchema = require("../models/borrowHistorySchema");
const userSchema=require("../models/userSchema");

module.exports.addBorrow=(async (req,res)=>{
    
  try {
    const u=userSchema.findById(req.body.user_id);
    const book=req.body.book_id;
    const books=[];
    console.log(book);
    if(u==null){
      res.status(401).json({message:"Unauthorize"});
    }
    await book?.map((e)=>{
      books.push(bookSchema.findById(e));
    })

        borrowHistorySchema.create(req.body).then(async(data)=>{    

            await userSchema.findByIdAndUpdate(
              req.body.user_id,
              { $push: { history: data } },
              { new: true, useFindAndModify: false }
          );
            res.status(201).json({message:"Book Borrowed Successfully",data:data});
        })    .catch((error)=>{
          console.log(error);
            res.status(400).json({message:"Not Able to borrow book",error:error});
        })
        book.map(async (e)=>{
          const b =await bookSchema.findById(e).exec();
          const newAvailable = b.quantity - 1;
         await bookSchema.findByIdAndUpdate(e,{available:newAvailable},{ new: true, useFindAndModify: false }
          );
        })
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
})


module.exports.getAllBorrowBooks=(async(req,res)=>{
    try {
        borrowHistorySchema.find().populate('book_id').then((data)=>{
            res.status(201).json({message:"Fetch  Borrowed Book data Successfully",data:data});
        })    .catch((error)=>{
            res.status(400).json({message:"Not Able to fetch  book data",error:error});
        })
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
})

