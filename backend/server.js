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

//Availble file for online View
app.use('/images', express.static('./src/All_Post/'));


//Middlewar
app.use(cors());
app.use(express.json());
app.use(routes);


//IO server Connection 
io.on("connection", (socket) => {
    console.log('a user connected');
    //socket.emit("testevent", "test");
});


//Starting the Server
server.listen(4100, () => {
    console.log('Server is listening on :4100');
});


//Mongoose Databse Connection
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGOOSE_CONNECTION_URL).then(() => {
    console.log("Databse Connected Successfully")
}).catch((err) => {
    console.log("err", err);
});


//Change Stream on Mongoose (Realtime View)
const connection = mongoose.connection;
connection.once("open", () => {
    console.log("Setting change streams");
    const user = connection.collection("users").watch();
    user.on("change", (data) => {
        console.log("data changes", data);
        io.emit("testevent", data);
    });
});