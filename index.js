const express = require('express');
const app = express();
const config = require("config");
const alumniRouter = require("./routes/alumni")
const studentRouter = require("./routes/student");
const adminRouter = require("./routes/admin");

//check whether jwtPrivateKey is set 
if (!config.get("jwtPrivateKey")) {
    console.log("jwtPrivateKey is not set");
    process.exit(1);
}

//check whether mongodb connection string is set
if (!config.get("database")) {
    console.log("MongoDB connection string  not set")
    process.exit(1);
}
// Middleware for parsing request bodies
app.use(express.json());
app.use("/api/alumni", alumniRouter)
app.use("/api/student", studentRouter)
app.use("/api/admin", adminRouter)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
