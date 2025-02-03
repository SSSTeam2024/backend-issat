const shortCodeServices = require("../../services/ShortCodeServices/shortCodeServices");

// const addShortCode = async (req, res) => {
//   try {
//     const {
//         titre,
//         body,
//         langue,
//         intended_for

//     } = req.body;

//     const shortCode = await shortCodeServices.createShortCode({
//         titre,
//         body,
//         langue,
//         intended_for
//     });

//     res.json(shortCode);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Internal Server Error");
//   }
// };
const addShortCode = async (req, res) => {
  try {
    const shortCodeDataArray = req.body; // Expecting an array of objects

    if (!Array.isArray(shortCodeDataArray)) {
      return res.status(400).send("Request body must be an array of objects.");
    }

    const shortCodes = await shortCodeServices.createShortCode(shortCodeDataArray);

    res.json(shortCodes);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const getAllShortCodes = async (req, res) => {
  try {
    const shortCodes = await shortCodeServices.getShortCodes();
    res.json(shortCodes);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

module.exports = {
    addShortCode,
    getAllShortCodes,
};