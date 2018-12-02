'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = errorWarning;

var _chalk = require('chalk');

function errorWarning(_ref) {
  var errorCount = _ref.errorCount,
      warningCount = _ref.warningCount,
      filePath = _ref.filePath,
      messages = _ref.messages;

  return errorCount || warningCount ? `${(0, _chalk.red)(errorCount)}/${(0, _chalk.yellow)(warningCount)} ${(0, _chalk.white)(filePath)}` : `${(0, _chalk.red)(messages.length)} ${(0, _chalk.white)(filePath)}`;
};
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9mb3JtYXR0ZXJzL2hlbHBlcnMvZXJyb3Itd2FybmluZy5qcyJdLCJuYW1lcyI6WyJlcnJvcldhcm5pbmciLCJlcnJvckNvdW50Iiwid2FybmluZ0NvdW50IiwiZmlsZVBhdGgiLCJtZXNzYWdlcyIsImxlbmd0aCJdLCJtYXBwaW5ncyI6Ijs7Ozs7a0JBRXdCQSxZOztBQUZ4Qjs7QUFFZSxTQUFTQSxZQUFULE9BQXdFO0FBQUEsTUFBaERDLFVBQWdELFFBQWhEQSxVQUFnRDtBQUFBLE1BQXBDQyxZQUFvQyxRQUFwQ0EsWUFBb0M7QUFBQSxNQUF0QkMsUUFBc0IsUUFBdEJBLFFBQXNCO0FBQUEsTUFBWkMsUUFBWSxRQUFaQSxRQUFZOztBQUNyRixTQUFPSCxjQUFjQyxZQUFkLEdBQ0YsR0FBRSxnQkFBSUQsVUFBSixDQUFnQixJQUFHLG1CQUFPQyxZQUFQLENBQXFCLElBQUcsa0JBQU1DLFFBQU4sQ0FBZ0IsRUFEM0QsR0FFRixHQUFFLGdCQUFJQyxTQUFTQyxNQUFiLENBQXFCLElBQUcsa0JBQU1GLFFBQU4sQ0FBZ0IsRUFGL0M7QUFHRCIsImZpbGUiOiJlcnJvci13YXJuaW5nLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcmVkLCB5ZWxsb3csIHdoaXRlIH0gZnJvbSAnY2hhbGsnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBlcnJvcldhcm5pbmcoeyBlcnJvckNvdW50LCB3YXJuaW5nQ291bnQsIGZpbGVQYXRoLCBtZXNzYWdlcyB9KSB7XG4gIHJldHVybiBlcnJvckNvdW50IHx8IHdhcm5pbmdDb3VudFxuICAgID8gYCR7cmVkKGVycm9yQ291bnQpfS8ke3llbGxvdyh3YXJuaW5nQ291bnQpfSAke3doaXRlKGZpbGVQYXRoKX1gXG4gICAgOiBgJHtyZWQobWVzc2FnZXMubGVuZ3RoKX0gJHt3aGl0ZShmaWxlUGF0aCl9YDtcbn07XG4iXX0=