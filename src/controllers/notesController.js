const notesModel = require("../models/notes_model");

exports.getAllNotes = (req, res) => {
    notesModel.find({ user:req.user._id}).then((result) => {
        res.render("notes/all-notes", {
            result,
            message: req.flash("message")
        })
    })
}

exports.addNote = async (req, res) => {
    const note = new notesModel({
        title: req.body.title,
        desc: req.body.desc,
        user: req.user._id
    });

    await note.save();
    req.flash("message", "Note Added Successfully")
    res.redirect("/notes/");
}

exports.renderEditNote = (req, res) => {
    notesModel.find({ _id: req.params.id }).then((result) => {
        res.render("notes/edit-note", {
            result
        })
    });

}

exports.editNote = (req, res) => {
    notesModel.updateOne({ _id: req.params.id }, {
        $set: {
            title: req.body.title,
            desc: req.body.desc
        }
    }).then((result) => {
        req.flash("message","Note Edited Successfully")
        res.redirect("/notes");
    })
}

exports.deleteNote = (req, res) => {
    notesModel.deleteOne({_id: req.params.id }).then((result) => {
        req.flash("message","Note Deleted Successfully")
        res.redirect("/notes")
    });
}

exports.logout = (req, res)=>{
    res.clearCookie("jwt");
    res.render("/");
}