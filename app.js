require('dotenv').config();
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger-output.json');
const bodyParser = require('body-parser');


const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

/* Middlewares */
app.use(bodyParser.json());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));


app.listen(PORT, () => {
    console.log(`Servidor escutando na porta ${PORT}`);
});
/* Endpoints */
require('./endpoints')(app);

module.exports = app;