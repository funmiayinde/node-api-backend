'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = simpleSuccess;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _success = require('./helpers/success');

var _success2 = _interopRequireDefault(_success);

var _errorWarning = require('./helpers/error-warning');

var _errorWarning2 = _interopRequireDefault(_errorWarning);

var _characters = require('./helpers/characters');

var _characters2 = _interopRequireDefault(_characters);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function simpleSuccess(results) {
  return _lodash2.default.reduce(results, function (message, result) {
    message += result.errorCount === 0 && result.warningCount === 0 ? `${(0, _success2.default)(result)}${_characters2.default.endLine}` : `${(0, _errorWarning2.default)(result)}${_characters2.default.endLine}`;

    return message;
  }, '');
};
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9mb3JtYXR0ZXJzL3NpbXBsZS1zdWNjZXNzLmpzIl0sIm5hbWVzIjpbInNpbXBsZVN1Y2Nlc3MiLCJyZXN1bHRzIiwicmVkdWNlIiwibWVzc2FnZSIsInJlc3VsdCIsImVycm9yQ291bnQiLCJ3YXJuaW5nQ291bnQiLCJlbmRMaW5lIl0sIm1hcHBpbmdzIjoiOzs7OztrQkFNd0JBLGE7O0FBTnhCOzs7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFZSxTQUFTQSxhQUFULENBQXVCQyxPQUF2QixFQUFnQztBQUM3QyxTQUFPLGlCQUFFQyxNQUFGLENBQVNELE9BQVQsRUFBa0IsVUFBQ0UsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBQzVDRCxlQUFXQyxPQUFPQyxVQUFQLEtBQXNCLENBQXRCLElBQTJCRCxPQUFPRSxZQUFQLEtBQXdCLENBQW5ELEdBQ04sR0FBRSx1QkFBUUYsTUFBUixDQUFnQixHQUFFLHFCQUFFRyxPQUFRLEVBRHhCLEdBRU4sR0FBRSw0QkFBTUgsTUFBTixDQUFjLEdBQUUscUJBQUVHLE9BQVEsRUFGakM7O0FBSUEsV0FBT0osT0FBUDtBQUNELEdBTk0sRUFNSixFQU5JLENBQVA7QUFPRCIsImZpbGUiOiJzaW1wbGUtc3VjY2Vzcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5cbmltcG9ydCBzdWNjZXNzIGZyb20gJy4vaGVscGVycy9zdWNjZXNzJztcbmltcG9ydCBlcnJvciBmcm9tICcuL2hlbHBlcnMvZXJyb3Itd2FybmluZyc7XG5pbXBvcnQgYyBmcm9tICcuL2hlbHBlcnMvY2hhcmFjdGVycyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHNpbXBsZVN1Y2Nlc3MocmVzdWx0cykge1xuICByZXR1cm4gXy5yZWR1Y2UocmVzdWx0cywgKG1lc3NhZ2UsIHJlc3VsdCkgPT4ge1xuICAgIG1lc3NhZ2UgKz0gcmVzdWx0LmVycm9yQ291bnQgPT09IDAgJiYgcmVzdWx0Lndhcm5pbmdDb3VudCA9PT0gMFxuICAgICAgPyBgJHtzdWNjZXNzKHJlc3VsdCl9JHtjLmVuZExpbmV9YFxuICAgICAgOiBgJHtlcnJvcihyZXN1bHQpfSR7Yy5lbmRMaW5lfWA7XG5cbiAgICByZXR1cm4gbWVzc2FnZTtcbiAgfSwgJycpO1xufTtcbiJdfQ==