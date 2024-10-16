
import { Command } from "../enums/Commands";
import { Direction } from "../enums/Direction";
import { Coordinate, Location } from "../enums/Location";
import { DirectionMap } from "../utility/DirectionMap";
import { isValidLocation } from "../utility/validateMarsLocation";

type TrackCommand = {
  currentLocation: Location;
  prevLocation: Location;
  command: Command;
};

export class Robot {
  latestLocation: Location;
  commands: TrackCommand[];

  constructor(
      latestLocation = { coordinate: { x: 0, y: 0 }, direction: Direction.NORTH },
      commands = []
  ) {
    this.latestLocation = latestLocation;
    this.commands = commands;
  }

  move = () => {
    const prevLocation = { ...this.latestLocation };
    const location = {
      x:
          DirectionMap[this.latestLocation.direction].MOVE.x +
          this.latestLocation.coordinate.x,
      y:
          DirectionMap[this.latestLocation.direction].MOVE.y +
          this.latestLocation.coordinate.y,
    };
    if (isValidLocation(location)) {
      this.latestLocation.coordinate = location;
      this.trackCommand(Command.MOVE, prevLocation);
    } else {
      console.log("Will fall off from edge, skipping the command MOVE");
    }
  };

  left = () => {
    const prevLocation = { ...this.latestLocation };
    this.latestLocation.direction =
        DirectionMap[this.latestLocation.direction].LEFT;
    this.trackCommand(Command.LEFT, prevLocation);
  };

  right = () => {
    const prevLocation = { ...this.latestLocation };
    this.latestLocation.direction =
        DirectionMap[this.latestLocation.direction].RIGHT;
    this.trackCommand(Command.RIGHT, prevLocation);
  };

  report = () => {
    console.log(
        " Robot is currently at ",
        this.latestLocation.coordinate,
        "facing ",
        this.latestLocation.direction
    );
  };

  place = (robotLocation: string) => {
    const prevLocation = { ...this.latestLocation };
    const robotInstructions = robotLocation.split(",");
    const coordinate: Coordinate = {
      x: parseInt(robotInstructions[0]),
      y: parseInt(robotInstructions[1]),
    };
    this.latestLocation = {
      coordinate,
      direction: robotInstructions[2].toString() as Direction,
    };
    this.trackCommand(Command.PLACE, prevLocation);
  };

  trackCommand = (command: string, prevLocation: Location) => {
    this.commands.push({
      prevLocation: prevLocation,
      currentLocation: { ...this.latestLocation },
      command: Command[command as keyof typeof Command],
    });
  };

  printFirstNCommands = (count: number) => {
    const commandsList = this.commands.slice(1, count + 1); // need to print the PLACE command
    commandsList.forEach(({ prevLocation, command }) => {
      console.log(
          "(",
          prevLocation.coordinate.x,
          ",",
          prevLocation.coordinate.y,
          ",",
          prevLocation.direction,
          ") ",
          command
      );
    });
    console.log(
        "(",
        this.latestLocation.coordinate.x,
        ",",
        this.latestLocation.coordinate.y,
        ",",
        this.latestLocation.direction,
        ")"
    );
  };
  backTrackToLastNCommand = (count: number) => {
    const totalCommands = this.commands.length;

    if (count <= 0 || count > totalCommands) {
      console.log(
          "Invalid count value. It should be between 1 and the number of commands."
      );
      return;
    }
    const command = this.commands.slice(-count, totalCommands - (count - 1))[0];

    console.log(
        "Robot was at ",
        command.prevLocation.coordinate.x,
        command.prevLocation.coordinate.y,
        command.prevLocation.direction,
        " after backtracking the last",
        count,
        "command",
        command.command
    );
  };
}