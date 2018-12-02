'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _os = require('os');

var _os2 = _interopRequireDefault(_os);

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _package = require('../package');

var _package2 = _interopRequireDefault(_package);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var logger = (0, _logger2.default)('internal-settings'); /* Internal Settings */

var platform = _os2.default.platform();

var eslintPath = function loadEslintPath() {
  var cmd = platform === 'win32' ? '.cmd' : '';
  var eslintPath = void 0;
  try {
    eslintPath = _path2.default.join('./', `node_modules/.bin/eslint${cmd}`);
    _fs2.default.accessSync(eslintPath);
    logger.debug(`Eslint installed locally ${eslintPath}`);
  } catch (e) {
    logger.debug(e);
    try {
      eslintPath = _path2.default.join(process.env._, `../eslint${cmd}`);
      _fs2.default.accessSync(eslintPath);
      logger.debug(`Eslint installed globally ${eslintPath}`);
    } catch (e) {
      throw new Error('Eslint needs to be installed globally or locally in node_modules.');
    }
  }
  return eslintPath;
}();

var settings = {
  eswVersion: _package2.default.version,
  eslintPath,
  platform,
  isWindows: platform === 'win32'
};

logger.debug(settings);

exports.default = settings;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9zZXR0aW5ncy5qcyJdLCJuYW1lcyI6WyJsb2dnZXIiLCJwbGF0Zm9ybSIsImVzbGludFBhdGgiLCJsb2FkRXNsaW50UGF0aCIsImNtZCIsImpvaW4iLCJhY2Nlc3NTeW5jIiwiZGVidWciLCJlIiwicHJvY2VzcyIsImVudiIsIl8iLCJFcnJvciIsInNldHRpbmdzIiwiZXN3VmVyc2lvbiIsInZlcnNpb24iLCJpc1dpbmRvd3MiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBLElBQU1BLFNBQVMsc0JBQU8sbUJBQVAsQ0FBZixDLENBUEE7O0FBUUEsSUFBTUMsV0FBVyxhQUFHQSxRQUFILEVBQWpCOztBQUVBLElBQU1DLGFBQWMsU0FBU0MsY0FBVCxHQUEwQjtBQUM1QyxNQUFNQyxNQUFNSCxhQUFhLE9BQWIsR0FBdUIsTUFBdkIsR0FBZ0MsRUFBNUM7QUFDQSxNQUFJQyxtQkFBSjtBQUNBLE1BQUk7QUFDRkEsaUJBQWEsZUFBS0csSUFBTCxDQUFVLElBQVYsRUFBaUIsMkJBQTBCRCxHQUFJLEVBQS9DLENBQWI7QUFDQSxpQkFBR0UsVUFBSCxDQUFjSixVQUFkO0FBQ0FGLFdBQU9PLEtBQVAsQ0FBYyw0QkFBMkJMLFVBQVcsRUFBcEQ7QUFDRCxHQUpELENBSUUsT0FBT00sQ0FBUCxFQUFVO0FBQ1ZSLFdBQU9PLEtBQVAsQ0FBYUMsQ0FBYjtBQUNBLFFBQUk7QUFDRk4sbUJBQWEsZUFBS0csSUFBTCxDQUFVSSxRQUFRQyxHQUFSLENBQVlDLENBQXRCLEVBQTBCLFlBQVdQLEdBQUksRUFBekMsQ0FBYjtBQUNBLG1CQUFHRSxVQUFILENBQWNKLFVBQWQ7QUFDQUYsYUFBT08sS0FBUCxDQUFjLDZCQUE0QkwsVUFBVyxFQUFyRDtBQUNELEtBSkQsQ0FJRSxPQUFPTSxDQUFQLEVBQVU7QUFDVixZQUFNLElBQUlJLEtBQUosQ0FBVSxtRUFBVixDQUFOO0FBQ0Q7QUFDRjtBQUNELFNBQU9WLFVBQVA7QUFDRCxDQWxCa0IsRUFBbkI7O0FBb0JBLElBQU1XLFdBQVc7QUFDZkMsY0FBWSxrQkFBSUMsT0FERDtBQUVmYixZQUZlO0FBR2ZELFVBSGU7QUFJZmUsYUFBV2YsYUFBYTtBQUpULENBQWpCOztBQU9BRCxPQUFPTyxLQUFQLENBQWFNLFFBQWI7O2tCQUVlQSxRIiwiZmlsZSI6InNldHRpbmdzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogSW50ZXJuYWwgU2V0dGluZ3MgKi9cbmltcG9ydCBvcyBmcm9tICdvcyc7XG5pbXBvcnQgTG9nZ2VyIGZyb20gJy4vbG9nZ2VyJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IGZzIGZyb20gJ2ZzJztcbmltcG9ydCBwa2cgZnJvbSAnLi4vcGFja2FnZSc7XG5cbmNvbnN0IGxvZ2dlciA9IExvZ2dlcignaW50ZXJuYWwtc2V0dGluZ3MnKTtcbmNvbnN0IHBsYXRmb3JtID0gb3MucGxhdGZvcm0oKTtcblxuY29uc3QgZXNsaW50UGF0aCA9IChmdW5jdGlvbiBsb2FkRXNsaW50UGF0aCgpIHtcbiAgY29uc3QgY21kID0gcGxhdGZvcm0gPT09ICd3aW4zMicgPyAnLmNtZCcgOiAnJztcbiAgbGV0IGVzbGludFBhdGg7XG4gIHRyeSB7XG4gICAgZXNsaW50UGF0aCA9IHBhdGguam9pbignLi8nLCBgbm9kZV9tb2R1bGVzLy5iaW4vZXNsaW50JHtjbWR9YCk7XG4gICAgZnMuYWNjZXNzU3luYyhlc2xpbnRQYXRoKTtcbiAgICBsb2dnZXIuZGVidWcoYEVzbGludCBpbnN0YWxsZWQgbG9jYWxseSAke2VzbGludFBhdGh9YCk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBsb2dnZXIuZGVidWcoZSk7XG4gICAgdHJ5IHtcbiAgICAgIGVzbGludFBhdGggPSBwYXRoLmpvaW4ocHJvY2Vzcy5lbnYuXywgYC4uL2VzbGludCR7Y21kfWApO1xuICAgICAgZnMuYWNjZXNzU3luYyhlc2xpbnRQYXRoKTtcbiAgICAgIGxvZ2dlci5kZWJ1ZyhgRXNsaW50IGluc3RhbGxlZCBnbG9iYWxseSAke2VzbGludFBhdGh9YCk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdFc2xpbnQgbmVlZHMgdG8gYmUgaW5zdGFsbGVkIGdsb2JhbGx5IG9yIGxvY2FsbHkgaW4gbm9kZV9tb2R1bGVzLicpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZXNsaW50UGF0aDtcbn0pKCk7XG5cbmNvbnN0IHNldHRpbmdzID0ge1xuICBlc3dWZXJzaW9uOiBwa2cudmVyc2lvbixcbiAgZXNsaW50UGF0aCxcbiAgcGxhdGZvcm0sXG4gIGlzV2luZG93czogcGxhdGZvcm0gPT09ICd3aW4zMidcbn07XG5cbmxvZ2dlci5kZWJ1ZyhzZXR0aW5ncyk7XG5cbmV4cG9ydCBkZWZhdWx0IHNldHRpbmdzO1xuIl19