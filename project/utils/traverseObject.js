/**
 * Recursively traverse an Object
 * @param {object} o - Object to travers
 * @param {function} f - Function to apply to each object value
 */
const traverseObject = (o, f) => {
    for (let i in o) {
        if (o.hasOwnProperty(i)) {
            o[i] = f.apply(this, [i, o[i]]);
            if (o[i] !== null && typeof (o[i]) === 'object') {
                // Going on step down in the object tree
                traverseObject(o[i], f);
            }
        }
    }
};

module.exports = traverseObject;
