import fs from "fs";
import chalk from "chalk";

interface NoteProps {
  title: string;
  body: string;
}

// add note
export const addNote = (title: string, body: string) => {
  debugger;
  // get copy of existing notes
  const notes: Array<NoteProps> = loadNotes();
  // check is there any note with same title
  const duplicateNote = notes.find((note) => note.title === title);

  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body,
    });
    saveNotes(notes);
    console.log(chalk.green.inverse("Note added successfully"));
  } else {
    console.log(chalk.red.inverse("Duplicate Note title found"));
  }
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

// list all notes

export const listNotes = () => {
  const notes: Array<NoteProps> = loadNotes();
  console.log(chalk.cyan.inverse("Your Notes\n"));
  notes.map((note) => {
    console.log(
      `${chalk.bgBlue.white(note.title)}\n${chalk.bgGray.white(note.body)}\n`
    );
  });
};

// read a note

export const readNote = (title: string) => {
  // load existing notes
  const notes: Array<NoteProps> = loadNotes();
  const findNote = notes.find((note) => note.title === title);

  if (findNote) {
    console.log(
      `${chalk.bgBlue.white(findNote.title)}\n${chalk.bgGray.white(
        findNote.body
      )}\n`
    );
  } else {
    console.log(chalk.red.inverse("Note not found. Invalid Note Title"));
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
