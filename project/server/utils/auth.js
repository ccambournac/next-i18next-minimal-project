import basicAuth     from 'basic-auth';
import runtimeConfig from '../runtime.config';

const auth = (req, res, next) => {
    const user                  = basicAuth(req),
          {serverRuntimeConfig} = runtimeConfig(),
          credentials           = serverRuntimeConfig.basic.frontstage;

    if (!user || credentials.login !== user.name || credentials.pass !== user.pass) {
        res.set('WWW-Authenticate', 'Basic realm=""');
        return res.status(401).send();
    }

    return next();
};

export default auth;
