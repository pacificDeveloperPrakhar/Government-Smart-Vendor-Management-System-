const profile = require("../model/profile");
const crypto = require("crypto");
const bcrypt = require("bcrypt");

exports.createResetTokenPassword = async function ({ email }) {
  const resetToken = crypto.randomBytes(32).toString('hex');
  
  const passwordResetToken = await bcrypt.hash(resetToken, 10);
  
  // Add when this password reset will expire
  const passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000);
  
  const updatedProfile = await profile.updateOne(
    { email },
    {
      $set: {
        passwordResetToken,
        passwordResetExpires
      }
    },
    { new: true }
  );
  
  // Now save the changes
  return { resetToken };
};

exports.compareResetToken = async function ({ email, providedToken }) {
  const Profile = await profile.findOne({
    email
  }).select("passwordResetToken");
  console.log(providedToken, Profile);

  return await bcrypt.compare(providedToken, Profile.passwordResetToken);
};
