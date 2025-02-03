const servicePersonnelService = require("../../services/ServicePersonnelServices/ServicePersonnelServices");

const addServicePersonnel = async (req, res) => {
  try {
    const { value, service_fr, service_ar } = req.body;

    const servicePersonnel =
      await servicePersonnelService.registerServicePersonnel({
        value,
        service_fr,
        service_ar,
      });
    res.json(servicePersonnel);
  } catch (error) {
    console.error(error);
    if (error.code === 11000) {
      res.status(400).send("Value must be unique.");
    } else {
      res.status(500).send(error.message);
    }
  }
};

const updateServicePersonnelById = async (req, res) => {
  try {
    const servicePersonnelId = req.params.id;
    const { value, service_fr, service_ar } = req.body;

    const updatedServicePersonnel =
      await servicePersonnelService.updateServicePersonnelDao(servicePersonnelId, {
        value,
        service_fr, service_ar
      });

    if (!updatedServicePersonnel) {
      return res.status(404).send("Service Personnel not found!");
    }
    res.json(updatedServicePersonnel);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getServicePersonnelById = async (req, res) => {
  try {
    const servicePersonnelId = req.params.id;

    const getEtatPersonnel = await servicePersonnelService.getServicePersonnelDaoById(
        servicePersonnelId
    );

    if (!getEtatPersonnel) {
      return res.status(404).send("Service Personnel not found");
    }
    res.json(getEtatPersonnel);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getAllServicePersonnel = async (req, res) => {
  try {
    const servicePersonnels = await servicePersonnelService.getServicesPersonnelDao();
    res.json(servicePersonnels);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const deleteServicePersonnelById = async (req, res) => {
  try {
    const servicePersonnelId = req.params.id;

    const deletedServicePersonnel =
      await servicePersonnelService.deleteServicePersonnelDao(servicePersonnelId);

    if (!deletedServicePersonnel) {
      return res.status(404).send("Service Personnel not found");
    }
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};
//

module.exports = {
    deleteServicePersonnelById,
    getAllServicePersonnel,
    getServicePersonnelById,
    updateServicePersonnelById,
    addServicePersonnel,
};