const generateMessage = (text) => {
    return {
        text,
        createdAt: new Date().getTime(),
    }
}
const generateLoc = (loc) => {
    return {
        loc,
        createdAt: new Date().getTime(),
    }
}
module.exports = {
    generateMessage,
    generateLoc
}