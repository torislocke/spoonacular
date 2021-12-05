const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (username, email) => {
	const text = 
`
Welcome, ${username}!
We hope you find our website helpful in planning your next meal.)
`;
	const msg = {
		to: email,
		from: 'tlock44@byui.edu',
		subject: 'Welcome to Dinning In!',
		text
	};
	sgMail.send(msg);
}

module.exports = {
	sendWelcomeEmail
};
