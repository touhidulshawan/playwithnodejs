"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeNote = exports.addNote = exports.getNotes = void 0;
var fs_1 = __importDefault(require("fs"));
var chalk_1 = __importDefault(require("chalk"));
var getNotes = function () {
    return "Notes...";
};
exports.getNotes = getNotes;
var addNote = function (title, body) {
    var notes = loadNotes();
    notes.push({
        title: title,
        body: body,
    });
    saveNotes(notes);
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
