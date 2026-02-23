const effects = [
  {
    title: 'Glassmorphism',
    description: 'A semi-transparent card with a frosted-glass effect, created using backdrop-filter.'
  },
  {
    title: '3D Tilt Effect',
    description: 'This card tilts in 3D space based on your mouse position, using perspective and transform properties.'
  },
  {
    title: 'Glow Effect',
    description: 'A button that emits a soft glow on hover, created using box-shadow and modern color spaces.'
  }
];

class EffectCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const title = this.getAttribute('title');
    const description = this.getAttribute('description');
    
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          background: var(--card-bg, rgba(255, 255, 255, 0.05));
          border-radius: 15px;
          border: 1px solid var(--card-border, rgba(255, 255, 255, 0.1));
          backdrop-filter: blur(10px);
          padding: 2rem;
          transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.3s ease, border 0.3s ease;
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
        }
        :host(:hover) {
            transform: translateY(-10px);
            box-shadow: 0 0 20px 5px var(--card-glow-color, oklch(80% 0.3 260 / 60%));
        }
        h3 {
          margin: 0;
          font-size: 1.5rem;
          color: var(--text-color, #f0f0f0);
          transition: color 0.3s ease;
        }
        p {
          color: var(--text-muted, #a0a0a0);
          transition: color 0.3s ease;
        }
      </style>
      <h3>${title}</h3>
      <p>${description}</p>
    `;

    if (title === '3D Tilt Effect') {
        this.addEventListener('mousemove', this.handleMouseMove.bind(this));
        this.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
    }
  }

  handleMouseMove(e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const { width, height } = rect;
    const rotateX = (y / height - 0.5) * -30; // Max rotation 15 degrees
    const rotateY = (x / width - 0.5) * 30; // Max rotation 15 degrees

    this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
  }

  handleMouseLeave() {
    this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
  }
}

customElements.define('effect-card', EffectCard);

// const effectsGrid = document.getElementById('effects-grid');
const themeToggle = document.getElementById('theme-toggle');

/*
function initializeEffects() {
  effects.forEach(effect => {
    const card = document.createElement('effect-card');
    card.setAttribute('title', effect.title);
    card.setAttribute('description', effect.description);
    effectsGrid.appendChild(card);
  });
}
*/

function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // initializeEffects();
    initTheme();
});
