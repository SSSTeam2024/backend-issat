const etudiantDao = require("../../dao/studentDao/studentDao");
const fs = require("fs");
const path = require("path");
const globalFunctions = require("../../utils/globalFunctions");
const emailService = require("../EmailServices/emailService");
const emailStructure = require("../../utils/emailInscription");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerEtudiant = async (userData, documents) => {
  try {
    const saveResult = await saveDocumentToServer(documents);
    if (saveResult) {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const newEtudiant = await etudiantDao.createEudiant({
        ...userData,
        password: hashedPassword,
      });

      const email = prepareEmailInscription(
        userData.email,
        userData.prenom_fr,
        userData.nom_fr,
        userData.code_acces,
        userData.num_CIN,
        newEtudiant.createdAt
      );
      await emailService.sendEmail(email);
      return newEtudiant;
    } else {
      throw new Error("Failed to save documents.");
    }
  } catch (error) {
    console.error("Error registering etudiant:", error);
    throw error;
  }
};

async function saveDocumentToServer(documents) {
  let counter = 0;
  for (const file of documents) {
    await saveFile(file.base64String, file.name, file.path);
    counter++;
  }
  if (counter == documents.length) return true;
}

async function saveFile(base64String, fileName, file_path) {
  const binaryData = Buffer.from(base64String, "base64");
  const filePath = file_path + fileName;
  await globalFunctions.ensureDirectoryExistence(file_path);
  fs.writeFile(filePath, binaryData, "binary", (err) => {
    if (err) {
      console.error("Error saving the file:", err);
    } else {
      console.log("File saved successfully!");
    }
  });
}

function prepareEmailInscription(email, prenom, nom, code, cin, date) {
  let recipient = email;
  let pwd = String(cin).split("").reverse().join("");
  console.log("date", date);
  let formattedDate = new Date(date)
    .toLocaleString("en-US", {
      month: "long",
      year: "numeric",
    })
    .toUpperCase();

  let emailBody = emailStructure.emailTemplates.email_inscription(
    prenom,
    nom,
    code,
    pwd,
    cin,
    formattedDate
  );
  let emailSubject = "Confirmation d'inscription et code d'accès";
  let fullEmailObject = {
    to: recipient,
    subject: emailSubject,
    body: emailBody,
  };
  return fullEmailObject;
}

const getEtudiants = async () => {
  const result = await etudiantDao.getEtudiants();
  return result;
};
const getEtudiantById = async (id) => {
  return etudiantDao.getEtudiantById(id);
};

const deleteEtudiant = async (id) => {
  return await etudiantDao.deleteEtudiant(id);
};

const updateEtudiant = async (id, updateData) => {
  return await etudiantDao.updateEtudiant(id, updateData);
};

const getTypeInscriptionByIdStudent = async (studentId) => {
  try {
    const typeInscription = await etudiantDao.getTypeInscriptionByIdStudent(
      studentId
    );
    return typeInscription;
  } catch (error) {
    console.error(
      "Error in service while fetching TypeInscription by Student ID:",
      error
    );
    throw error;
  }
};

const updateGroupeClasse = async (studentIds, groupeClasseId) => {
  const result = await etudiantDao.updateGroupeClasse(
    studentIds,
    groupeClasseId
  );
  return result;
};

const getEtudiantsByIdClasse = async (classeId) => {
  return etudiantDao.getEtudiantsByIdClasse(classeId);
};

const getEtudiantByCin = async (cin_etudiant) => {
  return etudiantDao.getEtudiantByCIN(cin_etudiant);
};

const getEtudiatByCinAndCode = async (cin_etudiant, codesecret) => {
  return etudiantDao.getEtudiantByCinAndCode(cin_etudiant, codesecret);
};

const login = async (cin, password) => {
  const etudiant = await etudiantDao.getEtudiantByCIN(cin);

  if (!etudiant) {
    throw new Error("Etudiant not found");
  }

  if (await bcrypt.compare(password, etudiant.password)) {
    const accessToken = jwt.sign({ login: etudiant.num_CIN }, "yourSecretKey");

    await etudiantDao.updateJwtToken(etudiant._id, String(accessToken));

    let updatedEtudiant = await etudiantDao.getEtudiantById(etudiant._id);

    return updatedEtudiant;
  } else {
    throw new Error("Incorrect password");
  }
};

const getEtudiantByToken = async (token) => {
  return await etudiantDao.findEtudiantByToken(token);
};

module.exports = {
  getEtudiants,
  getEtudiantById,
  registerEtudiant,
  deleteEtudiant,
  updateEtudiant,
  getTypeInscriptionByIdStudent,
  updateGroupeClasse,
  getEtudiantsByIdClasse,
  getEtudiantByCin,
  getEtudiatByCinAndCode,
  login,
  getEtudiantByToken,
};
