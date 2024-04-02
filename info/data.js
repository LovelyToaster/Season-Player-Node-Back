function getErrorInfo(info) {
    console.log(info.body)
    if (info.message === undefined || info.message === null)
        return info.body
    else
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