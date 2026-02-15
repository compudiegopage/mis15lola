import { initializeApp } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.9.0/firebase-firestore.js";

// 🔥 CONFIG REAL TUYA
const firebaseConfig = {
  apiKey: "AIzaSyAFk9QB1Iog0WeazLNlrT8K02YTRxYgwtI",
  authDomain: "mis15lola.firebaseapp.com",
  projectId: "mis15lola",
  storageBucket: "mis15lola.firebasestorage.app",
  messagingSenderId: "205558473662",
  appId: "1:205558473662:web:48bd62eb29b04f6275cfef"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const form = document.getElementById("firmaForm");
const estado = document.getElementById("estado");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const mensaje = document.getElementById("mensaje").value.trim();

  if (!nombre || !mensaje) return;

  try {
    await addDoc(collection(db, "mensajes"), {
      nombre,
      mensaje,
      fecha: serverTimestamp()
    });

    estado.textContent = "💜 ¡Mensaje enviado!";
    form.reset();
  } catch (error) {
    console.error(error);
    estado.textContent = "Error al enviar mensaje";
  }
});
