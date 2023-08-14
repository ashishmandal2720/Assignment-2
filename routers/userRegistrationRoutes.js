const router = require('express').Router();

const {
    registerUserData,
    getbill,
    sendOtp,
    singleCustomerDetails,
    deleteCustomerDetails,
}=require('../controller/userRegistrationController');


router.post("/register",registerUserData)
router.post("/sendOtp",getbill)
router.post("/send", sendOtp);
// router.get("/:id", singleCustomerDetails);
// router.delete("/:id", deleteCustomerDetails);

module.exports = router;