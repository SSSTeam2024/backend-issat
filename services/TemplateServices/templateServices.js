const templateDao = require("../../dao/TemplateDao/templateDao");
const variableGlobaleDao = require("../../dao/VariableGlobaleDao/variableGlobaleDao")
const templateBodyDao = require("../../dao/TemplateBodyDao/templateBodyDao");
const etudiantDao = require("../../dao/studentDao/studentDao");

const createTemplate = async (templateData) => {
    
      let templateBody = await templateBodyDao.getTemplateBodyById(templateData.id_template_body);
      let variableGlobale = await variableGlobaleDao.getVariableGlobaleById(templateData.id_variable_globale);
      let etudiant = await etudiantDao.getEtudiantById(templateData.id_student);
let data = await prepareBody(templateBody, variableGlobale, etudiant)
  return await templateDao.createTemplate(templateData);
};

async function prepareBody(templateBody, variableGlobale, etudiant) {
    let newBody = templateBody.body;
    if (quote !== null) {
      if (name === "Visitor") {
        if (body.includes("[name]")) {
          newBody = newBody.replace("[name]", quote.id_visitor.name);
        }
  
        if (body.includes("[customername]")) {
          newBody = newBody.replace("[customername]", quote.id_visitor.name);
        }
      } else if (name === "School") {
        if (body.includes("[name]")) {
          newBody = newBody.replace("[name]", quote.school_id.name);
        }
  
        if (body.includes("[customername]")) {
          newBody = newBody.replace("[customername]", quote.school_id.name);
        }
      } else {
        if (body.includes("[name]")) {
          newBody = newBody.replace("[name]", quote.company_id.name);
        }
  
        if (body.includes("[customername]")) {
          newBody = newBody.replace("[customername]", quote.company_id.name);
        }
      }
  
      if (body.includes("[drivername]")) {
        newBody = newBody.replace("[drivername]", quote.id_driver.firstname);
      }
      if (body.includes("[quote_num]")) {
        newBody = newBody.replace("[quote_num]", quote.quote_ref);
      }
  
      if (body.includes("[Driver's Name]")) {
        newBody = newBody.replace("[Driver's Name]", quote.id_driver.firstname);
      }
      if (body.includes("[Driver's Contact Number]")) {
        newBody = newBody.replace(
          "[Driver's Contact Number]",
          quote.id_driver.phonenumber
        );
      }
    }
  
    if (body.includes("[Website_phone]")) {
      newBody = newBody.replace("[Website_phone]", "+44 800 112 3770 ");
    }
  
    let recipient = newEmail;
    let emailBody = emailTemplatesStructure.emailTemplates.newEmail(newBody);
    let fullEmailObject = {
      to: recipient,
      subject: subject,
      body: emailBody,
    };
    return fullEmailObject;
  }

const getTemplates = async () => {
  const result = await templateDao.getTemplates();
  return result;
};

module.exports = {
    createTemplate,
    getTemplates,
};