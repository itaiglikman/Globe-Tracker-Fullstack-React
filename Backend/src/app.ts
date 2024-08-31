require("dotenv").config(); //get environment variables form env file to env.process
import cors from "cors";
import express from "express";
import expressFileUpload from "express-fileupload";
import expressRateLimit from "express-rate-limit";
import appConfig from "./2-utils/app-config";
import catchAll from "./4-middleware/catch-all";
import routeNotFound from "./4-middleware/route-not-found";
import authController from "./6-controllers/auth-controller";
import followController from "./6-controllers/follow-controller";
import vacationController from "./6-controllers/vacation-controller";
import sanitize from "./4-middleware/sanitize";

// create server:
const server = express();

// security DoS Attack: limits number of request from the same IP:
server.use(expressRateLimit({
    windowMs: 1000, //time limit
    max: 20 //max requests allowed in that time window
}));

// support request.body as JSON:
server.use(express.json());

//enable cors for a specific frontend.
server.use(cors({ origin: appConfig.origin }));

// security: xss strip tags - get rid of html tags inserted by input fields.
server.use(sanitize);

// support file upload - set files into request.files:
server.use(expressFileUpload());

// route requests to our controllers:
server.use("/api", authController, vacationController, followController);

// Route Not Found:
server.use(routeNotFound);

// catch all middleware:
server.use(catchAll);

// run server: get port appConfig
server.listen(appConfig.port, () => console.log("Listening on http://localhost:" + appConfig.port));

