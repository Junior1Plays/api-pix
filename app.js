const express = require("express");
const qr = require("qrcode");
const cors = require("cors");
const pix = require("./pix");

const corsOptions = {
    origin: '*',
    methods: 'POST',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    allowedHeaders: 'Content-Type',
};
const app = express();
app.use(express.json());
  
app.use(cors(corsOptions));

app.get("/", (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>API Pix</title>
        </head>
        <body>
            <script>
                document.addEventListener("DOMContentLoaded", () => {
                    location.href = "https://github.com/Junior1Plays/api-pix";
                });
            </script>
        </body>
        </html>
    `);
})
app.post("/pix/copia-e-cola", (req, res) => {
    const body = req.body;

    const receiver_key = body.beneficiario_chave
    const receiver_name = body.beneficiario_nome;
    const receiver_city = body.beneficiario_cidade;
    const payment_description = body.pagamento_descricao;
    const payment_id = body.pagamento_identificador;
    const payment_value = parseInt(body.pagamento_valor);
  
    if(!receiver_key) return res.status(400).json({"erro": "falta chave do beneficiário"}).send();
    if(!receiver_name) return res.status(400).json({"erro": "falta nome do beneficiário"}).send();
    if(!receiver_city) return res.status(400).json({"erro": "falta cidade do beneficiário"}).send();
    if(!payment_description) return res.status(400).json({"erro": "falta descrição do pagamento"}).send();
    if(!payment_id) return res.status(400).json({"erro": "falta identificador do pagamento"}).send();
    if(!payment_value) return res.status(400).json({"erro": "falta valor do pagamento"}).send();

    const Pix = new pix(receiver_key, payment_description, receiver_name, receiver_city, payment_id, payment_value);

    return res.send(Pix.getPayload());
});

app.post("/pix/qrcode", (req, res) => {
    const body = req.body;

    const receiver_key = body.beneficiario_chave
    const receiver_name = body.beneficiario_nome;
    const receiver_city = body.beneficiario_cidade;
    const payment_description = body.pagamento_descricao;
    const payment_id = body.pagamento_identificador;
    const payment_value = parseFloat(body.pagamento_valor);

    console.log(payment_value)
  
    if(!receiver_key) return res.status(400).json({"erro": "falta chave do beneficiário"}).send();
    if(!receiver_name) return res.status(400).json({"erro": "falta nome do beneficiário"}).send();
    if(!receiver_city) return res.status(400).json({"erro": "falta cidade do beneficiário"}).send();
    if(!payment_description) return res.status(400).json({"erro": "falta descrição do pagamento"}).send();
    if(!payment_id) return res.status(400).json({"erro": "falta identificador do pagamento"}).send();
    if(!payment_value) return res.status(400).json({"erro": "falta valor do pagamento"}).send();
  
    const Pix = new pix(receiver_key, payment_description, receiver_name, receiver_city, payment_id, payment_value);

    qr.toDataURL(Pix.getPayload(), (err, url) => {
        return res.send(url);
    });
});

app.post("/pix/qrcode_copia-e-cola", (req, res) => {
    const body = req.body;

    const receiver_key = body.beneficiario_chave
    const receiver_name = body.beneficiario_nome;
    const receiver_city = body.beneficiario_cidade;
    const payment_description = body.pagamento_descricao;
    const payment_id = body.pagamento_identificador;
    const payment_value = parseInt(body.pagamento_valor);
  
    if(!receiver_key) return res.status(400).json({"erro": "falta chave do beneficiário"}).send();
    if(!receiver_name) return res.status(400).json({"erro": "falta nome do beneficiário"}).send();
    if(!receiver_city) return res.status(400).json({"erro": "falta cidade do beneficiário"}).send();
    if(!payment_description) return res.status(400).json({"erro": "falta descrição do pagamento"}).send();
    if(!payment_id) return res.status(400).json({"erro": "falta identificador do pagamento"}).send();
    if(!payment_value) return res.status(400).json({"erro": "falta valor do pagamento"}).send();
  
    const Pix = new pix(receiver_key, payment_description, receiver_name, receiver_city, payment_id, payment_value);

    qr.toDataURL(Pix.getPayload(), (err, url) => {
        const jsonres = {
            "copia_e_cola": Pix.getPayload(),
            "qrcode": url
        }
        return res.json(jsonres).send();
    });
});

const porta = process.env.PORT || 3000;

app.listen(porta, () => {
  console.log(`Servidor Express ouvindo na porta ${porta}`);
});