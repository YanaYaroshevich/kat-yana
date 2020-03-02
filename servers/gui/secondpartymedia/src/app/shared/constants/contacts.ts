const email = 'hello@2ndpartymedia.com';
const phone = '415-350-5860';
const address = '11 Pennsylvania Ave, New York, NY 10001';

const E_MAIL = {
	DISPLAYED: email,
	REAL: `mailto:${email}`,
	ICON: 'email.png'
};

const PHONE_NUM = {
	DISPLAYED: phone,
	REAL: `tel:+${phone.replace(/[\s()-]/g, '')}`,
	ICON: 'phone.png'
};

const PHYSICAL_ADDRESS = {
	DISPLAYED: address,
	REAL: 'https://www.google.com/maps/place/11+Pennsylvania+Plaza,+New+York,+NY+10001,+USA',
	ICON: 'location.png'
};

export const CONTACTS = {E_MAIL, PHONE_NUM, PHYSICAL_ADDRESS};
