# cs4460-final-project
Final information visualization project for CS 4460.

## Getting started

Make sure you have `nodejs 4.0+` installed. Once you do, type:

`$ npm install && npm run start`. That's it! :)

## Numbeo API key

To use the key, make a config file called `config.js` inside the `config` folder, and put this in there:

```js
let config = {
  numeoKey: 'key_goes_in_here'
};

export default config;
```

And now the key should be consumed by the app. That's it!
