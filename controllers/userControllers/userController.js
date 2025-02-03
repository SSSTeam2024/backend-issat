const userService = require("../../services/userServices/userService");
const globalFunctions = require("../../utils/globalFunctions");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await userService.getUsers();
    res.json(users);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.createUser = async (req, res) => {
  try {
    const {
      personnelId,
      enseignantId,
      login,
      service,
      password,
      api_token,
      app_name,
      status,
      permissions,
    } = req.body;

    let user = await userService.createUser({
      personnelId,
      enseignantId,
      login,
      service,
      password,
      api_token,
      app_name,
      status,
      permissions,
    });
    res.json(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const {
      name,
      email,
      login,
      role,
      departement_id,
      password,
      api_token,
      photo,
      app_name,
      status,
    } = req.body;

    let user = await userService.updateUser(userId, {
      name,
      email,
      login,
      role,
      departement_id,
      password,
      api_token,
      photo,
      app_name,
      status,
    });
    res.json(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { login, password } = req.body;
    const user = await userService.loginUser(login, password);
    res.json({ message: "Login successful", user });
  } catch (error) {
    res.status(401).send(error.message);
  }
};
exports.getUserByToken = async (req, res) => {
  try {
    // const authHeader = req.headers['authorization'];
    // if (!authHeader) {
    //     return res.status(401).send('Authorization header missing');
    // }

    // const token = authHeader.split(' ')[1];
    const { token } = req.body;
    if (!token) {
      return res.status(401).send("Token missing");
    }

    //console.log(`Token from header: ${token}`);
    const user = await userService.getUserByToken(token);
    if (!user) {
      return res.status(404).send("User not found");
    }

    // console.log(`User: ${user}`);
    res.json(user);
  } catch (error) {
    console.error(`Get user by token error controller: ${error.message}`);
    res.status(500).send(error.message);
  }
};

exports.logoutUser = async (req, res) => {
  try {
    let id = req.params.id;

    await userService.logout(id);

    res.sendStatus(200);
  } catch (error) {
    res.status(401).send(error.message);
  }
};
exports.getUserById = async (req, res) => {
  const { id } = req.params;
  console.log("User ID received from controller:", id);

  try {
    const user = await userService.getUserById(id);
    if (!user) {
      console.log("User not found"); // Add this line for debugging

      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error("Error getting user with permissions:", err);
    res.status(500).json({ error: "Failed to get user with permissions" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const result = await userService.deleteUser(userId);
    if (result) {
      res.status(204).send();
    } else {
      res.status(404).send({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).send({ message: "Error deleting user", error });
  }
};

exports.verifyPassword = async (req, res) => {
  try {
    const { hashedPassword, plainPassword } = req.body;

    if (!hashedPassword || !plainPassword) {
      return res
        .status(400)
        .json({
          message: "Both hashedPassword and plainPassword are required.",
        });
    }

    const isMatch = await userService.verifyPassword(
      hashedPassword,
      plainPassword
    );

    res.json({ isMatch });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
