
function globalCatch(err, req, res, next) {
    res.status(404).json({ message: "Error occured caught in global Catch" })
}

module.exports = globalCatch;