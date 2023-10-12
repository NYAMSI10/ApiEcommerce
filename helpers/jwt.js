const {expressjwt} = require("express-jwt");

function authJwt() {
    const secret = "KGGK>HKVHJVKBKJBKBKHBMKHB";


    return expressjwt({
        secret,
        algorithms: ["HS256"],
        isRevoked: isRevoked

    }).unless({
        path: [
            {url: /\/public\/uploads(.*)/ , methods: ['GET', 'OPTIONS'] },
            {url: /\/api\/produit(.*)/ , methods: ['GET', 'OPTIONS'] },
            {url: /\/api\/categorie(.*)/ , methods: ['GET', 'OPTIONS'] },
            {url: /\/api\/orders(.*)/,methods: ['GET', 'OPTIONS', 'POST']},
            '/api/user/login',
            '/api/user/register'
        ]
    })

}

async function isRevoked(req, payload) {


    if (payload.payload.isAdmin === false) {

        return true;
    }else {

        return false;
    }

}

module.exports = authJwt;

