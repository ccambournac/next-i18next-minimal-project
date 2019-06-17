import Head                from 'next/head';
import {SEO}               from '../server/constants/frontstage';

const Layout = ({children}) => {
    const title        = SEO.TITLE,
          description  = SEO.DESCRIPTION;

    return (
        <main>
            <Head>
                <title key="title">{title} {SEO.SUFFIX}</title>
                <meta name="description" content={description}/>
            </Head>

            {children}
        </main>
    );
};

export default Layout;
