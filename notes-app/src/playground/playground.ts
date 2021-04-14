import fs from "fs";

interface DataProps {
  name: string;
  planet: string;
  age: number;
}

// read data from json file
const dataBuffer = fs.readFileSync("../../data/jsonData.json");
const readData = dataBuffer.toString();
const parsedData: DataProps = JSON.parse(readData);

parsedData.name = "Touhidul";
parsedData.age = 25;

const modifiedData = JSON.stringify(parsedData);
fs.writeFileSync("../../data/jsonData.json", modifiedData);
