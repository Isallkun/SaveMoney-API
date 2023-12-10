// UserModel.js

const { admin } = require("../config/firebase");

class UserModel {
  constructor() {
    this.auth = admin.auth();
  }

  async signInCustomToken(uid) {
    try {
      const customToken = await this.auth.createCustomToken(uid);
      return { customToken };
    } catch (error) {
      throw new Error("Failed to create custom token");
    }
  }

  async register(email, password, name) {
    try {
      const userRecord = await this.auth.createUser({
        email: email,
        password: password,
        displayName: name,
      });
      return { uid: userRecord.uid };
    } catch (error) {
      throw error;
    }
  }

  async getUser(uid) {
    try {
      const userRecord = await this.auth.getUser(uid);
      return userRecord;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserModel;
