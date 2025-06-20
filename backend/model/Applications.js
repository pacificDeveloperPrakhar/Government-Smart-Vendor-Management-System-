const mongoose = require("mongoose");

const ApplicationSchema = new mongoose.Schema({
    companyId: { type: mongoose.Schema.Types.ObjectId, required: true ,ref:"companies"},
    profileId: { type: mongoose.Schema.Types.ObjectId, required: true ,ref:"profiles"},
    jobId: { type: mongoose.Schema.Types.ObjectId, required: true ,ref:"jobs"},
    submitted_at: { type: Date, default: Date.now }, 
    experiences:{type:[{
        organization_name:String,
        experienceYear:Date
    }]},
    role: [{ type: String }],
    cover_letter: { type: String ,required:false},
    resume: { type: String },
}, {
    timestamps: true 
});

const Application = mongoose.model('Application', ApplicationSchema);

module.exports = Application;
