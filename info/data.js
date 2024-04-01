function getErrorInfo(info) {
    console.log(info)
    return {
        status: -1,
        info: "error",
        data: info.message
    }
}

function getNormalInfo(info) {
    return {
        status: 200,
        info: "normal",
        data: info
    }
}

function getBody(info) {
    return info.body
}

module.exports = {
    getErrorInfo,
    getNormalInfo,
    getBody
}