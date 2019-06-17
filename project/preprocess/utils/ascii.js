const getAscii = ({version, environment, time = '', showAscii = true, legacy = false}) => {
	return `
____________________________________________________________________________________________________

 O|o :: ${version}${environment.length ? ` :: ${environment} build${legacy ? ' (legacy)' : ''}` : ''}${time.length ? ` :: ${time.split(' GMT')[0]}` : ''}
____________________________________________________________________________________________________

`;
};

module.exports = getAscii;
