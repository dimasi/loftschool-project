module.exports = (req, res, nex) => {
    if (!req.session.isAdmin) {
        res.redirect(`/`);
    } else {
        next();
    }
}
