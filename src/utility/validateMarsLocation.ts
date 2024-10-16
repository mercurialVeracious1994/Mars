import { Coordinate } from "../enums/Location";
import { Mars } from "../models/mars";

const insideBounds = (location: Coordinate): boolean => {
  const coordinateLimit = Mars.getCoordinateLimit();
  return (
    location.x >= 0 &&
    location.y >= 0 &&
    location.x <= coordinateLimit.x &&
    location.y <= coordinateLimit.y
  );
};

const isObstacleAhead = (location: Coordinate): boolean => {
  const obstacles = Mars.getObstacles();
  return obstacles.some((coordinate) => {
    return coordinate.x === location.x && coordinate.y === location.y;
  });
};

export const isValidLocation = (location: Coordinate) => {
  return insideBounds(location) && !isObstacleAhead(location);
};
