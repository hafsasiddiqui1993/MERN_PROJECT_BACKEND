const express = require("express");
const bodyParser = require("body-parser");
const Auth = require("../../middleware/authentication");
const Activity = require("../../models/activity");

const db = require("../../db");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

db.main();
const routes = express.Router();
routes.use("/uploads", express.static("uploads"));
routes.use(bodyParser.urlencoded({ extended: false }));
routes.use(express.json());

routes.get("/member/exercise_activity", Auth, async (req, res) => {
  try {
    const activity = await Activity.find({ memberID: req.Another.id });
    if (!activity) {
      return res.status(400).json;

    }
    console.log("activity", activity);
    res.json(activity);
  } catch (err) {
    console.error(err.message);
  }
});

routes.post(
  "/member/exercise_activity",
  Auth,
  async (req, res) => {
    console.log(req.Another);
    console.log("req.body");
    console.log(req.body);

    try {
      const Result = await Activity.create({
        memberID: req.Another.id,
        exe_ac_name: req.body.exe_ac_name,
        exe_ac_desc: req.body.exe_ac_desc,
        exe_ac_type: req.body.exe_ac_type,
        exe_ac_dur: req.body.exe_ac_dur,
        exe_ac_date: req.body.exe_ac_date,
      });

      const ch = await Result.save();
      return res.send(ch);
    } catch (e) {
      res.status(400).send(e.message);
    }
  }
);

routes.post("/member/exercise_activities/display", Auth, async (req, res) => {
  const displayed_activities = await Activity.find({
    _id: req.body.memberID,
  }).populate("memberID");

  res.send(displayed_activities);
});

routes.delete("/member/exercise_activity/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await Activity.deleteOne({ _id: id });
    res.status(200).send({ success: true, msg: "Activity deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(400).send("Not Deleted, try again");
  }
});

routes.get("/member/exercise_activity/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const activity = await Activity.findById( id );
      if (!activity) {
        return res.status(400).send({ msg: 'Activity not found'})
      }
      res.status(200).send(activity);
    } catch (err) {
      console.error(err.message);
      res.status(400).send("");
    }
  });

routes.put("/member/edit_exercise_activity/:id", Auth, async (req, res) => {
  try {
    const id = req.params.id;
    const updates =  req.body
    console.log(id);
    console.log("updates");
    console.log(updates);
    const options = { new: true };

    const result = await Activity.findByIdAndUpdate(id, updates, options);

    console.log("result");
    console.log(result);
    res.send(result);
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = routes;
