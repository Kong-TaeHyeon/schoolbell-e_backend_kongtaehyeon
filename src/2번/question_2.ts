import { Island } from "./Island";

export const solve2 = () => {
  const mapInput = [
    [1, 0, 1, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 0, 1, 0, 1],
    [1, 0, 0, 1, 0],
  ];

  const island = new Island(mapInput);

  console.log("-------문제 2 :  Input Map -------");
  console.log(mapInput);

  console.log("-------문제 2 : Count Land -------");
  console.log(island.countLand());
};
