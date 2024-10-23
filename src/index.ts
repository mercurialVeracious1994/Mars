import * as readline from "readline";
import {Robot} from "./models/robot";
import {Mars} from "./models/mars";
import {validateMarsDimensions} from "./utility/validation";
import { handleCommands} from "./utility/handleCommand";
import {Coordinate} from "./enums/Location";

const readInputMars = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

console.log("Please enter Mars dimensions (x y) separated by a space: ");

readInputMars.on("line", (line: string) => {
    const marsDimension = line.trim().split(" ").map(Number);
    let marsMaxCoordinate = Mars.getCoordinateLimit();
    validateMarsDimensions(marsDimension, marsMaxCoordinate);
    readInputMars.close();
    handleObstacleInput();
});

const handleObstacleInput = () =>{
  const readInputObstacles = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  console.log("Please enter Obstacles coordinates (x y) separated by a " +
      "space and coma for another coordinate 4 5, 0 1 ");

  readInputObstacles.on("line", (line: string) => {
    const obstacles: string[] = line.trim().split(",");
    const obstaclesArray = obstacles.map(obstacle => {
          const obstacleValue = obstacle.trim().split(" ").map(Number);
          if (obstacleValue.length === 2 && !isNaN(obstacleValue[0]) && !isNaN(obstacleValue[1])) {
            return {
              x: obstacle.trim().split(" ").map(Number)[0],
              y: obstacle.trim().split(" ").map(Number)[1]
            } as Coordinate
          }
          return{x: -1, y: -1};
        }
    );
    Mars.updateObstacles(obstaclesArray);
    console.log(Mars.getObstacles())
    readInputObstacles.close();
    handleRobotCommands();

  })

}
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

