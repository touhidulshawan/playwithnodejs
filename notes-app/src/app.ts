import yargs from "yargs";
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
  handler: (argv) => {
    console.log(argv.title);
  },
});

// remove command
yargs.command({
  command: "remove",
  describe: "Remove a note",
  handler: () => {
    console.log("Remvoe a note");
  },
});

// read command
yargs.command({
  command: "read",
  describe: "View a note",
  handler: () => {
    console.log("Viewing a note");
  },
});

// list command
yargs.command({
  command: "list",
  describe: "Listing all notes",
  handler: () => {
    console.log("Listing add notes");
  },
});

console.log(yargs.argv);
