// src/utils/db.js
import { openDB } from "idb";

const DB_NAME = "ClubPlayersDB";
const STORE_NAME = "players";

export async function initDB() {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, {
          keyPath: "id",
          autoIncrement: true,
        });
      }
    },
  });
}

export async function getAllPlayers() {
  const db = await initDB();
  return await db.getAll(STORE_NAME);
}

export async function savePlayers(players) {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, "readwrite");
  await tx.store.clear(); // Borrar los existentes
  for (const player of players) {
    await tx.store.add(player);
  }
  await tx.done;
}

export async function deletePlayer(id) {
  const db = await initDB();
  await db.delete(STORE_NAME, id);
}
