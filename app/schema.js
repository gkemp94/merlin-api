
const { gql } = require('apollo-server-hapi');

const typeDefs = gql`
    type Entry {
        date: Float,
        city: String,
        state: String,
        country: String,
        confirmed: Boolean,
        source: String,
    }

    type Location {
        city: String,
        state: String,
        country: String,
        days: Int,
    }

    type Country {
        country: String,
        days: Int,
        totalCities: Int,
    }

    type Query {
        entries: [Entry]
        locations: [Location]
        countries: [Country]
        entry (date: Float): Entry
    }

    type Mutation {
        addEntry (
            date: Float
            city: String,
            state: String,
            country: String,
            confirmed: Boolean,
            source: String,
        ): Entry

        editEntry (
            date: Float
            city: String,
            state: String,
            country: String,
            confirmed: Boolean,
            source: String,
        ): Entry

        removeEntry (
            date: Float
        ): Boolean
    }
`

module.exports = typeDefs;