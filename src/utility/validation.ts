import { Coordinate } from "../enums/Location";
import { Mars } from "../models/mars";

const checkInsideBounds = (location: Coordinate): boolean => {
  const coordinateLimit = Mars.getCoordinateLimit();
  const isInsideBounds = (
    location.x >= 0 &&
    location.y >= 0 &&
    location.x <= coordinateLimit.x &&
    location.y <= coordinateLimit.y
  );
  if(!isInsideBounds){
    console.log("Will fall off from edge");
  }
  return isInsideBounds;
};

const checkObstacleAhead = (location: Coordinate): boolean => {
  const obstacles = Mars.getObstacles();
  const isObstacleAhead = obstacles.some((coordinate) => {
    return coordinate.x === location.x && coordinate.y === location.y;
  });
  if(isObstacleAhead){
    console.log("Obstacle ahead");
  }
  return isObstacleAhead;
};

export const isValidLocation = (location: Coordinate) => {
  return checkInsideBounds(location) && !checkObstacleAhead(location);
};

export const validateMarsDimensions = (marsDimension: number[], marsMaxCoordinate: Coordinate) => {
  if (marsDimension.length === 2 && !isNaN(marsDimension[0]) && !isNaN(marsDimension[1])) {
    console.log(`Mars dimensions entered: x=${marsDimension[0]}, y=${marsDimension[1]}`);
    marsMaxCoordinate = {x: marsDimension[0], y: marsDimension[1]};
    Mars.updateCoordinateLimit(marsMaxCoordinate) // Initialize Mars instance
  } else {
    console.log("Invalid input. Mars coordinates. x=5, y=5 as default");
  }
}