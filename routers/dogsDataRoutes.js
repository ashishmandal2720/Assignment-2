const router = require('express').Router();

const {
    generateDogPairs,
    submitVote,
    getAllDogs    
    // singleCustomerDetails,
    // deleteCustomerDetails,
} = require('../controller/dogsDataController');


router.get("/dogsData", getAllDogs);
router.get("/pairGen", generateDogPairs)
router.post("/vote", submitVote)
// router.put("/", CustomerDataUpdate);
// router.delete("/:id", deleteCustomerDetails);

module.exports = router;