var router = require("express").Router();
var mongoose = require("mongoose");
let auth = require("../auth");
let {
  OkResponse,
  BadRequestResponse
} = require("express-http-response");
var Faculty = mongoose.model("Faculty");

router.post("/", auth.required, auth.admin, (req, res, next) => {
    let faculty = new Faculty(req.body);
    faculty.save()
        .then(result => next(new OkResponse(result)))
        .catch(err => next(new BadRequestResponse(err.message)));
});

router.get("/get/all", auth.required, auth.admin, (req, res, next) => {
    Faculty.find({})
        .populate('assignedExams')
        .then(result => next(new OkResponse(result)))
        .catch(err => next(new BadRequestResponse(err.message)));
});

router.delete("/:id", auth.required, auth.admin, (req, res, next) => {
    Faculty.findByIdAndDelete(req.params.id)
        .then(result => next(new OkResponse({ message: 'Deleted successfully' })))
        .catch(err => next(new BadRequestResponse(err.message)));
});

module.exports = router;
