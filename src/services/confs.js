module.exports = filePath = (env) => {
    return env === 'prod' ? '' : 'http://localhost:3000/files/'
}