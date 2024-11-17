const express = require("express");
const path = require("path");
const cors = require("cors");
const ApiError = require("./app/api-error");
const app = express();

const publisherRouter = require("./app/routes/publisher.route");
const readerRouter = require("./app/routes/reader.route");
const employeeRouter = require("./app/routes/employee.route");
const bookRouter = require("./app/routes/book.route");
const bookBorrowingTrackingRouter = require("./app/routes/bookborrowingtracking.route");

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/publisher", publisherRouter);
app.use("/api/reader", readerRouter);
app.use("/api/employee", employeeRouter);
app.use("/api/book", bookRouter);
app.use("/api/bookborrowingtracking", bookBorrowingTrackingRouter);

app.use((req, res, next) => {
    return next(new ApiError(404, "Resource not found"));
});

app.use((err, req, res, next) => {
    return res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error",
    });
});

app.get("/", (req, res) => {
    res.json({ message: "Chào mừng đến với quản lý thư viện" });
});

module.exports = app;
