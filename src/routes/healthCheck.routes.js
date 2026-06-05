import {Router} from "express";

import healthCheck from "../controllers/healthyServer.controller.js";

const healthCheckRouter = Router();

healthCheckRouter.route("/BizSphereHealthCheck").get(healthCheck);

export default healthCheckRouter;