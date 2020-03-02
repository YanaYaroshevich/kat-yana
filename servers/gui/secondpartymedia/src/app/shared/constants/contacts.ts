const email = 'K.jsvmed@gmail.com';
const phone = '+375293550007';
const address = 'д.Тарасово, ул.Ратомская 1Б, помещ.404';

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
	REAL: 'https://goo.gl/maps/SNYxgoz3hgNfVbML8',
	ICON: 'location.png'
};

export const CONTACTS = {E_MAIL, PHONE_NUM, PHYSICAL_ADDRESS};
