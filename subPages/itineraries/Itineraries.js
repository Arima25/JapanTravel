document.addEventListener("DOMContentLoaded", () => {
  const cards = Array.from(
    document.querySelectorAll(".itinerary-card")
  );

  const lengthChips = Array.from(
    document.querySelectorAll(".chip-length")
  );

  const tagChips = Array.from(
    document.querySelectorAll(".chip-tag")
  );

  // Expand / collapse cards + anime overlay
  cards.forEach((card) => {
    const toggleBtn = card.querySelector(
      ".toggle-details"
    );

    if (!toggleBtn) return;

    toggleBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const body = card.querySelector('.itinerary-body');
      if (!body) return;

      const isOpen = card.classList.contains('is-open');

      // Toggle only the clicked card independently
      if (isOpen) {
        body.style.maxHeight = '0px';
        card.classList.remove('is-open');
      } else {
        body.style.maxHeight = body.scrollHeight + 'px';
        card.classList.add('is-open');

        // Small fun overlay
        const overlay = document.createElement('div');
        overlay.className = 'anime-overlay';
        const inner = document.createElement('div');
        inner.className = 'anime-overlay-inner';
        const faces = ['(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧', '(≧▽≦)', '(๑˃ᴗ˂)ﻭ', '(☆▽☆)'];
        inner.textContent = faces[Math.floor(Math.random() * faces.length)];
        overlay.appendChild(inner);
        card.appendChild(overlay);
        setTimeout(() => overlay.remove(), 600);
      }
    });
  });

  // Filter by length
  lengthChips.forEach((chip) => {
    chip.addEventListener("click", () => {
      lengthChips.forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");

      const len = chip.dataset.length || "all";

      cards.forEach((card) => {
        const cardLen = card.getAttribute("data-length");
        if (len === "all" || !cardLen) {
          card.style.display = "";
        } else {
          card.style.display = cardLen === len ? "" : "none";
        }
      });
    });
  });

  // Food / anime / onsen emphasis (highlight matching lines)
  tagChips.forEach((chip) => {
    chip.addEventListener("click", () => {
      // allow single active tag
      tagChips.forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");

      const tag = chip.dataset.tag;

      cards.forEach((card) => {
        const cardTags = (card.getAttribute("data-tags") || "").toLowerCase();
        const body = card.querySelector(".itinerary-body");
        if (!body) return;

        // Clear previous highlights
        body
          .querySelectorAll(".food-highlighted")
          .forEach((el) => el.classList.remove("food-highlighted"));

        if (!tag) return;

        if (tag === "food") {
          // Highlight lines with .line-food
          body
            .querySelectorAll(".line-food")
            .forEach((el) => el.parentElement?.classList.add("food-highlighted"));
        } else if (cardTags.includes(tag)) {
          // Lightly highlight the whole body for matching tag
          body.classList.add("food-highlighted");
        }
      });
    });
  });

  // "Copy this plan" – copy plain text of day-list
  const copyButtons = Array.from(
    document.querySelectorAll(".copy-plan")
  );

  copyButtons.forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      e.stopPropagation();
      const card = btn.closest(".itinerary-card");
      if (!card) return;

      const days = card.querySelector(".day-list");
      if (!days) return;

      const text = days.textContent || "";

      try {
        await navigator.clipboard.writeText(text.trim());
        const original = btn.textContent;
        btn.textContent = "Copied!";
        setTimeout(() => {
          btn.textContent = original || "Copy this plan";
        }, 1200);
      } catch {
        // Fallback: select text visually if clipboard API fails
        const range = document.createRange();
        range.selectNodeContents(days);
        const sel = window.getSelection();
        sel?.removeAllRanges();
        sel?.addRange(range);
      }
    });
  });
});
