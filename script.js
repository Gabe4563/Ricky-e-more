const resultsDiv = document.getElementById("results");

// Create a simple card with name and image only
function createCharacterCard(character) {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <img src="${character.image}" alt="${character.name}">
    <h3>${character.name}</h3>
  `;
  return card;
}

// Fetch all characters
async function fetchAllCharacters(limit = 200) {
  const apiUrl = `https://demon-slayer-api.onrender.com/v1/?limit=${limit}`;
  resultsDiv.innerHTML = "<p>Loading characters...</p>";

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const characters = await response.json();

    if (!Array.isArray(characters) || characters.length === 0) {
      resultsDiv.innerHTML = "<p>No characters found.</p>";
      return;
    }

    resultsDiv.innerHTML = "";
    characters.forEach(character => {
      const card = createCharacterCard(character);
      resultsDiv.appendChild(card);
    });

    console.log("All characters:", characters);
    return characters;

  } catch (error) {
    console.error("Error fetching characters:", error);
    resultsDiv.innerHTML = "<p>Error loading characters.</p>";
    return [];
  }
}

// Fetch on page load
fetchAllCharacters();
