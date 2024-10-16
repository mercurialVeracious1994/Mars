import { Direction } from "./Direction";

export type Coordinate = {
  x: number;
  y: number;
};
export type Location = {
  coordinate: Coordinate;
  direction: Direction;
};
