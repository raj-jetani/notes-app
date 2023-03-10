const express = require("express");
const { getAllNotes, addNote, renderEditNote, editNote, deleteNote } = require("../controllers/notesController")
const { isAuthenticatedUser } = require("../middleware/auth")
const router = express.Router();

router.route("/").get(isAuthenticatedUser, getAllNotes);
router.route("/add-note").post(isAuthenticatedUser, addNote);
router.route("/edit-note/:id").get(isAuthenticatedUser, renderEditNote);
router.route("/edit-note/:id").put(isAuthenticatedUser, editNote);
router.route("/delete-note/:id").delete(isAuthenticatedUser, deleteNote);

module.exports = router;