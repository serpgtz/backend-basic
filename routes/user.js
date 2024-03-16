const { Router, response } = require("express")

const { getUsers } = require("../controllers/user")


const router = Router();

router.get('/',getUsers) 
    
  



  module.exports = router;