const router = require('express').Router();

const {
    registerDogsData,
    sendOtp,
    CustomerDataUpdate,
    singleCustomerDetails,
    deleteCustomerDetails,
}=require('../controller/userRegistrationController');


// router.post("/register",registerDogsData)
// router.post("/sendOtp",sendOtp)
// router.put("/", CustomerDataUpdate);
// router.get("/:id", singleCustomerDetails);
// router.delete("/:id", deleteCustomerDetails);

module.exports = router;