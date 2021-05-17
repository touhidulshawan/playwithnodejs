const add = (firstNumber: number, secondNumber: number, callback: Function) => {
  setTimeout(() => {
    callback(firstNumber + secondNumber);
  }, 2000);
};

add(4, 1, (sum: number) => {
  console.log(sum);
});
