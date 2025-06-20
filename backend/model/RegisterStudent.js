const mongoose = require("mongoose");
const bcrypt=require("bcrypt");
const {isEmail}=require("validator")
const appError=require("../utils/appErrors")
// Define the Student Schema
const studentSchema = new mongoose.Schema(
  {
    studentName: { type: String, required: true },
    email: {
      type: String,
      required: [true, 'missing the email address'], // Custom error message if not provided
      unique: true,   // Ensures email is unique across all users
      validate:{
        validator:function(value){
          return isEmail(value)
        }
      }
    },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    password: { type: String, required: true },
    confirmPassword: {
      type: String,
      required: [true, 'missing the password confirmation'], 
      validate:{
        validator:function(value){
          return value==this.password
        },
        message:"confirmation password should be same as the above password"
      }
    },
    isEmailVerified:{type:Boolean,default:false},
    isPhoneNumberVerified:{type:Boolean,default:false},
    registeredAt: { type: Date, default: Date.now }, 
    verifiedAt: { type: Date }, 
    modifiedAt: { type: Date, default: Date.now }, 
    isAdmin:{
      type:Boolean
    },
    modification: {
      modifiedAt: {
        type: Date,
        default: Date.now, 
      },
      logs: [
        {
          modifiedAt: {
            type: Date,
            default: Date.now, // Default to current date
          },
          description: {
            type: String,
             
          },
        },
      ],
    },
    passwordResetToken:{
      type:String,
    },
    passwordResetExpires:{
      type:Date
    },
    createdAt: {
      type: Date,
      default:Date.now,
      required: [true, "missing the date parameter at which the user created the profile"], // Custom error message if not provided
    },
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
        images: {
          iconURL: {
            type: String,
            required: false,
          },
          imageURL: {
            type: [String],
          },
        },
  },
  { timestamps: true } 
);
studentSchema.pre('save', async function(next) {
  // this will be used when i want to hash password if that has been reset or created a new one
  if (this.isModified('password') || this.isNew) {
    try {
      const salt = await bcrypt.genSalt(12); // Generate a salt with 12 rounds
      this.password = await bcrypt.hash(this.password, salt); // Hash the password
      this.confirmPassword = undefined; // Optionally remove the confirmPassword field
      next();
    } catch (err) {
      error=new appError("unable to hash the password",500)
      next(error); // Pass any errors to the next middleware
    }
  } else {
    next(); // If anything other than password has been modified then this will be used
  }
});
// function on pssword to compare the password to see if they match or not
studentSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};
module.exports = mongoose.model("Student", studentSchema);