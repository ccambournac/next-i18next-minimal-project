import App, {Container}     from 'next/app';
import ErrorPage            from './_error';
import {appWithTranslation} from '../i18n';

class DigitalAcademyApp extends App {
    /**
     * Render Error page or Component
     * @return {xml}
     */
    render() {
        const {Component, pageProps} = this.props;

        if (pageProps.statusCode && pageProps.statusCode !== 200) {
            return <ErrorPage statusCode={pageProps.statusCode}/>;
        }

        return (
            <Container>
                <Component {...pageProps}/>
            </Container>
        );
    }
}

export default appWithTranslation(DigitalAcademyApp);
