'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _textTable = require('text-table');

var _textTable2 = _interopRequireDefault(_textTable);

var _stripAnsi = require('strip-ansi');

var _stripAnsi2 = _interopRequireDefault(_stripAnsi);

var _characters = require('./helpers/characters');

var _characters2 = _interopRequireDefault(_characters);

var _logger = require('../logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var logger = (0, _logger2.default)('simple-detail'); // Template Author Sindre Sorhus @eslint
// https://github.com/sindresorhus/eslint-stylish


logger.debug('loaded');

var tableSettings = {
  align: ['', '', 'r'],
  stringLength: function stringLength(str) {
    return (0, _stripAnsi2.default)(str).length;
  }
};

function pluralize(word, count) {
  return count === 1 ? word : word + 's';
}

function simpleDetail(results) {
  var totalErrors = 0;
  var totalWarnings = 0;
  var output = '';
  var cleanMsg = '';
  var messageTime = _chalk2.default.dim(`(${new Date().toLocaleTimeString()})`);
  logger.debug(results);
  results.forEach(function (result) {
    var messages = result.messages;
    var warnings = 0;
    var errors = 0;
    if (!messages.length) {
      return;
    }
    var tableContents = messages.map(function (message) {
      function getMessageType(msg) {
        if (msg.fatal || msg.severity === 2) {
          totalErrors++;
          errors++;
          return _chalk2.default.red(_characters2.default.x);
        }

        totalWarnings++;
        warnings++;
        return _chalk2.default.yellow(_characters2.default.ex);
      }

      return ['', getMessageType(message), message.line || 0, message.column || 0, _chalk2.default.dim(message.message.replace(/\.$/, '')), _chalk2.default.dim(message.ruleId || '')];
    });

    var tableText = (0, _textTable2.default)(tableContents, tableSettings);

    output += _chalk2.default.white.underline(result.filePath) + ` (${_chalk2.default.red(errors)}/${_chalk2.default.yellow(warnings)})${_characters2.default.endLine}`;
    output += tableText.split(_characters2.default.endLine).map(function (el) {
      return el.replace(/(\d+)\s+(\d+)/, function (m, p1, p2) {
        return _chalk2.default.dim(`${p1}:${p2}`);
      });
    }).join(_characters2.default.endLine) + _characters2.default.endLine + _characters2.default.endLine;
  });

  if (totalErrors) {
    output += _chalk2.default.red(`${_characters2.default.x} ${totalErrors} ${pluralize('error', totalErrors)} `);
  }
  if (totalWarnings) {
    output += _chalk2.default.yellow(`${_characters2.default.ex} ${totalWarnings} ${pluralize('warning', totalWarnings)} `);
  }

  if (results.length > 0 || !results.length) {
    cleanMsg = _chalk2.default.green(`${_characters2.default.check} Clean`) + ` ${messageTime}`;
  }

  output = totalErrors || totalWarnings ? `${output}${messageTime}${_characters2.default.endLine}` : cleanMsg;

  return output;
}

exports.default = simpleDetail;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9mb3JtYXR0ZXJzL3NpbXBsZS1kZXRhaWwuanMiXSwibmFtZXMiOlsibG9nZ2VyIiwiZGVidWciLCJ0YWJsZVNldHRpbmdzIiwiYWxpZ24iLCJzdHJpbmdMZW5ndGgiLCJzdHIiLCJsZW5ndGgiLCJwbHVyYWxpemUiLCJ3b3JkIiwiY291bnQiLCJzaW1wbGVEZXRhaWwiLCJyZXN1bHRzIiwidG90YWxFcnJvcnMiLCJ0b3RhbFdhcm5pbmdzIiwib3V0cHV0IiwiY2xlYW5Nc2ciLCJtZXNzYWdlVGltZSIsImRpbSIsIkRhdGUiLCJ0b0xvY2FsZVRpbWVTdHJpbmciLCJmb3JFYWNoIiwicmVzdWx0IiwibWVzc2FnZXMiLCJ3YXJuaW5ncyIsImVycm9ycyIsInRhYmxlQ29udGVudHMiLCJtYXAiLCJtZXNzYWdlIiwiZ2V0TWVzc2FnZVR5cGUiLCJtc2ciLCJmYXRhbCIsInNldmVyaXR5IiwicmVkIiwieCIsInllbGxvdyIsImV4IiwibGluZSIsImNvbHVtbiIsInJlcGxhY2UiLCJydWxlSWQiLCJ0YWJsZVRleHQiLCJ3aGl0ZSIsInVuZGVybGluZSIsImZpbGVQYXRoIiwiZW5kTGluZSIsInNwbGl0IiwiZWwiLCJtIiwicDEiLCJwMiIsImpvaW4iLCJncmVlbiIsImNoZWNrIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQUNBOzs7Ozs7QUFFQSxJQUFNQSxTQUFTLHNCQUFPLGVBQVAsQ0FBZixDLENBVEE7QUFDQTs7O0FBVUFBLE9BQU9DLEtBQVAsQ0FBYSxRQUFiOztBQUVBLElBQUlDLGdCQUFnQjtBQUNsQkMsU0FBTyxDQUFDLEVBQUQsRUFBSyxFQUFMLEVBQVMsR0FBVCxDQURXO0FBRWxCQyxnQkFBYyxzQkFBQ0MsR0FBRDtBQUFBLFdBQVMseUJBQU1BLEdBQU4sRUFBV0MsTUFBcEI7QUFBQTtBQUZJLENBQXBCOztBQUtBLFNBQVNDLFNBQVQsQ0FBbUJDLElBQW5CLEVBQXlCQyxLQUF6QixF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akIsSUFBc0IsQ0FBQ0ssUUFBUUwsTUFBbkMsRUFBMkM7QUFDekNTLGVBQVcsZ0JBQU1vQyxLQUFOLENBQWEsR0FBRSxxQkFBRUMsS0FBTSxRQUF2QixJQUFtQyxJQUFHcEMsV0FBWSxFQUE3RDtBQUNEOztBQUVERixXQUFVRixlQUFlQyxhQUFoQixHQUNKLEdBQUVDLE1BQU8sR0FBRUUsV0FBWSxHQUFFLHFCQUFFNEIsT0FBUSxFQUQvQixHQUVMN0IsUUFGSjs7QUFJQSxTQUFPRCxNQUFQO0FBQ0Q7O2tCQUVjSixZIiwiZmlsZSI6InNpbXBsZS1kZXRhaWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBUZW1wbGF0ZSBBdXRob3IgU2luZHJlIFNvcmh1cyBAZXNsaW50XG4vLyBodHRwczovL2dpdGh1Yi5jb20vc2luZHJlc29yaHVzL2VzbGludC1zdHlsaXNoXG5pbXBvcnQgY2hhbGsgZnJvbSAnY2hhbGsnO1xuaW1wb3J0IHRhYmxlIGZyb20gJ3RleHQtdGFibGUnO1xuaW1wb3J0IHN0cmlwIGZyb20gJ3N0cmlwLWFuc2knO1xuXG5pbXBvcnQgYyBmcm9tICcuL2hlbHBlcnMvY2hhcmFjdGVycyc7XG5pbXBvcnQgTG9nZ2VyIGZyb20gJy4uL2xvZ2dlcic7XG5cbmNvbnN0IGxvZ2dlciA9IExvZ2dlcignc2ltcGxlLWRldGFpbCcpO1xuXG5sb2dnZXIuZGVidWcoJ2xvYWRlZCcpO1xuXG5sZXQgdGFibGVTZXR0aW5ncyA9IHtcbiAgYWxpZ246IFsnJywgJycsICdyJ10sXG4gIHN0cmluZ0xlbmd0aDogKHN0cikgPT4gc3RyaXAoc3RyKS5sZW5ndGhcbn07XG5cbmZ1bmN0aW9uIHBsdXJhbGl6ZSh3b3JkLCBjb3VudCkge1xuICByZXR1cm4gKGNvdW50ID09PSAxID8gd29yZCA6IHdvcmQgKyAncycpO1xufVxuXG5mdW5jdGlvbiBzaW1wbGVEZXRhaWwocmVzdWx0cykge1xuICBsZXQgdG90YWxFcnJvcnMgPSAwO1xuICBsZXQgdG90YWxXYXJuaW5ncyA9IDA7XG4gIGxldCBvdXRwdXQgPSAnJztcbiAgbGV0IGNsZWFuTXNnID0gJyc7XG4gIGxldCBtZXNzYWdlVGltZSA9IGNoYWxrLmRpbShgKCR7bmV3IERhdGUoKS50b0xvY2FsZVRpbWVTdHJpbmcoKX0pYCk7XG4gIGxvZ2dlci5kZWJ1ZyhyZXN1bHRzKTtcbiAgcmVzdWx0cy5mb3JFYWNoKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICBsZXQgbWVzc2FnZXMgPSByZXN1bHQubWVzc2FnZXM7XG4gICAgbGV0IHdhcm5pbmdzID0gMDtcbiAgICBsZXQgZXJyb3JzID0gMDtcbiAgICBpZiAoIW1lc3NhZ2VzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCB0YWJsZUNvbnRlbnRzID0gbWVzc2FnZXMubWFwKGZ1bmN0aW9uIChtZXNzYWdlKSB7XG4gICAgICBmdW5jdGlvbiBnZXRNZXNzYWdlVHlwZShtc2cpIHtcbiAgICAgICAgaWYgKG1zZy5mYXRhbCB8fCBtc2cuc2V2ZXJpdHkgPT09IDIpIHtcbiAgICAgICAgICB0b3RhbEVycm9ycysrO1xuICAgICAgICAgIGVycm9ycysrO1xuICAgICAgICAgIHJldHVybiBjaGFsay5yZWQoYy54KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRvdGFsV2FybmluZ3MrKztcbiAgICAgICAgd2FybmluZ3MrKztcbiAgICAgICAgcmV0dXJuIGNoYWxrLnllbGxvdyhjLmV4KTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIFsnJyxcbiAgICAgICAgZ2V0TWVzc2FnZVR5cGUobWVzc2FnZSksXG4gICAgICAgIG1lc3NhZ2UubGluZSB8fCAwLFxuICAgICAgICBtZXNzYWdlLmNvbHVtbiB8fCAwLFxuICAgICAgICBjaGFsay5kaW0obWVzc2FnZS5tZXNzYWdlLnJlcGxhY2UoL1xcLiQvLCAnJykpLFxuICAgICAgICBjaGFsay5kaW0obWVzc2FnZS5ydWxlSWQgfHwgJycpXTtcbiAgICB9KTtcblxuICAgIGNvbnN0IHRhYmxlVGV4dCA9IHRhYmxlKHRhYmxlQ29udGVudHMsIHRhYmxlU2V0dGluZ3MpO1xuXG4gICAgb3V0cHV0ICs9IGNoYWxrLndoaXRlLnVuZGVybGluZShyZXN1bHQuZmlsZVBhdGgpICsgYCAoJHtjaGFsay5yZWQoZXJyb3JzKX0vJHtjaGFsay55ZWxsb3cod2FybmluZ3MpfSkke2MuZW5kTGluZX1gO1xuICAgIG91dHB1dCArPSB0YWJsZVRleHQuc3BsaXQoYy5lbmRMaW5lKS5tYXAoZnVuY3Rpb24gKGVsKSB7XG4gICAgICByZXR1cm4gZWwucmVwbGFjZSgvKFxcZCspXFxzKyhcXGQrKS8sIChtLCBwMSwgcDIpID0+IGNoYWxrLmRpbShgJHtwMX06JHtwMn1gKSk7XG4gICAgfSkuam9pbihjLmVuZExpbmUpICsgYy5lbmRMaW5lICsgYy5lbmRMaW5lO1xuICB9KTtcblxuICBpZiAodG90YWxFcnJvcnMpIHtcbiAgICBvdXRwdXQgKz0gY2hhbGsucmVkKGAke2MueH0gJHt0b3RhbEVycm9yc30gJHtwbHVyYWxpemUoJ2Vycm9yJywgdG90YWxFcnJvcnMpfSBgKTtcbiAgfVxuICBpZiAodG90YWxXYXJuaW5ncykge1xuICAgIG91dHB1dCArPSBjaGFsay55ZWxsb3coYCR7Yy5leH0gJHt0b3RhbFdhcm5pbmdzfSAke3BsdXJhbGl6ZSgnd2FybmluZycsIHRvdGFsV2FybmluZ3MpfSBgKTtcbiAgfVxuXG4gIGlmIChyZXN1bHRzLmxlbmd0aCA+IDAgfHwgIXJlc3VsdHMubGVuZ3RoKSB7XG4gICAgY2xlYW5Nc2cgPSBjaGFsay5ncmVlbihgJHtjLmNoZWNrfSBDbGVhbmApICsgYCAke21lc3NhZ2VUaW1lfWA7XG4gIH1cblxuICBvdXRwdXQgPSAodG90YWxFcnJvcnMgfHwgdG90YWxXYXJuaW5ncylcbiAgICA/IGAke291dHB1dH0ke21lc3NhZ2VUaW1lfSR7Yy5lbmRMaW5lfWBcbiAgICA6IGNsZWFuTXNnO1xuXG4gIHJldHVybiBvdXRwdXQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHNpbXBsZURldGFpbDtcbiJdfQ==