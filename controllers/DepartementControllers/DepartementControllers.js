const departementService = require("../../services/DepartementServices/DepartementServices");
const globalFunctions = require("../../utils/globalFunctions");

const addDepartement = async (req, res) => {
  try {
    const {
      name_fr,
      name_ar,
      description,
      volume_horaire,
      nom_chef_dep,
      SignatureFileBase64String,
      SignatureFileExtension,
      sections
    } = req.body;

    const signaturePath = "files/departementFiles/";

    let signature = globalFunctions.generateUniqueFilename(
      SignatureFileExtension,
      "signature"
    );
    let documents = [
      {
        base64String: SignatureFileBase64String,
        extension: SignatureFileExtension,
        name: signature,
        path: signaturePath,
      },
    ];
    const departement = await departementService.registerDepartement(
      {
        name_fr,
        name_ar,
        description,
        volume_horaire,
        nom_chef_dep,
        signature,
        sections
      },
      documents
    );
    res.json(departement);
  } catch (error) {
    console.error(error);
  }
};

const updateDepartementById = async (req, res) => {
  try {
    const departementId = req.params.id;
    const { name_fr,
      name_ar,
      description,
      volume_horaire,
      nom_chef_dep,
      SignatureFileBase64String,
      sections,
      SignatureFileExtension } = req.body;
      
      const signaturePath = "files/departementFiles/";
      let signature = globalFunctions.generateUniqueFilename(
        SignatureFileExtension,
        "UpdatedSignature"
      );
      let documents = [
        {
          base64String: SignatureFileBase64String,
          extension: SignatureFileExtension,
          name: signature,
          path: signaturePath,
        },
      ];

    const updatedDepartment = await departementService.updateDepartementDao(
      departementId,
      {
        name_fr,
        name_ar,
        description,
        volume_horaire,
        nom_chef_dep,
        signature,
        sections
      },documents
    );

    if (!updatedDepartment) {
      return res.status(404).send("Departement not found!");
    }
    res.json(updatedDepartment);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getDepartmentById = async (req, res) => {
  try {
    const departmentId = req.params.id;

    const getDepartement = await departementService.getDepartementDaoById(
      departmentId
    );

    if (!getDepartement) {
      return res.status(404).send("Departement not found");
    }
    res.json(getDepartement);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};
const getAllDeaprtements = async (req, res) => {
  try {
    const departements = await departementService.getDepartementstDao();
    res.json(departements);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const deleteDepartementById = async (req, res) => {
  try {
    const departmentId = req.params.id;
    console.log(`Received request to delete department with ID: ${departmentId}`);

    const deletedDepartement = await departementService.deleteDepartementDao(
      departmentId
    );

    if (!deletedDepartement) {
      return res.status(404).send("Departement not found");
    }
    res.status(200).json({ message: "Department deleted successfully", data: deletedDepartement });
  } catch (error) {
    console.error("Error in deleteDepartementById controller:", error);
    res.status(500).send(error.message);
  }
};
//

module.exports = {
  deleteDepartementById,
  getAllDeaprtements,
  getDepartmentById,
  updateDepartementById,
  addDepartement,
};