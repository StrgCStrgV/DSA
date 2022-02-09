require('dotenv').config();
//bring all variables from .env
const { Pool } = require("pg");
//what?

const isProduction = process.env.NODE_ENV === "production";
// process.env.NODE_ENV = 'production';
//NODE_env is a variable given from env and says true if we are in procuction

const connectionString = `postgreesql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`
// ${template from env}, for what postgreesql?

const pool = new Pool({
    connectionString: isProduction ? process.env.DATABASE_URL : connectionString
    //if isProduction=true take process.env.DATABASE_URL, otherwise connectionString
})

module.exports = { pool };