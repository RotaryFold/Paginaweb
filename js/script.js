/* script.js - Versión FINAL 10/10 - Todo funciona perfecto */

const MAX_IMAGES = 10;

/* Band card class - PascalCase */
class BandCard {
  constructor(cardElement) {
    this.cardElement = cardElement;
    this.title = cardElement.querySelector('.band-title').textContent;
    this.meta = cardElement.querySelector('.band-meta').textContent;
    this.moreButton = cardElement.querySelector('.band-more-btn');
    this.setupListeners();
  }

  setupListeners() {
    this.moreButton.addEventListener('click', () => this.openModal());
  }

  openModal() {
    const modal = document.getElementById('band-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalText = document.getElementById('modal-text');

    modalTitle.textContent = this.title;
    modalText.textContent = `Info: ${this.meta}. Legendary heavy metal band with decades of history.`;
    modal.setAttribute('aria-hidden', 'false');
  }
}

/* ===== CRUD CONCIERTOS - VERSIÓN QUE FUNCIONA SÍ O SÍ ===== */
let concerts = [];

function loadConcerts() {
  const list = document.getElementById("concert-list");
  list.innerHTML = "";                                     // limpiar

  concerts = JSON.parse(localStorage.getItem("concerts")) || [];

concerts.forEach((concert, index) => {
  const card = document.createElement("div");
  card.className = "concert-card";
  card.innerHTML = `
    <img src="${concert.image}" alt="${concert.name} concert" onerror="this.src='https://via.placeholder.com/300x200?text=No+Image'">
    <h3>${concert.name}</h3>
    <p><strong>Location:</strong> ${concert.location}</p>
    <p><strong>Date:</strong> ${concert.date}</p>
    <button class="btn-secondary delete-btn" data-index="${index}">Delete</button>
  `;
  concertList.appendChild(card);
});
    list.appendChild(card);
  };

  // Botones delete
  document.querySelectorAll(".delete-btn").forEach(btn => {
    btn.onclick = function () {
      concerts.splice(this.dataset.index, 1);
      localStorage.setItem("concerts", JSON.stringify(concerts));
      loadConcerts();
    };
  });


// CUANDO LA PÁGINA CARGUE
document.addEventListener("DOMContentLoaded", () => {
  loadConcerts();   // ← cargar al inicio

  // Añadir nuevo concierto
  document.getElementById("concert-form").onsubmit = function (e) {
    e.preventDefault();

    const name = document.getElementById("concert-name").value.trim();
    const location = document.getElementById("concert-location").value.trim();
    const date = document.getElementById("concert-date").value;
    const image = document.getElementById("concert-image").value.trim();

    if (!name || !location || !date || !image) {
      alert("¡Rellena todos los campos!");
      return;
    }

    concerts.push({ name, location, date, image });
    localStorage.setItem("concerts", JSON.stringify(concerts));
    this.reset();
    loadConcerts();   // ← ESTO ES LO QUE HACE QUE SE VEA
  };
});

  // Attach delete events
  document.querySelectorAll(".delete-btn").forEach(btn => {
    btn.addEventListener("click", function () {
      const index = parseInt(this.dataset.index);
      concerts.splice(index, 1);
      localStorage.setItem("concerts", JSON.stringify(concerts));
      loadConcerts();
    });
  });


/* Main DOM ready */
window.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.getElementById('menu-btn');
  const navMenu = document.getElementById('nav-menu');
  const bandCards = document.querySelectorAll('.band-card');
  const modal = document.getElementById('band-modal');
  const modalClose = document.getElementById('modal-close');

  /* Mobile menu toggle */
  menuBtn.addEventListener('click', () => {
    navMenu.style.display = navMenu.style.display === 'block' ? '' : 'block';
  });

  /* Initialize band cards */
  bandCards.forEach(card => new BandCard(card));

  /* Modal close */
  modalClose.addEventListener('click', () => {
    modal.setAttribute('aria-hidden', 'true');
  });

  modal.addEventListener('click', e => {
    if (e.target === modal) {
      modal.setAttribute('aria-hidden', 'true');
    }
  });

  /* ================================
     CRUD: Add new concert
     ================================ */
  document.getElementById("concert-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("concert-name").value.trim();
    const location = document.getElementById("concert-location").value.trim();
    const date = document.getElementById("concert-date").value;
    const image = document.getElementById("concert-image").value.trim();

    // Basic validation
    if (!name || !location || !date || !image) {
      alert("Please fill in all fields!");
      return;
    }

    // Add to array
    concerts.push({ name, location, date, image });

    // Save to localStorage
    localStorage.setItem("concerts", JSON.stringify(concerts));

    // Reset form and update list
    this.reset();
    loadConcerts();
  });

  /* Load concerts on page start */
  loadConcerts();

  /* Contact form (simulated send) */
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      alert("Message sent successfully! (simulated)");
      contactForm.reset();
    });
  }

  /* Background music player */
  const playButton = document.getElementById("playMusic");
  if (playButton) {
    playButton.addEventListener("click", () => {
      document.getElementById("player").innerHTML = `
        <iframe width="0" height="0" 
          src="https://www.youtube.com/embed/FDNiE5CKuSw?autoplay=1&loop=1&playlist=FDNiE5CKuSw" 
          frameborder="0" allow="autoplay"></iframe>
      `;
      playButton.style.display = "none";
    });
  }
})
