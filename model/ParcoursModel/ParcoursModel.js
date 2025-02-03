const mongoose = require("mongoose");

const parcoursSchema = new mongoose.Schema(
  {
    code_parcours: String,
    nom_parcours: String,
    domaine: { type: mongoose.Schema.Types.ObjectId, ref: "DomaineClasse" },
    mention: { type: mongoose.Schema.Types.ObjectId, ref: "MentionClasse" },
    type_parcours: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TypeParcours",
    },
    modules: [{ type: mongoose.Schema.Types.ObjectId, ref: "ModuleParcours" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Parcours", parcoursSchema);
