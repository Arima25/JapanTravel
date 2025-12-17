document.addEventListener("DOMContentLoaded", () => {
  // 1) Expand / collapse location cards + anime overlay on click
  const locationCards = document.querySelectorAll(".location-card");

  locationCards.forEach((card) => {
    card.addEventListener("click", (e) => {
      const target = e.target;
      if (target.closest && target.closest("a, button")) return;
      // Toggle only the clicked card; do not affect others
      card.classList.toggle("is-open");

      const overlay = document.createElement("div");
      overlay.className = "anime-overlay";

      const inner = document.createElement("div");
      inner.className = "anime-overlay-inner";

      const faces = ["(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧", "(≧▽≦)", "(๑˃ᴗ˂)ﻭ", "(☆▽☆)"];
      inner.textContent = faces[Math.floor(Math.random() * faces.length)];

      overlay.appendChild(inner);
      card.appendChild(overlay);

      setTimeout(() => {
        overlay.remove();
      }, 600);
    });
  });

  // 2) Anime expression toggle button in anime section
  const expressionBtn = document.querySelector(".expression-toggle");
  const expressionFace = document.querySelector(".expression-face");
  const expressionLabel = document.querySelector(".expression-label");

  if (expressionBtn && expressionFace && expressionLabel) {
    expressionBtn.addEventListener("click", () => {
      const current = expressionFace.getAttribute("data-state");
      if (current === "calm") {
        expressionFace.textContent = "(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧";
        expressionFace.setAttribute("data-state", "hyped");
        expressionLabel.textContent = "Hyped anime fan";
        expressionBtn.classList.add("is-hyped");
      } else {
        expressionFace.textContent = "(・‿・)";
        expressionFace.setAttribute("data-state", "calm");
        expressionLabel.textContent = "Calm traveler";
        expressionBtn.classList.remove("is-hyped");
      }
    });
  }
});
