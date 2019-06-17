/**
 * Externalize configuration in order to be able to change it
 * and just restart server, e.g. without building step.
 *
 * /!\ This file must be at the same directory depth as the server itself
 * /!\ Dot not use this file client-side. To get public configuration from client,
 * use Next.js helper instead → https://nextjs.org/docs/#exposing-configuration-to-the-server--client-side
 *
 * @return {object}
 */
import btoa                      from 'btoa';
import nextConfig                from '../next.config';
import validateData              from '../utils/validateData';
import {basic}                   from '../.next/runtime.credentials';
import {PHASE_PRODUCTION_SERVER} from 'next/constants';

const runtimeConfig = () => {
    const runtimeConfig                              = nextConfig(PHASE_PRODUCTION_SERVER),
          validConfig                                = validateData({json: runtimeConfig, type: 'runtime'}),
          {serverRuntimeConfig, publicRuntimeConfig} = validConfig;

    let frontstageCredentials = {},
        backstageCredentials  = {};

    serverRuntimeConfig.basic = basic;

    // FRONTSTAGE Basic auth credentials
    if (basic.frontstage
        && typeof basic.frontstage.login === 'string'
        && typeof basic.frontstage.pass === 'string')
        frontstageCredentials.basic = btoa(unescape(encodeURIComponent(basic.frontstage.login + ':' + basic.frontstage.pass)));

    // BACKSTAGE Basic auth credentials
    if (basic.backstage
        && typeof basic.backstage.login === 'string'
        && typeof basic.backstage.pass === 'string')
        backstageCredentials.basic = btoa(unescape(encodeURIComponent(basic.backstage.login + ':' + basic.backstage.pass)));

    return {
        serverRuntimeConfig: Object.assign(serverRuntimeConfig, {
            frontstageCredentials,
            backstageCredentials
        }),
        publicRuntimeConfig
    };
};

export default runtimeConfig;
