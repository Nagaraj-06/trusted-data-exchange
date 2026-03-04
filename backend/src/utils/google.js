const { OAuth2Client } = require("google-auth-library");
const { googleClientId } = require("../config/env");

const client = new OAuth2Client(googleClientId);

async function verifyGoogleToken(idToken) {
    const ticket = await client.verifyIdToken({
        idToken,
        audience: googleClientId,
    });
    return ticket.getPayload();
}

module.exports = { verifyGoogleToken };
