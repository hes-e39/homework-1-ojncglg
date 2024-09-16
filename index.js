import fetch from 'node-fetch';

const COLORS = 'https://nt-cdn.s3.amazonaws.com/colors.json';

/**
 * @param name filter for color name
 * @param hex filter for color hex code
 * @param compName filter for complementary color name
 * @param compHex filter for complementary color hex code
 * @returns Promise
 */

const fetchColors = async ({ name, hex, compName, compHex }) => {
  try {
    const response = await fetch(COLORS);
    if (!response.ok) {
      throw new Error('Failed to fetch colors');
    }
    const colors = await response.json();

    return colors.filter(color => {
      if (name) {
        return color.name.toLowerCase().includes(name.toLowerCase());
      }
      if (hex) {
        return color.hex.toLowerCase() === hex.toLowerCase();
      }
      if (compName) {
        return (color.comp && color.comp.some(comp => 
          comp.name.toLowerCase().includes(compName.toLowerCase())
        )) || color.name.toLowerCase().includes(compName.toLowerCase());
      }
      if (compHex) {
        return (color.comp && color.comp.some(comp => 
          comp.hex.toLowerCase() === compHex.toLowerCase()
        )) || color.hex.toLowerCase() === compHex.toLowerCase();
      }
      return true; // If no filter is provided, return all colors
    });
  } catch (error) {
    console.error('Error fetching colors:', error);
    throw error;
  }
};

export default fetchColors;