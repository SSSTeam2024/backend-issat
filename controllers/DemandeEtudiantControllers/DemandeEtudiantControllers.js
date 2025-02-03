const demandeEtudiantService = require('../../services/DemandeEtudiantServices/DemandeEtudiantServices');

const createDemandeEtudiant = async (req, res) => {
  try {
    const DemandeEtudiant = await demandeEtudiantService.createDemandeEtudiant(req.body);
    res.status(201).json(DemandeEtudiant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllDemandeEtudiants = async (req, res) => {
  try {
    const DemandeEtudiants = await demandeEtudiantService.getAllDemandeEtudiants();
    res.status(200).json(DemandeEtudiants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getDemandeEtudiantById = async (req, res) => {
  try {
    const DemandeEtudiant = await demandeEtudiantService.getDemandeEtudiantById(req.params.id);
    if (!DemandeEtudiant) {
      return res.status(404).json({ message: 'DemandeEtudiant not found' });
    }
    res.status(200).json(DemandeEtudiant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateDemandeEtudiant = async (req, res) => {
  try {
    const updatedDemandeEtudiant = await demandeEtudiantService.updateDemandeEtudiant(req.body._id, req.body);
    if (!updatedDemandeEtudiant) {
      return res.status(404).json({ message: 'DemandeEtudiant not found' });
    }
    res.status(200).json(updatedDemandeEtudiant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteDemandeEtudiant = async (req, res) => {
  try {
    const deletedDemandeEtudiant = await demandeEtudiantService.deleteDemandeEtudiant(req.params._id);
    if (!deletedDemandeEtudiant) {
      return res.status(404).json({ message: 'DemandeEtudiant not found' });
    }
    res.status(200).json({ message: 'DemandeEtudiant deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createDemandeEtudiant,
  getAllDemandeEtudiants,
  getDemandeEtudiantById,
  updateDemandeEtudiant,
  deleteDemandeEtudiant
};