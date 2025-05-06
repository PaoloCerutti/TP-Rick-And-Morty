const API_URL = 'https://rickandmortyapi.com/api/character/';
const characterList = document.getElementById('character-list');
const searchInput = document.getElementById('search');

let allCharacters = [];

async function fetchCharacters() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    allCharacters = data.results;
    displayCharacters(allCharacters);
  } catch (error) {
    characterList.innerHTML = `<p>Error al cargar personajes.</p>`;
    console.error(error);
  }
}

function displayCharacters(characters) {
  characterList.innerHTML = characters.map(character => `
    <div class="card">
      <img src="${character.image}" alt="${character.name}" />
      <h2>${character.name}</h2>
      <p>${character.species}</p>
    </div>
  `).join('');
}

searchInput.addEventListener('input', (e) => {
  const query = e.target.value.toLowerCase();
  const filtered = allCharacters.filter(c =>
    c.name.toLowerCase().includes(query)
  );
  displayCharacters(filtered);
});

fetchCharacters();
