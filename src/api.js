const API_BASE_URL = "https://deckofcardsapi.com/api/deck";

export async function drawCard(deckId) {
  const response = await fetch(`${API_BASE_URL}/${deckId}/draw/?count=1`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(`An error occurred: ${data.message}`);
  }

  return data;
}

export async function createDeck() {
  const response = await fetch(`${API_BASE_URL}/new/shuffle/?deck_count=1`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(`An error occurred: ${data.message}`);
  }

  return data;
}
