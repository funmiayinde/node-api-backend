require('dotenv').config();
const PORT = process.env.PORT || 3000;

module.exports = {
	app: {
		name: "hackerbay-api",
		port: PORT,
		baseUrl: `http://localhost:${PORT}`,
		clientBaseUrl: process.env.BASE_URL,
		upload: `upload`,
		log: "app.log"
	},
	api: {
		// prefix: '^/api/v[1-9]/[a-zA-Z*]{2}',
		prefix: '/api/v1',
		resourceRegex: "^/resources/[a-zA-Z-]+",
		versions: 1,
	},
	lang: 'en',
	auth_token: {
		secret: 'hacker-bay-3440',
		expiresIn: 86400,
	},
	db: {
		url: process.env.DB_URL
	},
	cloudinary: {
		cloud_name: "qwikkii-com",
		api_key: "319715873895192",
		api_secret: "XVpjJ0KDAGhCVF5d9cJNqJoAOo4"
	}
};
