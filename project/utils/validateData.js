/**
 * Global find and replace in JSON data.
 * @param {object} json - Data object to perform find/replace
 * @param {string} [rootPath=""] - A base root URL path to add
 * @param {string} [type="backstage"] - Type of JSON data: runtime, backstage...
 * @return {object}
 */
const traverseObject = require('./traverseObject');

const validateData = ({json, rootPath = '', type = 'backstage'}) => {
	traverseObject(json, (key, value) => {
		switch (type) {
		case 'backstage':	// AEM JSON
			// Replace old-style paths to DAM assets by absolute correct ones.
			// Should now be deprecated. (From FSH Frontstage.)
			if (rootPath.length && ['src', 'url'].indexOf(key) !== -1 && value.match(/^\/[^\/]/)) {
				value = rootPath + value.replace(/^\/content\/dam\/([^\/])+/, '/dam/mode');
			}
			break;
		case 'runtime':		// Configuration JSON (e.g. Next.js one)
			// Remove trailing slash if any
			if (['cdn', 'origin', 'links', 'image', 'video'].indexOf(key) !== -1) {
				value = value.replace(/\/+$/, '');
			}
			break;
		}

		return value;
	});

	return json;
};

module.exports = validateData;
