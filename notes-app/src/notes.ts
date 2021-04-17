import fs from "fs";
import chalk from "chalk";

interface NoteProps {
  title: string;
  body: string;
}

export const getNotes = () => {
  return "Notes...";
};

// add note
export const addNote = (title: string, body: string) => {
  // get copy of existing notes
  const notes: Array<NoteProps> = loadNotes();
  notes.push({
    title: title,
    body: body,
  });
  saveNotes(notes);
  console.log(chalk.green.inverse("Note added successfully"));
};

// remove a note

export const removeNote = (title: string) => {
  // get copy of existing notes
  const notes: Array<NoteProps> = loadNotes();
  const updatedNotes: Array<NoteProps> = notes.filter(
    (note) => note.title !== title
  );

  // check if note is actually remove or not
  if (notes.length > updatedNotes.length) {
    console.log(chalk.green.inverse("Note is removed"));
    saveNotes(updatedNotes);
  } else {
    console.log(chalk.red.inverse("Note not found"));
  }
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
