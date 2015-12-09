# Final InfoViz Project (CS 4460)

![Screenshot Demo](demo-screencast.gif?raw=true "Demo")

## Getting started

Before you do anything else, **make sure you have nodejs 4.0+ installed.**

### Building the project

1. Run `$ npm install` in your terminal to get all dependencies.

### Numbeo API key

To use the key, make a config file called `config.js` inside the `config` folder:

```
$ cd config
$ touch config.js
$ open config.js
```

Then copy and paste the following into `config.js`:

```js
'use strict';

let config = {
  numeoKey: 'key_goes_in_here'
};

export default config;
```

Then paste your Numbeo API key into the `key_goes_in_here` placeholder. That's it!

### Running the project

Assuming you did everything above correctly, just run:

```
$ npm run start
```
from the root directory of the app (`cs4460-final-project`) and the app should
launch in your browser.

**Note: If you see a blank page, you might need to hit refresh for Webpack to finish bundling**.
