const express = require("express")
const router = express.Router()
const {search} = require("NeteaseCloudMusicApi")
const {getErrorInfo, getBody} = require("../info/data")

async function getSearch(query) {
    return await search({
        keywords: query.keywords,
        type: query.type || 1, // 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频
        limit: query.limit || 30,
        offset: query.offset || 0,
        cookie: query.cookie,
    })
}

router.get("/", (req, res) => {
    getSearch(req.query)
        .then((result) => {
            res.json(getBody(result))
        })
        .catch((error) => {
            res.json(getErrorInfo(error))
        })
})

module.exports = {
    router,
    getSearch
}
