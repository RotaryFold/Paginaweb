/* script.js */

/* Constants */
const MAX_IMAGES = 10;

/* Class for band card handling (PascalCase) */
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
        modalText.textContent = `Info: ${this.meta}. This is example content for the exercise.`;
        modal.setAttribute('aria-hidden', 'false');
    }
}

/* DOM ready - prefer to run after DOM loaded */
window.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.getElementById('menu-btn');
    const navMenu = document.getElementById('nav-menu');
    const bandCards = document.querySelectorAll('.band-card');
    const modal = document.getElementById('band-modal');
    const modalClose = document.getElementById('modal-close');

    /* Toggle mobile menu */
    menuBtn.addEventListener('click', () => {
        const isVisible = navMenu.style.display === 'block';
        if (isVisible) {
            navMenu.style.display = '';
        } else {
            navMenu.style.display = 'block';
        }
    });

    /* Initialize BandCard objects (JS classes in PascalCase) */
    bandCards.forEach((card) => {
        new BandCard(card);
    });

    /* Close modal logic */
    modalClose.addEventListener('click', () => {
        modal.setAttribute('aria-hidden', 'true');
    });

    /* Close modal when clicking outside the content */
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.setAttribute('aria-hidden', 'true');
        }
    });

    /* Simple form submit handling */
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();
        // get values (camelCase variables)
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        if (!name || !email || !message) {
            alert('Please fill all fields');
            return;
        }

        // Example: simulate send
        alert('Message sent — thanks!');
        contactForm.reset();

        const playButton = document.getElementById("playMusic");
const music = document.getElementById("bgMusic");

playButton.addEventListener("click", () => {
  music.play();
  playButton.style.display = "none"; // Oculta el botón al empezar
});
    });
});
