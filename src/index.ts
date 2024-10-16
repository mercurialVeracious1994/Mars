
import * as readline from "readline";
import { Robot } from "./models/robot";
import { Command } from "./enums/Commands";
import { Mars } from "./models/mars";
import {validateMarsDimensions} from "./utility/validation";
import {handleBackTrackCommand, handleCommands, handleTrackCommand} from "./utility/handleCommand";

const readInputMars = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log("Please enter Mars dimensions (x y) separated by a space: ");

readInputMars.on("line", (line: string) => {
  const marsDimension = line.trim().split(" ").map(Number);
  let marsMaxCoordinate = Mars.getCoordinateLimit();
  validateMarsDimensions(marsDimension, marsMaxCoordinate);
  readInputMars.close(); // Close the Mars dimensions readline interface
  handleRobotCommands(); // Proceed to handle robot commands
});

const handleRobotCommands = () => {
  const readInputRobot = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  console.log(
      " Enter the command followed by coordinate and direction (coma seperated without space)" +
      "for Robot to place. Enter other commands in seperate line, the moment you type report it will" +
      " process all commands"
  );
  const robot = new Robot();
  Mars.landRobot(robot);

  readInputRobot.on("line", (line) => {
    const text = line.split(" ");
    const command = text[0];
    Mars.landRobot(robot);
    handleCommands(command, text, robot);
  });
}

