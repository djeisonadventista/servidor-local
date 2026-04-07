import swaggerJsdoc from "swagger-jsdoc"
import path from "path"


const options: swaggerJsdoc.Options = {
    definition: {
        openapi: `3.0.0`,
        info: {
            title: "API Servidor Local",
            description: " Plataforma de Gestao de Prestadores e Servicos",
            version: " 1.0.0",
        },
        servers: [
            {
                url: `http://localhost:8080`,
                description: `dev`,
            }
        ],

        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                }
            }
            },
        security: [
            {
                bearerAuth: []
            }
        ]

    },

    apis: [
            path.join(process.cwd(), "./src/docs/schemas/*.yaml"),
            path.join(process.cwd(), "./src/docs/paths/*.yaml"),
        ]
}

export const swaggerSpec = swaggerJsdoc(options)



