
import { Direction } from "../enums/Direction";

export const DirectionMap = {
    NORTH: {
        LEFT: Direction.WEST,
        RIGHT: Direction.EAST,
        MOVE: { x: 0, y: 1 },
    },
    SOUTH: {
        LEFT: Direction.EAST,
        RIGHT: Direction.WEST,
        MOVE: { x: 0, y: -1 },
    },
    EAST: {
        LEFT: Direction.NORTH,
        RIGHT: Direction.SOUTH,
        MOVE: { x: 1, y: 0 },
    },
    WEST: {
        LEFT: Direction.SOUTH,
        RIGHT: Direction.NORTH,
        MOVE: { x: -1, y: 0 },
    },
};
