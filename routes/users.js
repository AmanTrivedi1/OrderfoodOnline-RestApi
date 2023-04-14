import express from "express";
import passport from "passport";
import {
  getAdminStats,
  getAdminUsers,
  logout,
  myProfile,
} from "../controllers/user.js";
import { authorizeAdmin, isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.get(
  "/googlelogin",
  passport.authenticate("google", {
    scope: ["profile"],
  })
);
router.get("/me", isAuthenticated, myProfile);

router.get("/login", passport.authenticate("google"), (req, res, next) => {
  res.send("Logged in...");
});

router.get("/logout", logout);

router.get("/admin/users", isAuthenticated, authorizeAdmin, getAdminUsers);
router.get("/admin/stats", isAuthenticated, authorizeAdmin, getAdminStats);

export default router;
