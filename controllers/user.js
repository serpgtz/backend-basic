
const { response } = require("express")


const getUsers = (req, res = response) => {
    return res.status(200).json({msg:"aqui van a estar todos los usuarios"})
}


module.exports = {
    getUsers
}