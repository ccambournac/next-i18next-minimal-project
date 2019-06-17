const pad = (number) => {
	if (number < 10) {
		return '0' + number;
	}
	return number;
};

const getVersionDate = () => {
	const date = new Date();
	return date.getUTCFullYear() + '' + pad(date.getUTCMonth() + 1) + '' + pad(date.getUTCDate());
};

module.exports = getVersionDate;
