const { JsonDatabase } = require("brackets-json-db");
const { BracketsManager } = require("brackets-manager");

const storage = new JsonDatabase();
const manager = new BracketsManager(storage);

export default async function handler(req, res) {
  try {
    const { tournamentId } = req.body;
    const id = parseInt(tournamentId);
    await manager.delete.tournament(id);

    res.status(200).json({ message: "Tournament Deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
}
