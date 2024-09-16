import fetch from 'node-fetch';

// Constant
const COLORS = 'https://nt-cdn.s3.amazonaws.com/colors.json';

/**
 * @param name filter for color name
 * @param hex filter for color hex code
 * @param compName filter for complementary color name
 * @param compHex filter for complementary color hex code
 * @returns Promise
 */

// Async arrow function looking for name, hex, compName & compHex
const fetchColors = async ({ name, hex, compName, compHex }) => {
  // Error Handling
  try {
    // Fetch requests to our URL and waits for a response
    const response = await fetch(COLORS);

    // If statement checks if the response was successful, if not it throws an error
    if (!response.ok) {
      throw new Error('Failed to fetch colors');
    }

    // Parses the response in JSON and waits for results
    const colors = await response.json();

    // Starts a filtering function for all the colors in the array
    return colors.filter((color) => {
      // If a name is provided it checks the name, and lowers the case to ensure that there are no errors naming it
      if (name) {
        return color.name.toLowerCase().includes(name.toLowerCase());
      }

      // If a hex is provided it checks that the hex matches exactly
      if (hex) {
        return color.hex.toLowerCase() === hex.toLowerCase();
      }

      // If a complementary name is provided, it checks for the name filtered string
      if (compName) {
        return (
          (color.comp &&
            color.comp.some((comp) =>
              comp.name.toLowerCase().includes(compName.toLowerCase())
            )) ||
          color.name.toLowerCase().includes(compName.toLowerCase())
        );
      }

      // Checks for a compHex
      if (compHex) {
        return (
          (color.comp &&
            color.comp.some(
              (comp) => comp.hex.toLowerCase() === compHex.toLowerCase()
            )) ||
          color.hex.toLowerCase() === compHex.toLowerCase()
        );
      }

      // If no filter is provided, return all colors
      return true;
    });
  } catch (error) {
    console.error('Error fetching colors:', error);
    throw error;
  }
};

// Closes the function
export default fetchColors;