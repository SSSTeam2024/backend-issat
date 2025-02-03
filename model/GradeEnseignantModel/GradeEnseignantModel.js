const mongoose = require("mongoose");

const gradeEnseignantSchema = new mongoose.Schema(
  {
    //value_grade_enseignant: { type: String, unique: true },
    grade_ar: String,
    grade_fr: String,
    charge_horaire: {
      annualMinHE: String,
      annualMaxHE: String,

      s1MinHE: String,
      s1MaxHE: String,

      s2MinHE: String,
      s2MaxHE: String,

      annualMinHS: String,
      annualMaxHS: String,

      s1MinHS: String,
      s1MaxHS: String,

      s2MinHS: String,
      s2MaxHS: String,

      annualMinHX: String,
      annualMaxHX: String,

      s1MinHX: String,
      s1MaxHX: String,

      s2MinHX: String,
      s2MaxHX: String,

      totalAnnualMin: String,
      totalAnnualMax: String,

      totalS1Min: String,
      totalS1Max: String,

      totalS2Min: String,
      totalS2Max: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("GradeEnseignant", gradeEnseignantSchema);