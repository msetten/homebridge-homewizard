'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HomeWizardKakusensor = undefined;

require('babel-polyfill');

var _accessory = require('./accessory');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HomeWizardKakusensor = exports.HomeWizardKakusensor = (function (_HomeWizardBaseAccess) {
  _inherits(HomeWizardKakusensor, _HomeWizardBaseAccess);

  function HomeWizardKakusensor() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, HomeWizardKakusensor);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(HomeWizardKakusensor)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.model = 'Kakusensor', _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(HomeWizardKakusensor, [{
    key: 'setupServices',
    value: function setupServices() {
      // Setup services
      if (this.hwObject.type === 'light') {
      	var contactSensorService = new this.hap.Service.ContactSensor();
      	contactSensorService.getCharacteristic(this.hap.Characteristic.ContactSensorState).on('get', this.getStatus.bind(this));
   
  	    this.services.push(contactSensorService);
      }
    }

    // Sadly there is no individual call to get a sensor status
    // so retrieve all and find this one

  }, {
    key: 'getCurrentValues',
    value: function getCurrentValues() {
      return this.api.request({ url: 'kks/get/' + this.id + '/log' }).then(function (data) {
        return data.response[data.response.length - 1];
      });
    }
  }, {
    key: 'getStatus',
    value: function getStatus(callback) {
      var _this4 = this;

      this.getCurrentValues().then(function (sw) {
        var state = sw.status === 'yes' ? 0 : 1;
        _this4.log('Retrieved active state for: ' + _this4.name + ' - ' + state);
        callback(null, state);
      }).catch(function (error) {
        callback(error, 0);
      });
    }
  }]);

  return HomeWizardKakusensor;
})(_accessory.HomeWizardBaseAccessory);
