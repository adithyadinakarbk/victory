/**
 * Obsidian Radium Cyber-Core Engine v4.0
 * Powers Interactive Particle HUD, Web Audio Synthesizer,
 * Mobile Navigation Drawer, and Command Diagnostics CLI.
 */

(function () {
  'use strict';

  // --- AUDIO SYNTHESIZER (WEB AUDIO API) ---
  class CyberAudio {
    constructor() {
      this.ctx = null;
      this.enabled = localStorage.getItem('cyber_audio_enabled') !== 'false';
    }

    init() {
      if (!this.ctx && typeof AudioContext !== 'undefined') {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        this.ctx = new AudioCtx();
      }
    }

    toggle() {
      this.enabled = !this.enabled;
      localStorage.setItem('cyber_audio_enabled', this.enabled);
      return this.enabled;
    }

    beep(freq = 880, duration = 0.04, type = 'sine') {
      if (!this.enabled) return;
      try {
        this.init();
        if (this.ctx.state === 'suspended') {
          this.ctx.resume();
        }
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
        gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + duration);
      } catch (e) {
        // Audio policy or uninitialized context
      }
    }

    click() {
      this.beep(1200, 0.03, 'triangle');
    }

    hover() {
      this.beep(640, 0.02, 'sine');
    }

    success() {
      this.beep(880, 0.05, 'triangle');
      setTimeout(() => this.beep(1320, 0.08, 'triangle'), 60);
    }

    error() {
      this.beep(320, 0.08, 'sawtooth');
      setTimeout(() => this.beep(240, 0.1, 'sawtooth'), 70);
    }
  }

  const audio = new CyberAudio();
  window.cyberAudio = audio;

  // --- INTERACTIVE BACKGROUND PARTICLE CANVAS ---
  function initParticleCanvas() {
    const canvas = document.getElementById('cyber-particle-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particles = [];
    const count = Math.min(Math.floor((width * height) / 22000), 75);
    const mouse = { x: -1000, y: -1000, radius: 140 };

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.55;
        this.vy = (Math.random() - 0.5) * 0.55;
        this.radius = Math.random() * 1.8 + 0.8;
        this.baseColor = Math.random() > 0.4 ? 'rgba(57, 255, 20,' : 'rgba(0, 255, 136,';
        this.alpha = Math.random() * 0.5 + 0.2;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;

        // Mouse proximity reaction
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          this.x -= (dx / dist) * force * 1.5;
          this.y -= (dy / dist) * force * 1.5;
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${this.baseColor} ${this.alpha})`;
        ctx.shadowBlur = 6;
        ctx.shadowColor = '#39ff14';
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    for (let i = 0; i < count; i++) {
      particles.push(new Particle());
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);

      // Connect adjacent nodes
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            const alpha = (1 - dist / 110) * 0.22;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(57, 255, 20, ${alpha})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      requestAnimationFrame(animate);
    }

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    window.addEventListener('mouseout', () => {
      mouse.x = -1000;
      mouse.y = -1000;
    });

    animate();
  }

  // --- MOBILE NAVIGATION DRAWER ---
  function initMobileMenu() {
    const toggleBtn = document.getElementById('mobileMenuToggle');
    const drawer = document.getElementById('mobileMenuDrawer');
    const closeBtn = document.getElementById('closeMobileMenu');
    const backdrop = document.getElementById('mobileMenuBackdrop');

    if (!toggleBtn || !drawer) return;

    function openMenu() {
      drawer.classList.remove('translate-x-full');
      if (backdrop) backdrop.classList.remove('hidden');
      document.body.classList.add('overflow-hidden');
      audio.click();
    }

    function closeMenu() {
      drawer.classList.add('translate-x-full');
      if (backdrop) backdrop.classList.add('hidden');
      document.body.classList.remove('overflow-hidden');
      audio.click();
    }

    toggleBtn.addEventListener('click', openMenu);
    if (closeBtn) closeBtn.addEventListener('click', closeMenu);
    if (backdrop) backdrop.addEventListener('click', closeMenu);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !drawer.classList.contains('translate-x-full')) {
        closeMenu();
      }
    });
  }

  // --- SOUND TOGGLE BUTTON ---
  function initSoundToggle() {
    const soundBtns = document.querySelectorAll('.sound-toggle-btn');
    soundBtns.forEach((btn) => {
      const updateIcon = () => {
        const icon = btn.querySelector('.material-symbols-outlined');
        if (icon) {
          icon.textContent = audio.enabled ? 'volume_up' : 'volume_off';
        }
        btn.setAttribute('title', audio.enabled ? 'Mute Cyber Audio' : 'Enable Cyber Audio');
      };

      updateIcon();

      btn.addEventListener('click', () => {
        audio.toggle();
        updateIcon();
        if (audio.enabled) audio.success();
      });
    });

    // Attach hover & click sound listeners to interactive items
    document.querySelectorAll('a, button, input, select, textarea').forEach((el) => {
      el.addEventListener('mouseenter', () => {
        if (!el.disabled) audio.hover();
      });
      el.addEventListener('click', () => {
        if (!el.disabled) audio.click();
      });
    });
  }

  // --- LIVE TELEMETRY UPDATE ---
  function initTelemetry() {
    const latencyEls = document.querySelectorAll('.live-latency-val');
    setInterval(() => {
      const jitter = Math.floor(Math.random() * 9) + 4; // 4ms - 12ms
      latencyEls.forEach((el) => {
        el.textContent = `${jitter}ms`;
      });
    }, 3500);

    const clockEls = document.querySelectorAll('.live-utc-time');
    function updateClock() {
      const now = new Date();
      const utcStr = now.toISOString().replace('T', ' ').substring(11, 19) + ' UTC';
      clockEls.forEach((el) => {
        el.textContent = utcStr;
      });
    }
    updateClock();
    setInterval(updateClock, 1000);
  }

  // --- INTERACTIVE DIAGNOSTIC CLI TERMINAL ---
  function initDiagnosticCLI() {
    const toggleBtn = document.getElementById('terminalToggleBtn');
    const terminal = document.getElementById('diagnosticTerminal');
    const closeBtn = document.getElementById('closeDiagnosticBtn');
    const cliInput = document.getElementById('cliInput');
    const cliOutput = document.getElementById('cliOutput');

    if (!terminal) return;

    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        terminal.classList.toggle('hidden');
        if (!terminal.classList.contains('hidden') && cliInput) {
          cliInput.focus();
          audio.success();
        }
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        terminal.classList.add('hidden');
        audio.click();
      });
    }

    if (!cliInput || !cliOutput) return;

    const commandHistory = [];
    let historyIdx = -1;

    const COMMANDS = {
      help: () => `AVAILABLE COMMANDS:
  [skills]     Inspect technical stack and competencies
  [projects]   List deployed production modules and repositories
  [about]      Access developer bio and technical dossier
  [contact]    Initialize direct neural communications
  [ping]       Query live network latency to AP-SOUTH cluster
  [matrix]     Trigger 5s radioactive phosphor rain
  [clear]      Clear terminal screen
  [close]      Minimize diagnostic HUD panel`,

      skills: () => `SYNAPSE MATRIX V4:
  - Languages:  Python (94%), JavaScript ESNext (96%), HTML5/CSS3 (98%)
  - Frameworks: React 19, Three.js / WebGL, FastAPI, Tailwind CSS
  - Systems:    Git, Linux, Docker, RESTful Architecture, WebSockets`,

      projects: () => `DEPLOYED REPOSITORIES:
  1. Personal Portfolio [Obsidian Radium] // Status: LIVE_PROD
  2. Python Practice Lab [Algo Engine]    // Status: 100% TESTED
  3. AI Assistant Interface [Cognitive Agent] // Status: PROTOTYPE v2`,

      about: () => `DEV IDENTITY: ADITHYA // THE CREATOR
  - Discipline: Full-Stack Engineering & Cyber Interfaces
  - Location:   Hyderabad, India (AP-SOUTH)
  - Objective:  Building high-throughput, low-latency synthetic software systems.`,

      contact: () => `COMMUNICATION VECTORS:
  - Email:    adithya.dev@nexus.corp
  - GitHub:   github.com/adithya-dev
  - Status:   OPEN FOR INTERNSHIPS & VENTURE LAB ROLES`,

      ping: () => `Pinging ap-south-1.obsidian-radium.network:
  64 bytes from 13.232.0.1: icmp_seq=1 ttl=118 time=4.2ms
  64 bytes from 13.232.0.1: icmp_seq=2 ttl=118 time=5.1ms
  --- Ping Statistics: 0% packet loss, min/avg/max = 4.2/4.6/5.1 ms ---`,

      clear: () => {
        cliOutput.innerHTML = '';
        return '';
      },

      close: () => {
        terminal.classList.add('hidden');
        return 'Terminal closed.';
      },

      matrix: () => {
        triggerMatrixRain();
        return 'MATRIX PHOSPHOR CASCADE ACTIVATED.';
      }
    };

    cliInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const cmd = cliInput.value.trim().toLowerCase();
        if (cmd) {
          commandHistory.push(cmd);
          historyIdx = commandHistory.length;
          printLine(`> ${cmd}`, 'text-primary-container font-semibold');

          if (COMMANDS[cmd]) {
            const res = COMMANDS[cmd]();
            if (res) printLine(res, 'text-on-surface-variant whitespace-pre-wrap');
            audio.click();
          } else {
            printLine(`Command not recognized: "${cmd}". Type 'help' for instructions.`, 'text-[#ffb4ab]');
            audio.error();
          }
          cliInput.value = '';
          terminal.scrollTop = terminal.scrollHeight;
        }
      } else if (e.key === 'ArrowUp') {
        if (historyIdx > 0) {
          historyIdx--;
          cliInput.value = commandHistory[historyIdx] || '';
        }
      } else if (e.key === 'ArrowDown') {
        if (historyIdx < commandHistory.length - 1) {
          historyIdx++;
          cliInput.value = commandHistory[historyIdx] || '';
        } else {
          historyIdx = commandHistory.length;
          cliInput.value = '';
        }
      }
    });

    function printLine(text, className = '') {
      const div = document.createElement('div');
      div.className = `py-0.5 ${className}`;
      div.textContent = text;
      cliOutput.appendChild(div);
    }
  }

  // --- MATRIX RAIN EASTER EGG ---
  function triggerMatrixRain() {
    let mCanvas = document.getElementById('matrix-rain-canvas');
    if (!mCanvas) {
      mCanvas = document.createElement('canvas');
      mCanvas.id = 'matrix-rain-canvas';
      mCanvas.className = 'fixed inset-0 z-50 pointer-events-none';
      document.body.appendChild(mCanvas);
    }

    mCanvas.style.display = 'block';
    const ctx = mCanvas.getContext('2d');
    mCanvas.width = window.innerWidth;
    mCanvas.height = window.innerHeight;

    const chars = '0123456789ABCDEFѬΨΩΣΔΞΘΛADITHYA#39FF14';
    const fontSize = 14;
    const columns = Math.floor(mCanvas.width / fontSize);
    const drops = Array(columns).fill(1);

    let active = true;

    function renderMatrix() {
      if (!active) return;
      ctx.fillStyle = 'rgba(19, 19, 27, 0.08)';
      ctx.fillRect(0, 0, mCanvas.width, mCanvas.height);

      ctx.fillStyle = '#39ff14';
      ctx.font = `${fontSize}px "Space Mono", monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > mCanvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      requestAnimationFrame(renderMatrix);
    }

    renderMatrix();

    setTimeout(() => {
      active = false;
      mCanvas.style.display = 'none';
    }, 5000);
  }

  // Initialize all cyber components when DOM is ready
  document.addEventListener('DOMContentLoaded', () => {
    initParticleCanvas();
    initMobileMenu();
    initSoundToggle();
    initTelemetry();
    initDiagnosticCLI();
  });
})();
