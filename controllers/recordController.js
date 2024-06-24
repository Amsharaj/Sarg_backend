const db = require("../models");
const GridCharacter = db.GridCharacter;

exports.create = async (req, res) => {
  try {
    const gridCharacters = req.body;

    // Check if the input is an array
    if (!Array.isArray(gridCharacters)) {
      return res
        .status(400)
        .send({ message: "Input should be an array of GridCharacters" });
    }

    const results = [];

    for (const gridCharacter of gridCharacters) {
      // Check if a GridCharacter with the same properties already exists
      const existingCharacter = await GridCharacter.findOne({
        where: {
          selectedChar: gridCharacter.selectedChar,
          placedIndexOfTheCharacter: gridCharacter.placedIndexOfTheCharacter,
          row: gridCharacter.row,
          col: gridCharacter.col,
        },
      });

      if (!existingCharacter) {
        const newGridCharacter = await GridCharacter.create(gridCharacter);
        results.push(newGridCharacter);
      }
    }

    if (results.length > 0) {
      res.status(201).send(results);
    } else {
      res.status(200).send({
        message:
          "No new GridCharacters were added. All characters already exist.",
      });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.findAll = async (req, res) => {
  try {
    const gridCharacters = await GridCharacter.findAll();
    res.status(200).send(gridCharacters);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.findOne = async (req, res) => {
  try {
    const gridCharacter = await GridCharacter.findByPk(req.params.id);
    if (gridCharacter) {
      res.status(200).send(gridCharacter);
    } else {
      res.status(404).send({ message: "Record not found" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const updates = req.body;

    // Check if the updates input is an array
    if (!Array.isArray(updates)) {
      return res.status(400).send({
        message: "Input should be an array of GridCharacters to update.",
      });
    }

    // Fetch all existing records to be updated
    const existingRecords = await GridCharacter.findAll({
      where: { id: updates.map((record) => record.id) },
    });

    // Map through existing records and update them based on the input updates
    const updatedRecords = await Promise.all(
      existingRecords.map(async (record) => {
        const updateInfo = updates.find((update) => update.id === record.id);
        if (updateInfo) {
          await record.update(updateInfo);
          return record.reload();
        }
      })
    );

    // Return updated records
    res.status(200).send(updatedRecords.filter((record) => record)); // Filter out null or undefined values
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const idsToDelete = req.body.ids;

    // Check if idsToDelete is an array
    if (!Array.isArray(idsToDelete)) {
      return res
        .status(400)
        .send({ message: "Input should be an array of IDs to delete." });
    }

    // Use Promise.all to delete all records asynchronously
    await Promise.all(
      idsToDelete.map(async (id) => {
        // Delete each record by id
        const deleted = await GridCharacter.destroy({ where: { id: id } });
        // Check if any record was deleted
        if (deleted === 0) {
          throw new Error(`Record with id ${id} not found.`);
        }
      })
    );

    // If all deletions were successful, send success message
    res.status(200).send({ message: "Records deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
