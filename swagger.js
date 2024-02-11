const swaggerAutogen = require("swagger-autogen")();

const doc = {
    info: {
        title: "users Api",
        description: "users Api"
    },
    host: "localhost:3000",
    scheme: ["https", "http"]
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

// this will generate swagger json
swaggerAutogen(outputFile, endpointsFiles, doc);
//farai