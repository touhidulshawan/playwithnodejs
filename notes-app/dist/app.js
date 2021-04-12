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
console.log(yargs_1.default.argv);
