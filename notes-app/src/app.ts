import yargs from "yargs";

// add remove list read

// add command
yargs.command({
  command: "add",
  describe: "Add a note",
  handler: () => {
    console.log("Adding a note");
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

console.log(yargs.argv);
