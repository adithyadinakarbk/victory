/**
 * Contact & Transmission Handling Engine
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    const toast = document.getElementById('cyberToast');
    const toastMsg = document.getElementById('toastMessage');
    const statusOrb = document.getElementById('formStatusOrb');
    const statusText = document.getElementById('formStatusText');
    const submitBtn = document.getElementById('submitBtn');

    function showToast(message, isError = false) {
      if (!toast || !toastMsg) return;
      toastMsg.textContent = message;
      toast.classList.remove('hidden', 'translate-y-10', 'opacity-0');
      toast.classList.add('translate-y-0', 'opacity-100');

      if (isError) {
        toast.classList.add('border-error');
        toast.classList.remove('border-primary-container');
        if (window.cyberAudio) window.cyberAudio.error();
      } else {
        toast.classList.remove('border-error');
        toast.classList.add('border-primary-container');
        if (window.cyberAudio) window.cyberAudio.success();
      }

      setTimeout(() => {
        toast.classList.add('translate-y-10', 'opacity-0');
        setTimeout(() => toast.classList.add('hidden'), 300);
      }, 4000);
    }

    // Copy to clipboard handlers
    document.querySelectorAll('.copy-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const textToCopy = btn.getAttribute('data-copy');
        if (textToCopy) {
          navigator.clipboard.writeText(textToCopy).then(() => {
            showToast(`COPIED TO CLIPBOARD: ${textToCopy}`);
          }).catch(() => {
            showToast(`FAILED TO COPY: ${textToCopy}`, true);
          });
        }
      });
    });

    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('senderName')?.value.trim();
      const email = document.getElementById('senderEmail')?.value.trim();
      const topic = document.getElementById('transmissionTopic')?.value;
      const message = document.getElementById('transmissionBody')?.value.trim();

      if (!name || !email || !message) {
        showToast('TRANSMISSION ABORTED: Missing required fields.', true);
        return;
      }

      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showToast('INVALID TRANSMISSION ROUTE: Invalid email format.', true);
        return;
      }

      // Transmission simulation
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <span class="inline-block w-4 h-4 border-2 border-surface-container-lowest border-t-primary-container rounded-full animate-spin"></span>
          <span>ENCRYPTING & TRANSMITTING...</span>
        `;
      }

      if (statusOrb && statusText) {
        statusOrb.className = 'w-2 h-2 rounded-full bg-[#ccff00] animate-ping';
        statusText.textContent = 'UPLINK SYNCHRONIZING';
      }

      setTimeout(() => {
        // Save transmission locally
        const transmissions = JSON.parse(localStorage.getItem('adithya_transmissions') || '[]');
        transmissions.push({
          id: 'TX_' + Date.now().toString(36).toUpperCase(),
          name,
          email,
          topic,
          message,
          timestamp: new Date().toISOString()
        });
        localStorage.setItem('adithya_transmissions', JSON.stringify(transmissions));

        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = `
            <span>TRANSMIT PACKET</span>
            <span class="material-symbols-outlined text-[18px]">send</span>
          `;
        }

        if (statusOrb && statusText) {
          statusOrb.className = 'w-2 h-2 rounded-full bg-primary-container shadow-[0_0_8px_#39ff14]';
          statusText.textContent = 'TRANSMISSION CONFIRMED // ACK: 200';
        }

        form.reset();
        showToast(`PACKET DISPATCHED! ACKNOWLEDGMENT RECEIVED FROM NODE.`);
      }, 1200);
    });
  });
})();
