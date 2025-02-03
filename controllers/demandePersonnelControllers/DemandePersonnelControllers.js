const demandePersonnelService = require('../../services/demandePersonnelServices/demandePersonnelServices');

const createDemandePersonnel = async (req, res) => {
  try {
    const DemandePersonnel = await demandePersonnelService.createDemandePersonnel(req.body);
    res.status(201).json(DemandePersonnel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllDemandePersonnels = async (req, res) => {
  try {
    const DemandePersonnels = await demandePersonnelService.getAllDemandePersonnels();
    res.status(200).json(DemandePersonnels);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getDemandePersonnelById = async (req, res) => {
  try {
    const DemandePersonnel = await demandePersonnelService.getDemandePersonnelById(req.params.id);
    if (!DemandePersonnel) {
      return res.status(404).json({ message: 'DemandePersonnel not found' });
    }
    res.status(200).json(DemandePersonnel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateDemandePersonnel = async (req, res) => {
  try {
    const updatedDemandePersonnel = await demandePersonnelService.updateDemandePersonnel(req.params.id, req.body);
    if (!updatedDemandePersonnel) {
      return res.status(404).json({ message: 'DemandePersonnel not found' });
    }
    res.status(200).json(updatedDemandePersonnel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteDemandePersonnel = async (req, res) => {
  try {
    const deletedDemandePersonnel = await demandePersonnelService.deleteDemandePersonnel(req.params.id);
    if (!deletedDemandePersonnel) {
      return res.status(404).json({ message: 'DemandePersonnel not found' });
    }
    res.status(200).json({ message: 'DemandePersonnel deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createDemandePersonnel,
  getAllDemandePersonnels,
  getDemandePersonnelById,
  updateDemandePersonnel,
  deleteDemandePersonnel
};