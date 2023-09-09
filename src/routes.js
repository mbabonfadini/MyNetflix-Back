function routes(app) {
    app.use("/user", require("./routes/user.js"));
    app.use("/serie", require("./routes/serie.js"));
    app.use("/episodes", require("./routes/episodes.js"));
    app.use("/typeOfVideo", require("./routes/typeOfVideos.js"));
    app.use("/subject", require("./routes/typeOfSubjects.js"))
    return;
}

module.exports = routes;