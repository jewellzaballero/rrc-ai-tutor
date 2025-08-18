import { Welcome } from "../welcome/welcome";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

export function meta() {
  return [
    { title: "RRC AI Tutor - Your Intelligent Learning Companion" },
    { name: "description", content: "Get personalized tutoring, instant answers, and academic support for Red River College courses powered by AI." },
  ];
}

export default function Home() {
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyCPa21SicNe38FXEi88Rs0UVGnl5-Ji5nY",
    authDomain: "rrc-ai-tutor.firebaseapp.com",
    projectId: "rrc-ai-tutor",
    storageBucket: "rrc-ai-tutor.firebasestorage.app",
    messagingSenderId: "1081543789298",
    appId: "1:1081543789298:web:8539053773ee056625de6b",
    measurementId: "G-ZTW5BEYF48"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  return <Welcome />;
}
