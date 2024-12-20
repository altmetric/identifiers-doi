# Identifiers - DOI

Extract, validate and normalize [DOIs](https://www.doi.org/) (including [ISBN-As](https://www.doi.org/factsheets/ISBN-A.html)).

**Current version:** 0.2.1  
**Supported Node.js versions:** 18, 20, 22, 23

## Installation

Add the following to your `package.json` via `yarn add identifiers-doi` or `npm install --save identifiers-doi`:

```shell
"identifiers-doi": "^0.2.0"
```

## Usage

```javascript
const doi = require("identifiers-doi");

doi.extract("My favourite DOI is 10.1038/nplants.2015.3");
//=> ["10.1038/nplants.2015.3"]
```

## Other versions

We also maintain versions of this library for [Ruby](https://github.com/altmetric/identifiers) and [PHP](https://github.com/altmetric/php-identifiers).

## License

Copyright © 2017-2024 Altmetric LLP

Distributed under the [MIT License](http://opensource.org/licenses/MIT).
