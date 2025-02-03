const sectionClasseService = require("../../services/SectionClasseServices/SectionClasseServices");

const addSectionClasse = async (req, res) => {
  try {
    const {
      name_section_ar,
      name_section_fr,
      abreviation,
      departements,
      mention_classe,
    } = req.body;

    const sectionClasse = await sectionClasseService.registerSectionClasse({
      name_section_ar,
      name_section_fr,
      abreviation,
      departements,
      mention_classe,
    });
    res.json(sectionClasse);
  } catch (error) {
    console.error(error);
  }
};

const updateSectionClasseById = async (req, res) => {
  try {
    const sectionClasseId = req.params.id;
    const {
      name_section_ar,
      name_section_fr,
      abreviation,
      departements,
      mention_classe,
    } = req.body;

    const updatedSectionClasse =
      await sectionClasseService.updateSetionClasseDao(sectionClasseId, {
        name_section_ar,
        name_section_fr,
        abreviation,
        departements,
        mention_classe,
      });

    if (!updatedSectionClasse) {
      return res.status(404).send("Section Classe not found!");
    }
    res.json(updatedSectionClasse);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getSectionClasseById = async (req, res) => {
  try {
    const sectionClasseId = req.params.id;

    const getSectionClasse = await sectionClasseService.getSectionClasseDaoById(
      sectionClasseId
    );

    if (!getSectionClasse) {
      return res.status(404).send("Section Classe not found");
    }
    res.json(getSectionClasse);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};
const getAllSectionClasse = async (req, res) => {
  try {
    const sectionsClasse = await sectionClasseService.getSectionsClasseDao();
    res.json(sectionsClasse);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const deleteSectionClasseById = async (req, res) => {
  try {
    const sectionId = req.params.id;
    console.log(`Received request to delete section with ID: ${sectionId}`);

    const deletedSection = await sectionClasseService.deleteSectionClassetDao(
      sectionId
    );

    if (!deletedSection) {
      return res.status(404).send("Section not found");
    }

    res
      .status(200)
      .json({ message: "Section deleted successfully", data: deletedSection });
  } catch (error) {
    console.error("Error in deleteSectionById controller:", error);
    res.status(500).send(error.message);
  }
};

module.exports = {
  deleteSectionClasseById,
  getAllSectionClasse,
  getSectionClasseById,
  updateSectionClasseById,
  addSectionClasse,
};
