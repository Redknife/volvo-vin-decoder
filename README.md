# Volvo vin decoder
Isomorphic simple library for decode volvo vin codes and extract data.
Use with caution, some codes may be outdated or incomplete. [See codes dir](src/codes/)


## Example
[See example dir](example/)


## Installation

```
npm install volvo-vin-decoder
```


## Usage

```html
<script src="volvo-vin-decoder.min.js"></script>
<script>
  var decoder = new VinDecoder();
  var data = decoder.decode('YV1CW585231287412');
  console.log(data);
</script>
```

Return:

```javascript
{
    wmi: {
        code: 'YB2',
        value: 'VOLVO AB (Belgium)'
    },
    vehicle: {
        code: 'D',
        value: 'XC60'
    },
    platform: {
        code: 'Z',
        value: 'XC60 AWD, XC70 AWD, XC90 7-Seater AWD'
    },
    engine: {
        code: '99',
        value: {
            engine: 'B6294T',
            desc: 'R6, 3.0 L, petrol, turbo, intercooler',
            comment: 'New model'
        }
    },
    doors: {
        code: '5',
        value: '5 Door (Wagon)'
    },
    gearbox: {
        code: '6',
        value: 'AW42 Auto'
    },
    year: {
        code: '9',
        value: '2009'
    },
    assembly: {
        code: '2',
        value: 'Belgium - Ghent Plant VCG 22'
    },
    ...
}
```


## Build for browser (for developers)

```
npm run build
```


## License

Released under the MIT License. See the bundled `LICENSE` file for
details.
