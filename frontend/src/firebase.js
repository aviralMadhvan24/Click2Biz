// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCAzaSfF4XCnE5207-ncxIuE5Z-v92shgo",
  authDomain: "click2biz-58088.firebaseapp.com",
  projectId: "click2biz-58088",
  storageBucket: "click2biz-58088.firebasestorage.app",
  messagingSenderId: "216107649734",
  appId: "1:216107649734:web:c80f8867e511755d5aa5c7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Google Auth Provider


// Optional: Configure additional provider settings
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account',
  redirect_uri: 'https://www.click2biz.in' // Add your domain
});

export { auth, googleProvider };