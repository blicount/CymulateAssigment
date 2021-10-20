const express   = require('express');
const router    = express.Router();

router.get('/' , async (req,res)=> {
    try{
        let users = await emailController.sendEmail();
        res.status(200).send(users);
    }catch(err){
        res.status(400).send(err);    
    }
});


module.exports = router