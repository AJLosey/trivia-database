module.exports = {
  // Author: Mayur
  // Function created decode HTML Entities such as &#039;
  // using https://www.npmjs.com/package/he package
  decode_string: (str) => {
    // We use the 'toLocaleTimeString()' method to format the time as H:MM:SS AM/PM
    const he = require('he');   
    return (he.decode(str));
  },
  // Author: Mayur
  // Function created to show Entertainment: Cartoon & Animations = Cartoon & Animations
  categoryname_fix: (category) => {            
    return (category.replace('Entertainment: ',''));
  }
};
