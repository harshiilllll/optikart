import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCNH-QuAHOVYAVANWkEkhxQpznWN5VrIjo",
  authDomain: "optikart-92c45.firebaseapp.com",
  projectId: "optikart-92c45",
  storageBucket: "optikart-92c45.appspot.com",
  messagingSenderId: "109523327225",
  appId: "1:109523327225:web:4b99f2194ae58bd0d62a28",
  measurementId: "G-5L40J932MS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
