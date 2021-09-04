const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;
const connectiondb = require("./db/db")
const auth = require("./router/auth");
const notes = require("./router/notes");


connectiondb();
app.use(express.json());

app.use("/api/auth", auth)
app.use("/api/notes", notes)

app.listen(PORT,()=>{
    console.log(`runing on ${PORT}`)
})