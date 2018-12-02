import Q from 'q';

export default config => {
	const version = config.get('api.versions');
	process.env.API_VERSION = `v${version}`;
	return Q.resolve()
}
