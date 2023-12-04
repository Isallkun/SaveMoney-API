// userModel.js

const { admin } = require("../config/admin"); // Pastikan path dan pengambilan objek 'admin' sesuai dengan struktur proyek Anda

class UserModel {
  constructor() {
    this.auth = admin.auth(); // Mengakses objek 'auth' dari instance Firebase yang diinisialisasi
  }

  async register(email, password) {
    try {
      const userCredential = await this.auth.createUserWithEmailAndPassword(email, password);
      return { uid: userCredential.user.uid };
    } catch (error) {
      throw error;
    }
  }

  async login(email, password) {
    try {
      const userCredential = await this.auth.signInWithEmailAndPassword(email, password);
      return { uid: userCredential.user.uid };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserModel;
