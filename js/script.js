//ADD JAVASCRIPT HERE
console.log("JavaScript is working!");
document.addEventListener("DOMContentLoaded", function() {
    const button = document.getElementById("myButton");
    button.addEventListener("click", function() {
        alert("Button was clicked!");
        // ----------------------
// 1. Smooth scroll for "Shop Now"  button
// ----------------------
document.addEventListener("DOMContentLoaded", function () {
  const shopBtn = document.getElementById("shopNowBtn");
  if (shopBtn) {
    shopBtn.addEventListener("click", function (e) {
      e.preventDefault();
      window.location.href = "pages/shop now.html"; // Adjust if path differs
    });
  }

  // ----------------------
  // 2. Contact Form Validation
  // ----------------------
  const contactForm = document.querySelector(".contact-form form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      if (!name || !email || !message) {
        alert("Please fill in all fields before submitting.");
        e.preventDefault();
      } else if (!/^[^ ]+@[^ ]+\.[a-z]{2,3}$/.test(email)) {
        alert("Please enter a valid email address.");
        e.preventDefault();
      } else {
        alert("Thank you for contacting Greenleaf Organic! 🌿");
      }
    });
  }

  // ----------------------
  // 3. "Add to Cart" Button Popup
  // ----------------------
  const addCartButtons = document.querySelectorAll(".add-to-cart");
  addCartButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      alert(" Item added to your cart successfully!");
    });
  });

  // ----------------------
  // 4. Light/Dark Mode Toggle
  // ----------------------
  const modeToggle = document.createElement("button");
  modeToggle.textContent = "🌓 Toggle Theme";
  modeToggle.id = "themeToggle";
  modeToggle.style.position = "fixed";
  modeToggle.style.bottom = "20px";
  modeToggle.style.right = "20px";
  modeToggle.style.padding = "10px 15px";
  modeToggle.style.border = "none";
  modeToggle.style.borderRadius = "8px";
  modeToggle.style.background = "#3a7d44";
  modeToggle.style.color = "#fff";
  modeToggle.style.cursor = "pointer";
  document.body.appendChild(modeToggle);

  modeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const isDark = document.body.classList.contains("dark-mode");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });

  // Apply saved theme
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
  }

  // ----------------------
  // 5. Back to Top Button
  // ----------------------
  const backToTop = document.createElement("button");
  backToTop.textContent = "⬆ Back to Top";
  backToTop.id = "backToTop";
  backToTop.style.position = "fixed";
  backToTop.style.bottom = "70px";
  backToTop.style.right = "20px";
  backToTop.style.padding = "10px 15px";
  backToTop.style.border = "none";
  backToTop.style.borderRadius = "8px";
  backToTop.style.background = "#3a7d44";
  backToTop.style.color = "#fff";
  backToTop.style.cursor = "pointer";
  backToTop.style.display = "none";
  document.body.appendChild(backToTop);

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTop.style.display = "block";
    } else {
      backToTop.style.display = "none";
    }
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});
    }
    );
}
);