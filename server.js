const app = require("./app");
const dotenv  =  require("dotenv");
const connectDB = require("./db/db");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

let resetPasswordToken = "Hello Akash";
const resetToken = crypto.randomBytes(20).toString("hex");
console.log("resetToken", resetToken);
resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

    console.log("reset Passowrd Token",resetPasswordToken);

// nodemailer
// const transporter = nodemailer.createTransport({
//     host:"smtp.gmail.com",
//     port:587,
//     secure: false,
//     auth: {
//     user: "akashbolster01@gmail.com",
//     pass: "hfdm vght jmtq ztzg",
//   },
// });


// Wrap in an async IIFE so we can use await.
// (async () => {
//   const info = await transporter.sendMail({
//     from: '"Maddison Foo Koch" <maddison53@ethereal.email>',
//     to: "akashbolster01@gmail.com, bonnie.waters15@ethereal.email",
//     subject: "Hello ✔",
//     text: "Hello world?", // plain‑text body
//     html: "<b>Hello world?</b>", // HTML body
//   });

//   console.log("Message sent:", info.messageId);
// })();


dotenv.config({path:'./config/config.env'});

port = process.env.PORT;

connectDB();

app.listen(port,()=>{
    // console.log(`Connected to port ${port}`);
});


// export const protect = (req,res,next) => {
//     const token = req.cookies.token;

//     if(!token){
//         return res.status(404).json({
//             message:"Unauthorized: No token provided",
//         })
//     }
// }

// Cookie Parser
// console.log(cookieParser);


// console.log(port);
// var privateKey = fs.readFileSync('private.key');
// console.log(privateKey);
// var token = jwt.sign({foo:'bar'},'shhhhh');
// console.log("with Private Key", token);
// var decoded = jwt.verify(token, 'shhhhh',{complete: true});
// console.log("header",decoded);
// console.log("payload",decoded.payload);
// console.log("signature",decoded.signature);
// console.log("header",decoded.header);
// var token2 = jwt.sign({foo:'bar'},privateKey,{ algorithm: 'RS256' });

// console.log("with Private Key Algorithm", token2);
// console.log("Token without private key",token);
