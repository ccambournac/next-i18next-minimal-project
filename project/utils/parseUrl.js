import logger from './logger';

/**
 * Parse URL string as a real URL.
 * @param string
 * @return {HTMLAnchorElement | URL}
 * @see https://developer.mozilla.org/en-US/docs/Web/API/URL#Properties
 */
const parseUrl = (string) => {
    let parser = {};

    if (typeof URL === 'function') {
        try {
            parser = new URL(string);
        } catch (e) {
            logger.warn(e.message);
        }
    } else if (typeof document !== 'undefined') { // Above condition ensures following code is not used by Node.js 7+
        parser = document.createElement('a');
        parser.href = string;
    }

    return parser;
};

export default parseUrl;
