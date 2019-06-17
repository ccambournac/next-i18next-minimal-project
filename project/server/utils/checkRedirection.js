/**
 * General server redirection function checking.
 * @param {string} url - URL from Express request
 * @return {{code: number, should: boolean, url: string}}
 */
const checkRedirection = (url = '') => {
    let redirect = {
        url,
        should: false,
        code: 200
    };

    // No URL length or next.js assets
    if (/^\/_next\//.test(url)) return redirect;

    switch (true) {
    case url.endsWith('.html'): // Redirect URLs with trailing .html
        redirect = {
            should: true,
            url: url.replace(/.html?$/, ''),
            code: 301
        };
        break;
    case /\/+$/.test(url): // Redirect URLs with trailing slash except root
        redirect = {
            should: true,
            url: url.replace(/\/+$/, ''),
            code: 301
        };
    }

    return redirect;
};

export default checkRedirection;
