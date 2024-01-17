export const calcPayout = (rank: number) => {
  switch (rank) {
    case 1:
      return 100;
    case 2:
      return 90;
    case 3:
      return 75;
    case 4:
      return 60;
    case 5:
      return 50;
    case 6:
      return 40;
    case 7:
      return 30;
    case 8:
      return 25;
    case 9:
      return 20;
    case 10:
      return 10;
    default:
      return 0;
  }
};
