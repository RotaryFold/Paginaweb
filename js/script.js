const MAX_IMAGES = 10;
let concerts = [];
let editingIndex = -1;

class BandCard {
  constructor(cardElement) {
    this.cardElement = cardElement;
    this.title = cardElement.querySelector('.band-title').textContent;
    this.meta = cardElement.querySelector('.band-meta').textContent;
    this.moreButton = cardElement.querySelector('.band-more-btn');
    this.moreButton.addEventListener('click', () => this.openModal());
  }
  openModal() {
    const modal = document.getElementById('band-modal');
    document.getElementById('modal-title').textContent = this.title;
    document.getElementById('modal-text').textContent = `${this.meta}. Legendary heavy metal band.`;
    modal.setAttribute('aria-hidden', 'false');
  }
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

function observeElements() {
  document.querySelectorAll('.fade-in:not(.visible)').forEach(el => observer.observe(el));
}

function loadConcerts() {
  const list = document.getElementById("concert-list");
  list.innerHTML = "";
  concerts = JSON.parse(localStorage.getItem("concerts")) || [];

  concerts.forEach((concert, index) => {
    const card = document.createElement("div");
    card.className = "concert-card fade-in";
    card.innerHTML = `
      <img src="${concert.image}" alt="${concert.name}" onerror="this.src='https://via.placeholder.com/300x200/111/fff?text=No+Image'">
      <div class="concert-info">
        <h3>${concert.name}</h3>
        <p><strong>Location:</strong> ${concert.location}</p>
        <p><strong>Date:</strong> ${concert.date}</p>
        <div style="margin-top:10px;display:flex;gap:8px;flex-wrap:wrap;">
          <button class="btn-secondary edit-btn" data-index="${index}">Edit</button>
          <button class="btn-secondary delete-btn" data-index="${index}">Delete</button>
        </div>
      </div>
    `;
    list.appendChild(card);
    observer.observe(card);
  });

  document.querySelectorAll(".delete-btn").forEach(btn => {
    btn.onclick = function () {
      const i = parseInt(this.dataset.index);
      concerts.splice(i, 1);
      localStorage.setItem("concerts", JSON.stringify(concerts));
      loadConcerts();
    };
  });

  document.querySelectorAll(".edit-btn").forEach(btn => {
    btn.onclick = function () {
      const i = parseInt(this.dataset.index);
      editingIndex = i;
      const c = concerts[i];
      document.getElementById("concert-name").value = c.name;
      document.getElementById("concert-location").value = c.location;
      document.getElementById("concert-date").value = c.date;
      document.getElementById("concert-image").value = c.image;
      document.querySelector("#concert-form button").textContent = "Update Concert";
      document.getElementById("form-error").textContent = "";
      document.getElementById("concert-form").scrollIntoView({ behavior: "smooth" });
    };
  });
}

document.addEventListener("DOMContentLoaded", () => {
  loadConcerts();
  observeElements();

  const menuBtn = document.getElementById("menu-btn");
  const navMenu = document.getElementById("nav-menu");
  menuBtn.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", isOpen);
  });

  document.getElementById("concert-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const errorDiv = document.getElementById("form-error");
    const name = document.getElementById("concert-name").value.trim();
    const location = document.getElementById("concert-location").value.trim();
    const date = document.getElementById("concert-date").value;
    const image = document.getElementById("concert-image").value.trim();

    if (!name || !location || !date || !image) {
      errorDiv.textContent = "Please fill all fields";
      return;
    }
    if (!image.startsWith("http")) {
      errorDiv.textContent = "Please enter a valid image URL";
      return;
    }

    if (editingIndex >= 0) {
      concerts[editingIndex] = { name, location, date, image };
      editingIndex = -1;
      this.querySelector("button").textContent = "Add Concert";
    } else {
      concerts.push({ name, location, date, image });
    }

    localStorage.setItem("concerts", JSON.stringify(concerts));
    this.reset();
    errorDiv.textContent = "";
    loadConcerts();
  });

  document.getElementById("modal-close").addEventListener("click", () => {
    document.getElementById("band-modal").setAttribute("aria-hidden", "true");
  });
  document.getElementById("band-modal").addEventListener("click", e => {
    if (e.target === e.currentTarget) e.currentTarget.setAttribute("aria-hidden", "true");
  });

  document.querySelectorAll(".band-card").forEach(card => new BandCard(card));

  document.getElementById("play-music").addEventListener("click", () => {
    document.getElementById("player").innerHTML = `
      <iframe width="0" height="0" src="https://www.youtube.com/embed/FDNiE5CKuSw?autoplay=1&loop=1&playlist=FDNiE5CKuSw" allow="autoplay" frameborder="0"></iframe>
    `;
    document.getElementById("play-music").style.display = "none";
  });

  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", e => {
      e.preventDefault();
      const formError = document.createElement("div");
      formError.style.color = "#b71c1c";
      formError.textContent = "Message sent (simulated)";
      contactForm.appendChild(formError);
      setTimeout(() => formError.remove(), 3000);
      contactForm.reset();
    });
  }
});