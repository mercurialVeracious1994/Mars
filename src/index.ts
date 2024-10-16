
import * as readline from "readline";
import { Robot } from "./models/robot";
import { Command } from "./enums/Commands";
import { Mars } from "./models/mars";

const ReadInputMars = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log("Please enter Mars dimensions (x y) separated by a space: ");

ReadInputMars.on("line", (line: string) => {
  const marsDimension = line.trim().split(" ").map(Number);
  let marsMaxCoordinate = Mars.getCoordinateLimit();
  // Validate Mars dimensions input
  if (marsDimension.length === 2 && !isNaN(marsDimension[0]) && !isNaN(marsDimension[1])) {
    console.log(`Mars dimensions entered: x=${marsDimension[0]}, y=${marsDimension[1]}`);
    marsMaxCoordinate = { x: marsDimension[0], y: marsDimension[1] };
    Mars.updateCoordinateLimit(marsMaxCoordinate) // Initialize Mars instance
  } else {
    console.log("Invalid input. Mars coordinates. x=5, y=5 as default");
  }
  ReadInputMars.close(); // Close the Mars dimensions readline interface
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
    switch (command) {
      case Command.PLACE:
        const robotLocation = text[1];
        robot.place(robotLocation);
        break;
      case Command.LEFT:
        robot.left();
        break;
      case Command.RIGHT:
        robot.right();
        break;
      case Command.MOVE:
        robot.move();
        break;
      case Command.REPORT:
        robot.report();
        break;
      case Command.TRACK:
        handleTrackCommand(text,robot);
        break;
      case Command.BACKTRACK:
        handleBackTrack(text, robot);
        break;
      default:
        console.log("Sorry, I couldn't get the command please enter again!");
        break;
    }
  });
}

const handleTrackCommand = (text: string[], robot: Robot) => {
  const count = parseInt(text[1]);
  if (count > 0) {
    robot.printFirstNCommands(count);
  } else {
    console.log("Provide a valid number for tracking");
  }
}

const handleBackTrack = (text: string[], robot: Robot) => {
  const backTrackTOCommand = parseInt(text[1]);
  if (backTrackTOCommand > 0) {
    robot.backTrackToLastNCommand(backTrackTOCommand);
  } else {
    console.log("Provide a valid number for tracking");
  }
}