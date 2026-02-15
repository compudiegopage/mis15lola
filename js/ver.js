import { initializeApp } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";
import {
  getFirestore,
  collection,
  query,
  orderBy,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/12.9.0/firebase-firestore.js";

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

const lista = document.getElementById("listaMensajes");

// 🔥 Query ordenada por fecha descendente
const q = query(collection(db, "mensajes"), orderBy("fecha", "desc"));

// 🔄 Escucha en tiempo real
onSnapshot(q, (snapshot) => {
  lista.innerHTML = ""; // limpia antes de renderizar

  snapshot.forEach((doc) => {
    const data = doc.data();

    const card = document.createElement("div");
    card.className = "mensaje-card";

    // 🔹 Formateo fecha
    let fechaTexto = "";
    if (data.fecha?.seconds) {
      const fecha = new Date(data.fecha.seconds * 1000);
      fechaTexto = fecha.toLocaleString("es-AR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    }

    card.innerHTML = `
      <strong class="mensaje-nombre">${data.nombre}</strong>
      <small class="mensaje-fecha">${fechaTexto}</small>
      <p>${data.mensaje}</p>
    `;

    lista.appendChild(card);

    // ✨ Animación suave
    setTimeout(() => {
      card.classList.add("visible");
    }, 50);
  });
});
