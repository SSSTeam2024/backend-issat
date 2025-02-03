const templateBodyService = require("../../services/TemplateBodyServices/templateBodyServices");

const addTemplateBody = async (req, res) => {
  try {
    const {
        title,
        body,
        langue,
        intended_for,
        isArray,
        arraysNumber
    } = req.body;

    const templateBody = await templateBodyService.createTemplateBody({
        title,
        body,
        langue,
        intended_for,
        isArray,
        arraysNumber
    });

    res.json(templateBody);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const getAllTemplateBodys = async (req, res) => {
  try {
    const templateBodys = await templateBodyService.getTemplateBodys();
    res.json(templateBodys);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getAllTemplateBodyById = async (req, res) => {
  try {
    const templateBody = await templateBodyService.getTemplateBodyById(req.body._id);
    if (!templateBody) {
      return res.status(404).json({ message: 'templateBody not found' });
    }
    res.status(200).json(templateBody);
  } catch (error) {
    console.error("Error fetching templateBody by ID:", error);
    res.status(500).json({ message: error.message });
  }
};
const deleteTemplateBody = async (req, res) => {
  try {
    const deleteTemplateBody = await templateBodyService.deleteTemplateBody(req.params.id);
    if (!deleteTemplateBody) {
      return res.status(404).json({ message: 'template not found' });
    }
    res.status(200).json({ message: 'template deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
    addTemplateBody,
    getAllTemplateBodys,
    getAllTemplateBodyById,
    deleteTemplateBody
};