/**
 * @return {Object} The document object
 **/
export const getDocument = () => {
	return {
		id: "c1234",
		name: "Shark",
		meta: {
			created: 1452474481612,
			tmp: 10,
			desc: "my meta description",
			array: ["apple", "orange", "pear", "lemon"]
		}
	};
};

/**
 * @return {Object} The patch object
 **/
export const getPatchDocument = () => {
	return {
		op: "replace",
		path: "/id",
		value: "foo"
	};
};

