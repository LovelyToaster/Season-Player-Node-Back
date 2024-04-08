function getErrorInfo(info) {
    if (info.message === undefined || info.message === null) {
        console.log(info.body)
        return info.body
    } else {
        console.log({
            status: -1,
            info: "error",
            data: info.message
        })
        return {
            status: -1,
            info: "error",
            data: info.message
        }
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