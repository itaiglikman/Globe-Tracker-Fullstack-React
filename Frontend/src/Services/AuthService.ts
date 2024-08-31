import axios from "axios";
import CredentialsModel from "../Models/CredentialsModel";
import UserModel from "../Models/UserModel";
import authStore, { AuthAction, AuthActionType } from "../Redux/AuthState";
import { VacationActionType, vacationStore } from "../Redux/VacationsState";
import appConfig from "../Utils/AppConfig";

class AuthService {

    // register new user:
    public async register(user: UserModel): Promise<void> {
        // send new user to backend:
        // on register - the back will send back a token string with specific expiration.
        let response = await axios.post<string>(appConfig.registerUrl, user);

        // extract the token:
        let token = response.data;

        // send token to global state:
        let action: AuthAction = { type: AuthActionType.Register, payload: token };
        authStore.dispatch(action);
    }

    // login existing user:
    public async login(credentials: CredentialsModel): Promise<void> {

        // send credentials to backend:
        // on login - the back will send back a token string with specific expiration.
        let response = await axios.post<string>(appConfig.loginUrl, credentials);

        // extract the token:
        let token = response.data;

        // send token to global state:
        let action: AuthAction = { type: AuthActionType.Login, payload: token };
        authStore.dispatch(action);
    }

    // logout existing user:
    public async logout(): Promise<void> {
        // call logout in global state:
        let action: AuthAction = { type: AuthActionType.Logout };
        authStore.dispatch(action);
        // reset vacations global state on user logout:
        vacationStore.dispatch({ type: VacationActionType.SetVacations, payload: [] });
    }
}

const authService = new AuthService();

export default authService;