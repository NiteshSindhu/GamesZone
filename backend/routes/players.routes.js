const express = require('express');
const PlayerModel = require('../model/players.model');


const playersRouter = express.Router();


playersRouter.get("/", async (req, res) => {
    try {
        const players = await PlayerModel.find();
        res.send({ players });
     } catch (err) {
        res.send({err});
    }
})

playersRouter.post("/", async (req, res) => {
    try { 
        await PlayerModel.insertMany(req.body);
        res.send(200).send({msg:"successful"})
    }
    catch (err) {
        res.status(404).send({msg:"error",err})
    }
})

module.exports = playersRouter;
