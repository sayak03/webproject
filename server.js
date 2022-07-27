const express = require('express');
var bodyParser = require('body-parser');
const app = express();
const nodemailer = require('nodemailer');
const { text } = require('body-parser');


const PORT = process.env.PORT || 8000;


app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/',(req,res)=>{
	res.sendFile(__dirname +'/public/index.html')
})
app.get('/about',(req,res)=>{
	res.sendFile(__dirname +'/public/about.html')
})
app.get('/services',(req,res)=>{
	res.sendFile(__dirname +'/public/services.html')
})
app.get('/payment',(req,res)=>{
	res.sendFile(__dirname +'/public/payment.html')
})
app.get('/contact',(req,res)=>{
	res.sendFile(__dirname +'/public/contact.html')
})
app.post('/contact',(req,res)=>{
	console.log(req.body);
	const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user:'sayakofflical@gmail.com',
			pass: 'avzzvcibqjvaghdx'
		}
	})

	const mailOptions = {
		from: req.body.email,
		to:'sayakofflical@gmail.com',
		subject:`Message from ${req.body.email}:  ${req.body.message}`,
		text: `Name: ${req.body.name}  
		Email: ${req.body.email} 
		Phone: ${req.body.phone} 
		Message: ${req.body.message}` 
	}

	transporter.sendMail(mailOptions,(error,info) =>{
		if (error) {
			console.log(error);
			res.send('error');
		}else{
			console.log('Email sent' + info.response);
			res.send('success')
		}
	})


})

app.listen(PORT,()=>{
	console.log(`server running on port ${PORT}`)
})