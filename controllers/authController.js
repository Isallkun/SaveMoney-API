// AuthController.js
// const { db } = require("../config/admin");
// const UserModel = require("../models/userModel");
const { db, firebase } = require("../config/firebase");

const AuthController = {
  // register: async (req, res) => {
  //   try {
  //     const { email, password, name } = req.body;
  //     const userModel = new UserModel();
  //     const response = await userModel.register(email, password, name);

  //     await db.collection("users").add({ email, password, name });

  //     res.status(201).json({ message: "User registered successfully", uid: response.uid });
  //   } catch (error) {
  //     res.status(400).json({ message: "Registration failed", error: error.message });
  //   }
  // },
  register: async (req, res) => {
    const { email, password, name } = req.body;
    try {
      const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;

      // Update profile display name
      await user.updateProfile({ displayName: name });

      // Save user data to Firestore
      const userData = {
        email: user.email,
        name: user.displayName,
      };

      // Simpan data pengguna ke Firestore
      await db.collection("users").doc(user.uid).set(userData);

      // Assign session UID
      req.session.uid = user.uid;

      // Response with user details
      res.status(200).json({ message: "User registered successfully", body: user });
    } catch (error) {
      res.status(400).json({ message: "Registration failed", error: error.message });
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      // Authenticate the user using firebaseApp instead of auth
      const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
      const user = userCredential.user;
      req.session.uid = user.uid;

      // const { uid, email: userEmail, displayName, stsTokenManager } = user;
      // const accessToken = stsTokenManager?.accessToken;
      // console.log(accessToken);
      res.status(200).json({
        message: "Login successfully",
        body: user,
        // body: {
        //   uid,
        //   email: userEmail,
        //   name: displayName,
        //   stsTokenManager,
        // },
      });
    } catch (error) {
      // console.log(error);
      res.status(401).json({ message: "Login failed", error: error.message });
    }
  },

  logout: async (req, res) => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        req.session.destroy();
        res.status(200).json({ message: "Logout success" });
      });
  },

  // login: async (req, res) => {
  //   const { email, password } = req.body;
  //   try {
  //     const userCredential = await auth.signInWithEmailAndPassword(email, password);
  //     const user = userCredential.user;
  //     req.session.uid = user.uid;
  //     res.status(201).json({ message: "Login Success", body: user });
  //   } catch (error) {
  //     res.status(401).json({ message: "Login failed", error: "Invalid credentials" });
  //     console.log(error);
  //   }
  // },

  // login: async (req, res) => {
  //   try {
  //     const { email, password } = req.body;
  //     const userRecord = await auth.getUserByEmail(email);
  //     // Jika kredensial sesuai, buatlah custom token
  //     const customToken = await auth.createCustomToken(userRecord.uid);

  //     // Kirimkan custom token ke klien
  //     res.status(200).json({ message: "Login successful", token: customToken });
  //   } catch (error) {
  //     res.status(401).json({ message: "Login failed", error: error.message });
  //   }
  // },

  // login: async (req, res) => {
  //   try {
  //     const { email, password } = req.body;

  //     // Authenticate the user using firebaseApp instead of auth
  //     const userCredential = await firebaseApp.auth().signInWithEmailAndPassword(email, password);
  //     const user = userCredential.user;
  //     req.session.uid = user.uid;
  //     res.status(200).json({ message: "Login success", body: userLogin });
  //   } catch (error) {
  //     console.log(error);
  //     res.status(401).json({ message: "Login failed", error: error.message });
  //   }
  // },

  //     // Dapatkan data pengguna berdasarkan email dari Firestore
  //     const userDoc = await db.collection("users").where("email", "==", email).get();
  //     if (userDoc.empty) {
  //       throw new Error("User not found");
  //     }

  //     let user;
  //     userDoc.forEach((doc) => {
  //       user = doc.data();
  //     });

  //     // Inisialisasi auth dari admin

  //     // Periksa apakah password cocok (disarankan menggunakan bcrypt)
  //     if (user.password === password) {
  //       const token = await auth.createCustomToken(uid); // Menggunakan createCustomToken dari auth

  //       res.status(200).json({
  //         message: "Login successful",
  //         token: token,
  //         user: {
  //           email: user.email,
  //           name: user.name,
  //         },
  //       });
  //     } else {
  //       res.status(401).json({ message: "Login failed", error: "Invalid credentials" });
  //     }
  //   } catch (error) {
  //     res.status(401).json({ message: "Login failed", error: error.message });
  //   }
  // },

  // const login = async (req, res) => {
  //   const { email, password } = req.body;
  //   try {
  //     // Authenticate the user using firebaseApp instead of auth
  //     const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
  //     const user = userCredential.user;
  //     req.session.uid = user.uid;
  //     res.status(200).json({ message: "Login success", body: user });
  //   } catch (error) {
  //     console.log(error);
  //     res.status(401).json({ message: "Login failed", error: error.message });
  //   }
  // };
};

module.exports = AuthController;
