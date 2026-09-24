document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".primary-nav");

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      menuToggle.setAttribute("aria-expanded", String(open));
    });
  }

  const contactForm = document.querySelector("#contact-form");
  const formMessage = document.querySelector("#form-message");
  if (contactForm && formMessage) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();
      formMessage.textContent = "Thanks! This demonstration form is working, but it does not send a real message yet.";
      contactForm.reset();
    });
  }

  const scanForm = document.querySelector("#scan-form");
  const scanResult = document.querySelector("#scan-result");
  if (scanForm && scanResult) {
    scanForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const value = document.querySelector("#wallet-input").value.trim();
      if (!value) return;
      scanResult.textContent = "Demo scan complete: review required. This prototype does not query a live blockchain.";
    });
  }

  const clearAlerts = document.querySelector("#clear-alerts");
  const alertList = document.querySelector("#alert-list");
  if (clearAlerts && alertList) {
    clearAlerts.addEventListener("click", () => {
      alertList.innerHTML = '<p class="form-result">Alerts cleared for this demo session.</p>';
    });
  }
});
