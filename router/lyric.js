const express = require("express")
const router = express.Router()
const {lyric} = require("NeteaseCloudMusicApi")
const {getErrorInfo, getBody} = require("../info/data")

async function getLyric(query) {
    return await lyric({
        id: query.id,
        cookie: query.cookie
    })
}

router.get("/", (req, res) => {
    getLyric(req.query)
        .then((result) => {
            res.json(getBody(result))
        })
        .catch((error) => {
            res.json(getErrorInfo(error))
        })
})

module.exports = router
