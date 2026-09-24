document.addEventListener("DOMContentLoaded", () => {

  /* ========================================
     MOBILE NAVIGATION
  ======================================== */

  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".primary-nav");

  if (menuToggle && nav) {

    const closeMenu = () => {
      nav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation menu");
    };

    const openMenu = () => {
      nav.classList.add("is-open");
      menuToggle.setAttribute("aria-expanded", "true");
      menuToggle.setAttribute("aria-label", "Close navigation menu");

      // Move keyboard focus to the first navigation link
      const firstLink = nav.querySelector("a");

      if (firstLink) {
        firstLink.focus();
      }
    };

    menuToggle.addEventListener("click", () => {

      const isOpen = nav.classList.contains("is-open");

      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }

    });

    /* Close menu when Escape is pressed */
    document.addEventListener("keydown", (event) => {

      if (event.key === "Escape" && nav.classList.contains("is-open")) {
        closeMenu();
        menuToggle.focus();
      }

    });

    /* Close mobile menu after selecting a navigation link */
    nav.querySelectorAll("a").forEach((link) => {

      link.addEventListener("click", () => {

        if (window.innerWidth <= 900) {
          closeMenu();
        }

      });

    });

    /* Close menu when clicking outside of it */
    document.addEventListener("click", (event) => {

      if (
        nav.classList.contains("is-open") &&
        !nav.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        closeMenu();
      }

    });

  }


  /* ========================================
     CONTACT FORM
  ======================================== */

  const contactForm = document.querySelector("#contact-form");
  const formMessage = document.querySelector("#form-message");

  if (contactForm && formMessage) {

    contactForm.addEventListener("submit", (event) => {

      event.preventDefault();

      formMessage.textContent =
        "Thanks! This demonstration form is working, but it does not send a real message yet.";

      /*
        Screen readers will announce the message
        if #form-message uses aria-live="polite".
      */

      formMessage.setAttribute("role", "status");
      formMessage.setAttribute("aria-live", "polite");

      contactForm.reset();

      // Return focus to the message so keyboard users
      // know the submission was processed.
      formMessage.setAttribute("tabindex", "-1");
      formMessage.focus();

    });

  }


  /* ========================================
     WALLET SECURITY SCANNER
  ======================================== */

  const scanForm = document.querySelector("#scan-form");
  const scanResult = document.querySelector("#scan-result");
  const walletInput = document.querySelector("#wallet-input");

  if (scanForm && scanResult) {

    scanForm.addEventListener("submit", (event) => {

      event.preventDefault();

      const value = walletInput
        ? walletInput.value.trim()
        : "";

      /* Don't run the scan if the field is empty */
      if (!value) {

        if (walletInput) {

          walletInput.setAttribute(
            "aria-invalid",
            "true"
          );

          walletInput.focus();

        }

        scanResult.textContent =
          "Please enter a wallet address before starting the scan.";

        scanResult.setAttribute(
          "role",
          "alert"
        );

        return;

      }

      /* Valid input */
      if (walletInput) {
        walletInput.setAttribute(
          "aria-invalid",
          "false"
        );
      }

      scanResult.textContent =
        "Demo scan complete: review required. This prototype does not query a live blockchain.";

      /*
        role=status allows screen readers to announce
        the result without aggressively interrupting
        the user.
      */
      scanResult.setAttribute(
        "role",
        "status"
      );

      scanResult.setAttribute(
        "aria-live",
        "polite"
      );

    });

  }


  /* ========================================
     CLEAR SECURITY ALERTS
  ======================================== */

  const clearAlerts = document.querySelector("#clear-alerts");
  const alertList = document.querySelector("#alert-list");

  if (clearAlerts && alertList) {

    clearAlerts.addEventListener("click", () => {

      alertList.innerHTML =
        '<p class="form-result" role="status" aria-live="polite">Alerts cleared for this demo session.</p>';

      /*
        Move focus back to the clear-alerts button
        so keyboard users don't lose their place.
      */
      clearAlerts.focus();

    });

  }


  /* ========================================
     ACCESSIBLE EXTERNAL / INTERACTIVE STATES
  ======================================== */

  /*
    If the user resizes the browser from mobile
    to desktop while the menu is open, reset the
    mobile navigation state.
  */

  window.addEventListener("resize", () => {

    if (
      window.innerWidth > 900 &&
      nav &&
      nav.classList.contains("is-open")
    ) {
      nav.classList.remove("is-open");

      if (menuToggle) {
        menuToggle.setAttribute(
          "aria-expanded",
          "false"
        );

        menuToggle.setAttribute(
          "aria-label",
          "Open navigation menu"
        );
      }
    }

  });

});
