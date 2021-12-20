const express = require("express")

const app = express()

require("./db/conn")
const Regi = require("./models/Regi")
const post = require("./models/post")
const bcrypt = require ("bcryptjs")
const cookieParser = require("cookie-parser")
const auth = require ('./models/auth')
 
 const port = 8001;
app.use(express.json())
app.use(cookieParser())

app.post ("/Regi" , async (req,res)=>{ 
    const p = req.body.Password
    const cp = req.body.Confirm 
     if(p===cp){  
         
         const xyz = await new Regi(req.body);
         const token = await xyz.generet()
         res.cookie("jwt", token)
         console.log(token)
        xyz.save().then(()=>{
            res.status(201).send(xyz);
        }).catch((e)=>{res.send(e)})
    }
     else{
        alert('passwords are not matching')}})

app.post ("/login", async (req,res)=>{

    try{
    
    const Email = req.body.Email
    const p =  req.body.Password
    const Usermail = await Regi.findOne({Email:Email})
    const isMatch = await bcrypt.compare(p,Usermail.Password)
    console.log(p)
    console.log(Usermail.Password)
    console.log(isMatch)
    const token = await Usermail.generet()

    res.cookie("jwt", token , {
        expires: new Date(Date.now()+ 60000),
         httpOnly:true
    })
    console.log(token)
    if(isMatch){
       res.status(200).send({message:"login Successfuly", Usermail})
    }else{
        res.status(400).send({message:"login Failed"})
       
    }

}catch{
    res.status(400).send({message:"User Not REgistered"})

}

})

app.post ("/posst",auth, async (req,res)=>{
    console.log(req.body)
    const xyz = await new post (req.body);
    if(req.body.any==null ){res.status(400).send()}else{  xyz.save().then(()=>{
        res.status(201).send();
    }).catch((e)=>{res.send(e)})}
  
})

app.get("/come",auth , (async(req,res)=>{
    try {const tata = await post.find()
        res.send(tata)
        } catch(e){console.log(e)}
}))

app.get('/userpost/:username',auth , (async(req,res)=>{
    const username = req.params.username
   
    try { 
        const userPosts = await post.find({username:username})
        res.send(userPosts)
        } catch(e){console.log(e)}
}) )

app.get('/userpostbyid/:id',auth, (async(req,res)=>{
    const id = req.params.id
   
    try { 
        const postbyid = await post.find({_id:id})
        res.status(200).send(postbyid)
        } catch(e){console.log(e)}
}) )

app.put('/edituserpost/:id',auth, (async(req,res)=>{
    const id = req.params.id
   
    try { 
        const editpost = await post.findByIdAndUpdate(id, req.body)
        res.status(200).send(editpost)
        } catch(e){console.log(e)}
}) )

app.delete('/deletepost/:id',auth, (async(req,res)=>{
    const id = req.params.id
   
    try { 
        const deletepost = await post.findByIdAndDelete(id)
        res.status(200).send(deletepost)
        } catch(e){console.log(e)}
}) )


app.get("/logout" , auth , (async (req,res)=>{
    try{
res.clearCookie("jwt")

await req.user.save()
    }catch(error){
        res.send(error)

    }
}))


 app.listen (port,()=>{
    console.log(`connection is setup at ${port}`)
})