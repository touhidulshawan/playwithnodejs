"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var yargs_1 = __importDefault(require("yargs"));
yargs_1.default.command({
    command: "add",
    describe: "Add a note",
    handler: function () {
        console.log("Adding a note");
    },
});
yargs_1.default.command({
    command: "remove",
    describe: "Remove a note",
    handler: function () {
        console.log("Remvoe a note");
    },
});
yargs_1.default.command({
    command: "read",
    describe: "View a note",
    handler: function () {
        console.log("Viewing a note");
    },
});
yargs_1.default.command({
    command: "list",
    describe: "Listing all notes",
    handler: function () {
        console.log("Listing add notes");
    },
});
console.log(yargs_1.default.argv);
