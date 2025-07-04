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

    countdownEl.innerHTML =
      `<span class="countdown-item">${d} <small>Días</small></span>` +
      `<span class="countdown-item">${h} <small>Horas</small></span>` +
      `<span class="countdown-item">${m} <small>Min</small></span>` +
      `<span class="countdown-item">${s} <small>Seg</small></span>`;
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

const guestsDiv = document.getElementById("guests");
const addGuestBtn = document.getElementById("addGuest");

function createGuestRow() {
  const div = document.createElement("div");
  div.className = "guest";
  div.innerHTML = `
    <input type="text" name="nombre" placeholder="Nombre" required>
    <input type="text" name="apellido" placeholder="Apellido" required>
    <select name="restriccion">
      <option value="">Restricción alimentaria</option>
      <option value="Ninguna">Ninguna</option>
      <option value="Vegetariano">Vegetariano</option>
      <option value="Vegano">Vegano</option>
      <option value="Celíaco">Celíaco</option>
      <option value="Diabético">Diabético</option>
      <option value="Hipertenso">Hipertenso</option>
      <option value="Intolerante a la lactosa">Intolerante a la lactosa</option>
      <option value="Otro">Otro</option>
    </select>
  `;
  guestsDiv.appendChild(div);
}

if (guestsDiv) createGuestRow();

addGuestBtn?.addEventListener("click", createGuestRow);

document.getElementById("rsvpForm").addEventListener("submit", e => {
  e.preventDefault();

  const guests = [...document.querySelectorAll(".guest")].map(div => ({
    nombre: div.querySelector('input[name="nombre"]').value.trim(),
    apellido: div.querySelector('input[name="apellido"]').value.trim(),
    restriccion: div.querySelector('select[name="restriccion"]').value
  }));

  fetch('https://sheetdb.io/api/v1/apz62ss7iou2o', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ data: guests })  // sheetdb espera "data"
  })
  .then(res => res.json())
  .then(data => {
    alert("¡Gracias por confirmar!");
    e.target.reset();
    guestsDiv.innerHTML = "";
    createGuestRow();
  })
  .catch(err => {
    alert("Error enviando datos: " + err.message);
  });
});
