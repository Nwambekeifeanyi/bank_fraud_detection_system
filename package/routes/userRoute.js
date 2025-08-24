import { Router } from "express";
import { checkUser, checkUserLogout } from "../middlewares/authMiddleware.js";
import userCont from "../controllers/userCont.js";
import upload from "../helpers/img_processor.js";

const router = Router();

router.get("/dashboard",checkUser, userCont.getDashboard);
router.get("/transactions",checkUser, userCont.getTransaction);
router.get("/transaction/:id",checkUser, userCont.getTransactionReceipt);

router.get("/notifications",checkUser, userCont.getNotifications);
router.get("/alerts",checkUser, userCont.getAlerts);
router.get("/login_attempts",checkUser, userCont.getLoginAttempts);
router.get("/profile",checkUser, userCont.getProfile);
router.get("/set_pin",checkUser, userCont.getSetPin);
router.post("/set_pin",checkUser, userCont.postSetPin);
router.get("/transfer",checkUser, userCont.getTransfer);
router.post("/transfer",checkUser, userCont.postTransfer);
router.post("/verify_account",checkUser, userCont.verifyAccount);
export default router;
