const router = require('express').Router();

const {
    registerUserData,
    loginUserData,
    loginAdminData,
    verifyEmail,
    frogotPassword,
    verifyFrogotPassword
}=require('../controller/userRegistrationController');


router.post("/register",registerUserData)
router.post("/loginAdmin",loginAdminData)
router.patch("/loginUser",loginUserData)
router.patch("/verify", verifyEmail);
router.post("/forgot", frogotPassword);
router.patch("/verifyForgot", verifyFrogotPassword);
// router.delete("/:id", deleteCustomerDetails);

module.exports = router;