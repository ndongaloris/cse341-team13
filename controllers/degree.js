const databaseModel = require("../models/index").degree;

const getAll = async (req, res) =>{
    try{
        const result = await databaseModel.find()
        res.status(200).send(data)
    }
    catch{
        console.log("something is wrong with the getAll")
    }
}
const getSingle = async (req, res) =>{
    const degreeId = req.params.id;
    try{
        const result = await databaseModel.findOne({ _id : degreeId })
        res.status(200).send(data)
    }
    catch{
        console.log("something is wrong with the getSingle")
    }
}

const createDegree = async (req, res) =>{
    try{
        const result = databaseModel.save({
            Name: req.body.Name,
            Institution: req.body.Institution,
            Type: req.body.Type,
            Description: req.body.Description,
            PotentialEmployment: req.body.PotentialEmployment
        })
        res.status(200).send(data)
    }
    catch{
        console.log("something is wrong with the createDegree")
    }
}

const updateDegree = async (req, res) => {
    const degreeId = req.params.id;
    
    const newDoc = {};
    if (req.body.Name !== undefined) newDoc.Name = req.body.Name;
    if (req.body.Institution !== undefined) newDoc.Institution = req.body.Institution;
    if (req.body.Type !== undefined) newDoc.Type = req.body.Type;
    if (req.body.Description !== undefined) newDoc.Description = req.body.Description;
    if (req.body.PotentialEmployment !== undefined) newDoc.PotentialEmployment = req.body.PotentialEmployment;

    try{
        const result = await databaseModel.updateOne({_id: degreeId}, {$set: newDoc})
        res.status(200).send(data)
    }
    catch{
        console.log("something is wrong with the updateDegree",)
    }
}

const deleteDegree = async (req, res) => {
    try{
        const degreeId = req.params.id;
        const result = await databaseModel.deleteOne({ _id : degreeId })
        res.status(200).send(data)
    }
    catch{
        console.log("something is wrong with the deleteDegree")
    }
}

module.exports = {
    getAll,
    getSingle,
    deleteDegree,
    updateDegree,
    createDegree
};
