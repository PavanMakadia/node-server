

const _health = new Promise((resolve, reject) => {
    resolve("API Is Healthy !");
})

module.exports = {
    health: _health
}