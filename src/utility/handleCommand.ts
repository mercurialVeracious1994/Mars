import {Robot} from "../models/robot";
import {Command} from "../enums/Commands";

export const handleTrackCommand = (text: string[], robot: Robot) => {
    const count = parseInt(text[1]);
    if (count > 0) {
        robot.printFirstNCommands(count);
    } else {
        console.log("Provide a valid number for tracking");
    }
}

export const handleBackTrackCommand = (text: string[], robot: Robot) => {
    const backTrackTOCommand = parseInt(text[1]);
    if (backTrackTOCommand > 0) {
        robot.backTrackToLastNCommand(backTrackTOCommand);
    } else {
        console.log("Provide a valid number for tracking");
    }
}

export const handleCommands = (command: string, text: string[], robot: Robot) => {
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
            handleTrackCommand(text, robot);
            break;
        case Command.BACKTRACK:
            handleBackTrackCommand(text, robot);
            break;
        default:
            console.log("Sorry, I couldn't get the command please enter again!");
            break;
    }
}
