const disponibilitSalleDao = require("../../dao/SalleDisponibiliteDao/SalleDisponibiliteDao");

const createSalleDisponibilite = async (salleId) => {
  try {
    let result = await remplirDisponibiliteJoursSemaine(salleId);
    return result;
  } catch (error) {
    console.error("Error in salle disponibilite service:", error);
    throw error;
  }
};

const remplirDisponibiliteJoursSemaine = async (salleId) => {
  const timeSlots = [
    "08:00-08:30",
    "08:30-09:00",
    "09:00-09:30",
    "09:30-10:00",
    "10:00-10:30",
    "10:30-11:00",
    "11:00-11:30",
    "11:30-12:00",
    "12:00-12:30",
    "12:30-13:00",
    "13:00-13:30",
    "13:30-14:00",
    "14:00-14:30",
    "14:30-15:00",
    "15:00-15:30",
    "15:30-16:00",
    "16:00-16:30",
    "16:30-17:00",
    "17:00-17:30",
    "17:30-18:00",
    "18:00-18:30",
    "18:30-19:00",
  ];

  const daysOfWeek = [
    "0", // Monday
    "1", // Tuesday
    "2", // Wednesday
    "3", // Thursday
    "4", // Friday
    "5", // Saturday
  ];

  let dayCounter = 0;
  let creationCounter = 0;
  for (let dayOfWeek of daysOfWeek) {
    dayCounter++;
    for (let timeSlot of timeSlots) {
      let disponibilite = {
        roomId: salleId,
        dayOfWeek: dayOfWeek,
        timeSlot: timeSlot,
        isAvailable: "0",
      };

      await disponibilitSalleDao.createDisponibiliteSalle(disponibilite);
      creationCounter++;
    }
  }

  if (dayCounter === daysOfWeek) {
    return true;
  }
};

const updateDisponibiliteSalle = async (
  idSalle,
  heure_debut,
  heure_fin,
  j,
  availabilityStatus,
  occupationType,
) => {
  
  let jour = "";

  switch (j) {
    case "Lundi":
      jour = "0";
      break;
    case "Mardi":
      jour = "1";
      break;
    case "Mercredi":
      jour = "2";
      break;
    case "Jeudi":
      jour = "3";
      break;
    case "Vendredi":
      jour = "4";
      break;
    case "Samedi":
      jour = "5";
      break;
    default:
      break;
  }

  // If we want to update to "available": search for occupied
  // If we want to update to "occupied": search for available
  let searchedAvailability = '0';
  if(availabilityStatus === '0'){ //  we want to update to "available"
    searchedAvailability = '1'; // search for occupied
  } // if not search for available
  
  let allAvailableRooms = await getDisponibiliteSallesByTimeInterval({
    heure_debut,
    heure_fin,
    jour,
    searchedAvailability
  });
  let conserenedRoomAvailabilities = allAvailableRooms.filter(availability => availability.roomId._id.toString() === idSalle);

  
  let availabilityCounter = 0;
  for(let consernedAvailability of conserenedRoomAvailabilities){
    availabilityCounter += 1;
    await disponibilitSalleDao.updateDisponibiliteSalle(consernedAvailability._id, availabilityStatus, occupationType)
  }

  if(availabilityCounter === conserenedRoomAvailabilities.length){
    return true;
  }
};

const getDisponibiliteSallesByTimeInterval = async (data) => {
  let times = getHalfHourIntervals(data.heure_debut, data.heure_fin);
  times.push(data.heure_fin);
  let finalDisponibilities = [];
  for (let i = 0; i < times.length - 1; i++) {
    
    let disponibilte_data = {
      timeSlot1: times[i],
      timeSlot2: times[i + 1],
      jour: data.jour,
      availability: data.searchedAvailability
    };
    let disponibilites =
      await disponibilitSalleDao.getDisponibiliteSalleByTimeInterval(
        disponibilte_data
      );
    for (let d of disponibilites) {
      finalDisponibilities.push(d);
    }
  }

  return finalDisponibilities;
};

const getFullyOrPartialAvailableRoomsByTimeInterval = async (data) => {
  let times = getHalfHourIntervals(data.heure_debut, data.heure_fin);
  times.push(data.heure_fin);
  let finalDisponibilities = [];
  for (let i = 0; i < times.length - 1; i++) {
    
    let disponibilte_data = {
      timeSlot1: times[i],
      timeSlot2: times[i + 1],
      jour: data.jour,
    };
    let disponibilites =
      await disponibilitSalleDao.getFullyOrPartialAvailableRoomsByTimeInterval(
        disponibilte_data
      );
    for (let d of disponibilites) {
      finalDisponibilities.push(d);
    }
  }

  return finalDisponibilities;
};

const getAllDisponibiliteSalles = async () => {
  const result = await disponibilitSalleDao.getAllDisponibiliteSalles();
  return result;
};

function getHalfHourIntervals(startTime, endTime) {
  const times = [];
  let current = new Date(`1970-01-01T${startTime}:00Z`);
  const end = new Date(`1970-01-01T${endTime}:00Z`);

  while (current < end) {
    const hours = String(current.getUTCHours()).padStart(2, "0");
    const minutes = String(current.getUTCMinutes()).padStart(2, "0");
    times.push(`${hours}:${minutes}`);
    current.setUTCMinutes(current.getUTCMinutes() + 30);
  }

  return times;
}

const deleteDisponibilityBySalleId = async (salleId) => {
  return await disponibilitSalleDao.deleteDisponibility(salleId);
};

module.exports = {
  createSalleDisponibilite,
  deleteDisponibilityBySalleId,
  getDisponibiliteSallesByTimeInterval,
  getFullyOrPartialAvailableRoomsByTimeInterval,
  getAllDisponibiliteSalles,
  updateDisponibiliteSalle,
};