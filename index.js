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
const maxPage = 1;
const page = 1;
const searchQuery = "";

const url = "https://rickandmortyapi.com/api/character";

export async function fetchCharacters() {
  try {
    const response = await fetch(url);
    if (!response) {
      console.error("Error");
    } else {
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

fetchCharacters();

// const characters = fetchCharacters();
// console.log(characters);

function renderCard(element) {
  cardContainer.append(element);
}
