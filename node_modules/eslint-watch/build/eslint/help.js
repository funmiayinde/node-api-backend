'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = eslintHelp;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _logger = require('../logger');

var _logger2 = _interopRequireDefault(_logger);

var _cli = require('./cli');

var _cli2 = _interopRequireDefault(_cli);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var logger = (0, _logger2.default)('eslint-help');
logger.debug('Loaded');

var namedOption = /^--/;

function parseNo(option, str) {
  if (!str) return;

  var cmd = str.replace('--', '');

  if (/no-/.test(cmd)) {
    logger.debug('Parsing no option', str);
    cmd = cmd.replace('no-', '');
    option.default = 'true';
  }

  option.option = cmd;

  return option;
}

function parseDouble(arr) {
  var description = _lodash2.default.without(arr.slice(2), '').join(' ');

  return {
    option: arr[0].replace('--', ''),
    type: 'Boolean',
    alias: arr[1].replace('--', ''),
    description: description
  };
}

function parseRegular(arr) {
  logger.debug('Parsing %s', arr[0]);

  if (!arr[0]) {
    return;
  }

  var optionText = arr[0];
  var type = arr[1] || 'Boolean';
  var option = parseNo({}, optionText);
  var helpText = _lodash2.default.without(arr, optionText, type, '');
  var description = helpText.join(' ');

  option.type = type;

  if (description) {
    option.description = description;
  }

  return option;
}

function parseAlias(arr) {
  var alias = arr[0];
  logger.debug('Alias found: %s', alias);
  var option = parseRegular(_lodash2.default.without(arr, alias));

  if (alias) {
    option.alias = alias.replace('-', '');
  }

  return option;
}

function createOption(arr) {
  var option = void 0;

  if (namedOption.test(arr[0]) && namedOption.test(arr[1])) {
    // no alias defaulted boolean
    option = parseDouble(arr);
  } else if (namedOption.test(arr[0]) && !namedOption.test(arr[1])) {
    // just a no alias
    option = parseRegular(arr);
  } else {
    // aliased or other
    option = parseAlias(arr);
  }

  return _lodash2.default.isEmpty(option) ? undefined : option;
}

function parseHelp(helpText) {
  var helpArr = helpText.split('\n');
  var previousLine = [];

  return _lodash2.default.without(_lodash2.default.map(helpArr, function (row, index) {
    if (index <= 2) {
      return;
    }
    var str = row.replace(',', '');
    var arr = str.trim().split(' ');
    if (str.indexOf('-') >= 0 && previousLine[0] !== '') {
      var option = createOption(arr);
      if (option && option.option !== 'format' && option.option !== 'help') {
        return option;
      }
    }
    previousLine = arr;
  }), undefined);
}

