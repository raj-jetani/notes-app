const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema(
      {
            title: {
                  type: String,
            },
            desc: {
                  type: String,
            },
            user: {
                  type: String,
                  required: true,
            },
      },
      {
            timestamps: true,
      }

);

module.exports = mongoose.model("Note", notesSchema);
