import {Component} from 'react';
import Head        from 'next/head';
import PropTypes   from 'prop-types';

import {withTranslation} from '../i18n';

class Error extends Component {

    static getInitialProps({res, err}) {
        let statusCode = null;
        if (res) {
            ({statusCode} = res);
        } else if (err) {
            ({statusCode} = err);
        }
        return {
            namespacesRequired: [
                'common',
                'footer',
                'sessions'
            ],
            statusCode
        };
    }

    render() {
        const {statusCode, t} = this.props;
        return (
            <main>
                <Head>
                    <title>My title</title>
                </Head>
                <div>
                    {statusCode
                        ? t('error-with-status', {statusCode})
                        : t('error-without-status')}
                </div>
                <style global jsx>{`
				:root,
				 body,
				 body>div:first-child {
					height: 100%;
					width: 100%;
				}

				p {
					font-weight: 300;
					font-size: 11px;
					text-transform: uppercase;
					margin: 1em 0;
				}

				a {
					color: #000;
				}
			`}</style>
            </main>
        );
    }

}

Error.defaultProps = {
    statusCode: null
};

Error.propTypes = {
    statusCode: PropTypes.number,
    t: PropTypes.func.isRequired
};

export default withTranslation('common')(Error);
