const userModel = require('../models/usersSchema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


const getAllUsers = function(){
    return new Promise((resolve, reject) => {
        userModel.find({}, function (err, users) {
            if(err){
                return reject(err);
            }
            resolve(users);
        });
    })
}

// user login function
const verifyUserLogin = async (email,password)=>{
    try {
        const user = await userModel.findOne({email}).lean()
        if(!user){
            return {status:'error',error:'user not found'}
        }
        if(await bcrypt.compare(password,user.password)){
            // creating a JWT token
            token = jwt.sign({id:user._id,username:user.email,type:'user'},process.env.JWT_SECRET)
            return {status:'ok',data:token}
        }
        return {status:'error',error:'invalid password'}
    } catch (error) {
        console.log(error);
        return {status:'error',error:'timed out'}
    }
}

module.exports = {
    getAllUsers,
    verifyUserLogin
}