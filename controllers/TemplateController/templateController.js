const templateService = require("../../services/TemplateServices/templateServices");

const addTemplate = async (req, res) => {
  try {
    const { id_variable_globale, id_template_body, id_student, langue } =
      req.body;

    const template = await templateService.createTemplate({
      id_variable_globale,
      id_template_body,
      id_student,
      langue,
    });

    res.json(template);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const getAllTemplates = async (req, res) => {
  try {
    const templates = await templateService.getTemplates();
    res.json(templates);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

module.exports = {
  addTemplate,
  getAllTemplates,
};
