const express = require('express');
const app = express();
const alumniRouter = require("./routes/alumni")
const studentRouter = require("./routes/student");

// Middleware for parsing request bodies
app.use(express.json());
app.use("/api/alumni", alumniRouter)
app.use("/api/student", userRouter)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
