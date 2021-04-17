"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readNote = exports.listNotes = exports.removeNote = exports.addNote = void 0;
var fs_1 = __importDefault(require("fs"));
var chalk_1 = __importDefault(require("chalk"));
var addNote = function (title, body) {
    var notes = loadNotes();
    var duplicateNote = notes.find(function (note) { return note.title === title; });
    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body,
        });
        saveNotes(notes);
        console.log(chalk_1.default.green.inverse("Note added successfully"));
    }
    else {
        console.log(chalk_1.default.red.inverse("Duplicate Note title found"));
    }
};
exports.addNote = addNote;
var removeNote = function (title) {
    var notes = loadNotes();
    var updatedNotes = notes.filter(function (note) { return note.title !== title; });
    if (notes.length > updatedNotes.length) {
        console.log(chalk_1.default.green.inverse("Note is removed"));
        saveNotes(updatedNotes);
    }
    else {
        console.log(chalk_1.default.red.inverse("Note not found"));
    }
};
exports.removeNote = removeNote;
var listNotes = function () {
    var notes = loadNotes();
    console.log(chalk_1.default.cyan.inverse("Your Notes\n"));
    notes.map(function (note) {
        console.log(chalk_1.default.bgBlue.white(note.title) + "\n" + chalk_1.default.bgGray.white(note.body) + "\n");
    });
};
exports.listNotes = listNotes;
var readNote = function (title) {
    var notes = loadNotes();
    var findNote = notes.find(function (note) { return note.title === title; });
    if (findNote) {
        console.log(chalk_1.default.bgBlue.white(findNote.title) + "\n" + chalk_1.default.bgGray.white(findNote.body) + "\n");
    }
    else {
        console.log(chalk_1.default.red.inverse("Note not found. Invalid Note Title"));
    }
};
exports.readNote = readNote;
var saveNotes = function (notes) {
    var dataJson = JSON.stringify(notes);
    fs_1.default.writeFileSync("../data/notes.json", dataJson);
};
var loadNotes = function () {
    try {
        var dataBuffer = fs_1.default.readFileSync("../data/notes.json");
        var dataString = dataBuffer.toString();
        return JSON.parse(dataString);
    }
    catch (err) {
        return [];
    }
};
//# sourceMappingURL=notes.js.map