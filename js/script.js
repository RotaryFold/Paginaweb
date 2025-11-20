

const MAX_IMAGES = 10;


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
    modalText.textContent = `Info: ${this.meta}. Legendary heavy metal band.`;
    modal.setAttribute('aria-hidden', 'false');
  }
}


let concerts = [];

function loadConcerts() {
  const list = document.getElementById("concert-list");
  list.innerHTML = ""; 

  concerts = JSON.parse(localStorage.getItem("concerts")) || [];

  concerts.forEach((concert, index) => {
    const card = document.createElement("div");
    card.className = "concert-card";
    card.innerHTML = `
      <img src="${concert.image}" alt="${concert.name}" onerror="this.src='https://via.placeholder.com/300x200/111/fff?text=No+Image'">
      <div class="concert-info">
        <h3>${concert.name}</h3>
        <p><strong>Location:</strong> ${concert.location}</p>
        <p><strong>Date:</strong> ${concert.date}</p>
        <button class="btn-secondary delete-btn" data-index="${index}">Delete</button>
      </div>
    `;
    list.appendChild(card);
  });


  document.querySelectorAll(".delete-btn").forEach(btn => {
    btn.onclick = function () {
      const i = parseInt(this.dataset.index);
      concerts.splice(i, 1);
      localStorage.setItem("concerts", JSON.stringify(concerts));
      loadConcerts();
    };
  });
}

document.addEventListener("DOMContentLoaded", () => {


  loadConcerts();


  document.getElementById("concert-form").addEventListener("submit", function (e) {
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
    loadConcerts(); 
  });


  const menuBtn = document.getElementById("menu-btn");
  const navMenu = document.getElementById("nav-menu");
  if (menuBtn && navMenu) {
    menuBtn.addEventListener("click", () => {
      navMenu.style.display = navMenu.style.display === "block" ? "" : "block";
    });
  }

  document.querySelectorAll(".band-card").forEach(card => new BandCard(card));
  const modal = document.getElementById("band-modal");
  const modalClose = document.getElementById("modal-close");
  if (modalClose) modalClose.addEventListener("click", () => modal.setAttribute("aria-hidden", "true"));
  if (modal) {
    modal.addEventListener("click", e => {
      if (e.target === modal) modal.setAttribute("aria-hidden", "true");
    });
  }

  
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", e => {
      e.preventDefault();
      alert("Mensaje enviado (simulado)");
      contactForm.reset();
    });
  }

  
  const playButton = document.getElementById("playMusic");
  if (playButton) {
    playButton.addEventListener("click", () => {
      document.getElementById("player").innerHTML = `
        <iframe width="0" height="0" 
          src="https://www.youtube.com/embed/FDNiE5CKuSw?autoplay=1&loop=1&playlist=FDNiE5CKuSw" 
          allow="autoplay" frameborder="0"></iframe>
      `;
      playButton.style.display = "none";
    });
  }
}); 