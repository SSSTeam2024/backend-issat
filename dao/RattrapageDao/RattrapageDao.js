const RattrapageModel = require("../../model/RattrapageModel/RattrapageModel");

const createRattrapage = async (data) => {
  try {
    return await RattrapageModel.create(data);
  } catch (error) {
    console.error("Error creating catch-up session:", error);
    throw error;
  }
};

const getRattrapages = async () => {
  const result = await RattrapageModel.find()
    .populate("salle")
    .populate("classe")
    .populate("enseignant")
    .populate("matiere");
  return result;
};

const updateEtatAndStatusRattrapage = async (rattrapageId, etat, status) => {
  try {
    const updatedRattrapage = await RattrapageModel.findByIdAndUpdate(
      rattrapageId,
      { etat, status },
      { new: true }
    );
    if (!updatedRattrapage) {
      throw new Error(`Rattrapage with ID ${rattrapageId} not found.`);
    }
    return updatedRattrapage;
  } catch (error) {
    throw new Error(`Failed to update Rattrapage: ${error.message}`);
  }
};

// const updateTypeSeance = async (id, updateData) => {
//   return await TypeSeanceModel.findByIdAndUpdate(id, updateData, { new: true });
// };

// const deleteTypeSeance = async (id) => {
//   return await TypeSeanceModel.findByIdAndDelete(id);
// };

module.exports = {
  createRattrapage,
  getRattrapages,
  updateEtatAndStatusRattrapage,
};