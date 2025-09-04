// roles_list.js

// User roles with unique IDs
// Using numeric IDs makes it easy to check roles in authorization logic.
const ROLES_LIST = {
    "Admin": 5150,  // full access
    "Editor": 1984, // edit access
    "User": 2001    // basic access
};

// Export roles
module.exports = ROLES_LIST;



