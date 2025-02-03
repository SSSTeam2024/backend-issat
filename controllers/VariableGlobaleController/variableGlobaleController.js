const variableGlobaleServices = require("../../services/VariableGlobaleServices/variableGlobaleService");
const globalFunctions = require("../../utils/globalFunctions");

const addVariableGlobale = async (req, res) => {
  try {
    const {
        directeur_ar,
  directeur_fr,
  secretaire_ar,
  secretaire_fr,
  signature_directeur_base64,
  signature_directeur_extension,
  signature_secretaire_base64,
  signature_secretaire_extension,
  etablissement_ar,
  etablissement_fr,
  logo_etablissement_base64,
  logo_etablissement_extension,
  logo_universite_base64,
  logo_universite_extension,
  logo_republique_base64,
  logo_republique_extension,
  universite_ar,
  universite_fr,
  address_ar,
  gouvernorat_ar,
  gouvernorat_fr,
  code_postal,
  address_fr,
  phone,
  fax,
  website
    } = req.body;

    const signatureDirecteurFilesPath = "files/variableGlobaleFiles/signatureDirecteurFiles/";
    const signatureSecretaireFilesPath = "files/variableGlobaleFiles/signatureSecretaireFiles/";
    const logoEtablissementFilesPath = "files/variableGlobaleFiles/logoEtablissementFiles/";
    const logoUniversiteFilesPath = "files/variableGlobaleFiles/logoUniversiteFiles/";
    const logoRepubliqueFilesPath = "files/variableGlobaleFiles/logoRepubliqueFiles/";

    let signature_directeur = globalFunctions.generateUniqueFilename(
        signature_directeur_extension,
        "signatureDirecteur"
      );
      let signature_secretaire = globalFunctions.generateUniqueFilename(signature_secretaire_extension, "signatureSecretaire");
      let logo_etablissement = globalFunctions.generateUniqueFilename(
        logo_etablissement_extension,
        "logoEtablissement"
      );
      let logo_universite = globalFunctions.generateUniqueFilename(
        logo_universite_extension,
        "logoUniversite"
      );
      let logo_republique = globalFunctions.generateUniqueFilename(
        logo_republique_extension,
        "logoRepublique"
      );

      let documents = [
        {
          base64String: signature_directeur_base64,
          extension: signature_directeur_extension,
          name: signature_directeur,
          path: signatureDirecteurFilesPath,
        },
        {
          base64String: signature_secretaire_base64,
          extension: signature_secretaire_extension,
          name: signature_secretaire,
          path: signatureSecretaireFilesPath,
        },
        {
          base64String: logo_etablissement_base64,
          extension: logo_etablissement_extension,
          name: logo_etablissement,
          path: logoEtablissementFilesPath,
        },
        {
          base64String: logo_universite_base64,
          extension: logo_universite_extension,
          name: logo_universite,
          path: logoUniversiteFilesPath,
        },
        {
          base64String: logo_republique_base64,
          extension: logo_republique_extension,
          name: logo_republique,
          path: logoRepubliqueFilesPath,
        },
      ];

    const variableGlobale = await variableGlobaleServices.createVariableGlobale({
        directeur_ar,
        directeur_fr,
        secretaire_ar,
        secretaire_fr,
        signature_directeur,
        signature_secretaire,
        etablissement_ar,
        etablissement_fr,
        logo_etablissement,
        logo_universite,
        logo_republique,
        universite_ar,
        universite_fr,
        address_ar,
        address_fr,
        gouvernorat_ar,
        gouvernorat_fr,
        code_postal,
        phone,
        fax,
        website
    }, documents);

    res.json(variableGlobale);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const getAllVariableGlobales = async (req, res) => {
  try {
    const variableGlobales = await variableGlobaleServices.getVariableGlobales();
    res.json(variableGlobales);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

module.exports = {
    addVariableGlobale,
    getAllVariableGlobales,
};