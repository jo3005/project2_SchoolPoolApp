require("dotenv").config();

module.exports={
    "google": {
        "google_key": process.env.GOOGLE_MAPS_API_KEY,
        "google_email": process.env.GOOGLE_API_EMAIL
    },
    "development": {
              "username": process.env.MYSQL_USERNAME,
              "password": process.env.MYSQL_PASSWORD,
              "database": "schoolpool", 
              "host": "localhost",
              "port": "3306",
              "dialect": "mysql"
            },
    "test": {
              "username": "root",
              "password": "dank",
              "database": "database_test",
              "host": "127.0.0.1",
              "port": 3306,
              "dialect": "mysql"
            },
    "production": {
              "use_env_variable": process.env.JAWSDB_URL,
              "dialect": "mysql"
            }
}
    
