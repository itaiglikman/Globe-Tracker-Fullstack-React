class AppConfig {
    public readonly loginUrl = this.baseUrl + "/api/login/";
    public readonly registerUrl = this.baseUrl + "/api/register/";
    public readonly vacationsUrl = this.baseUrl + "/api/vacations/"; // vacations action
    public readonly followVacationsUrl = this.baseUrl + "/api/follow-vacations/"; //get all vacations included the follow info
    public readonly followUrl = this.baseUrl + "/api/follow/"; //follow actions

    public constructor(public baseUrl: string) { }
}

// development back address:
class DevelopmentConfig extends AppConfig {
    public constructor() {
        super("http://localhost:4000");
    }
}

// production back address:
class ProductionConfig extends AppConfig {
    public constructor() {
        super("");
    }
}

// singleton: only one object that serves the whole app
const appConfig = process.env.NODE_ENV === "production" ? new ProductionConfig() : new DevelopmentConfig();

export default appConfig;
