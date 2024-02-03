const router = require('express').Router();

const {
    generateDogPairs,
    submitVote,
    getAllDogs,    
    submitVote2,
    // deleteCustomerDetails,
} = require('../controller/dogsDataController');


router.get("/dogsData", getAllDogs);
router.get("/pairGen", generateDogPairs)
router.post("/vote", submitVote)
router.post("/vote2", submitVote2)
// router.put("/", CustomerDataUpdate);
// router.delete("/:id", deleteCustomerDetails);

module.exports = router;