
const disponibiliteSalleModel = require("../../model/SalleDisponibilite/SalleDisponibilite")

const createDisponibiliteSalle = async (data) => {
 return await disponibiliteSalleModel.create(data);
};

const getAllDisponibiliteSalles = async () => {
  return await disponibiliteSalleModel.find().populate('roomId');
};

const updateDisponibiliteSalle = async (id, availabilityIndex, occupationType) => {
  console.log(id),
  console.log(availabilityIndex);
  return await disponibiliteSalleModel.findByIdAndUpdate(id,  { $set: { isAvailable: availabilityIndex, occupationType: occupationType } }, { new: true });
};

const deleteDisponibility = async (salleId) => {
  const deletedDisponibility = await disponibiliteSalleModel.deleteMany({roomId: salleId});
 
  return deletedDisponibility;
};

const getDisponibiliteSalleByTimeInterval = async (data) => {
  const query = {
    timeSlot: data.timeSlot1 + '-' + data.timeSlot2,
    dayOfWeek: data.jour,
    isAvailable: data.availability
  };

  // Execute the query
  const disponibilites = await disponibiliteSalleModel.find(query)
    .populate("roomId");
  return disponibilites;
};

const getFullyOrPartialAvailableRoomsByTimeInterval = async (data) => {
  const query = {
    timeSlot: data.timeSlot1 + '-' + data.timeSlot2,
    dayOfWeek: data.jour,
    occupationType: {
      $in: [
        "1/15",
        "",
        null
      ],
    },
  };

  // Execute the query
  const disponibilites = await disponibiliteSalleModel.find(query)
    .populate("roomId");
  return disponibilites;
};


module.exports = {
    createDisponibiliteSalle,
    deleteDisponibility,
    getDisponibiliteSalleByTimeInterval,
    getFullyOrPartialAvailableRoomsByTimeInterval,
    getAllDisponibiliteSalles,
    updateDisponibiliteSalle
};