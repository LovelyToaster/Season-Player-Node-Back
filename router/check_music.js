const express = require("express")
const router = express.Router()
const {check_music} = require("NeteaseCloudMusicApi")
const {getErrorInfo, getBody} = require("../info/data")

async function checkMusic(query) {
    return await check_music({
        id: query.id,
        br: parseInt(query.br || 999000),
        cookie: query.cookie
    })
}

router.get("/music", (req, res) => {
    checkMusic(req.query)
        .then((result) => {
            res.json(getBody(result))
        })
        .catch((error) => {
            res.json(getErrorInfo(error))
        })
})

module.exports = {
    router,
    checkMusic
}