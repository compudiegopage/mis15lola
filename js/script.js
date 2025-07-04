/* ---------- 1) Cuenta regresiva ---------- */
const countdownEl = document.getElementById("countdown");
if (countdownEl) {
  const eventDate = new Date("2026-02-15T13:00:00-03:00"); // Hora local Buenos Aires

  const updateCountdown = () => {
    const now = new Date();
    const diff = eventDate - now;

    if (diff <= 0) {
      countdownEl.textContent = "¡Ya comenzó la fiesta!";
      clearInterval(timer);
      return;
    }
    const d = Math.floor(diff / 864e5);
    const h = Math.floor(diff / 36e5) % 24;
    const m = Math.floor(diff / 6e4) % 60;
    const s = Math.floor(diff / 1e3) % 60;

    countdownEl.textContent =
      `${d} Días ${h} horas ${m} min ${s} seg`;
  };
  updateCountdown();
  const timer = setInterval(updateCountdown, 1000);
}

/* ---------- 2) Modal de regalos ---------- */
const modal = document.getElementById("giftModal");
const showGiftBtn = document.getElementById("show-gift");
const closeGiftBtn = document.getElementById("closeGift");

showGiftBtn?.addEventListener("click", () => modal.style.display = "flex");
closeGiftBtn?.addEventListener("click", () => modal.style.display = "none");
window.addEventListener("click", e => {
  if (e.target === modal) modal.style.display = "none";
});

/* ---------- 3) RSVP dinámico ---------- */
const guestsDiv = document.getElementById("guests");
const addGuestBtn = document.getElementById("addGuest");

function createGuestRow() {
  const div = document.createElement("div");
  div.className = "guest";
  div.innerHTML = `
    <input type="text" name="nombre[]"     placeholder="Nombre"      required>
    <input type="text" name="apellido[]"   placeholder="Apellido"    required>
    <select name="dieta[]">
      <option value="">Restricción alimentaria</option>
      <option>Ninguna</option>
      <option>Vegetariano</option>
      <option>Vegano</option>
      <option>Celíaco</option>
      <option>Diabético</option>
      <option>Hipertenso</option>
      <option>Intolerante a la lactosa</option>
      <option>Otro</option>
    </select>
  `;
  guestsDiv.appendChild(div);
}

// Al menos un invitado por defecto
if (guestsDiv) createGuestRow();

addGuestBtn?.addEventListener("click", createGuestRow);

/* Manejo de envío (aquí solo ejemplo local) */
document.getElementById("rsvpForm")?.addEventListener("submit", e => {
  e.preventDefault();

  const guests = [...document.querySelectorAll(".guest")].map(div => {
    return {
      nombre: div.querySelector('input[name="nombre[]"]').value.trim(),
      apellido: div.querySelector('input[name="apellido[]"]').value.trim(),
      restriccion: div.querySelector('select[name="dieta[]"]').value
    };
  });

  fetch("https://script.google.com/macros/s/AKfycbxVEe7qkKzma5MMMd-kujq6R_pT0Ui4Aeh22-70x2HfgvSg3kvf42SbkjdNr5SpSYhj/exec", {  // <-- pegá tu URL acá
    method: "POST",
    body: JSON.stringify({ guests }),
    headers: { "Content-Type": "application/json" }
  })
  .then(response => {
    if (response.ok) {
      alert("¡Gracias por confirmar!");
      e.target.reset();
      document.getElementById("guests").innerHTML = "";
      createGuestRow();
    } else {
      alert("Hubo un error. Intentá de nuevo.");
    }
  });
});
function doGet() {
  return ContentService
    .createTextOutput("🟢 Web App activa: envía datos con POST.")
    .setMimeType(ContentService.MimeType.TEXT);
}

