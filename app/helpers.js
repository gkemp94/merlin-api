const generateParams = args =>
    Object.keys(args).reduce((params, key) => {
        params["$" + key] = args[key];
        return params;
    }, {});

module.exports = { generateParams };
