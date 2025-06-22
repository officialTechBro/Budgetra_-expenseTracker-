import { Router } from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { getDashboardData } from "../controllers/dashboard.controller.js";

const dashboardRoutes = Router()

dashboardRoutes.get('/', protect, getDashboardData)

export default dashboardRoutes