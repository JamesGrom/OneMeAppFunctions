const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
// const path = require("path");
// const os = require("os");
// const fs = require("fs");


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
exports.initializeUser = functions.auth.user().onCreate((user) => {
  return admin
      .firestore()
      .collection("Users")
      .doc(user.uid)
      .set(
          {
            submittedID: false,
            submittedSelfie: false,
            registrationComplete: false,
          },
          {merge: true})
      .then(() => {
        console.log("success");
      })
      .catch((err) => {
        console.error("error writing document");
      });
});
