const express = require("express");
const app = express();
const tasks = require("./routes/taskRoutes")
const users = require("./routes/userRoutes")
const connectDB = require("./db/connect")
require('dotenv').config();

//middleware
app.use(express.json());


//routes
app.use('/api/v1/tasks', tasks);
app.use("/api/v1/users", users);

const port = 3000;

const start = async () =>{
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Server is listening on port ${port}...`))

    } catch (error) {
        console.log(error);
    }
}
start()
//app.listen(port, console.log(`Server is listening on port ${port}...`))
