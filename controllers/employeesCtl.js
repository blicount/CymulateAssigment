const empModel = require('../models/employeesSchema');

const getAllEmployees = function(){
    return new Promise((resolve, reject) => {
        empModel.find({}, function (err, users) {
            if(err){
                return reject(err);
            }
            resolve(users);
        });
    })
}

const updateEmployee = function(email, status){
    return new Promise((resolve, reject) => {
        empModel.update({email: email} ,{phishingStatus : status}, { upsert : true }, function (err, employee) {
            if(err){
                return reject(err);
            }
            resolve(employee);
        } );
    })
}

module.exports = {
    getAllEmployees,
    updateEmployee
}