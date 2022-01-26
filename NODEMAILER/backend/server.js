import express from "express";
import colors from "colors";
import bodyParser from 'body-parser'
import nodemailer from 'nodemailer'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

// initialize app
const app = express();
 

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions))


// route
app.post('/send', (req, res)=>{
 const output = req.body;

// nodemailer
// step 1
let transporter = nodemailer.createTransport({
  service: 'gmail',

 
  auth: {
    user: 'your mail',
    pass: 'your password',
  },
    
})

// step 2
let mailOptions = {
  from: req.body.email,
  to: 'your mail',
  subject: `Message from ${req.body.email}: ${req.body.subject}`,
  text: req.body.message,

}
  // step 3 send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
           console.log(error);
           res.send(error)
      }else{
        console.log("Email sent :" + info.response)
       res.send('success')
      }
  
})

  });
  




const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
