const express = require("express");
const mongoose = require("mongoose");
const AdminData = require("./model");
const Videodata = require("./model2");
const jwt = require("jsonwebtoken");
const middleware = require("./middleware")
const core = require("cors")
const Base = process.env.Base_url


const app  = express();
app.use(express.json());
mongoose.connect("mongodb+srv://hasindustries9:hasindustries@cluster0.zilbojm.mongodb.net/?retryWrites=true&w=majority").then(
    ()=>console.log("Db connected")
)


app.use(core({
   origin:"*"
}))




app.get("/",(req,res)=>{
    res.send("hello aileans")
})

app.post("/login" ,async(req,res)=>{
  try{
    const {email,password} = req.body;
    let exist = await AdminData.findOne({email});
    if(!exist){
        return res.status(400).send("User Not Found")
    }
    if(exist.password!==password){
        return res.status(400).send("Invalid Credentials")
    }
    let payload = {
        user:{
            id:exist.id
        }
    }
    jwt.sign(payload,"jwtSecret",{expiresIn:3600000},
         (err,token)=>{
            if(err) throw err;
            return res.json(token)
         }
        )
  }
  catch(err){
    console.log(err);
    return res.status(500).send("server error")
  }
})


app.post("/upload", async(req,res)=>{
  try{
    const {videotitle,videourl,videodescription,thumbnail} = req.body;
    let newUser = new Videodata({
      videotitle,
      videourl,
      videodescription,
      thumbnail
    })
    await newUser.save();
    return res.status(200).send("Registered Successfully")
  }
  catch(err){
    console.log(err.message)
  }
})


// Create a GET endpoint to retrieve data
app.get('/data', async (req, res) => {
  try {
    const data = await Videodata.find();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error retrieving data:', error);
    res.status(500).send('Error retrieving data');
  }
});


app.delete("/deletetasks/:id",async(req,res)=>{
  try{
     await Videodata.findByIdAndDelete(req.params.id);
     return res.send(await Videodata.find())
  }
  catch(err){
     console.log(err.message)
  }
})




app.listen(5000,()=>{
    console.log("server running")
})