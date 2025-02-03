const VirtualServiceService = require('../../services/VirtualServiceServices/VirtualServiceServices');

const createVirtualService = async (req, res) => {
  try {
    const {
      title
    } = req.body;

    const VirtualService = await VirtualServiceService.createVirtualService({
      title
    });

    res.status(201).json(VirtualService);
  } catch (error) {
    console.error("Error creating VirtualService:", error);
    res.status(500).send({ message: error.message });
  }
};

const getAllVirtualServices = async (req, res) => {
  try {
    const VirtualServices = await VirtualServiceService.getAllVirtualServices();
    res.status(200).json(VirtualServices);
  } catch (error) {
    console.error("Error fetching all VirtualServices:", error);
    res.status(500).json({ message: error.message });
  }
};

const getVirtualServiceById = async (req, res) => {
  try {
    const VirtualService = await VirtualServiceService.getVirtualServiceById(req.body._id);
    if (!VirtualService) {
      return res.status(404).json({ message: 'VirtualService not found' });
    }
    res.status(200).json(VirtualService);
  } catch (error) {
    console.error("Error fetching VirtualService by ID:", error);
    res.status(500).json({ message: error.message });
  }
};

const updateVirtualService = async (req, res) => {
  try {
      const {
          _id,
          title
      } = req.body;

      const updatedVirtualService = await VirtualServiceService.updateVirtualService(_id, {
          title
      });

      if (!updatedVirtualService) {
          return res.status(404).json({ message: 'VirtualService not found' });
      }

      res.status(200).json(updatedVirtualService);
  } catch (error) {
      console.error("Error updating VirtualService:", error);
      res.status(500).json({ message: error.message });
  }
};

const deleteVirtualService = async (req, res) => {
  try {
    const deletedVirtualService = await VirtualServiceService.deleteVirtualService(req.body._id);
    if (!deletedVirtualService) {
      return res.status(404).json({ message: 'VirtualService not found' });
    }
    res.status(200).json({ message: 'VirtualService deleted successfully' });
  } catch (error) {
    console.error("Error deleting VirtualService:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createVirtualService,
  getAllVirtualServices,
  getVirtualServiceById,
  updateVirtualService,
  deleteVirtualService
};
