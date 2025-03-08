// TlálocTech - Script principal
document.addEventListener("DOMContentLoaded", function () {
  // Aplicar transiciones suaves a elementos interactivos
  document.querySelectorAll("a, button, .feature-card").forEach((element) => {
    element.classList.add("smooth-transition");
  });

  // Añadir clase ripple-button a todos los botones
  document.querySelectorAll("button").forEach((button) => {
    button.classList.add("ripple-button");
    button.addEventListener("click", createRippleEffect);
  });

  // Menú móvil
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");

  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.setAttribute("aria-expanded", "false");
    mobileMenuButton.setAttribute("aria-controls", "mobile-menu");

    mobileMenuButton.addEventListener("click", function () {
      const isExpanded = this.getAttribute("aria-expanded") === "true";
      this.setAttribute("aria-expanded", !isExpanded);
      mobileMenu.classList.toggle("hidden");
      mobileMenuButton.classList.toggle("open");
    });
  }

  // Funcionalidad de WhatsApp
  const whatsappButton = document.getElementById("whatsapp-button");
  const nameInput = document.getElementById("name");

  if (whatsappButton && nameInput) {
    whatsappButton.addEventListener("click", function () {
      const name = nameInput.value.trim();
      const baseMessage = name
        ? `Hola TlálocTech, mi nombre es ${name} y me gustaría saber más sobre sus productos.`
        : "Hola TlálocTech, me gustaría saber más sobre sus productos.";
      const encodedMessage = encodeURIComponent(baseMessage);
      const whatsappUrl = `https://wa.me/5219512533379?text=${encodedMessage}`;
      window.open(whatsappUrl, "_blank");
    });
  }

  // Navegación suave
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop,
          behavior: "smooth",
        });

        if (mobileMenu && !mobileMenu.classList.contains("hidden")) {
          mobileMenu.classList.add("hidden");
          if (mobileMenuButton) mobileMenuButton.classList.remove("open");
        }
      }
    });
  });

  // Animaciones de revelación al hacer scroll
  const revealElements = document.querySelectorAll(".reveal");

  function checkReveal() {
    const windowHeight = window.innerHeight;
    const revealPoint = 150;

    revealElements.forEach((element) => {
      const revealTop = element.getBoundingClientRect().top;

      if (revealTop < windowHeight - revealPoint) {
        element.classList.add("active");
      }
    });
  }

  // Añadir efecto de agua a elementos
  const logo = document.querySelector(".header-logo h1");
  if (logo) {
    logo.classList.add("water-drop");
  }

  // Añadir clase float-element a iconos
  document.querySelectorAll(".feature-card i").forEach((icon) => {
    icon.classList.add("float-element");
  });

  // Función para crear efecto de ondulación en botones
  function createRippleEffect(event) {
    const button = event.currentTarget;
    const ripple = document.createElement("span");

    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    ripple.style.width = ripple.style.height = `${diameter}px`;
    ripple.style.left = `${
      event.clientX - button.getBoundingClientRect().left - radius
    }px`;
    ripple.style.top = `${
      event.clientY - button.getBoundingClientRect().top - radius
    }px`;
    ripple.classList.add("ripple");

    const existingRipple = button.querySelector(".ripple");
    if (existingRipple) {
      existingRipple.remove();
    }

    button.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  }

  // Añadir contador de impacto ambiental
  const impactCounter = document.querySelector(".impact-counter");
  if (impactCounter) {
    const targetNumber =
      parseInt(impactCounter.getAttribute("data-target")) || 1000;
    let count = 0;
    const duration = 2000; // 2 segundos
    const interval = 20; // 20ms entre actualizaciones
    const increment = targetNumber / (duration / interval);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const timer = setInterval(() => {
              count += increment;
              if (count >= targetNumber) {
                impactCounter.textContent = targetNumber.toLocaleString();
                clearInterval(timer);
              } else {
                impactCounter.textContent = Math.floor(count).toLocaleString();
              }
            }, interval);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(impactCounter);
  }

  // Mejorar la experiencia de formulario
  const formInputs = document.querySelectorAll("input, textarea");
  formInputs.forEach((input) => {
    // Añadir clase activa cuando el input tiene contenido
    input.addEventListener("blur", function () {
      if (this.value.trim() !== "") {
        this.classList.add("has-content");
      } else {
        this.classList.remove("has-content");
      }
    });
  });

  // Inicializar comprobación de elementos revelados
  checkReveal();
  window.addEventListener("scroll", checkReveal);

  // Añadir efecto parallax al hacer scroll
  window.addEventListener("scroll", function () {
    const scrollPosition = window.pageYOffset;

    // Parallax para el hero section
    const heroSection = document.querySelector("header");
    if (heroSection) {
      heroSection.style.backgroundPosition = `50% ${scrollPosition * 0.4}px`;
    }
  });

  // Añadir animación de entrada a elementos del hero
  const heroElements = document.querySelectorAll("header h2, header p");
  heroElements.forEach((element, index) => {
    element.style.opacity = "0";
    element.style.animation = `fadeIn 0.8s ease-out ${
      0.2 + index * 0.2
    }s forwards`;
  });
});
