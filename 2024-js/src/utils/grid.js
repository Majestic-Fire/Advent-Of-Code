const isOutOfRange = (r, c, grid) => {
  return r < 0 || r >= grid.length || c < 0 || c >= grid[0].length;
};

const isInOfRange = (r, c, grid) => {
  return r >= 0 && r < grid.length && c >= 0 && c < grid[0].length;
};

export { isOutOfRange, isInOfRange };
