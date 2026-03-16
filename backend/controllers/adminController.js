const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { User, LoginLog } = require("../models")

/* ======================
   ADMIN LOGIN
====================== */

exports.loginAdmin = async (req,res)=>{

try{

const { email,password } = req.body

if(!email || !password){
return res.status(400).json({
message:"Email and password required"
})
}

const admin = await User.findOne({
where:{ email }
})

if(!admin || admin.role !== "admin"){
return res.status(403).json({
message:"Admin access only"
})
}

const match = await bcrypt.compare(password,admin.password)

if(!match){
return res.status(400).json({
message:"Invalid credentials"
})
}

/* CREATE LOGIN LOG */

await LoginLog.create({
userId:admin.id,
email:admin.email,
loginTime:new Date()
})

const token = jwt.sign(
{
id:admin.id,
role:admin.role
},
process.env.JWT_SECRET,
{
expiresIn:"7d"
}
)

res.json({
message:"Admin login successful",
token,
admin:{
id:admin.id,
name:admin.name,
email:admin.email,
role:admin.role
}
})

}catch(error){

console.error("ADMIN LOGIN ERROR:",error)

res.status(500).json({
message:error.message
})

}

}


/* ======================
   GET ALL USERS
====================== */

exports.getAllUsers = async (req,res)=>{

try{

const users = await User.findAll({
attributes:["id","name","email","role","createdAt"],
order:[["createdAt","DESC"]]
})

res.json(users)

}catch(error){

console.error("GET USERS ERROR:",error)

res.status(500).json({
message:error.message
})

}

}


/* ======================
   LOGIN ACTIVITY (FIXED)
====================== */

exports.getLoginLogs = async (req,res)=>{

try{

const logs = await LoginLog.findAll({
attributes:["id","userId","email","loginTime"],  // ← SPECIFY ONLY EXISTING COLUMNS
order:[["loginTime","DESC"]]
})

res.json(logs)

}catch(error){

console.error("LOGIN LOG ERROR:",error)

res.status(500).json({
message:error.message
})

}

}


/* ======================
   DELETE USER
====================== */

exports.deleteUser = async (req,res)=>{

try{

const { id } = req.params

await User.destroy({
where:{ id }
})

res.json({
message:"User deleted successfully"
})

}catch(error){

console.error("DELETE USER ERROR:",error)

res.status(500).json({
message:error.message
})

}

}


/* ======================
   UPDATE USER
====================== */

exports.updateUser = async (req,res)=>{

try{

const { id } = req.params

await User.update(
{
name:req.body.name,
email:req.body.email
},
{
where:{ id }
}
)

res.json({
message:"User updated successfully"
})

}catch(error){

console.error("UPDATE USER ERROR:",error)

res.status(500).json({
message:error.message
})

}

}