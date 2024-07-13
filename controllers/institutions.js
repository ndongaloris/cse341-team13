const objectID = require("mongodb").ObjectId;
const databaseModel = require("../models/index").institution;

const getAll = (req, res) =>{
    databaseModel.find().then((data) =>{
        res.status(200).send(data);
    }).catch((err) =>{
        console.log("something is wrong with the getAll", err);
    })
    
}
const getSingle = (req, res) =>{
    const institutionId = new objectID(req.params.id);
    databaseModel.findOne({ _id : institutionId }).then((data) => {
        res.status(200).send(data);
    }).catch((err) =>{
        console.log("something is wrong with the getSingle", err);
    })
}

const createInstitution = (req, res) =>{
    databaseModel.save({
        Name: req.body.Name,
        Address: req.body.address,
        Description: req.body.Description,
        DateOfCreation: req.body.DateOfCreation
    }).then((data) => {
        res.status(200).send(data);
    }).catch((err) =>{
        console.log("something is wrong with the createInstitution", err);
    })
}

const deleteInstitution = (req, res) => {
    const institutionId = new objectID(req.params.id);
    databaseModel.deleteOne({ _id : institutionId }).then((data) =>{
        res.status(200).send(data)
    }).catch((err) =>{
        console.log("something is wrong with the deleteInstitution", err)
    })
}

const updateInstitution = (req, res) => {
    const institutionId = new objectID(req.params.id);
    
    const newDoc = {};
    if (req.body.Name !== undefined) newDoc.Name = req.body.Name;
    if (req.body.Adress !== undefined) newDoc.Address = req.body.Address;
    if (req.body.Description !== undefined) newDoc.Description = req.body.Description;
    if (req.body.DateOfCreation !== undefined) newDoc.DateOfCreation = req.body.DateOfCreation;

    databaseModel.updateOne({_id: institutionId}, {$set: newDoc}).then((data) =>{
        res.status(200).send(data);
    }).catch((err) =>{
        console.log("something is wrong with the updateInstitution", err)
    })
}


module.exports = {
    getAll,
    getSingle,
    deleteInstitution,
    updateInstitution,
    createInstitution
};
