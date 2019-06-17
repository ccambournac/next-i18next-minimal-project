import React, {Fragment, Component} from 'react';
import PropTypes                    from 'prop-types';

import {withTranslation, Link, Router} from '../../i18n';

class Index extends Component {

    static async getInitialProps() {
        return {
            namespacesRequired: [
                'common',
                'footer',
                'sessions'
            ]
        };
    }

    render() {
        const {t} = this.props;
        return (
            <Fragment>
                <h1>{t('h1')}</h1>
                <div>
                    <Link href='/'>
                        <button type='button'>
                            {t('back-to-home')}
                        </button>
                    </Link>
                </div>
                <div>
                    <button onClick={() => Router.push('/')}>
                        {t('back-to-home-imperative')}
                    </button>
                </div>
            </Fragment>
        );
    }
}

Index.propTypes = {
    t: PropTypes.func.isRequired
};

export default withTranslation('sessions')(Index);
