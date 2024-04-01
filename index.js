const express = require("express")
const app = express()
const search = require("./router/search").router
const trackAll = require("./router/playlist_track_all").router
const checkMusic = require("./router/check_music").router
const musicSrc = require("./router/song_url_v1").router
const musicInfo = require("./router/get_music_info")
const login = require("./router/login")
const captcha = require("./router/captcha")
const cors = require("cors")
const port = 3000

app.use(cors())
app.get("/", (req, res) => {
    const data = {
        status: 1,
        info: "服务正常"
    }
    res.json(data)
})
app.use("/search", search)
app.use("/playlist", trackAll)
app.use("/check", checkMusic)
app.use("/song", musicSrc)
app.use("/get", musicInfo)
app.use("/login", login)
app.use("/captcha", captcha)

app.listen(port)