const swaggerAutogen = require('swagger-autogen')();

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            version: '1.0.0',      // by default: '1.0.0'
            title: 'Api-Ecommerce',        // by default: 'REST API'
            description: 'Documentation de mes API pour un Ecommerce',  // by default: ''
        },
        servers:[
            {
                url: 'http://localhost:5000/'
            }
        ],

        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT', // Spécifiez le format de votre jeton Bearer
                },
            },
        },
        security: [
            {
                bearerAuth: [], // Utilisation du schéma de sécurité défini ci-dessus
            },
        ],

    },
    apis: [
        "./src/routes/produit.js",
        "./src/routes/user.js",
        "./src/routes/categorie.js",

    ]
};

module.exports = options
