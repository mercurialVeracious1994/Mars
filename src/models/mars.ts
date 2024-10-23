
import { Coordinate } from "../enums/Location";
import { Robot } from "./robot";

export class Mars {
    static MAX_COORDINATE:Coordinate = { x: 5, y: 5 };
    static robots: Robot[] = [];
    static obstacles: Coordinate[] | [] = [];

    public static getCoordinateLimit = (): Coordinate => {
        return Mars.MAX_COORDINATE;
    };
    public static landRobot = (robot: Robot): void => {
        Mars.robots?.push(robot);
    };
    public static updateCoordinateLimit = (coordinate: Coordinate) => {
        Mars.MAX_COORDINATE = coordinate;
    }
    public static getObstacles(): Coordinate[] {
        return Mars.obstacles;
    }
    public static updateObstacles =(obstacles: Coordinate[]) => {
        Mars.obstacles = obstacles;
    }
}