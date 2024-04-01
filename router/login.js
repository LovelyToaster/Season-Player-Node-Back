const express = require("express")
const router = express.Router()
const {login_cellphone, login_status} = require("NeteaseCloudMusicApi")
const {getErrorInfo, getBody} = require("../info/data")

async function userCaptchaLogin(query) {
    return await login_cellphone({
        phone: query.phone,
        captcha: query.captcha
    })
}

async function getLoginStatus(query) {
    return await login_status({
        cookie: query.cookie
    })
}

router.get("/cellphone", (req, res) => {
    userCaptchaLogin(req.query)
        .then((result) => {
            res.json(getBody(result))
        })
        .catch((error) => {
            res.json(getErrorInfo(error))
        })
})
router.get("/status", (req, res) => {
    getLoginStatus(req.query)
        .then((result) => {
            res.json(getBody(result))
        })
        .catch((error) => {
            res.json(getErrorInfo(error))
        })
})

module.exports = router