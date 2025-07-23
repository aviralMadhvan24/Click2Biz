import fetch from 'node‑fetch';
export async function createTrelloBoard(clientName, purchaseId, services) {
  const board = await fetch(`https://api.trello.com/1/boards/?name=${clientName}-${purchaseId}&key=${process.env.TRELLO_KEY}&token=${process.env.TRELLO_TOKEN}&defaultLists=false`, { method:'POST' }).then(r=>r.json());
  // create lists & cards...
  return board.url;
}
