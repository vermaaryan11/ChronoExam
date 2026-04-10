var router = require("express").Router();
var mongoose = require("mongoose");
let auth = require("../auth");
let {
  OkResponse,
  BadRequestResponse
} = require("express-http-response");
var Notification = mongoose.model("Notification");

router.get("/", auth.required, auth.user, (req, res, next) => {
    // Both user and admin can get their notifications
    Notification.find({ user: req.user._id }).sort({ createdAt: -1 })
        .then(result => next(new OkResponse(result)))
        .catch(err => next(new BadRequestResponse(err.message)));
});

router.post("/mark-read", auth.required, auth.user, (req, res, next) => {
    Notification.updateMany({ user: req.user._id, read: false }, { $set: { read: true } })
        .then(result => next(new OkResponse(result)))
        .catch(err => next(new BadRequestResponse(err.message)));
});

router.post("/", auth.required, auth.admin, (req, res, next) => {
    // Admin creates notification manually (optional)
    let notification = new Notification(req.body);
    notification.save()
        .then(result => next(new OkResponse(result)))
        .catch(err => next(new BadRequestResponse(err.message)));
});

module.exports = router;
