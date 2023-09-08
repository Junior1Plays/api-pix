const express = require("express");
const qr = require('qrcode');
const pix = require("./pix")

const app = express();
app.use(express.json());

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