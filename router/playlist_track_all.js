const express = require("express")
const router = express.Router()
const {playlist_track_all} = require("NeteaseCloudMusicApi")
const {getErrorInfo, getNormalInfo, getBody} = require("../info/data")

async function getMusicListAll(query) {
    return await playlist_track_all({
        id: query.id,
        limit: query.limit || 30,
        offset: query.offset || 0,
        cookie: query.cookie
    })
}

router.get("/track/all", (req, res) => {
    getMusicListAll(req.query)
        .then((result) => {
            res.json(getBody(result))
        })
        .catch((error) => {
            res.json(getErrorInfo(error))
        })
})

module.exports = {
    router,
    getMusicListAll
}

