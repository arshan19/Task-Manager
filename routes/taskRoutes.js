const express = require("express");
const router = express.Router();
const {getAllTasks, createTasks, getTask, updateTasks, deleteTasks} = require("../controllers/taskControllers");

const validateToken = require("../middleware/validateTokenHandler")
router.use(validateToken);

router.route("/").get(getAllTasks);
router.route("/").post(createTasks);
router.route("/:id").get(getTask);
router.route("/:id").patch(updateTasks);
router.route("/:id").delete(deleteTasks);

module.exports = router;
