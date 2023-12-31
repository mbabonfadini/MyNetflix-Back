const mongooseToSwagger = require('mongoose-to-swagger');
const UserSchema = require('../src/models/User.js');
const SeriesSchema = require('../src/models/Series.js');
const EpisodesSchema = require('../src/models/Episodes.js');
const TypesOfVideoSchema = require('../src/models/TypesOfVideo.js');
const TypeOfSubjectSchema = require('../src/models/TypeOfSubject.js');
const swaggerAutogen = require('swagger-autogen')({
    openapi: '3.0.0',
    languague: 'pt-BR'
})

const outputFile = './swagger/swagger_output.json';
const endpointsFiles = ["./index.js",'./src/routes.js']; 


let doc = {
    info: {
        version: "1.0.0",
        title: "API MyNetflix",
        description: "Documentação da API do MyNetflix"
    },
    servers: [
        {
            url: "http://localhost:4000/",
            description: "Servidor localhost"

        },
        {
            url: "https://my-netflix-back.vercel.app/",
            description: "Servidor de produção"

        }
    ],
    consumes: ['application/json'],
    produces: ['application/json'],
    components: {
        schemas: {
            User: mongooseToSwagger(UserSchema),
            Series: mongooseToSwagger(SeriesSchema),
            Episodes: mongooseToSwagger(EpisodesSchema),
            TypesOfVideo: mongooseToSwagger(TypesOfVideoSchema),
            TypesOfSubjects: mongooseToSwagger(TypeOfSubjectSchema),
        }
    }
}


swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    console.log("Documentação do Swagger gerada encontra-se no arquivo em: " + outputFile);
    if (process.env.NODE_ENV !== 'production') {
        require('../index.js')
    }
})