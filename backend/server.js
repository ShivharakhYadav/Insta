require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');
const express = require('express');
const app = require("express")();
const server = require("http").createServer(app);
const routes = require('./routes/routes')
const io = require('socket.io')(server, {
    cors: {
        origin: '*',
    }
});

app.use(cors());
app.use(express.json());
app.use(routes);

io.on("connection", (socket) => {
    console.log('a user connected');
    //socket.emit("testevent", "test");
});

server.listen(4100, () => {
    console.log('Server is listening on :4100');
});

mongoose.set('strictQuery', false);

mongoose.connect(process.env.MONGOOSE_CONNECTION_URL).then(() => {
    console.log("Databse Connected Successfully")
}).catch((err) => {
    console.log("err", err);
});

const connection = mongoose.connection;

connection.once("open", () => {
    console.log("Setting change streams");
    const user = connection.collection("users").watch();
    user.on("change", (data) => {
        console.log("data changes", data);
        io.emit("testevent", data);
    })
    // const thoughtChangeStream = connection.collection("thoughts").watch();

    // thoughtChangeStream.on("change", (change) => {
    //     console.log("change----", change)
    //     switch (change.operationType) {
    //         case "insert":
    //             const thought = {
    //                 _id: change.fullDocument._id,
    //                 name: change.fullDocument.name,
    //                 description: change.fullDocument.description,
    //             };

    //             console.log("thoght--------", thought)
    //             io.of("/api/socket").emit("newThought", thought);
    //             break;

    //         case "update":
    //             const thought1 = {
    //                 _id: "change.fullDocument._id",
    //                 name: "change.fullDocument.name",
    //                 description: "change.fullDocument.description",
    //             };
    //             io.of("/api/socket").emit("updateThought", thought1);
    //             break;
    //         case "delete":
    //             io.of("/api/socket").emit("deletedThought", change.documentKey._id);
    //             break;
    //     }
    // });
});