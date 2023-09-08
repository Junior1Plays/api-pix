const express = require("express");
const qr = require('qrcode');
const pix = require("./pix")

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.send(`
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>API Pix</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f0f0f0;
            margin: 0;
            padding: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
        }
        .container {
            background-color: #fff;
            border-radius: 8px;
            padding: 20px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
            text-align: center;
        }
        h1 {
            color: #333;
        }
        h2 {
            color: #666;
        }
        .route {
            margin: 20px 0;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 4px;
        }
        .param {
            margin: 10px 0;
            padding: 5px;
            background-color: #f0f0f0;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1><a style="color: black;" href="https://github.com/Junior1Plays/api-pix/" target="_blank">API Pix</a></h1>
        <h2>Rotas Disponíveis</h2>
        
        <div class="route">
            <h3>POST /pix/copia-e-cola</h3>
            <div class="param">Parâmetros:</div>
            <ul>
                <li>beneficiario_chave (obrigatório)</li>
                <li>beneficiario_nome (obrigatório)</li>
                <li>beneficiario_cidade (obrigatório)</li>
                <li>pagamento_descricao (obrigatório)</li>
                <li>pagamento_identificador (obrigatório)</li>
                <li>pagamento_preco (obrigatório)</li>
            </ul>
        </div>

        <div class="route">
            <h3>POST /pix/qrcode</h3>
            <div class="param">Parâmetros:</div>
            <ul>
                <li>beneficiario_chave (obrigatório)</li>
                <li>beneficiario_nome (obrigatório)</li>
                <li>beneficiario_cidade (obrigatório)</li>
                <li>pagamento_descricao (obrigatório)</li>
                <li>pagamento_identificador (obrigatório)</li>
                <li>pagamento_preco (obrigatório)</li>
            </ul>
        </div>
    </div>
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
    const payment_value = body.pagamento_valor;

    if(!receiver_key || !receiver_name || !receiver_city || !payment_description || !payment_id || !payment_value) return res.statusCode(400);

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
    const payment_value = body.pagamento_valor;
  
    if(!receiver_key || !receiver_name || !receiver_city || !payment_description || !payment_id || !payment_value) return res.statusCode(400);
  
    const Pix = new pix(receiver_key, payment_description, receiver_name, receiver_city, payment_id, payment_value);

    qr.toDataURL(Pix.getPayload(), (err, url) => {
        return res.send(url);
    });
});

const porta = process.env.PORT || 3000;

app.listen(porta, () => {
  console.log(`Servidor Express ouvindo na porta ${porta}`);
});