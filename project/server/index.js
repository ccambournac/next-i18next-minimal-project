/**
 * Application's custom server
 * @see https://nextjs.org/docs/#custom-server-and-routing
 */
// External dependencies
import fs                    from 'fs';
import path                  from 'path';
import express               from 'express';
import http                  from 'http';
import spdy                  from 'spdy';
//import helmet                from 'helmet';
//import morgan                from 'morgan';
//import compression           from 'compression';
import next                  from 'next';
import nextI18NextMiddleware from 'next-i18next/middleware';
// import cors from 'cors';

// Internal dependencies
import runtimeConfig from './runtime.config';
//import auth          from './utils/auth';
//import checkRedirection from './utils/checkRedirection';
import nextI18next   from '../i18n';
import logger        from '../utils/logger';
import localIP       from '../preprocess/utils/local-ip.js';

const dev                   = process.env.NODE_ENV !== 'production',
      host                  = dev ? localIP : 'localhost',
      {serverRuntimeConfig} = runtimeConfig(),
      {port: fsPort, ssl}   = serverRuntimeConfig.frontstage,
      port                  = parseInt(fsPort, 10) || 3000,
      app                   = next({dev}),
      nextHandler           = app.getRequestHandler(),
      server                = express();

/**
 * Create HTTP/1.1 or HTTP/2 server.
 * In development mode, with HTTP/1.1,
 * an HTTP server listening local IP is also created.
 *
 * @param {object} server - Express server
 * @param {number} port
 * @param {string} host
 * @param {object} options
 * @param {boolean} secure
 */
const createServer = ({server, port, host, options = {}, secure = false}) => {
    (secure ? spdy : http)
        .createServer(options, server)
        .listen(port, secure ? 'localhost' : host, (error) => {
            if (error) throw error;
            !(dev && !secure) && logger.warn(`√ Listening HTTP/${secure ? '2' : '1.1'} on http${secure ? 's' : ''}://${secure ? 'localhost' : host}:${port}`);
        });

    if (dev && !secure) {
        (secure ? spdy : http)
            .createServer(options, server)
            .listen(port, 'localhost', (error) => {
                if (error) throw error;
                logger.warn(`√ Listening HTTP/${secure ? '2' : '1.1'} on http${secure ? 's' : ''}://localhost:${port}`);
            });
    }
};

app.prepare()
    .then(() => {
        //server.use(morgan(dev ? 'dev' : 'combined'));
        //server.use(helmet());
        //server.use(compression());

        server.use('/data', express.static('data'));
        server.use('/i18n', express.static('i18n'));

        // FS Basic Authentication
        if (!dev && serverRuntimeConfig.frontstageCredentials.basic) {
//            server.use(auth);
            logger.warn('\n√ Basic authenticati_on enabled for Frontstage');
        }
        // Is BS basic auth enabled?
        if (serverRuntimeConfig.backstageCredentials.basic) {
            logger.warn('√ Basic authentication enabled for Backstage\n');
        }

        // Apply proper caching to CSS files
        // https://github.com/zeit/next-plugins/issues/243
        /*!dev && server.get(/^\/\.next\/static\/(css|chunks|runtime)\//, (req, res) => {
            res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
            nextHandler(req, res);
        });*/

        server.use(nextI18NextMiddleware(nextI18next));

        // All other routes
        server.get('*', (req, res) => {
            /*const {should, url, code} = checkRedirection(req?.url || '');

            // Should redirect?
            if (should) {
                logger.warn('Redirect', url);
                return res.redirect(code, url);
            }*/

            return nextHandler(req, res);
        });

        // HTTPS SERVER w/ HTTP/2 support, IF DEFINED
        if (ssl?.enabled && Object.keys(ssl?.credentials).length) {
            try {
                const {key: keyPath, certificate: certificatePath} = ssl.credentials,
                      key                                          = fs.readFileSync(keyPath.indexOf('/') === 0 ? keyPath : path.resolve(__dirname, keyPath)),
                      cert                                         = fs.readFileSync(certificatePath.indexOf('/') === 0 ? certificatePath : path.resolve(__dirname, certificatePath)),
                      options                                      = {
                          key,
                          cert,
                          spdy: {
                              protocols: ['h2', 'spdy/3.1', 'http/1.1']
                          }
                      };

                // HTTPS SERVER
                createServer({server, port, host, options, secure: true});
            } catch (e) {
                logger.error('! Could not start HTTP/2 server, falling back to HTTP/1.1');
                logger.error(e);
                // HTTP SERVER
                createServer({server, port, host});
            }
        } else {
            // HTTP SERVER
            createServer({server, port, host});
        }
    })
    .catch((error) => logger.error(error));
