import yargs from "yargs";
import { addNote, listNotes, readNote, removeNote } from "./notes";

interface NoteTitle {
  title: string;
}

interface NoteExtraProps extends NoteTitle {
  body: string;
}

// add remove list read

// add command
yargs.command({
  command: "add",
  describe: "Add a note",
  builder: {
    title: {
      describe: "Note Title",
      demandOption: true,
      type: "string",
    },
    body: {
      describe: "Note Body",
      demandOption: true,
      type: "string",
    },
  },
  handler: ({ title, body }: NoteExtraProps) => {
    addNote(title, body);
  },
});

// remove command
yargs.command({
  command: "remove",
  describe: "Remove a note",
  builder: {
    title: {
      describe: "Note Title",
      demandOption: true,
      type: "string",
    },
  },
  handler: ({ title }: NoteTitle) => {
    removeNote(title);
  },
});

// read command
yargs.command({
  command: "read",
  describe: "View a note",
  builder: {
    title: {
      describe: "Note Title",
      demandOption: true,
      type: "string",
    },
  },
  handler: ({ title }: NoteTitle) => {
    readNote(title);
  },
});

// list command
yargs.command({
  command: "list",
  describe: "Listing all notes",
  handler: () => {
    listNotes();
  },
});

console.log(yargs.argv);
