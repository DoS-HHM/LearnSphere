require("dotenv").config();
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const User = require("./models/User");
const Profile = require("./models/Profile");

const [, , email, password, firstName = "Tanay", lastName = "Gupt"] = process.argv;

if (!email || !password) {
  console.error("Usage: node server/scripts-create-admin.js <email> <password> [firstName] [lastName]");
  process.exit(1);
}

(async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    const existing = await User.findOne({ email });
    if (existing) {
      existing.accountType = "Admin";
      existing.approved = true;
      await existing.save();
      console.log(`Updated ${email} to Admin.`);
      return;
    }

    const profile = await Profile.create({ gender: null, dateOfBirth: null, about: "LearnSphere administrator", contactNumber: null });
    const passwordHash = await bcrypt.hash(password, 10);
    await User.create({
      firstName,
      lastName,
      email,
      password: passwordHash,
      accountType: "Admin",
      approved: true,
      additionalDetails: profile._id,
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
    });
    console.log(`Admin created: ${email}`);
  } catch (error) {
    console.error(error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
})();
