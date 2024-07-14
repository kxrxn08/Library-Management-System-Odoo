const appointmentSchema = require("../models/appointmentSchema");
const userSchema = require("../models/userSchema");


module.exports.addAppointement = async (req, res) => {
    try {
      const today = new Date();
      var a = new Date(today.setHours(0, 0, 0, 0)).getTime();
      const tomorrow = new Date(today);
      var b = new Date(tomorrow.setDate(tomorrow.getDate() + 1)).getTime();
      // const total = await appointmentSchema.aggregate([
      //   {
      //     $match: {
      //       userId: new mongoose.Types.ObjectId(req.body.userId._id),
      //       startTime: {
      //         $gte: a,
      //         $lt: b,
      //       },
      //     },
      //   },
      //   {
      //     $group: {
      //       _id: null,
      //       totalAppointments: { $sum: 1 },
      //     },
      //   },
      // ]);
      
      appointmentSchema
        .create(req.body)
        .then(async (data) => {
          user = await userSchema.findById(req.body.userId._id);
          admin = await userSchema.findById(req.body.userId._id);

        //   if(req.body.isOffered===false)
        //   {
        //     const respons = await qrcode.toDataURL('https://www.bookmycoiffeur.com' + '/checkin/' + data._id + "-" + data?.bookingOtp + "!!" + req.body.adminId._id)
        //     sendAppointmentMail(user, admin, req.body, employee, respons, calObj);
        //   }
          res.status(200).json({ message: "Appointment Booked", data: data });
        })
        .catch((error) => {
          console.log(error);
          res
            .status(400)
            .json({ message: "Error to book appoinment ", error: error });
        });
      // }
      // else {
      //   res.status(400).json({ message: "Users can book only 3 appointments per day" })
      // }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server Issue" });
    }
  };



  module.exports.getAllAppointments=(req,res)=>{
    try{
      appointmentSchema.find().then((data)=>{
        res.status(200).json({message:"All Appointments Fetched successfully",data:data});
      }).catch((error)=>{
        res.status(500).json({message:"Something went wrong",error:error});
      })
    }
    catch(error){
      res.status(500).json({message:"Server Issue",error:error});
    }
    
  }