import createCharacterCard from "./components/card/card.js";

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

// States
let maxPage = 42;
let page = 1;
let searchQuery = "";

//let urlPage = "https://rickandmortyapi.com/api/character/?page=" + page;

export async function fetchCharacters(page, searchQuery) {
  try {
    const response = await fetch(
      "https://rickandmortyapi.com/api/character/?page=" +
        page +
        "&name=" +
        searchQuery
    );
    if (!response) {
      console.error("Error");
    } else {
      cardContainer.innerHTML = "";
      const data = await response.json();
      console.log(data);
      console.log(data.results);
      console.log(data.results[0].image);
      const characters = data.results;
      characters.forEach((character) => {
        const card = createCharacterCard(character);
        renderCard(card);
      });
    }
  } catch (error) {
    console.error("Du kannst ganix!!!");
  }
}

fetchCharacters(1, searchQuery);

// const characters = fetchCharacters();
// console.log(characters);

function renderCard(element) {
  cardContainer.append(element);
}

nextButton.addEventListener("click", () => {
  page = page + 1;
  fetchCharacters(page, searchQuery);
  pagination.innerHTML = `${page} / 42`;
  if (page === maxPage) {
    page = 0;
  }
});

prevButton.addEventListener("click", () => {
  if (page > 1) {
    page = page - 1;
    fetchCharacters(page, searchQuery);
    pagination.innerHTML = `${page} / 42`;
  }
});

searchBar.addEventListener("input", (event) => {
  searchQuery = event.target.value;
  console.log(event.target.value);
  fetchCharacters(page, searchQuery);
});
