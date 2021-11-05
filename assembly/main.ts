import { PlayerStep, steps } from './model';

export function addStep(number:i32): void {
  steps.push(new PlayerStep(number));
}

export function newGame():void {
  const end = steps.length;
  for(let i = 0; i<end; i++) {
    steps.pop();
  }
}

export function showAllSteps():PlayerStep[]{
  const allSteps = steps.length;
  const result = new Array<PlayerStep>(allSteps);
  for(let i=0; i<allSteps; i++) {
    result[i] = steps[i];
  }
  return result;
}

export function checkWinner(): string {
  const field = new Array<string>(9);

  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  const emptyField:string = ".";
  for(let i = 0; i< 9; i++) {
    field[i] = emptyField;
  }

  for(let i =0 ; i<steps.length; i++) {
    const index:i32 = steps[i].count;
    const index2 = <i32>index;
    field[index2] = i % 2? "O": "X";
  }

  // check 1
  if(field[0] === "X" && field[1] === "X" && field[2] === "X") return "Winner: FIRST PLAYER!";
  if(field[3] === "X" && field[4] === "X" && field[5] === "X") return "Winner: FIRST PLAYER!";
  if(field[6] === "X" && field[7] === "X" && field[8] === "X") return "Winner: FIRST PLAYER!";

  if(field[0] === "X" && field[3] === "X" && field[6] === "X") return "Winner: FIRST PLAYER!";
  if(field[1] === "X" && field[4] === "X" && field[7] === "X") return "Winner: FIRST PLAYER!";
  if(field[2] === "X" && field[5] === "X" && field[8] === "X") return "Winner: FIRST PLAYER!";

  if(field[0] === "X" && field[4] === "X" && field[8] === "X") return "Winner: FIRST PLAYER!";
  if(field[2] === "X" && field[4] === "X" && field[6] === "X") return "Winner: FIRST PLAYER!";

  // check 2
  if(field[0] === "O" && field[1] === "O" && field[2] === "O") return "Winner: SECOND PLAYER!";
  if(field[3] === "O" && field[4] === "O" && field[5] === "O") return "Winner: SECOND PLAYER!";
  if(field[6] === "O" && field[7] === "O" && field[8] === "O") return "Winner: SECOND PLAYER!";

  if(field[0] === "O" && field[3] === "O" && field[6] === "O") return "Winner: SECOND PLAYER!";
  if(field[1] === "O" && field[4] === "O" && field[7] === "O") return "Winner: SECOND PLAYER!";
  if(field[2] === "O" && field[5] === "O" && field[8] === "O") return "Winner: SECOND PLAYER!";

  if(field[0] === "O" && field[4] === "O" && field[8] === "O") return "Winner: SECOND PLAYER!";
  if(field[2] === "O" && field[4] === "O" && field[6] === "O") return "Winner: SECOND PLAYER!";


return "No winner"
}

