const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    companyName: { type: String, required: true, unique: true },
    cin: { type: String, required: true, unique: true },
    panGst: { type: String, required: true, unique: true },
    contactPerson: { type: mongoose.Schema.Types.ObjectId, required: true ,ref:"profiles"},
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    website: { type: String },
    companyLogo:{type:String},
    companyImages:{type:[String]},
    documents:{type:[String]},
    isVerified: { type: Boolean, default: false },
    verificationRemarks: { type: String },
    verifiedAt: { type: Date },
    verification_details: {
          isVerified: {
            type: Boolean,
            default: false,
            required: [true, 'profile document is missing the isVerified flag'], // Custom error message if not provided
          },
          verification_factor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "VerificationFactor",
            default: null, 
          },
        },
    verifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: "profiles" },
    socialMedia: {
      twitterUrl: { type: String },
      facebookUrl: { type: String },
      instagramUrl: { type: String },
      githubUrl: { type: String },
      linkedinUrl: { type: String }
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Company", companySchema);
