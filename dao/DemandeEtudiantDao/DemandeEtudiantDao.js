const DemandeEtudiant = require('../../model/DemandeEtudiantModel/DemandeEtudiantModel');
const puppeteer = require('puppeteer');

// const createDemandeEtudiant = async (DemandeEtudiantData) => {
//   const demandeEtudiant = new DemandeEtudiant(DemandeEtudiantData);
//   return demandeEtudiant.save();
// };

const createDemandeEtudiant = async (demandeEtudiantData) => {
  const demandeEtudiant = new DemandeEtudiant(demandeEtudiantData);
  await demandeEtudiant.save();
  await generatePDF(demandeEtudiant); // Call to generate PDF
  return demandeEtudiant;
};
const generatePDF = async (demandeEtudiant) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Generate HTML content for the PDF
  const htmlContent = `
    <h1>Demande Etudiant</h1>
    <p>Titre: ${demandeEtudiant.title}</p>
    <p>Description: ${demandeEtudiant.description}</p>
    <p>Langue: ${demandeEtudiant.langue}</p>
    <p>Nombre de copies: ${demandeEtudiant.nombre_copie}</p>
    <p>Status: ${demandeEtudiant.status}</p>
    <p>Student ID: ${demandeEtudiant.studentId}</p>
  `;

  await page.setContent(htmlContent);
  await page.pdf({
    path: `files/pdfDemandeEtudiant/pdfs/demande_${demandeEtudiant._id}.pdf`,
    format: 'A4',
  });

  await browser.close();
};
const getAllDemandeEtudiants = async () => {
  return DemandeEtudiant.find().populate({
    path: "studentId",
    populate: [{
      path: "groupe_classe",
      populate: {
        path: "departement",
      },
    },
    {
      path: "etat_compte",
    },
    {
      path: "type_inscription",
    }
  ],
  }).populate("piece_demande")
};

const getDemandeEtudiantById = async (id) => {
  return DemandeEtudiant.findById(id).populate('studentId');
};

const updateDemandeEtudiant = async (id, updateData) => {
  updateData.updatedAt = Date.now(); // Ensure updatedAt is updated

  return DemandeEtudiant.findByIdAndUpdate(id, updateData, { new: true, runValidators: true })
    .populate('studentId')
    .exec();
};

const deleteDemandeEtudiant = async (id) => {
  return DemandeEtudiant.findByIdAndDelete(id).populate('studentId');
};

module.exports = {
  createDemandeEtudiant,
  getAllDemandeEtudiants,
  getDemandeEtudiantById,
  updateDemandeEtudiant,
  deleteDemandeEtudiant
};