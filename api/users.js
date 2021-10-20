const express   = require('express');
const router    = express.Router();
const userController = require('../controllers/usersCtl');
const userModel = require('../models/usersSchema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const salt = 10;


router.get('/' , async (req,res)=> {
    try{
        let users = await userController.getAllUsers();
        res.status(200).send(users);
    }catch(err){
        res.status(400).send(err);    
    }
});

router.post('/signup',async (req,res)=>{
	// geting our data from frontend
	const {name , email, password: textPassword} = req.body;
	// encrypting our password to store in database
	const password = await bcrypt.hash(textPassword,salt);
	try {
		// storing our user data into database
		const response = await userModel.create({
            name,
			email,
			password
		})

	    return res.status(200).send({status: 'ok', data: 'user sign up successfully'});
	} catch (err) {
		res.status(400).send(`error creating user >> ${err}`);
	}
})

router.post('/login',async(req,res)=>{
    console.log(req.body);
	const {email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send("You must enter email and password");
    }
	// we made a function to verify our user login
    const response = await userController.verifyUserLogin(email, password);

    if(response.status === 'ok'){
        res.send(response);
    }else{
        res.json(response);
    }
})


module.exports = router;