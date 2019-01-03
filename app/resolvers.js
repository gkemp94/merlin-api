const utils = require("./utils");
const { generateParams } = require("./helpers");

const resolvers = {
    Query: {
        entries: () => {
            const sqlRequest = "SELECT * FROM entries";
            return utils.findAll(sqlRequest);
        },
        entry: (context, args) => {
            const sqlRequest = "SELECT * FROM entries WHERE date=$date";
            const sqlParams = generateParams(args);
            return utils.find(sqlRequest, sqlParams);
        },
        locations: () => {
            const sqlRequest =
                "SELECT city, state, country, count(*) as days from entries GROUP BY city||state||country";
            return utils.findAll(sqlRequest);
        },
        countries: () => {
            const sqlRequest =
                "SELECT country, COUNT(DISTINCT city) as totalCities, COUNT(*) as days from entries GROUP BY country";
            return utils.findAll(sqlRequest);
        }
    },
    Mutation: {
        addEntry: (context, entry) => {
            const sqlRequest = `INSERT into entries (date, city, state, country, confirmed, source)
                                VALUES ($date, $city, $state, $country, $confirmed, $source)`;
            const sqlParams = generateParams(entry);
            return utils.run(sqlRequest, sqlParams).then(() => entry);
        },
        removeEntry: (context, args) => {
            const sqlRequest = "DELETE FROM entries WHERE date=$date";
            const sqlParams = generateParams(args);
            return utils.run(sqlRequest, sqlParams);
        },
        editEntry: (context, entry) => {
            const sqlRequest = `UPDATE entries SET 
                                city=$city,
                                state=$state,
                                country=$country,
                                confirmed=$confirmed,
                                source=$source
                                WHERE date=$date`;
            const sqlParams = generateParams(entry);
            return utils.run(sqlRequest, sqlParams).then(() => entry);
        }
    }
};

module.exports = resolvers;
