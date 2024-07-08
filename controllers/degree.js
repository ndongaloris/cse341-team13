const getAll = (req, res) =>{
    dbModel.find().then((data) =>{
        res.status(200).send(data);
    }).catch((err) =>{
        console.log("something is wrong with the getAll", err);
    })
    
}
const getSingle = (req, res) =>{}

const createDegree = (req, res) =>{
    
}

const deleteDegree = (req, res) => {
    
}

const updateDegree = (req, res) => {
}


module.exports = {
    getAll,
    getSingle,
    deleteDegree,
    updateDegree,
    createDegree
};
