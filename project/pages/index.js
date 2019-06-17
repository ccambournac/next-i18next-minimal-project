import PropTypes from 'prop-types';
import {
    Link,
    Router,
    withTranslation
}                from '../i18n';

import Layout from '../components/Layout';
import logger from '../utils/logger';

const Index = (props) => {
    logger.info('PAGE PROPS', props);

    const {t, i18n} = props;

    return (
        <Layout>
            <div>
                <button
                    type="button"
                    onClick={() => i18n.changeLanguage(i18n.language === 'fr' ? 'en' : 'fr')}>
                    {t('change-locale')}
                </button>
            </div>
            <div>
                <Link href="/sessions">
                    <a>{t('to-sessions')}</a>
                </Link>
            </div>
            <div>
                <button onClick={() => Router.push('/sessions')}>
                    {t('to-sessions-imperative')}
                </button>
            </div>
        </Layout>
    );
};

Index.getInitialProps = async () => {
    return {
        namespacesRequired: [
            'common',
            'footer',
            'sessions'
        ]
    };
};

Index.propTypes = {
    t: PropTypes.func.isRequired
};

export default withTranslation('common')(Index);
