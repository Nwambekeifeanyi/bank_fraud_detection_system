import express from "express";
const router = express.Router();
import adminCont from "../controllers/adminCont.js";


import  upload  from "../helpers/img_processor.js";
import {
  checkAdmin,
  checkAdminLogout,
} from "../middlewares/authMiddleware.js";

router.get("/login", checkAdminLogout, adminCont.getLogin);
router.get("/register", checkAdminLogout, adminCont.getRegistration);


router.get("/dashboard", checkAdmin, adminCont.getDashboard);
router.get("/accounts", checkAdmin, adminCont.getAccounts);
router.get("/account/:id", checkAdmin, adminCont.getAccountDetails);

router.get("/add_account", checkAdmin, adminCont.getAddAccount);
router.post("/add_account", adminCont.postAddAccount);

router.get("/update_account/:id", checkAdmin, adminCont.getUpdateAccount);
router.post("/update_account", checkAdmin, adminCont.postUpdateAccount);
router.post("/alter_components", checkAdmin, adminCont.alterComponents);

router.get("/transactions", checkAdmin, adminCont.getTransactions);
router.get("/transaction/:id", checkAdmin, adminCont.getTransactionReceipt);


router.get("/notifications", checkAdmin, adminCont.getNotifications);
router.get("/alerts", checkAdmin, adminCont.getAlerts);
router.get("/login_attempts", checkAdmin, adminCont.getLoginAttempts);
// router.post("/add_user",checkAdmin, adminCont.postAddUser);

// router.get("/update_user",checkAdmin, adminCont.getUpdateUser);
// router.post("/update_user",checkAdmin, adminCont.postUpdateUser);

// router.get("/view_user",checkAdmin, adminCont.getViewUser);
// router.post("/activate_deactivate",checkAdmin, adminCont.activate_deactivate);
// router.post("/delete_user",checkAdmin, adminCont.delete_user);


export default router;
// export const adminRoute = router;
