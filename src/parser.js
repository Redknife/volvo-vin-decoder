const wmiCodes = require('./codes/wmi_code.json');
const vehicleCodes = require('./codes/vehicle_code.json');
const platformCodes = require('./codes/platform_code.json');
const assemblyCodes = require('./codes/assembly_code.json');
const engineCodes = require('./codes/engine_code.json');
const gearboxCodes = require('./codes/gearbox_code.json');
const yearCodes = require('./codes/year_code.json');
const doorsCodes = require('./codes/doors_code.json');

module.exports = parse;

function parse(vin) {
  const wmiCode = getWMICode(vin);
  const wmi = getWMI(wmiCode);

  const yearCode = getYearCode(vin);
  const year = getYear(yearCode);

  const vehicleCode = getVehicleCode(vin);
  const vehicle = getVehicle(vehicleCode, year);

  const platformCode = getPlatformCode(vin);
  const platform = getPlatform(platformCode, year);

  const engineCode = getEngineCode(vin);
  const engine = getEngine(engineCode);

  const doorsCode = getDoorsCode(vin);
  const doors = getDoors(doorsCode);

  const gearboxCode = getGearboxCode(vin);
  const gearbox = getGearbox(gearboxCode);

  const assemblyCode = getAssemblyCode(vin);
  const assembly = getAssembly(assemblyCode);

  return {
    wmi: {
      code: wmiCode,
      value: wmi,
    },
    vehicle: {
      code: vehicleCode,
      value: vehicle,
    },
    platform: {
      code: platformCode,
      value: platform,
    },
    engine: {
      code: engineCode,
      value: engine,
    },
    doors: {
      code: doorsCode,
      value: doors,
    },
    gearbox: {
      code: gearboxCode,
      value: gearbox,
    },

    year: {
      code: yearCode,
      value: year,
    },

    assembly: {
      code: assemblyCode,
      value: assembly,
    },
  };
}

// WMI code
function getWMICode(vin) {
  return vin.substr(0, 3);
}

function getWMI(code) {
  return wmiCodes[code];
}

// Vehicle code
function getVehicleCode(vin) {
  return vin.substr(3, 1);
}

function getVehicle(code, year) {
  var result = vehicleCodes[code];

  if (!!year) {
    const matchYears = Object.keys(result).filter((k) => checkMatchYear(year, k));
    if (matchYears.length) {
      const lastMatchYear = matchYears[matchYears.length - 1];
      result = result[lastMatchYear];
    }
  }

  return result;
}

// Platform
function getPlatformCode(vin) {
  return vin.substr(4, 1);
}

function getPlatform(code, year) {
  const matchYears = Object.keys(platformCodes).filter((k) => checkMatchYear(year, k));
  if (matchYears.length) {
    const lastMatchYear = matchYears[matchYears.length - 1];
    return platformCodes[lastMatchYear][code];
  }
  return false;
}

// Engine
function getEngineCode(vin) {
  return vin.substr(5, 2);
}

function getEngine(code) {
  return engineCodes[code];
}

// Doors
function getDoorsCode(vin) {
  return vin.substr(7, 1);
}

function getDoors(code) {
  return doorsCodes[code];
}

// Gearbox
function getGearboxCode(vin) {
  return vin.substr(8, 1);
}

function getGearbox(code) {
  return gearboxCodes[code];
}

// Year
function getYearCode(vin) {
  return vin.substr(9, 1);
}

function getYear(code) {
  return yearCodes[code];
}

// Assembly
function getAssemblyCode(vin) {
  return vin.substr(10, 1);
}

function getAssembly(code) {
  return assemblyCodes[code];
}

// Helper
function checkMatchYear(year, str) {
  if (isNaN(+year)) {
    throw new Error('Invalid argument');
  }

  // Check len and starts with number
  if (str.length < 4 && !isNaN(+str.charAt(0))) {
    throw new Error('Invalid string');
  }

  if (year === str) return true;

  if (str.includes('-') && !str.startsWith('-') && !str.endsWith('-')) {
    const years = str.split('-').map((el) => +el);
    if (years.length > 1) {
      return (years[0] <= year && year <= years[1]);
    }
  }

  if (str.endsWith('+')) {
    return (year >= +str.slice(0, -1));
  }

  if (str.endsWith('-')) {
    return (year <= +str.slice(0, -1));
  }

  return false;
}
