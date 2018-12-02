'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var logger = (0, _logger2.default)('arg-parser');
logger.debug('Loaded');

var simpleDetail = 'simple-detail';
var formatterPath = 'formatters';

var defaultPath = './';
var formatKey = '-f';
var keys = ['-w', '--watch', '--changed', '--clear', '--esw-version'];
var formats = ['simple', 'simple-success', simpleDetail];

function getPath(options) {
  logger.debug('GetPath: %s', options.format);
  var formatPath = _path2.default.join(__dirname, formatterPath, options.format);
  logger.debug(formatPath);
  return formatPath;
};

exports.default = {
  parse(cliArgs, options) {
    var dirs = options._;
    var formatSpecified = false;
    var args = _lodash2.default.slice(cliArgs, 2, cliArgs.length);
    logger.debug('Directories to check: %o', dirs);
    logger.debug('Args %o', args);
    var arr = _lodash2.default.without(_lodash2.default.map(args, function (item) {
      if (!_lodash2.default.includes(keys, item) && !_lodash2.default.includes(formats, item)) {
        logger.debug('Pushing item: %s', item);
        return item;
      }
      if (_lodash2.default.includes(formats, item)) {
        formatSpecified = true;
        logger.debug('Format specified');
        return getPath(options);
      }
    }), undefined);

    if (options.format === simpleDetail && !formatSpecified) {
      logger.debug('setting custom formatter');
      arr.push(formatKey);
      arr.push(getPath(options));
    }
    if (!dirs.length) {
      arr.push(defaultPath);
      logger.debug('Setting default path: %s', defaultPath);
    }
    return arr;
  }
};
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hcmctcGFyc2VyLmpzIl0sIm5hbWVzIjpbImxvZ2dlciIsImRlYnVnIiwic2ltcGxlRGV0YWlsIiwiZm9ybWF0dGVyUGF0aCIsImRlZmF1bHRQYXRoIiwiZm9ybWF0S2V5Iiwia2V5cyIsImZvcm1hdHMiLCJnZXRQYXRoIiwib3B0aW9ucyIsImZvcm1hdCIsImZvcm1hdFBhdGgiLCJqb2luIiwiX19kaXJuYW1lIiwicGFyc2UiLCJjbGlBcmdzIiwiZGlycyIsIl8iLCJmb3JtYXRTcGVjaWZpZWQiLCJhcmdzIiwic2xpY2UiLCJsZW5ndGgiLCJhcnIiLCJ3aXRob3V0IiwibWFwIiwiaXRlbSIsImluY2x1ZGVzIiwidW5kZWZpbmVkIiwicHVzaCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUVBOzs7Ozs7QUFFQSxJQUFNQSxTQUFTLHNCQUFPLFlBQVAsQ0FBZjtBQUNBQSxPQUFPQyxLQUFQLENBQWEsUUFBYjs7QUFFQSxJQUFNQyxlQUFlLGVBQXJCO0FBQ0EsSUFBTUMsZ0JBQWdCLFlBQXRCOztBQUVBLElBQU1DLGNBQWMsSUFBcEI7QUFDQSxJQUFNQyxZQUFZLElBQWxCO0FBQ0EsSUFBTUMsT0FBTyxDQUNYLElBRFcsRUFFWCxTQUZXLEVBR1gsV0FIVyxFQUlYLFNBSlcsRUFLWCxlQUxXLENBQWI7QUFPQSxJQUFNQyxVQUFVLENBQ2QsUUFEYyxFQUVkLGdCQUZjLEVBR2RMLFlBSGMsQ0FBaEI7O0FBTUEsU0FBU00sT0FBVCxDQUFpQkMsT0FBakIsRUFBMEI7QUFDeEJULFNBQU9DLEtBQVAsQ0FBYSxhQUFiLEVBQTRCUSxRQUFRQyxNQUFwQztBQUNBLE1BQU1DLGFBQWEsZUFBS0MsSUFBTCxDQUFVQyxTQUFWLEVBQXFCVixhQUFyQixFQUFvQ00sUUFBUUMsTUFBNUMsQ0FBbkI7QUFDQVYsU0FBT0MsS0FBUCxDQUFhVSxVQUFiO0FBQ0EsU0FBT0EsVUFBUDtBQUNEOztrQkFFYztBQUNiRyxRQUFNQyxPQUFOLEVBQWVOLE9BQWYsRUFBd0I7QUFDdEIsUUFBTU8sT0FBT1AsUUFBUVEsQ0FBckI7QUFDQSxRQUFJQyxrQkFBa0IsS0FBdEI7QUFDQSxRQUFNQyxPQUFPLGlCQUFFQyxLQUFGLENBQVFMLE9BQVIsRUFBaUIsQ0FBakIsRUFBb0JBLFFBQVFNLE1BQTVCLENBQWI7QUFDQXJCLFdBQU9DLEtBQVAsQ0FBYSwwQkFBYixFQUF5Q2UsSUFBekM7QUFDQWhCLFdBQU9DLEtBQVAsQ0FBYSxTQUFiLEVBQXdCa0IsSUFBeEI7QUFDQSxRQUFNRyxNQUFNLGlCQUFFQyxPQUFGLENBQVUsaUJBQUVDLEdBQUYsQ0FBTUwsSUFBTixFQUFZLFVBQUNNLElBQUQsRUFBVTtBQUMxQyxVQUFJLENBQUMsaUJBQUVDLFFBQUYsQ0FBV3BCLElBQVgsRUFBaUJtQixJQUFqQixDQUFELElBQTJCLENBQUMsaUJBQUVDLFFBQUYsQ0FBV25CLE9BQVgsRUFBb0JrQixJQUFwQixDQUFoQyxFQUEyRDtBQUN6RHpCLGVBQU9DLEtBQVAsQ0FBYSxrQkFBYixFQUFpQ3dCLElBQWpDO0FBQ0EsZUFBT0EsSUFBUDtBQUNEO0FBQ0QsVUFBSSxpQkFBRUMsUUFBRixDQUFXbkIsT0FBWCxFQUFvQmtCLElBQXBCLENBQUosRUFBK0I7QUFDN0JQLDBCQUFrQixJQUFsQjtBQUNBbEIsZUFBT0MsS0FBUCxDQUFhLGtCQUFiO0FBQ0EsZUFBT08sUUFBUUMsT0FBUixDQUFQO0FBQ0Q7QUFDRixLQVZxQixDQUFWLEVBVVJrQixTQVZRLENBQVo7O0FBWUEsUUFBSWxCLFFBQVFDLE1BQVIsS0FBbUJSLFlBQW5CLElBQW1DLENBQUNnQixlQUF4QyxFQUF5RDtBQUN2RGxCLGFBQU9DLEtBQVAsQ0FBYSwwQkFBYjtBQUNBcUIsVUFBSU0sSUFBSixDQUFTdkIsU0FBVDtBQUNBaUIsVUFBSU0sSUFBSixDQUFTcEIsUUFBUUMsT0FBUixDQUFUO0FBQ0Q7QUFDRCxRQUFJLENBQUNPLEtBQUtLLE1BQVYsRUFBa0I7QUFDaEJDLFVBQUlNLElBQUosQ0FBU3hCLFdBQVQ7QUFDQUosYUFBT0MsS0FBUCxDQUFhLDBCQUFiLEVBQXlDRyxXQUF6QztBQUNEO0FBQ0QsV0FBT2tCLEdBQVA7QUFDRDtBQTdCWSxDIiwiZmlsZSI6ImFyZy1wYXJzZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5cbmltcG9ydCBMb2dnZXIgZnJvbSAnLi9sb2dnZXInO1xuXG5jb25zdCBsb2dnZXIgPSBMb2dnZXIoJ2FyZy1wYXJzZXInKTtcbmxvZ2dlci5kZWJ1ZygnTG9hZGVkJyk7XG5cbmNvbnN0IHNpbXBsZURldGFpbCA9ICdzaW1wbGUtZGV0YWlsJztcbmNvbnN0IGZvcm1hdHRlclBhdGggPSAnZm9ybWF0dGVycyc7XG5cbmNvbnN0IGRlZmF1bHRQYXRoID0gJy4vJztcbmNvbnN0IGZvcm1hdEtleSA9ICctZic7XG5jb25zdCBrZXlzID0gW1xuICAnLXcnLFxuICAnLS13YXRjaCcsXG4gICctLWNoYW5nZWQnLFxuICAnLS1jbGVhcicsXG4gICctLWVzdy12ZXJzaW9uJ1xuXTtcbmNvbnN0IGZvcm1hdHMgPSBbXG4gICdzaW1wbGUnLFxuICAnc2ltcGxlLXN1Y2Nlc3MnLFxuICBzaW1wbGVEZXRhaWxcbl07XG5cbmZ1bmN0aW9uIGdldFBhdGgob3B0aW9ucykge1xuICBsb2dnZXIuZGVidWcoJ0dldFBhdGg6ICVzJywgb3B0aW9ucy5mb3JtYXQpO1xuICBjb25zdCBmb3JtYXRQYXRoID0gcGF0aC5qb2luKF9fZGlybmFtZSwgZm9ybWF0dGVyUGF0aCwgb3B0aW9ucy5mb3JtYXQpO1xuICBsb2dnZXIuZGVidWcoZm9ybWF0UGF0aCk7XG4gIHJldHVybiBmb3JtYXRQYXRoO1xufTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBwYXJzZShjbGlBcmdzLCBvcHRpb25zKSB7XG4gICAgY29uc3QgZGlycyA9IG9wdGlvbnMuXztcbiAgICBsZXQgZm9ybWF0U3BlY2lmaWVkID0gZmFsc2U7XG4gICAgY29uc3QgYXJncyA9IF8uc2xpY2UoY2xpQXJncywgMiwgY2xpQXJncy5sZW5ndGgpO1xuICAgIGxvZ2dlci5kZWJ1ZygnRGlyZWN0b3JpZXMgdG8gY2hlY2s6ICVvJywgZGlycyk7XG4gICAgbG9nZ2VyLmRlYnVnKCdBcmdzICVvJywgYXJncyk7XG4gICAgY29uc3QgYXJyID0gXy53aXRob3V0KF8ubWFwKGFyZ3MsIChpdGVtKSA9PiB7XG4gICAgICBpZiAoIV8uaW5jbHVkZXMoa2V5cywgaXRlbSkgJiYgIV8uaW5jbHVkZXMoZm9ybWF0cywgaXRlbSkpIHtcbiAgICAgICAgbG9nZ2VyLmRlYnVnKCdQdXNoaW5nIGl0ZW06ICVzJywgaXRlbSk7XG4gICAgICAgIHJldHVybiBpdGVtO1xuICAgICAgfVxuICAgICAgaWYgKF8uaW5jbHVkZXMoZm9ybWF0cywgaXRlbSkpIHtcbiAgICAgICAgZm9ybWF0U3BlY2lmaWVkID0gdHJ1ZTtcbiAgICAgICAgbG9nZ2VyLmRlYnVnKCdGb3JtYXQgc3BlY2lmaWVkJyk7XG4gICAgICAgIHJldHVybiBnZXRQYXRoKG9wdGlvbnMpO1xuICAgICAgfVxuICAgIH0pLCB1bmRlZmluZWQpO1xuXG4gICAgaWYgKG9wdGlvbnMuZm9ybWF0ID09PSBzaW1wbGVEZXRhaWwgJiYgIWZvcm1hdFNwZWNpZmllZCkge1xuICAgICAgbG9nZ2VyLmRlYnVnKCdzZXR0aW5nIGN1c3RvbSBmb3JtYXR0ZXInKTtcbiAgICAgIGFyci5wdXNoKGZvcm1hdEtleSk7XG4gICAgICBhcnIucHVzaChnZXRQYXRoKG9wdGlvbnMpKTtcbiAgICB9XG4gICAgaWYgKCFkaXJzLmxlbmd0aCkge1xuICAgICAgYXJyLnB1c2goZGVmYXVsdFBhdGgpO1xuICAgICAgbG9nZ2VyLmRlYnVnKCdTZXR0aW5nIGRlZmF1bHQgcGF0aDogJXMnLCBkZWZhdWx0UGF0aCk7XG4gICAgfVxuICAgIHJldHVybiBhcnI7XG4gIH1cbn07XG4iXX0=