function eslintHelp() {
  logger.debug('Executing help');
  var result = (0, _cli2.default)(['--help'], { stdio: [process.stdin, null, process.stderr] });
  if (!result.message) {
    throw new Error('Help text not received from Eslint.');
  }
  var eslintOptions = parseHelp(result.message);
  return eslintOptions;
};
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lc2xpbnQvaGVscC5qcyJdLCJuYW1lcyI6WyJlc2xpbnRIZWxwIiwibG9nZ2VyIiwiZGVidWciLCJuYW1lZE9wdGlvbiIsInBhcnNlTm8iLCJvcHRpb24iLCJzdHIiLCJjbWQiLCJyZXBsYWNlIiwidGVzdCIsImRlZmF1bHQiLCJwYXJzZURvdWJsZSIsImFyciIsImRlc2NyaXB0aW9uIiwid2l0aG91dCIsInNsaWNlIiwiam9pbiIsInR5cGUiLCJhbGlhcyIsInBhcnNlUmVndWxhciIsIm9wdGlvblRleHQiLCJoZWxwVGV4dCIsInBhcnNlQWxpYXMiLCJjcmVhdGVPcHRpb24iLCJpc0VtcHR5IiwidW5kZWZpbmVkIiwicGFyc2VIZWxwIiwiaGVscEFyciIsInNwbGl0IiwicHJldmlvdXNMaW5lIiwibWFwIiwicm93IiwiaW5kZXgiLCJ0cmltIiwiaW5kZXhPZiIsInJlc3VsdCIsInN0ZGlvIiwicHJvY2VzcyIsInN0ZGluIiwic3RkZXJyIiwibWVzc2FnZSIsIkVycm9yIiwiZXNsaW50T3B0aW9ucyJdLCJtYXBwaW5ncyI6Ijs7Ozs7a0JBeUd3QkEsVTs7QUF6R3hCOzs7O0FBRUE7Ozs7QUFDQTs7Ozs7O0FBRUEsSUFBTUMsU0FBUyxzQkFBTyxhQUFQLENBQWY7QUFDQUEsT0FBT0MsS0FBUCxDQUFhLFFBQWI7O0FBRUEsSUFBTUMsY0FBYyxLQUFwQjs7QUFFQSxTQUFTQyxPQUFULENBQWlCQyxNQUFqQixFQUF5QkMsR0FBekIsRUFBOEI7QUFDNUIsTUFBSSxDQUFDQSxHQUFMLEVBQVU7O0FBRVYsTUFBSUMsTUFBTUQsSUFBSUUsT0FBSixDQUFZLElBQVosRUFBa0IsRUFBbEIsQ0FBVjs7QUFFQSxNQUFJLE1BQU1DLElBQU4sQ0FBV0YsR0FBWCxDQUFKLEVBQXFCO0FBQ25CTixXQUFPQyxLQUFQLENBQWEsbUJBQWIsRUFBa0NJLEdBQWxDO0FBQ0FDLFVBQU1BLElBQUlDLE9BQUosQ0FBWSxLQUFaLEVBQW1CLEVBQW5CLENBQU47QUFDQUgsV0FBT0ssT0FBUCxHQUFpQixNQUFqQjtBQUNEOztBQUVETCxTQUFPQSxNQUFQLEdBQWdCRSxHQUFoQjs7QUFFQSxTQUFPRixNQUFQO0FBQ0Q7O0FBRUQsU0FBU00sV0FBVCxDQUFxQkMsR0FBckIsRUFBMEI7QUFDeEIsTUFBTUMsY0FBYyxpQkFBRUMsT0FBRixDQUFVRixJQUFJRyxLQUFKLENBQVUsQ0FBVixDQUFWLEVBQXVCLEVBQXZCLEVBQTJCQyxJQUEzQixDQUFnQyxHQUFoQyxDQUFwQjs7QUFFQSxTQUFPO0FBQ0xYLFlBQVFPLElBQUksQ0FBSixFQUFPSixPQUFQLENBQWUsSUFBZixFQUFxQixFQUFyQixDQURIO0FBRUxTLFVBQU0sU0FGRDtBQUdMQyxXQUFPTixJQUFJLENBQUosRUFBT0osT0FBUCxDQUFlLElBQWYsRUFBcUIsRUFBckIsQ0FIRjtBQUlMSyxpQkFBYUE7QUFKUixHQUFQO0FBTUQ7O0FBRUQsU0FBU00sWUFBVCxDQUFzQlAsR0FBdEIsRUFBMkI7QUFDekJYLFNBQU9DLEtBQVAsQ0FBYSxZQUFiLEVBQTJCVSxJQUFJLENBQUosQ0FBM0I7O0FBRUEsTUFBSSxDQUFDQSxJQUFJLENBQUosQ0FBTCxFQUFhO0FBQ1g7QUFDRDs7QUFFRCxNQUFNUSxhQUFhUixJQUFJLENBQUosQ0FBbkI7QUFDQSxNQUFNSyxPQUFPTCxJQUFJLENBQUosS0FBVSxTQUF2QjtBQUNBLE1BQU1QLFNBQVNELFFBQVEsRUFBUixFQUFZZ0IsVUFBWixDQUFmO0FBQ0EsTUFBTUMsV0FBVyxpQkFBRVAsT0FBRixDQUFVRixHQUFWLEVBQWVRLFVBQWYsRUFBMkJILElBQTNCLEVBQWlDLEVBQWpDLENBQWpCO0FBQ0EsTUFBTUosY0FBY1EsU0FBU0wsSUFBVCxDQUFjLEdBQWQsQ0FBcEI7O0FBRUFYLFNBQU9ZLElBQVAsR0FBY0EsSUFBZDs7QUFFQSxNQUFJSixXQUFKLEVBQWlCO0FBQ2ZSLFdBQU9RLFdBQVAsR0FBcUJBLFdBQXJCO0FBQ0Q7O0FBRUQsU0FBT1IsTUFBUDtBQUNEOztBQUVELFNBQVNpQixVQUFULENBQW9CVixHQUFwQixFQUF5QjtBQUN2QixNQUFNTSxRQUFRTixJQUFJLENBQUosQ0FBZDtBQUNBWCxTQUFPQyxLQUFQLENBQWEsaUJBQWIsRUFBZ0NnQixLQUFoQztBQUNBLE1BQU1iLFNBQVNjLGFBQWEsaUJBQUVMLE9BQUYsQ0FBVUYsR0FBVixFQUFlTSxLQUFmLENBQWIsQ0FBZjs7QUFFQSxNQUFJQSxLQUFKLEVBQVc7QUFDVGIsV0FBT2EsS0FBUCxHQUFlQSxNQUFNVixPQUFOLENBQWMsR0FBZCxFQUFrQixFQUFsQixDQUFmO0FBQ0Q7O0FBRUQsU0FBT0gsTUFBUDtBQUNEOztBQUVELFNBQVNrQixZQUFULENBQXNCWCxHQUF0QixFQUEyQjtBQUN6QixNQUFJUCxlQUFKOztBQUVBLE1BQUlGLFlBQVlNLElBQVosQ0FBaUJHLElBQUksQ0FBSixDQUFqQixLQUE0QlQsWUFBWU0sSUFBWixDQUFpQkcsSUFBSSxDQUFKLENBQWpCLENBQWhDLEVBQTBEO0FBQUU7QUFDMURQLGFBQVNNLFlBQVlDLEdBQVosQ0FBVDtBQUNELEdBRkQsTUFFTyxJQUFJVCxZQUFZTSxJQUFaLENBQWlCRyxJQUFJLENBQUosQ0FBakIsS0FBNEIsQ0FBQ1QsWUFBWU0sSUFBWixDQUFpQkcsSUFBSSxDQUFKLENBQWpCLENBQWpDLEVBQTJEO0FBQUU7QUFDbEVQLGFBQVNjLGFBQWFQLEdBQWIsQ0FBVDtBQUNELEdBRk0sTUFFQTtBQUFDO0FBQ05QLGFBQVNpQixXQUFXVixHQUFYLENBQVQ7QUFDRDs7QUFFRCxTQUFPLGlCQUFFWSxPQUFGLENBQVVuQixNQUFWLElBQW9Cb0IsU0FBcEIsR0FBZ0NwQixNQUF2QztBQUNEOztBQUVELFNBQVNxQixTQUFULENBQW1CTCxRQUFuQixFQUE2QjtBQUMzQixNQUFJTSxVQUFVTixTQUFTTyxLQUFULENBQWUsSUFBZixDQUFkO0FBQ0EsTUFBSUMsZUFBZSxFQUFuQjs7QUFFQSxTQUFPLGlCQUFFZixPQUFGLENBQVUsaUJBQUVnQixHQUFGLENBQU1ILE9BQU4sRUFBZSxVQUFDSSxHQUFELEVBQU1DLEtBQU4sRUFBZ0I7QUFDOUMsUUFBSUEsU0FBUyxDQUFiLEVBQWdCO0FBQ2Q7QUFDRDtBQUNELFFBQUkxQixNQUFNeUIsSUFBSXZCLE9BQUosQ0FBWSxHQUFaLEVBQWlCLEVBQWpCLENBQVY7QUFDQSxRQUFJSSxNQUFNTixJQUFJMkIsSUFBSixHQUFXTCxLQUFYLENBQWlCLEdBQWpCLENBQVY7QUFDQSxRQUFJdEIsSUFBSTRCLE9BQUosQ0FBWSxHQUFaLEtBQW9CLENBQXBCLElBQXlCTCxhQUFhLENBQWIsTUFBb0IsRUFBakQsRUFBcUQ7QUFDbkQsVUFBSXhCLFNBQVNrQixhQUFhWCxHQUFiLENBQWI7QUFDQSxVQUFJUCxVQUFVQSxPQUFPQSxNQUFQLEtBQWtCLFFBQTVCLElBQXdDQSxPQUFPQSxNQUFQLEtBQWtCLE1BQTlELEVBQXNFO0FBQ3BFLGVBQU9BLE1BQVA7QUFDRDtBQUNGO0FBQ0R3QixtQkFBZWpCLEdBQWY7QUFDRCxHQWJnQixDQUFWLEVBYUhhLFNBYkcsQ0FBUDtBQWNEOztBQUVjLFNBQVN6QixVQUFULEdBQXNCO0FBQ25DQyxTQUFPQyxLQUFQLENBQWEsZ0JBQWI7QUFDQSxNQUFNaUMsU0FBUyxtQkFBTyxDQUFDLFFBQUQsQ0FBUCxFQUFtQixFQUFFQyxPQUFPLENBQUVDLFFBQVFDLEtBQVYsRUFBaUIsSUFBakIsRUFBdUJELFFBQVFFLE1BQS9CLENBQVQsRUFBbkIsQ0FBZjtBQUNBLE1BQUksQ0FBQ0osT0FBT0ssT0FBWixFQUFxQjtBQUNuQixVQUFNLElBQUlDLEtBQUosQ0FBVSxxQ0FBVixDQUFOO0FBQ0Q7QUFDRCxNQUFNQyxnQkFBZ0JoQixVQUFVUyxPQUFPSyxPQUFqQixDQUF0QjtBQUNBLFNBQU9FLGFBQVA7QUFDRCIsImZpbGUiOiJoZWxwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcblxuaW1wb3J0IExvZ2dlciBmcm9tICcuLi9sb2dnZXInO1xuaW1wb3J0IGVzbGludCBmcm9tICcuL2NsaSc7XG5cbmNvbnN0IGxvZ2dlciA9IExvZ2dlcignZXNsaW50LWhlbHAnKTtcbmxvZ2dlci5kZWJ1ZygnTG9hZGVkJyk7XG5cbmNvbnN0IG5hbWVkT3B0aW9uID0gL14tLS87XG5cbmZ1bmN0aW9uIHBhcnNlTm8ob3B0aW9uLCBzdHIpIHtcbiAgaWYgKCFzdHIpIHJldHVybjtcblxuICBsZXQgY21kID0gc3RyLnJlcGxhY2UoJy0tJywgJycpO1xuXG4gIGlmICgvbm8tLy50ZXN0KGNtZCkpIHtcbiAgICBsb2dnZXIuZGVidWcoJ1BhcnNpbmcgbm8gb3B0aW9uJywgc3RyKTtcbiAgICBjbWQgPSBjbWQucmVwbGFjZSgnbm8tJywgJycpO1xuICAgIG9wdGlvbi5kZWZhdWx0ID0gJ3RydWUnO1xuICB9XG5cbiAgb3B0aW9uLm9wdGlvbiA9IGNtZDtcblxuICByZXR1cm4gb3B0aW9uO1xufVxuXG5mdW5jdGlvbiBwYXJzZURvdWJsZShhcnIpIHtcbiAgY29uc3QgZGVzY3JpcHRpb24gPSBfLndpdGhvdXQoYXJyLnNsaWNlKDIpLCcnKS5qb2luKCcgJyk7XG5cbiAgcmV0dXJuIHtcbiAgICBvcHRpb246IGFyclswXS5yZXBsYWNlKCctLScsICcnKSxcbiAgICB0eXBlOiAnQm9vbGVhbicsXG4gICAgYWxpYXM6IGFyclsxXS5yZXBsYWNlKCctLScsICcnKSxcbiAgICBkZXNjcmlwdGlvbjogZGVzY3JpcHRpb25cbiAgfTtcbn1cblxuZnVuY3Rpb24gcGFyc2VSZWd1bGFyKGFycikge1xuICBsb2dnZXIuZGVidWcoJ1BhcnNpbmcgJXMnLCBhcnJbMF0pO1xuXG4gIGlmICghYXJyWzBdKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3Qgb3B0aW9uVGV4dCA9IGFyclswXTtcbiAgY29uc3QgdHlwZSA9IGFyclsxXSB8fCAnQm9vbGVhbic7XG4gIGNvbnN0IG9wdGlvbiA9IHBhcnNlTm8oe30sIG9wdGlvblRleHQpO1xuICBjb25zdCBoZWxwVGV4dCA9IF8ud2l0aG91dChhcnIsIG9wdGlvblRleHQsIHR5cGUsICcnKTtcbiAgY29uc3QgZGVzY3JpcHRpb24gPSBoZWxwVGV4dC5qb2luKCcgJyk7XG5cbiAgb3B0aW9uLnR5cGUgPSB0eXBlO1xuXG4gIGlmIChkZXNjcmlwdGlvbikge1xuICAgIG9wdGlvbi5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuICB9XG5cbiAgcmV0dXJuIG9wdGlvbjtcbn1cblxuZnVuY3Rpb24gcGFyc2VBbGlhcyhhcnIpIHtcbiAgY29uc3QgYWxpYXMgPSBhcnJbMF07XG4gIGxvZ2dlci5kZWJ1ZygnQWxpYXMgZm91bmQ6ICVzJywgYWxpYXMpO1xuICBjb25zdCBvcHRpb24gPSBwYXJzZVJlZ3VsYXIoXy53aXRob3V0KGFyciwgYWxpYXMpKTtcblxuICBpZiAoYWxpYXMpIHtcbiAgICBvcHRpb24uYWxpYXMgPSBhbGlhcy5yZXBsYWNlKCctJywnJyk7XG4gIH1cblxuICByZXR1cm4gb3B0aW9uO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVPcHRpb24oYXJyKSB7XG4gIGxldCBvcHRpb247XG5cbiAgaWYgKG5hbWVkT3B0aW9uLnRlc3QoYXJyWzBdKSAmJiBuYW1lZE9wdGlvbi50ZXN0KGFyclsxXSkpIHsgLy8gbm8gYWxpYXMgZGVmYXVsdGVkIGJvb2xlYW5cbiAgICBvcHRpb24gPSBwYXJzZURvdWJsZShhcnIpO1xuICB9IGVsc2UgaWYgKG5hbWVkT3B0aW9uLnRlc3QoYXJyWzBdKSAmJiAhbmFtZWRPcHRpb24udGVzdChhcnJbMV0pKSB7IC8vIGp1c3QgYSBubyBhbGlhc1xuICAgIG9wdGlvbiA9IHBhcnNlUmVndWxhcihhcnIpO1xuICB9IGVsc2Ugey8vIGFsaWFzZWQgb3Igb3RoZXJcbiAgICBvcHRpb24gPSBwYXJzZUFsaWFzKGFycik7XG4gIH1cblxuICByZXR1cm4gXy5pc0VtcHR5KG9wdGlvbikgPyB1bmRlZmluZWQgOiBvcHRpb247XG59XG5cbmZ1bmN0aW9uIHBhcnNlSGVscChoZWxwVGV4dCkge1xuICBsZXQgaGVscEFyciA9IGhlbHBUZXh0LnNwbGl0KCdcXG4nKTtcbiAgbGV0IHByZXZpb3VzTGluZSA9IFtdO1xuXG4gIHJldHVybiBfLndpdGhvdXQoXy5tYXAoaGVscEFyciwgKHJvdywgaW5kZXgpID0+IHtcbiAgICBpZiAoaW5kZXggPD0gMikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBsZXQgc3RyID0gcm93LnJlcGxhY2UoJywnLCAnJyk7XG4gICAgbGV0IGFyciA9IHN0ci50cmltKCkuc3BsaXQoJyAnKTtcbiAgICBpZiAoc3RyLmluZGV4T2YoJy0nKSA+PSAwICYmIHByZXZpb3VzTGluZVswXSAhPT0gJycpIHtcbiAgICAgIGxldCBvcHRpb24gPSBjcmVhdGVPcHRpb24oYXJyKTtcbiAgICAgIGlmIChvcHRpb24gJiYgb3B0aW9uLm9wdGlvbiAhPT0gJ2Zvcm1hdCcgJiYgb3B0aW9uLm9wdGlvbiAhPT0gJ2hlbHAnKSB7XG4gICAgICAgIHJldHVybiBvcHRpb247XG4gICAgICB9XG4gICAgfVxuICAgIHByZXZpb3VzTGluZSA9IGFycjtcbiAgfSksIHVuZGVmaW5lZCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGVzbGludEhlbHAoKSB7XG4gIGxvZ2dlci5kZWJ1ZygnRXhlY3V0aW5nIGhlbHAnKTtcbiAgY29uc3QgcmVzdWx0ID0gZXNsaW50KFsnLS1oZWxwJ10sIHsgc3RkaW86IFsgcHJvY2Vzcy5zdGRpbiwgbnVsbCwgcHJvY2Vzcy5zdGRlcnJdIH0pO1xuICBpZiAoIXJlc3VsdC5tZXNzYWdlKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdIZWxwIHRleHQgbm90IHJlY2VpdmVkIGZyb20gRXNsaW50LicpO1xuICB9XG4gIGNvbnN0IGVzbGludE9wdGlvbnMgPSBwYXJzZUhlbHAocmVzdWx0Lm1lc3NhZ2UpO1xuICByZXR1cm4gZXNsaW50T3B0aW9ucztcbn07XG4iXX0=