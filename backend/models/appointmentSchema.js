const mongoose=require("mongoose");
const Schema=mongoose.Schema;

    const appointmentSchema=new Schema({
        userId:{
            type:Schema.Types.ObjectId,
            ref:'user'
        },
        adminId:{
            type:Schema.Types.ObjectId,
            ref:"business",
        },
        startTime:{
            type:Number,
            required:true,
        },
        totalTime:{
            type:Number,
            required:true,
        },
        date:{
            type:"String",
        },
        paymentType:{
            type:String,
        },
        totalPrice:{
            type:Number
        },
        isAdmin:{
            type:Boolean
        },
        enabled:{
            type:Boolean,
            default:true
        },
        paymentOrderId:{
            type:String
        },
        signature:{
            type:String
        },
        payment:{
            type:Object
        }
        
    },{timestamps:true})


module.exports=mongoose.model("appointment",appointmentSchema);