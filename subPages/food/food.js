// Modal Recipes Content
const recipes = {
    "Sushi": "Sushi is made from vinegared rice combined with seafood. Try it at Tsukiji market! Simple homemade recipe: Cook sushi rice, add vinegar. Slice fresh salmon or tuna. Mold rice and layer seafood; serve with soy sauce and wasabi.",
    "Ramen": "Ramen are wheat noodles in a rich broth. Recipe: Simmer chicken or pork bones, add miso/soy sauce. Cook ramen noodles separately. Top with sliced pork (chashu), a soft-boiled egg, chopped green onion, and nori.",
    "Tempura": "Tempura features seafood/vegetables dipped in flour batter and fried crisp. Mix cold water and flour, dip shrimp/sweet potato/eggplant, fry at 170°C until golden. Serve with tentsuyu sauce.",
    "Sashimi": "Sashimi is simply raw fish cut into thin slices. Always use sushi-grade fish. Serve chilled with soy sauce and freshly grated wasabi.",
    "Soba": "Soba are buckwheat noodles. Boil soba noodles, rinse in cold water. Dip in tsuyu sauce (soy mirin dashi), or serve in hot broth with leeks and mushrooms."
};
function openModal(food) {
    document.getElementById("modalTitle").innerText = food;
    document.getElementById("modalText").innerText = recipes[food];
    document.getElementById("modalBg").style.display = "flex";
}
function closeModal() {
    document.getElementById("modalBg").style.display = "none";
}

// Carousel Content
const featuredDishes = [
    {
        img: "../../asset/gyudon.jpg",
        title: "Gyudon",
        desc: "Beef bowl, Tokyo's fast food classic – try at Matsuya or Sukiya!"
    },
    {
        img: "../../asset/Monjayaki.jpg",
        title: "Monjayaki",
        desc: "Tokyo street specialty, molten savory flour pancake – visit Tsukishima!"
    },
    {
        img: "../../asset/Anago_Sushi.jpg",
        title: "Anago Sushi",
        desc: "Sea eel sushi – lighter than unagi, often available in Tokyo sushi bars."
    },
    {
        img: "../../asset/Yakitori.jpg",
        title: "Yakitori",
        desc: "Chargrilled skewered chicken, pub favorite throughout Tokyo izakayas."
    }
];
let currentSlide = 0;
function renderCarousel() {
    const fd = featuredDishes[currentSlide];
    document.getElementById("carouselSlide").innerHTML = `
        <img src="${fd.img}" alt="${fd.title}">
        <div class="carousel-caption">
            <h3>${fd.title}</h3>
            <p>${fd.desc}</p>
        </div>
    `;
}
function prevSlide() {
    currentSlide = (currentSlide - 1 + featuredDishes.length) % featuredDishes.length;
    renderCarousel();
}
function nextSlide() {
    currentSlide = (currentSlide + 1) % featuredDishes.length;
    renderCarousel();
}
// Initial load
renderCarousel();

// User Reviews
const reviewsList = document.getElementById("reviewsList");
document.getElementById("reviewForm").onsubmit = function(e) {
    e.preventDefault();
    const dish = document.getElementById("dish").value;
    const review = document.getElementById("review").value;
    const reviewDiv = document.createElement("div");
    reviewDiv.className = "review";
    reviewDiv.innerHTML = `<strong>${dish}</strong>: ${review}`;
    reviewsList.prepend(reviewDiv);
    document.getElementById("reviewForm").reset();
};
