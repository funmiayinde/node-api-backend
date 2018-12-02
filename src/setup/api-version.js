import Q from 'q';

export default config => {
	console.log("api verison:", config.get('api.versions'));
	const version = config.get('api.versions');
	process.env.API_VERSION = `v${version}`;
	return Q.resolve()
}
