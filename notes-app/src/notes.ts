import fs from "fs";

interface NoteProps {
  title: string;
  body: string;
}

export const getNotes = () => {
  return "Notes...";
};

export const addNote = (title: string, body: string) => {
  // get copy of existing notes
  const notes: Array<NoteProps> = loadNotes();
  notes.push({
    title: title,
    body: body,
  });
  saveNotes(notes);
};

const saveNotes = (notes: Array<NoteProps>) => {
  const dataJson = JSON.stringify(notes);
  fs.writeFileSync("../data/notes.json", dataJson);
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("../data/notes.json");
    const dataString = dataBuffer.toString();
    return JSON.parse(dataString);
  } catch (err) {
    return [];
  }
};
