const express = require("express");
const router = express.Router();
const userController = require("../../controllers/userControllers/userController");

router.get("/get-all-users", userController.getAllUsers);
router.post("/create-user", userController.createUser);
router.post("/login-user", userController.loginUser);
router.post("/logout-user/:id", userController.logoutUser);
router.put("/update-user/:id", userController.updateUser);
router.post("/get-user-by-token", userController.getUserByToken);
router.get("/get-user-by-id/:id", userController.getUserById);
router.delete("/delete-user/:id", userController.deleteUser);
router.post("/verify-password", userController.verifyPassword);

module.exports = router;
