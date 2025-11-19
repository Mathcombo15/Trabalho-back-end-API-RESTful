const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Servidor escutando na porta ${PORT}`);
});

app.get("/", (req, res) => {
    res.send('API de Backend está funcionando!');
});


module.exports = app;