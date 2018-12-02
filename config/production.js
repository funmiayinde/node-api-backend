require('dotenv').config();
const PORT = process.env.PORT || 3000;

module.exports = {
	app: {
		name: "hackerbay-api",
		port: PORT,
		baseUrl: `http://localhost:${PORT}`,
		clientBaseUrl: process.env.BASE_URL,
		upload: `upload`
	},
	api: {
		prefix: '^/api/v[1-9]/[a-zA-Z*]{2}',
		resourceRegex: "^/resources/[a-zA-Z-]+",
		version: [1],
	},
	lang: 'en',
	auth_token: {
		secret: 'hacker-bay-3440',
		expiresIn: 86400,
	},
	db: {
		url: process.env.DB_URL
	}
};
