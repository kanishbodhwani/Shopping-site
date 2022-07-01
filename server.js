const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();

app.use(cookieParser());
app.use(express.json({extended: false}));

app.use("/api/store", require("./routes/api/store"));

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
});
