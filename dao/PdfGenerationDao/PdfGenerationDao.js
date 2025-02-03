const puppeteer = require('puppeteer');
const DemandeEtudiant = require('../../model/DemandeEtudiantModel/DemandeEtudiantModel');

// Function to create a new demand and generate its PDF
const createDemandeEtudiant = async (demandeEtudiantData) => {
  const demandeEtudiant = new DemandeEtudiant(demandeEtudiantData);
  await demandeEtudiant.save();
  await generatePDF(demandeEtudiant); // Call to generate PDF
  return demandeEtudiant;
};

// Function to generate the PDF
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
    path: `./pdfs/demande_${demandeEtudiant._id}.pdf`,
    format: 'A4',
  });

  await browser.close();
};

// Export the necessary functions
module.exports = {
  createDemandeEtudiant,
};