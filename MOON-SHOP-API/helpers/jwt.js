// Importing the express-jwt library
const expressJwt = require('express-jwt');

// Function to handle JWT authentication
function authJwt() {
    // Retrieving the secret and API URL from environment variables
    const secret = process.env.secret;
    const api = process.env.API_URL;

    // Configuring expressJwt middleware
    return expressJwt({
        secret,
        algorithms: ['HS256'],
        isRevoked: isRevoked
    }).unless({
        // Specifying paths that do not require authentication
        path: [
            { url: /\/public\/uploads(.*)/, methods: ['GET', 'OPTIONS'] },
            { url: /\/api\/v1\/products(.*)/, methods: ['GET', 'OPTIONS'] },
            { url: /\/api\/v1\/categories(.*)/, methods: ['GET', 'OPTIONS'] },
            { url: /\/api\/v1\/orders(.*)/, methods: ['GET', 'OPTIONS', 'POST'] },
            `${api}/users/login`,
            `${api}/users/register`,
        ]
    });
}

// Function to check if a user is revoked
async function isRevoked(req, payload, done) {
    // Revoking access if the user is not an admin
    if (!payload.isAdmin) {
        done(null, true);
    }

    // Allowing access for admin users
    done();
}

// Exporting the authJwt function
module.exports = authJwt;
