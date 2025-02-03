const TemplateBody = require("../../model/TemplateBodyModel/templateBodyModel")

const createTemplateBody = async (templateBody) => {
  return await TemplateBody.create(templateBody);
};

const getTemplateBodys = async () => {
  return await TemplateBody.find()
};

const getTemplateBodyById = async (id) => {
  return await TemplateBody.findById(id);
};
const deleteTemplateBody = async (id) => {
  return await TemplateBody.findByIdAndDelete(id)
};

module.exports = {
    createTemplateBody,
    getTemplateBodys,
    getTemplateBodyById,
    deleteTemplateBody
};