const timestamp = () => {
    const d = new Date();
    return `[${process.env.NODE_ENV === 'production' ? `${d.toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    })} | ` : ''}${d.toLocaleTimeString()}.${d.getMilliseconds()}]`;
};

/**
 * Debug IIFE
 * @return {object} debugging object
 * @see https://stackoverflow.com/a/41407246
 */
const DEBUG = (() => {
    return {
        log: () => {},
        info: () => {},
        warn: (...args) => console.warn(...args),
        error: (...args) => console.error(...args)
    };
})();

/**
 * Debug IIFE used when AppConfig.debug=true or in development
 * @return {object} debugging object
 * @see https://stackoverflow.com/a/41407246
 */
const DEBUG_DEV = (() => {
    return {
        log: (...args) => console.log('\x1b[32m%s\x1b[1m', ...args),		// Green
        info: (...args) => console.info('\x1b[37m%s\x1b[1m', ...args),		// Blue
        warn: (...args) => console.warn('\x1b[33m%s\x1b[1m', ...args),		// Yellow,
        error: (...args) => console.error('\x1b[31m%s\x1b[1m', ...args)		// Red
    };
})();

/**
 * Exposed logger to be used server-side
 */
const logger = (() => {
    const log = (...args) => {
        const type = args.length > 0 ? args[0] : 'log',
			  data = args.length > 1 ? args.slice(1) : '';

        if (process.env.NODE_ENV !== 'production') {
            DEBUG_DEV[type].call(null, timestamp(), ...data);
        } else {
            DEBUG[type].call(null, timestamp(), ...data);
        }
    };

    return {
        log: log.bind(null, 'log'),
        info: log.bind(null, 'info'),
        warn: log.bind(null, 'warn'),
        error: log.bind(null, 'error')
    };
})();

export default logger;
