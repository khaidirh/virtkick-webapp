define(function(require) {

  var angular = require('angular');
  var module = require('module');
  var mod = angular.module(module.id, []);

  mod.filter('currency', function() {
    return function(amount, currency) {
      var floatValue = parseFloat(amount / 100).toFixed(2);
      if (currency == 'usd') {
        return '$' + floatValue;
      }
      return floatValue + ' ' + currency.toUpperCase();
    };
  });

  mod.filter('payPeriod', function() {
    return function(value) {
      if(value == 'monthly') {
        return 'mo';
      } else if(value == 'hourly') {
        return 'h';
      }
      return value;
    };
  });

  mod.filter('bytes', function() {
    return function(amount, amountFormat, precision) {

      precision = precision || 0;

      amountFormat = (amountFormat || 'b').toUpperCase();

      if(!amount) {
        return "0" + ' ' + amountFormat;
      }

      if (amountFormat === 'TB') {
        amount *= 1024 * 1024 * 1024 * 1024;
      } else if (amountFormat === 'GB') {
        amount *= 1024 * 1024 * 1024;
      } else if (amountFormat === 'MB') {
        amount *= 1024 * 1024;
      } else if (amountFormat === 'KB') {
        amount *= 1024;
      }
      amountFormat = 'B';
      if (amount >= 1024) {
        amount /= 1024;
        amountFormat = 'KB';
        if (amount >= 1024*5) {
          amount /= 1024;
          amountFormat = 'MB';
          if (amount >= 1024*5) {
            amount /= 1024;
            amountFormat = 'GB';
            if (amount >= 1024*5) {
              amount /= 1024;
              amountFormat = 'TB';
            }
          }
        }
      }

      amount = amount.toFixed(2);
      if(amount.match(/\..*[0]+$/)) {
        amount = amount.replace(/\.?0+$/, '');
      }
      return amount + ' ' + amountFormat;
    };
  });

  mod.directive('versioned', function (version) {
    return {
      retrict: 'A',
      controller: function ($scope, $element, $attrs) {
        var ngSrc = $attrs.ngSrc;
        $attrs.$set('ngSrc', ngSrc + '?v=' + version);
      },
      link: function (scope, elem, attrs) {
        attrs.$observe('ngSrc', function (val) {
          if(!val.match(/\?v=/)) {
            attrs.$set('ngSrc', val + '?v=' + version);
          }
        });
      }
    };
  });
  return module.id;
});