// this is a middleware that will be used to check if the user is logged in
module.exports.isAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).json({
            error: true,
            message: "You are not authorize to view this resource",
        });
    }
};

// this is a middleware that will be used to check if the user is logged in and is an admin
module.exports.isAdmin = (req, res, next) => {
    if (req.isAuthenticated() && req.user.role === "admin") {
        next();
    } else {
        res.status(401).json({
            error: true,
            message: "You are not authorized to view this resource",
        });
    }
};
