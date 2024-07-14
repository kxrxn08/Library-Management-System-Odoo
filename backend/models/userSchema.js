const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role:{
        type:String,
        default:'user'
    },
    phoneNumber: {
        type: Number,
        // required: true,
        length: 10
    },
    enabled: {
        type: Number,
        default: 0
        // 0 for not enabled 
        // 1 for enabled
    },
    otp: {
        type: Number
    },
    otpAddAt: {
        type: Date
    },
    tokenUser: {
        type: String,
    }
    , tokenAdmin: {
        type: String
    },
    passToken:{
        type:String
    },
    devices:[
        {
            enabled:{
                type:Boolean,
                default:true
            },
            userAgent:{
                type:String
            },
            deviceType:{
                type:String
            },
            browser:{
                type:String
            },
            platform:{
                type:String
            },
            time:{
                type:String
            },
            ip:{
                type:String
            },
            location:{
                type:String
            }
        }
    ]
},
    { timestamps: true }
)

module.exports = mongoose.model('user', userSchema)
