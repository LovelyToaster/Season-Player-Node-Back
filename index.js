const express = require("express")
const app = express()
const search = require("./router/search").router
const trackAll = require("./router/playlist_track_all").router
const checkMusic = require("./router/check_music").router
const musicSrc = require("./router/song_url_v1").router
const musicInfo = require("./router/get_music_info")
const login = require("./router/login")
const captcha = require("./router/captcha")
const lyric = require("./router/lyric")
const cors = require("cors")
const port = 3000

app.use(cors())
app.get("/api", (req, res) => {
    const data = {
        status: 1,
        info: "服务正常"
    }
    res.json(data)
})
app.use("/api/search", search)
app.use("/api/playlist", trackAll)
app.use("/api/check", checkMusic)
app.use("/api/song", musicSrc)
app.use("/api/get", musicInfo)
app.use("/api/login", login)
app.use("/api/captcha", captcha)
app.use("/api/lyric", lyric)

app.listen(port)
console.log("服务器运行在端口:" + port)