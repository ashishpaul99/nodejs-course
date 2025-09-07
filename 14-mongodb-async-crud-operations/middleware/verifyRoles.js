// Middleware to check if user has one of the allowed roles
const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
        // If no roles exist on the request → Unauthorized
        if (!req.roles) return res.sendStatus(401);

        // Allowed roles are passed as arguments → spread into an array
        const rolesArray = [...allowedRoles];

        console.log("Allowed Roles:", rolesArray);
        console.log("User Roles:", req.roles);

        // Map user roles → true/false if they are in allowedRoles
        // Then find if at least one is true
        const result = req.roles
            .map(role => rolesArray.includes(role))
            .find(val => val === true);

        // If no role matches → Unauthorized
        if (!result) return res.sendStatus(401);

        // Role matches → continue
        next();
    };
};

module.exports = verifyRoles;
