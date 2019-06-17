import getConfig from 'next/config';
import {DOMAIN}  from '../server/constants/backstage';

const {publicRuntimeConfig} = getConfig();

/**
 * Get the JSON definition file name and return the HTML page name
 * @param {string} path - JSON file name
 * @returns {string} HTML page name
 */
const getPageNameFromJSON = (path = '') => {
    if (path.indexOf('#') === 0) return path;

    path = path.replace(/\/[a-z]{2}_[A-Z]{2}\/mademoiselleprive/, '');

    if (path.indexOf(`//${DOMAIN}`) !== -1 && publicRuntimeConfig.environment !== 'prod') {
        path = path.replace(DOMAIN, `${publicRuntimeConfig.environment}-${DOMAIN}`);
    }

    return path.replace(/(\.export\.json)?$/, '');
};

export default getPageNameFromJSON;
