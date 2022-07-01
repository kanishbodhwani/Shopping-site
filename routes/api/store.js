const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const validateCookie = require("../../middleware/index");
const { v4: uuidv4 } = require("uuid");
const id = uuidv4();
const data = require("../../seed/seed");
const config = require("config");
const jwtSecret = config.get("jwtSecret");

const month = 1000 * 60 * 60 * 24 * 30;

router.get("/" , (req, res) => {
    if(!res.cookie) {
        console.log("Error");
        return res.status(401).json({msg: "Cookie not found"});
    }    
    
    try {
        const payload = {
            user: "username"
        }
        jwt.sign(
            payload,
            jwtSecret,
            {expiresIn: month},
            (err, token) => {
                if (err) throw err;
                // res.json({token});
                res.cookie("session_id", token, { maxAge: month, httpOnly: true});
                
                let posts = data;
                res.json({posts, token});
            }
        )
        // return res.status(200).json({ jsonToken, posts });
    } catch (err) {
        return res.status(500).send("Server Error");
    }
});

router.get("/:id", validateCookie, (req,res) => {
    try {
        let posts = data;

        let post =  posts.reduce((newArray, item) => {
            if(item.id === req.params.id) {
                newArray.push(item);
            } 
            return newArray;
        }, []);

        res.json(post);

    } catch (err) {
        console.log(err.message);
        return res.status(500).send("Server Error");
    }
});

module.exports = router;