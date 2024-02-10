const express = require("express");
const dotenv = require("dotenv").config();
const goalsrouter = require("./routes/goal.route");
const userRouter = require("./routes/user.route");
const { errorHandle } = require("./Middleware/errorMiddleWare");
const connectDb = require("./config/db");
const port = process.env.PORT || 5000;
connectDb();
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use("/api/goals", goalsrouter);
app.use('/api/users', userRouter);
app.use(errorHandle);

app.listen(port, () => console.log(`server started on port ${port}`));
