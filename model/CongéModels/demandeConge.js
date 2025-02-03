const mongoose = require('mongoose');

const DemandeCongeSchema = new mongoose.Schema({
    personnelId: { type: mongoose.Schema.Types.ObjectId, ref: 'Personnel', required: true },
    leaveType: { type: mongoose.Schema.Types.ObjectId, ref: 'LeaveType', required: true },
    subcategory: {
      _id: String,
      name_fr: String,
      name_ar: String,
      maxDays: Number,
      sexe: { type: String, enum: ['Homme', 'Femme', 'Both'], default: 'Both' },
      Accumulable: { type: Boolean, default: false },
    }, 
    remainingDays: { type: Number, required: false },
    requestedDays : { type: Number, required: false },
    startDay : {type: Date, required: true},
    endDay : {type: Date, required: true},
    status:  {type: String, required: true},
    dateInterruption:{type:Date, required:false, default: Date.now},
    fileInterruption:{type:String, required:false},
    file:String,
    daysUsed: { type: Number, default: 0, required: false }, 
    year: { type: Number, required: true }, 
    lastUpdated: { type: Date, default: Date.now },
    adresse_conge: { type: String, required: true},
    nature_fichier:{type: String, required: false},
    fileReponse:{type: String, required: false},
    reponse:{type: String, required:false, default: ""},
    dateReponse:{type: Date, required: false, default: Date.now}
});




module.exports = mongoose.model('DemandeConge', DemandeCongeSchema);