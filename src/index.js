const parse = require('./parser');

const VinDecoder = function VinDecoder() {
  this.parse = parse;
};

VinDecoder.prototype.decode = function decode(vin) {
  try {
    this.validate(vin);
  } catch (e) {
    throw new Error(e.message);
  }

  const data = this.parse(vin);
  data.toString = this.toString;

  return data;
};

VinDecoder.prototype.validate = function validate(vin) {
  const vinRegExp = /^[a-hj-npr-z0-9]{8}[0-9xX][a-hj-npr-z0-9]{8}$/;

  if (typeof vin !== 'string') {
    throw new Error('Vin code must be a string');
  }

  if (!vinRegExp.test(vin.toLowerCase())) {
    throw new Error('Invalid vin code');
  }

  return true;
};

VinDecoder.prototype.toString = function toString() {
  return (
    this.vehicle.value + '; ' +
    this.year.value + '; ' +
    this.doors.value + '; ' +
    this.gearbox.value + '; ' +
    this.engine.value.engine + '; ' +
    this.engine.value.desc + '; ' +
    this.assembly.value
  );
};

module.exports = VinDecoder;
