const databaseModel = require("../models/index").institution;

const getAll = async (req, res) =>{
    try{
    const result = await databaseModel.find()
        res.status(200).send(data)
    }catch{
        console.log("something is wrong with the getAll");
    }
    
}
const getSingle = async (req, res) =>{
    try{
        const institutionId = req.params.id;
        const result = await databaseModel.findOne({ _id : institutionId });
        res.status(200).send(data)
    }catch{
        console.log("something is wrong with the getSingle");
    }
}

const createInstitution = async (req, res) =>{
    
    try{
        const result = await databaseModel.save({
        Name: req.body.Name,
        Address: req.body.address,
        Description: req.body.Description,
        DateOfCreation: req.body.DateOfCreation
        })
        res.status(200).send(data)
    }catch{
        console.log("something is wrong with the createInstitution");
    }
}

const deleteInstitution = async (req, res) => {
    try{
        const institutionId = req.params.id;
        databaseModel.deleteOne({ _id : institutionId });
        res.status(200).send(data)
    }catch{
        console.log("something is wrong with the deleteInstitution")
    }
}

const updateInstitution = async (req, res) => {
    try{
        const institutionId = req.params.id;
        
        const newDoc = {};
        if (req.body.Name !== undefined) newDoc.Name = req.body.Name;
        if (req.body.Adress !== undefined) newDoc.Address = req.body.Address;
        if (req.body.Description !== undefined) newDoc.Description = req.body.Description;
        if (req.body.DateOfCreation !== undefined) newDoc.DateOfCreation = req.body.DateOfCreation;

        const result = await databaseModel.updateOne({_id: institutionId}, {$set: newDoc})
        res.status(200).send(data)
    }catch{
        console.log("something is wrong with the updateInstitution")
    }
}


module.exports = {
    getAll,
    getSingle,
    deleteInstitution,
    updateInstitution,
    createInstitution
};
