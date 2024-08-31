class AppConfig {
    //Setting for the database to be built:
    public port = process.env.PORT; //declaring the port of the server 
    public host = process.env.DB_HOST;//on which device the data base is located
    public user = process.env.DB_USER;// user for using the database. can find in phpMyAdmin -> privileges
    public password = process.env.DB_PASSWORD;//password for using the database. In case of northwind - empty string.
    public database = process.env.DB_NAME; //name of the database.
    public readonly domainName = "http://localhost:" + this.port; //http address.
    public origin = process.env.ORIGIN;//http address.
}

// setting product's state
class DevelopmentConfig extends AppConfig {
    public isDevelopment = true;
    public isProduction = false;
}

class ProductionConfig extends AppConfig {
    public isDevelopment = false;
    public isProduction = true;
}

const appConfig = (process.env.NODE_ENV === "production") ? new ProductionConfig() : new DevelopmentConfig();

export default appConfig;
