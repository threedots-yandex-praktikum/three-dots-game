export enum BALL_SIZE {
  LARGE = "40px",
  MEDIUM = "30px",
  SMALL = "20px",
}

export const chooseSize = (index: number): BALL_SIZE => {
  if (index < 3) {
    return BALL_SIZE.LARGE;
  } else if (index < 6) {
    return BALL_SIZE.MEDIUM;
  } else {
    return BALL_SIZE.SMALL;
  }
};

export const colors = [
  "#FC8181",
  "#ED8936",
  "#FEFCBF",
  "#48BB78",
  "#38B2AC",
  "#4299E1",
  "#0BC5EA",
  "#9F7AEA",
  "#ED64A6",
  "#63171B",
];
export const getRandomColor = () => {
  return colors[Math.floor(Math.random() * colors.length)];
};
