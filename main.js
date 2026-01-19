const slider = document.querySelector(".slider");
const bannerInfoTitle = document.querySelector(".banner_info_title");
const bannerInfoMetaText = document.querySelector(".banner_info_meta_text");
const header = document.querySelector("header");
const prevBtn = document.querySelector(".banner_backBtn");
const nextBtn = document.querySelector(".banner_nextBtn");

let currentIndex = 0;
let activeCard = null;

const cards = [
  {
    id: 1,
    title: "Kimetsu no Yaiba : Infinity Castle",
    meta: "8.2 | 2021 year | 1 hour 55 minutes | Movies",
    cover: "covers/kimetsu.jpg",
    banner: "banners/kimetsubg.jpg",
    video: "ramen.mp4",
  },
  {
    id: 2,
    title: "Sousou no Frieren",
    meta: "8.9 | 2024 year | 28 episodes | TV Series",
    cover: "covers/frieren.jpg",
    banner: "banners/frierenbg.jpg",
    video: "ramen.mp4",
  },
  {
    id: 3,
    title: "The Fragrant Flower Blooms with Dignity",
    meta: "8.4 | 2025 year | 13 episodes | TV Series",
    cover: "covers/kaoru.jpg",
    banner: "banners/kaorubg.jpg",
    video: "ramen.mp4",
  },
  {
    id: 4,
    title: "Death Note",
    meta: "8.9 | 2006-2007 year | 37 episodes | TV Series",
    cover: "covers/deathnote.jpg",
    banner: "banners/deathnotebg.jpg",
    video: "ramen.mp4",
  },
  {
    id: 5,
    title: "One Piece",
    meta: "9.0 | 1999-2026 year | 1155 episodes | TV Series",
    cover: "covers/onepiece.jpg",
    banner: "banners/onepiecebg.jpg",
    video: "ramen.mp4",
  },
  {
    id: 6,
    title: "Jujutsu Kaisen",
    meta: "8.5 | 2020-2026 year | 50 episodes | TV Series",
    cover: "covers/jujutsu.jpg",
    banner: "banners/jujutsubg.jpg",
    video: "ramen.mp4",
  },
  {
    id: 7,
    title: "Vinland Saga",
    meta: "8.8 | 2019-2023 year | 48 episodes | TV Series",
    cover: "covers/vinland.jpg",
    banner: "banners/vinlandbg.jpg",
    video: "ramen.mp4",
  },
  {
    id: 8,
    title: "Cyberpunk: Edgerunners",
    meta: "8.3 | 2022 year | 10 episodes | TV Series",
    cover: "covers/cyberpunk.jpg",
    banner: "banners/cyberpunkbg.jpg",
    video: "ramen.mp4",
  },
];

cards.forEach((card) => {
  const cardEl = document.createElement("div");
  cardEl.classList.add("slider_card");
  cardEl.dataset.id = card.id;
  cardEl.innerHTML = `
    <div class="slider_card_bg"></div>
    <img class="slider_card_img" src="${card.cover}" alt="" />`;
  slider.appendChild(cardEl);
});

function updateBannerInfo(cardID) {
  bannerInfoTitle.classList.add("fade-out");
  bannerInfoMetaText.classList.add("fade-out");

  setTimeout(() => {
    bannerInfoTitle.textContent = cards[cardID].title;
    bannerInfoMetaText.textContent = cards[cardID].meta;

    bannerInfoTitle.classList.remove("fade-out");
    bannerInfoMetaText.classList.remove("fade-out");
  }, 300);
}


function activateCard(card) {
  const cardID = Number(card.dataset.id) - 1;
  const cardBg = card.querySelector(".slider_card_bg");

  // сброс предыдущей
  if (activeCard && activeCard !== card) {
    const prevBg = activeCard.querySelector(".slider_card_bg");
    prevBg.style.display = "block";
    activeCard.style.transform = "scale(1)";
  }

  // активируем текущую
  cardBg.style.display = "none";
  card.style.transform = "scale(1.2)";
  card.style.zIndex = "10";

  // обновляем фон и текст
  header.style.backgroundImage = `url(${cards[cardID].banner})`;
  header.style.backgroundRepeat = "no-repeat";
  header.style.backgroundPosition = "center";
  header.style.backgroundSize = "cover";
  updateBannerInfo(cardID);


  activeCard = card;
  currentIndex = cardID;

  scrollToActive();
}

function scrollToActive() {
  const cardWidth = activeCard.offsetWidth + 30;
  const sliderCenter = slider.offsetWidth / 2;
  const cardCenter = activeCard.offsetLeft + activeCard.offsetWidth / 2;
  slider.scrollLeft += cardCenter - sliderCenter;
}

activateCard(slider.querySelector(".slider_card"));

slider.addEventListener("click", (e) => {
  const card = e.target.closest(".slider_card");
  if (!card) return;
  activateCard(card);
  resetInterval();
});

function nextCard() {
  let nextIndex = (currentIndex + 1) % cards.length;
  const nextCardEl = slider.querySelector(
    `.slider_card[data-id='${nextIndex + 1}']`,
  );
  activateCard(nextCardEl);
}

function prevCard() {
  let prevIndex = (currentIndex - 1 + cards.length) % cards.length;
  const prevCardEl = slider.querySelector(
    `.slider_card[data-id='${prevIndex + 1}']`,
  );
  activateCard(prevCardEl);
}

let autoScroll = setInterval(nextCard, 4000);

function resetInterval() {
  clearInterval(autoScroll);
  autoScroll = setInterval(nextCard, 4000);
}

nextBtn.addEventListener("click", () => {
  nextCard();
  resetInterval();
});

prevBtn.addEventListener("click", () => {
  prevCard();
  resetInterval();
});

