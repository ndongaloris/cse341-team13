const objectID = require("mongodb").ObjectId;
const databaseModel = require("../models/index").degree;

const getAll = (req, res) =>{
    databaseModel.find().then((data) =>{
        res.status(200).send(data);
    }).catch((err) =>{
        console.log("something is wrong with the getAll", err);
    })
    
}
const getSingle = (req, res) =>{
    const degreeId = new objectID(req.params.id);
    databaseModel.findOne({ _id : degreeId }).then((data) => {
        res.status(200).send(data);
    }).catch((err) =>{
        console.log("something is wrong with the getSingle", err);
    })
}

const createDegree = (req, res) =>{
    databaseModel.save({
        Name: req.body.Name,
        Institution: req.body.Institution,
        Type: req.body.Type,
        Description: req.body.Description,
        PotentialEmployment: req.body.PotentialEmployment
    }).then((data) => {
        res.status(200).send(data);
    }).catch((err) =>{
        console.log("something is wrong with the createDegree", err);
    })
}

const updateDegree = (req, res) => {
    const degreeId = new objectID(req.params.id);
    
    const newDoc = {};
    if (req.body.Name !== undefined) newDoc.Name = req.body.Name;
    if (req.body.Institution !== undefined) newDoc.Institution = req.body.Institution;
    if (req.body.Type !== undefined) newDoc.Type = req.body.Type;
    if (req.body.Description !== undefined) newDoc.Description = req.body.Description;
    if (req.body.PotentialEmployment !== undefined) newDoc.PotentialEmployment = req.body.PotentialEmployment;

    databaseModel.updateOne({_id: degreeId}, {$set: newDoc}).then((data) =>{
        res.status(200).send(data);
    }).catch((err) =>{
        console.log("something is wrong with the updateDegree", err)
    })
}

const deleteDegree = (req, res) => {
    const degreeId = new objectID(req.params.id);
    databaseModel.deleteOne({ _id : degreeId }).then((data) =>{
        res.status(200).send(data)
    }).catch((err) =>{
        console.log("something is wrong with the deleteDegree", err)
    })
}

module.exports = {
    getAll,
    getSingle,
    deleteDegree,
    updateDegree,
    createDegree
};
