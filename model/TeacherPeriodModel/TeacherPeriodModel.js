const mongoose = require("mongoose");

const teacherPeriodSchema = new mongoose.Schema({
  id_teacher: { type: mongoose.Schema.Types.ObjectId, ref: "Enseignant" },
  id_classe_period: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ClassEmploiPeriodique",
  },
  nbr_heure: String,
  semestre: String,
});

module.exports = mongoose.model("TeacherPeriod", teacherPeriodSchema);