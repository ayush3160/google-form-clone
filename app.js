const express = require('express')
require("./database/db")
const User = require("./Schema/User")
const bcrpyt = require('bcrypt')
const jwt = require("jsonwebtoken")
const path = require('path');
const Form = require("./Schema/Form")
const { response } = require('express')

const app = express()
app.use(express.json())

const port = process.env.PORT || 5000;

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, './client/build')));
  
    app.get('/*', (req, res) => {
      res.sendFile(path.join(__dirname,'./client/build/index.html'));
    });
}

app.post("/auth/register",async (req,res) => {
    try {
        var register = req.body
    var result = await User.findOne({email : register.email});

    if(result){
        res.json({message : "user already exists"}).status(400);
    }else {
        register.response = [];

        const new1 = await bcrpyt.hash(register.password,bcrpyt.genSaltSync(12)).then((hashedpassword) => {
            register.password = hashedpassword;
        })

        const newuser = new User(register);

        const result2 = await newuser.save();

        res.json({message : 'Registered'}).status(200);
    }
    } catch (error) {
        console.log(error)
    }
})

app.post("/auth/login",async (req,res) => {
    try {
        const result = await User.findOne({email : req.body.email})
        const output = bcrpyt.compare(req.body.password,result.password,(err,response) => {
            if(response){
               const token = jwt.sign(
                {
                    id : result._id
                },
                process.env.SECRET_KEY
                )
                res.json({message : "Logged In",id : result._id,token : token}).status(200)
            }
            else{
                res.json({message : "Password Incorrect"}).status(400)
            }
        })
    } catch(error){
        res.status(400).json({message : "User does not exist"})
    }
})

app.post("/addform", async (req,res) => {
    try {
        const form = req.body;

        form.response = [];

        const result = new Form(form);

        const output = await result.save();

        console.log(output);

        res.json({message : "Form Added",formid : output.id})
    } catch (error) {
        console.log(error)
    }
})


app.post("/getForms", async (req,res) => {
    try {
        const form = req.body;

        const result = await Form.find({authorid : form.id});

        console.log(result);

        res.json({form : result}).status(200);
    } catch (error) {
        console.log(error)
    }
})

app.post("/fillform", async (req,res) => {
    try {
        const id = req.body.id;

        const result = await Form.find({_id : id});

        res.json({form : result[0]}).status(200);
    } catch (error) {
        console.log(error)
    }
})

app.post("/submitAnswers", async (req,res) => {
    try {
        const id = req.body.id;

        const result1 = await Form.updateOne({_id : id},{$push : {response : req.body.response}})

        res.json({message : "Answer Submitted"}).status(200);
    } catch (error) {
        console.log(error)
    }
})


app.listen(port,() => {
    console.log("server is listening on port 5000")
})