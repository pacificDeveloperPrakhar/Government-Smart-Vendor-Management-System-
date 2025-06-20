const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
  {
    location: {
      type: String,
      required: true,
    },
    type: {
      type: [String],
      enum: ['full time', 'freelance', 'intern', 'remote'],
      required: true,
    },
    expectedSalary: {
      type: Number, 
      required: false,
    },
    jobDescription: {
      type: String,
      required: true,
    },
    requirements: {
      type: [String],
      required: false,
    },
    profileId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "profiles", 
      required: true,
    },
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "companies", 
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    linkedin:{
      type:String
    },
    twitter:{
      type:String
    },
    instagram:{
      type:String
    },
    tooltips: {
      type: [String], 
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("JobPost", JobSchema);
