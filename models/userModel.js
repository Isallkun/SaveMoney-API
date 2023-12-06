const { admin } = require("../config/admin");
const jwt = require("jsonwebtoken");

class UserModel {
  constructor() {
    this.auth = admin.auth();
  }

  async verifyUser(email, password) {
    try {
      const userRecord = await this.auth.getUserByEmail(email);

      // Dapatkan password dari userRecord (jika tersedia)
      const storedPassword = userRecord.password;

      // Bandingkan password yang dimasukkan dengan password yang tersimpan
      const isPasswordValid = password === storedPassword;

      if (isPasswordValid) {
        // Jika password cocok, buat token JWT
        const token = jwt.sign({ uid: userRecord.uid }, "your_secret_key");
        return { token };
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      console.error("Error during verification:", error);
      throw error;
    }
  }

  async register(email, password) {
    try {
      // Simpan password tanpa enkripsi
      const userRecord = await this.auth.createUser({
        email: email,
        password: password,
        // ... other user information
      });

      return { uid: userRecord.uid };
    } catch (error) {
      console.error("Error during registration:", error);
      throw error;
    }
  }
}

module.exports = UserModel;
