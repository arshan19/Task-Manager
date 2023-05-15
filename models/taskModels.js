const mongoose = require("mongoose")

const TaskSchema = new mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    name: {
        type: String,
        required: [true, "must Provide Name the Task"],
        trim: true,
        maxlength: [50, "name can not be exceed more than 50 characters!"]
    },
    completed: {
        type: Boolean,
        default: false,
    },
})

module.exports = mongoose.model('Task', TaskSchema);
