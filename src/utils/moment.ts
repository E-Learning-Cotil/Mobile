import moment from 'moment';
import 'moment/locale/pt-br';

function getStyledDatetime (date: string) {
	let format;

	if (moment().diff(date) < (1000 * 60 * 60)) { // 24 hour
		format = 'HH:mm';
	}
	else if (moment().diff(date) < (1000 * 60 * 60 * 24 * 365)) { // 1 year
		format = 'DD/MM';
	}
	else {
		format = 'DD/MM/YY';
	}

	moment.locale('pt-br');

	return moment(date).format(format);
}

function getFormattedDatetime (date: string, format: string) {
	moment.locale('pt-br');

	return moment(date).format(format);
}

function getDatetimeColor (date: string) {
	if (moment().isAfter(date)) {
		return 'red';
	}
	else if (moment().isSame(date, 'day')) {
		return 'yellow';
	}
	else {
		return 'green';
	}
}

export { getStyledDatetime, getFormattedDatetime, getDatetimeColor };