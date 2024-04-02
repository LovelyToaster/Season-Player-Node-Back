const express = require("express")
const router = express.Router()
const {getSearch} = require("./search")
const {getMusicListAll} = require("./playlist_track_all")
const {checkMusic} = require("./check_music")
const {getMusicSrc} = require("./song_url_v1")
const {getErrorInfo, getNormalInfo} = require("../info/data")

function setQuery(query, cookie) { //封装数据
    return {
        ...query,
        cookie: cookie
    }
}

async function getMusicInfo(query) {
    if (query.type === "1000") {
        const search = await getSearch(query)
        const musicList = await getMusicListAll(setQuery(search.body.result.playlists[0], query.cookie))
        const checkInfo = await checkMusic(setQuery(musicList.body.songs[0], query.cookie))
        const musicSrc = await getMusicSrc(setQuery(musicList.body.songs[0], query.cookie));
        return getNormalInfo({
            musicSrc: musicSrc.body.data[0].url,
            musicName: musicList.body.songs[0].name,
            musicTime: musicSrc.body.data[0].time,
            musicCheck: checkInfo.body.success
        })
    } else if (query.type === "1") {
        const search = await getSearch(query)
        const checkInfo = await checkMusic(setQuery(search.body.result.songs[0], query.cookie))
        const musicSrc = await getMusicSrc(setQuery(search.body.result.songs[0], query.cookie))
        return getNormalInfo({
            musicSrc: musicSrc.body.data[0].url,
            musicName: search.body.result.songs[0].name,
            musicTime: musicSrc.body.data[0].time,
            musicCheck: checkInfo.body.success
        })

    } else {
        throw new Error("参数不匹配")
    }
}

router.get("/info", (req, res) => {
    getMusicInfo(req.query)
        .then((result) => {
            res.json(result)
        })
        .catch((error) => {
            res.json(getErrorInfo(error))
        })
})

module.exports = router