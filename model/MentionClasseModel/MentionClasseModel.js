const mongoose = require("mongoose");

const MentionClasseSchema = new mongoose.Schema(
  {
    name_mention_ar: String,
    name_mention_fr: String,
    abreviation: String,
    domaine: { type: mongoose.Schema.Types.ObjectId, ref: "DomaineClasse" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("MentionClasse", MentionClasseSchema);
