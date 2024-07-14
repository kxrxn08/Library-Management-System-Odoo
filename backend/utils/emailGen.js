const nm = require('nodemailer');
const userSchema = require('../model/userSchema')
var OTP=''
const optFunction=()=>{
    var string='1234567890'
    var otp=''
    for (var i=0;i<4;i++)
    {
        otp+=string[parseInt(Math.random()*9)]
    }
    return otp
}
const otp = (email,otp2) => {
    date=new Date()
    userSchema.updateOne({ "email": email }, { 'otp': otp2 ,'otpAddAt':date}).then((data) => {
        //console.log("updated", data)
    }).catch((error) => {
        //console.log(error);
    })
}
const genMail = async (to) => {
    let transporter = nm.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: "sharedhaven@gmail.com",
            pass: "sharedhaven",
          },
    })
    var otp2=optFunction()
    // otp(to)

    const mailOptions = {
        from: 'sharedhaven@gmail.com',
        to: to,
        subject: "OTP Verification",
        html: `
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Appointment Confirmation</title>
            <style>
                /* Add your custom CSS styles here */
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    margin: 0;
                    padding: 0;
                }
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    background-color: #ffffff;
                    border-radius: 10px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                }
                h1 {
                    color: #333;
                    text-align: center;
                }
                p {
                    color: #666;
                    line-height: 1.6;
                    margin-top: 20px;
                }
                .button {
                    display: inline-block;
                    background-color: #007BFF;
                    color: #ffffff;
                    padding: 10px 20px;
                    text-decoration: none;
                    border-radius: 5px;
                    margin-top: 20px;
                }
                .button:hover {
                    background-color: #0056b3;
                }
            </style>
        </head>
        <body>
            <div class="container">
            <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
            <div style="margin:50px auto;width:70%;padding:20px 0">
                <div style="border-bottom:1px solid #eee">
                    <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">bookmycoiffeur</a>
                </div>
                <p style="font-size:1.1em">Hi,</p>
                <p>Thank you for choosing us.</p>
                <p>Use the following OTP to complete your Sign Up procedures. OTP will be valid for 10 minutes</p>
                <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp2}</h2>
                <p style="font-size:0.9em;">Regards,<br />bookmycoiffeur</p>
                <hr style="border:none;border-top:1px solid #eee" />
            </div>
        </body>`
    }
    transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            //console.log(err)
        }
        else {
            //console.log(data)
            otp(to,otp2)
        }
    })
};

module.exports = genMail;