const router = require('express').Router();

const {
    registerUserData,
    loginUserData,
    verifyEmail,
    frogotPassword
}=require('../controller/userRegistrationController');


router.post("/register",registerUserData)
router.post("/login",loginUserData)
router.patch("/verify", verifyEmail);
router.patch("/forgot", frogotPassword);
// router.delete("/:id", deleteCustomerDetails);

module.exports = router;