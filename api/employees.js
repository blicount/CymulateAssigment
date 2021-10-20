
const express   = require('express');
const router    = express.Router();
const empController = require('../controllers/employeesCtl');
const empModel = require('../models/employeesSchema');
const auth = require('../middlewares/auth');



router.get('/updateEmplyee' , auth, async (req,res)=> {
    const {email, status} = req.body;
    try{
        let users = await empController.updateEmployee(email,status);
        res.status(200).send(users);
    }catch(err){
        res.status(400).send(err);    
    }
});

router.get('/' , auth, async (req,res)=> {
    try{
        let empList = await empController.getAllEmployees();
        res.render('list',{
            employeesList: empList
        });
    }catch(err){
        res.status(400).send(err);    
    }
});


module.exports = router;
