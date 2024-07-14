const userSchema=require("../models/userSchema");
const bcrypt = require('../utils/passwordGen');
// const genMail = require('../util/emailGen')
const jwtToken = require('../utils/jwtToken')



module.exports.addUser = (async (req, res) => {
    try {
        // if (atob(req.body.captchaEntered) === req.body.captcha) {
            // var allowedDomains = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'yopmail.com'];
            console.log(req.body)
                req.body.password = bcrypt.hashSync(req.body.password)
                req.body.firstName = req.body?.firstName.trim()
                req.body.lastName = req.body?.lastName.trim()
                req.body.email = req.body?.email.trim()
                // console.log(req.body)
                const user = await userSchema.find({ "email": req.body.email }).exec();
                if (user.length == 0) {
                    userSchema.create(req.body).then(async (data) => {
                        // genMail(req.body.email)
                        // var session=await generalFunctions.getSession_ID(data?._id)
                        // var passToken = await generalFunctions.passToken()
                        // var details = await generalFunctions.userDetails(req, res)
                        token = jwtToken.generateToken({ email: req.body.email, fullName: req.body.firstName + " " + req.body.lastName, id: data._id })
                        userSchema.updateOne({ email: req.body.email }, { tokenUser: token }).exec()
                        // userSchema.findOneAndUpdate({ email: req.body.email }, { $push: { devices: details } }).exec()
                        res.status(201).json({ message: 'User Created', data: req.body.email,token:token });
                    }).catch((error) => {
                        console.log(error)
                        res.status(400).json({ message: 'User Not Created', error: error })
                    })
                } else {
                    res.status(403).json({ message: 'Email Already Exists' })
                }
        // }
        // else {
        //     res.status(400).json({ message: 'Enter Valid Captcha' })
        // }
        // 
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong" })
    }
})



module.exports.resend = ((req, res) => {
    try {
        var email = req.params.email
        genMail(email)
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" })
    }

})



module.exports.checkotp = (async (req, res) => {
    var email = req.params.email
    date = new Date()
    const user = await userSchema.find({ "email": email }).exec();
    if ((date.getMinutes() - user[0].otpAddAt.getMinutes() <= 10) && (user[0].otp == req.body.otp)) {
        userSchema.updateOne({ email: email }, { enabled: 1 }).exec()
        res.status(200).json({ message: 'User Verified', data: user[0]?.tokenUser, passToken: user[0]?.passToken })
    }
    else {
        res.status(400).json({ message: 'Please Enter correct Otp or Generate new One by clicking the below link' })
    }
})


module.exports.getAllUser = ((req, res) => {
    userSchema.find().then((data) => {
        //console.log('User Fetched')
        res.status(200).json({ message: 'User Fetched', data: data })
    }).catch((error) => {
        //console.log('User Not Fetched')
        res.status(400).json({ message: 'User Not Fetched', error: error })
    })
})


module.exports.getUser = (async (req, res) => {
    
    // const user=await userSchema.find({"email":req.body.email}).exec();
    try {

        const user = await userSchema.find({ "email": req.body.email }).exec();
        // console.log(user)
        // console.log(user);
        if (user.length == 0 || user == null) {
            res.status(400).json({ message: "No data Found" });
        }
        else {
            const password = user[0].password;
            if (bcrypt.comSync(req.body.password, password) == true) {
                if (user[0]?.enabled === 1) {
                    // var session=await generalFunctions.getSession_ID(user[0]?._id)
                    // var passToken=await generalFunctions.passToken()
                    // var details=await generalFunctions.userDetails(req,res)
                    var userToken = jwtToken.generateToken({ email: user[0].email, fullName: user[0].firstName + " " + user[0].lastName, role: user[0].role, id: user[0]._id })
                    if (user[0].role == 'admin') {
                        admin = await businessSchema.findOne({ userId: user[0]._id }).exec()
                        // console.log(admin)
                        var adminToken = jwtToken.generateToken({ userEmail: user[0].email, adminEmail: admin.email, name: admin.ownerName, role: 'admin', city: admin.city, userId: admin.userId, adminId: admin._id })
                        // console.log(adminToken)
                        userSchema.updateOne({ email: req.body.email }, { tokenUser: userToken, tokenAdmin: adminToken }).exec()
                        // userSchema.findOneAndUpdate({email:req.body.email},{$push:{devices:details}}).exec()
                        res.status(200).json({ message: "User Fetched", userToken: userToken, adminToken: user[0].tokenAdmin,passToken:user[0].passToken });
                    }
                    else {
                        userSchema.findOneAndUpdate({email:req.body.email}).exec()
                        // userSchema.findOneAndUpdate({email:req.body.email},{$push:{devices:details}}).exec()
                        res.status(200).json({ message: "User Fetched",user:user, userToken: userToken, adminToken: null });
                    }
                }
                else{
                    // genMail(req.body.email)
                    res.status(401).json({ message: "Please Verify your email account!! Check your mail's inbox or go to profile page",redirect:true,data:req.body.email });
                }
            }
            else {
                res.status(401).json({ message: "Invalid Credentials" });
            }
        }
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong" })
    }

})

module.exports.getUserDet = ((req, res) => {
    try {
        var userId = req.params.userId
        userSchema.findById(userId, "firstName lastName email phoneNumber enabled").then((data) => {
            // console.log(data)
            res.status(200).json({ message: "User Fetched", data: data });
        }).catch((error) => {
            //console.log(error)
        })
    }
    catch (error) {
        //console.log(error)
        res.status(500).json({ message: "Something went wrong" })
    }
})

module.exports.updateUser = (async (req, res) => {
    try {
        // console.log(req.body.id)
        userSchema.findByIdAndUpdate(req.body.id, req.body.data).then(async (data) => {
            var user = await userSchema.findById(req.body.id)
            var userToken = jwtToken.generateToken({ email: user.email, fullName: user.firstName + " " + user.lastName, role: user.role, city: user.city, id: user._id })
            userSchema.updateOne({ _id: req.body.id }, { tokenUser: userToken }).exec()
            // var userToken=user?.tokenUser
            res.status(200).json({ message: "User Fetched", userToken: userToken });
        }).catch((error) => {
            //console.log(error)
            res.status(400).json({ message: "fail to update the user", error: error })
        })
    }
    catch (error) {
        //console.log(error)
        res.status(500).json({ message: "Something went wrong" })
    }
})


module.exports.getCaptcha = ((req, res) => {
    let source = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let i = 0;
    let captcha = '';
    while (i < 6) {
        captcha += source.charAt(Math.floor(Math.random() * source.length));
        i++;
    }
    let encodedCaptcha = btoa(captcha);
    res.status(200).json({ message: "Captcha ready", encoded: encodedCaptcha });
})
