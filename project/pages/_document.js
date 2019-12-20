import React     from 'react';
import Document, {
    Head,
    Main,
    NextScript
}                from 'next/document';
import getConfig from 'next/config';
import {LOCALES} from '../server/constants/frontstage';

const {publicRuntimeConfig} = getConfig();

/**
 * @class DigitalAcademy - All pages HTML skeleton
 */
class DigitalAcademy extends Document {
    /**
     * @todo Dynamize OG and Twitter meta images
     * @see https://github.com/tc39/proposal-optional-chaining
     * @return {*}
     */
    render() {
        const {props: nextProps} = this.props.__NEXT_DATA__,
              {initialLanguage}  = nextProps,
              {environment}      = publicRuntimeConfig,
              locale             = LOCALES[initialLanguage] || LOCALES.default,
              lang               = initialLanguage || LOCALES.default.split('_')[0];

        //noinspection HtmlRequiredTitleElement
        return (
            <html lang={lang} data-locale={locale}>
                <Head>
                    <link rel="dns-prefetch" href=""/>

                    <meta charSet="utf-8"/>
                    <meta name="viewport" content="initial-scale=1.0,maximum-scale=1.0,width=device-width,user-scalable=no"/>
                    {environment !== 'prod' ? <meta name="robots" content="noindex, nofollow"/>
                        : <meta name="robots" content="all, index, follow, noydir, noodp"/>}
                </Head>
                <body>
                    <Main/>
                    <NextScript/>

                    <onp dangerouslySetInnerHTML={{__html: `<!-- DIGITAL ACADEMY :: Version ${process.env.VERSION} :: Build date: ${process.env.BUILD_DATE} :: Build type: ${process.env.NODE_ENV.toUpperCase()} -->`}}/>
                </body>
            </html>
        );
    }
}

export default DigitalAcademy;
