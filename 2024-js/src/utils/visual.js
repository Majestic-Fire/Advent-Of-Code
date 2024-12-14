const COLORS = {
    Reset: "\x1b[0m",
    Red: "\x1b[31m",
    Green: "\x1b[32m",
    Yellow: "\x1b[33m",
    Blue: "\x1b[34m",
    Magenta: "\x1b[35m",
    Cyan: "\x1b[36m",
}

/**
 * @typedef {'Reset' | 'Red' | 'Green' | 'Yellow' | 'Blue' | 'Magenta' | 'Cyan'} ColorName
 */

/**
 * Returns a string wrapped in the specified color.
 * @param {string} str - The string to color.
 * @param {ColorName} colorName - The name of the color.
 * @returns {string} - The colored string.
 */
const coloredString = (str, colorName) => {
    const colorCode = COLORS[colorName];
    return colorCode + str + COLORS.Reset;
};

export { COLORS, coloredString }