const express = require("express")
const router = express.Router()
const {song_url_v1} = require("NeteaseCloudMusicApi")
const {getErrorInfo, getBody} = require("../info/data")

async function getMusicSrc(query) {
    return song_url_v1({
        id: query.id,
        level: query.level || "standard",
        cookie: query.cookie
    })
}

router.get("/url/v1", (req, res) => {
    getMusicSrc(req.query)
        .then((result) => {
            res.json(getBody(result))
        })
        .catch((error) => {
            res.json(getErrorInfo(error))
        })
})

module.exports = {
    router,
    getMusicSrc
}