"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var dataBuffer = fs_1.default.readFileSync("../../data/jsonData.json");
var readData = dataBuffer.toString();
var parsedData = JSON.parse(readData);
parsedData.name = "Touhidul";
parsedData.age = 25;
var modifiedData = JSON.stringify(parsedData);
fs_1.default.writeFileSync("../../data/jsonData.json", modifiedData);
