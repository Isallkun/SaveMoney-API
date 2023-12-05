const bcrypt = require("bcrypt");
const { admin } = require("../config/admin");

class UserModel {
  constructor() {
    this.auth = admin.auth();
  }

  async verifyUser(email, password) {
    try {
      const userRecord = await this.auth.getUserByEmail(email);
      const hashedPasswordFromDB = userRecord.customClaims.hashedPassword;

      const isPasswordValid = await bcrypt.compare(password, hashedPasswordFromDB);

      if (isPasswordValid) {
        return userRecord.uid;
      } else {
        throw new Error("Invalid password");
      }
    } catch (error) {
      throw error;
    }
  }

  async register(email, password) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const userRecord = await this.auth.createUser({
        email: email,
        password: hashedPassword,
        // ... other user information
      });

      // Set custom claim
      await this.auth.setCustomUserClaims(userRecord.uid, { hashedPassword });

      return { uid: userRecord.uid };
    } catch (error) {
      console.error("Error during registration:", error);
      throw error;
    }
  }

  async login(email, password) {
    try {
      const userCredential = await this.auth.signInWithEmailAndPassword(email, password);
      return { uid: userCredential.user.uid };
    } catch (error) {
      console.error("Error during login:", error);
      throw error;
    }
  }
}

module.exports = UserModel;
