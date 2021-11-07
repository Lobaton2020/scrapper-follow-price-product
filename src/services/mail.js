const config = require("../config");
const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: config.email,
        pass: config.password
    }
    });
const sendEmail = (email,message)=>{
    console.log(`Will Send email to ${email}`);
    const otps = {
        from: config.email,
        to: email,
        subject: 'Alert --- Product to check is more cheaper',
        text: message
    };

    transporter.sendMail(otps, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};



const toNumber = ({ price })=> parseInt(price.replace(/\./g, ''));

module.exports.checkSendEmail = (oldData,newData)=>{
    let isSendEmail = false;
    let data = {};
    const key = Object.keys(newData)[0];
    if(!["object","array"].includes(typeof(oldData[key]))) {
        return console.log(`oldData[${key}] is not array`);
    }
    try{

        const maxOld = oldData[key].map(toNumber).reduce((a,b,)=>a<b?a:b);
        const minNew = newData[key].map(toNumber).reduce((a,b)=>a<b?a:b);
        if(minNew < maxOld ){
            data = {
                name: key,
                oldPrice: maxOld,
                newPrice: minNew,
                link: config.scrapper[key]
            };
            isSendEmail = true;
        }
        if(isSendEmail){
            sendEmail(config.email,`New product with price lowest :${JSON.stringify(data)}`);
            return isSendEmail;
        }
        return isSendEmail
    }catch(err){
        console.log(err,"Error al enviar correo");
    }
    };