import { OkPacket } from "mysql";
import RoleModel from "../3-models/role-model";
import UserModel from "../3-models/user-model";
import dal from "../2-utils/dal";
import { UnauthorizedError, ValidationError } from "../3-models/client-errors";
import CredentialsModel from "../3-models/credentials-model";
import cyber from "../2-utils/cyber";

async function register(user: UserModel): Promise<string> { //get user model, return JWT (token)
    // validate if username is already taken:
    if (await checkEmailIsTaken(user.email)) throw new ValidationError(`Email already exists`);

    // validation:
    user.validate();

    // Security - Hash password:
    user.password = cyber.hashPassword(user.password);

    //Security - set role as "user" for denying someone from declaring itself as an admin:
    user.roleId = RoleModel.user;

    // create sql:
    let sql = `INSERT INTO 
            users(firstName,lastName,email,password,roleId) 
            VALUES(?,?,?,?,?);`;

    // send user to db:
    let info: OkPacket = await dal.execute(sql, [user.firstName, user.lastName, user.email, user.password, user.roleId]);

    // create id:
    user.userId = info.insertId;

    // get new token:
    let token = cyber.getNewToken(user);

    // return token:
    return token;
}

async function login(credentials: CredentialsModel): Promise<string> { //return token
    // validate:
    credentials.validate();
    
    // Security - set credentials' password to the hashed password:
    credentials.password = cyber.hashPassword(credentials.password);
    
    // create sql:
    let sql = `SELECT * FROM users WHERE 
    email = ? AND password = ?;`;
    
    // get users array from db:
    let users = await dal.execute(sql, [credentials.email, credentials.password]);
    
    // extract user: 
    let user = users[0];

    // if no such user:
    if (!user) throw new UnauthorizedError("Incorrect username or password.");

    // generate token:
    let token = cyber.getNewToken(user);

    // return token:
    return token;
}

// check if email is taken by other user:
async function checkEmailIsTaken(email: string): Promise<boolean> {
    let sql = `SELECT * FROM users WHERE email = '${email}';`
    let result = await dal.execute(sql);
    // if users found return true:
    if (result[0]) return true;

    // if no users found return false:
    return false;
}


export default {
    register,
    login,
};