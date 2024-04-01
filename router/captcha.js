const express = require("express")
const router = express.Router()
const {captcha_sent, captcha_verify} = require("NeteaseCloudMusicApi")
const {getErrorInfo, getBody} = require("../info/data")

async function sentCaptcha(query) {
    return await captcha_sent({
        ctcode: query.ctcode || '86',
        phone: query.phone
    })
}

async function verifyCaptcha(query) {
    return await captcha_verify({
        ctcode: query.ctcode || '86',
        phone: query.phone,
        captcha: query.captcha
    })
}

router.get("/sent", (req, res) => {
    sentCaptcha(req.query)
        .then((result) => {
            res.json(getBody(result))
        })
        .catch((error) => {
            res.json(getErrorInfo(error))
        })
})
router.get("/verify", (req, res) => {
    verifyCaptcha(req.query)
        .then((result) => {
            res.json(getBody(result))
        })
        .catch((error) => {
            res.json(getErrorInfo(error))
        })
})

module.exports = router