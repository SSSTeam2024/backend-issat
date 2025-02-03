const Template = require("../../model/TemplateModel/templateModel")

const createTemplate = async (templateBody) => {
  return await Template.create(templateBody);
};

const getTemplates = async () => {
  return await Template.find()
};

module.exports = {
    createTemplate,
    getTemplates,
};