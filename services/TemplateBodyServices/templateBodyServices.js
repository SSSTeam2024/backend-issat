const templateBodyDao = require("../../dao/TemplateBodyDao/templateBodyDao");

const createTemplateBody = async (templateBodyData) => {
  return await templateBodyDao.createTemplateBody(templateBodyData);
};

const getTemplateBodys = async () => {
  const result = await templateBodyDao.getTemplateBodys();
  return result;
};
const getTemplateBodyById= async (id) => {
  try {
    return await templateBodyDao.getTemplateBodyById(id);
  } catch (error) {
    console.error("Error fetching template body by ID:", error);
    throw error;
  }
};

const deleteTemplateBody = async (id) => {
  const result = await templateBodyDao.deleteTemplateBody(id);
  return result;
};
module.exports = {
    createTemplateBody,
    getTemplateBodys,
    getTemplateBodyById,
    deleteTemplateBody
};