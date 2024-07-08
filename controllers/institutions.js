const getAll = (req, res) =>{
    dbModel.find().then((data) =>{
        res.status(200).send(data);
    }).catch((err) =>{
        console.log("something is wrong with the getAll", err);
    })
    
}
const getSingle = (req, res) =>{}

const createInstitution = (req, res) =>{
    
}

const deleteInstitution = (req, res) => {
    
}

const updateInstitution = (req, res) => {
}


module.exports = {
    getAll,
    getSingle,
    deleteInstitution,
    updateInstitution,
    createInstitution
};
