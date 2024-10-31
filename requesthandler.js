import postSchema from './model/post.js'
import userSchema from './model/user.js'
import bcrypt from 'bcrypt'

import pkg from 'jsonwebtoken'
const {sign} =pkg


export async function login(req,res) {
    const {email,pass}=req.body
    if(!(email&&pass))
        return res.status(500).send({msg:"empty input"})

    const user= await userSchema.findOne({email})
    if(!user)
        return res.status(500).send({msg:"not exist"})

    const success=await bcrypt.compare(pass,user.pass)

    if(success!=true)
        return res.status(500).send({msg:"Incorrect Password"})

    const token=await sign({UserID:user._id},process.env.jwt_key,{expiresIn:"24h"})
    res.status(200).send({token})
}

export async function getUser(req, res) {
    const usr=await userSchema.findOne({_id:req.user.UserID})
    const data=await postSchema.find()
    res.status(200).send({usr,data}); 
}

export async function getUserDetails(req,res) {
    const usr=await userSchema.findOne({_id:req.user.UserID})
    const post=await postSchema.find({id:req.user.UserID})
    res.status(200).send({usr,post}); 
}



export async function addPost(req,res) {
    const{...datas}=req.body
    await postSchema.create({id:req.user.UserID,...datas}).then(()=>{
        res.status(201).send({msg:"Successfull"})
    }).catch((error)=>{
        res.status(404).send({error:error})
    })  
}



export async function showPost(req,res) {
    const id=req.params.id
    const post=await postSchema.findOne({_id:id})
    res.status(200).send({post})
}

export async function update(req,res) {
    const {...data}=req.body
    await postSchema.updateOne({_id:req.params.id},{$set:{id:req.user.UserID,...data}}).then(()=>{
        res.status(201).send({msg:"updated"})
    }).catch((error)=>{
        res.status(500).send({error:error})  
    })  
}

export async function adduser(req,res) {
    const {profile,name,email,phone,pass,cpass}=req.body
    if(!(name&&email&&pass&&cpass))
        return res.status(500).send({msg:"empty input"})
    else if(pass!=cpass)
        return res.status(500).send({msg:"password missmatch"})

    bcrypt.hash(pass,10).then((hpwd)=>{
        // console.log(hpwd)
        console.log("data added");
        userSchema.create({profile,name,email,phone,pass:hpwd}).then(()=>{
            res.status(201).send({msg:"Successfull"})
        }).catch((error)=>{
            res.status(404).send({error:error})
        })  
    }).catch((error)=>{
        console.log(error)
    }) 
}

export async function deleteUser(req, res) { 
    const { id } = req.params;  
    const data = await userSchema.deleteOne({ _id: id })
        .then(() => {
            res.status(201).send({ msg: "Deleted" });
        })
        .catch((error) => {
            res.status(500).send({ error });
        });
}

export async function deletePost(req, res) {
    // console.log(req.params); 
    const { id } = req.params;  
    const data = await postSchema.deleteOne({ _id: id })
        .then(() => {
            res.status(201).send({ msg: "Deleted" });
        })
        .catch((error) => {
            res.status(500).send({ error });
        });
}
