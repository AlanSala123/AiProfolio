import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyA-mGf1xpz9OEphZHTZCKlZ3_G57Y_q5p4",
  authDomain: "aiprofolio.firebaseapp.com",
  projectId: "aiprofolio",
  storageBucket: "aiprofolio.appspot.com",
  messagingSenderId: "236076157067",
  appId: "1:236076157067:web:b5a73ff29b2e528045ac8e",
  measurementId: "G-8FM8H7WP48"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;