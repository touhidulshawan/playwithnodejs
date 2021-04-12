interface Note {
  id: number;
  note: string;
}

const myNotes: Array<Note> = [
  { id: 1, note: "I have to go to class at 10AM" },
  { id: 2, note: "I have to go to market to buy egss" },
];

export const getNotes = () => {
  return myNotes;
};
