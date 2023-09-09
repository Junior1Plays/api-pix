# api-pix
api-pix é uma api que cria código qr e copia e cola de pagamento Pix.
# rotas
* POST: /pix/qrcode
* POST: /pix/copia-e-cola
* POST: /pix/qrcode_copia-e-cola
# parametros
os parametros de todas as rotas são os mesmos:
## beneficiario_chave
descrição: deve conter a chave pix do beneficiário<br>
obrigatório: sim
## beneficiario_nome
descrição: deve conter a o nome do beneficiário<br>
obrigatório: sim
## beneficiario_cidade
descrição: deve conter a cidade do beneficiário<br>
obrigatório: sim
## pagamento_descricao
descrição: deve conter a descrição/motivo do pagamento<br>
obrigatório: sim
## pagamento_identificador
descrição: deve conter o identificador do pagamento (não pode conter espaços, ex: COBRANÇA-01)<br>
obrigatório: sim
## pagamento_valor
descrição: deve conter o valor do pagamento<br>
obrigatório: sim

# solicitação
você pode usar a api por uma solicitação http, por exemplo:
## JavaScript
```js
const requestBody = {
  beneficiario_chave: "chave pix",
  beneficiario_nome: "nome do beneficiário",
  beneficiario_cidade: "cidade do beneficiário",
  pagamento_descricao: "descrição do pagamento",
  pagamento_identificador: "identificador do pagamento",
  pagamento_valor: "valor do pagamento",
};

var rota = "<rota-aqui>";

fetch("https://api-pix-one.vercel.app/pix/" + rota, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(requestBody),
})
  .then((response) => {
    if (!response.ok) {
      throw new Error("Erro na solicitação");
    }
    return response.json();
  })
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error("Erro:", error);
  });
```
## Python
```py
import requests
import json

request_body = {
    "beneficiario_chave": "chave pix",
    "beneficiario_nome": "nome do beneficiário",
    "beneficiario_cidade": "cidade do beneficiário",
    "pagamento_descricao": "descrição do pagamento",
    "pagamento_identificador": "identificador do pagamento",
    "pagamento_valor": "valor do pagamento"
}

headers = {
    "Content-Type": "application/json"
}

rota = "<rota-aqui>"

try:
    response = requests.post(url + rota, data=json.dumps(request_body), headers=headers)

    if response.status_code == 200:
        response_data = response.json()
        print(response_data)
    else:
        print("Erro na solicitação:", response.status_code)

except requests.exceptions.RequestException as e:
    print("Erro na solicitação:", e)
```
(caso for utilizar um dos exemplos no seu código, certifique-se de trocar o valor da variável "rota" pela rota desejada.)
# resposta
## qrcode
a resposta da rota qrcode quando a solicitação for efetuada com sucesso sem erros, será a imagem do qrcode codificada em base64.
## copia-e-cola
a resposta da rota copia-e-cola quando a solicitação for efetuada com sucesso sem erros, será o copia e cola gerado pela api.
## qrcode_copia-e-cola
a resposta da rota qrcode_copia-e-cola quando a solicitação for efetuada com sucesso sem erros, será um json com uma key chamada "qrcode" que terá como valor a imagem do qrcode codificada em base64, e outra key chamada "copia_e_cola" que terá como valor o copia e cola gerado pela api.
# status 400
quando a api retornar um status 400, na resposta ela dirá o motivo do erro, por exemplo, você esqueceu de adicionar a key "beneficiario_cidade" no body da request, a api retornará um status 400 junto de um json:
```json
{
    "erro": "falta cidade do beneficiário"
}
```
# créditos
[gab618/pix-js](https://github.com/gab618/pix-js/) : criar o pix.js<br>
[JuniorSchueller](https://github.com/Junior1Plays/) : criar a api
# botões

[![Run in Postman](https://run.pstmn.io/button.svg)](https://god.gw.postman.com/run-collection/29623224-0a459086-a3ae-4fd8-8cb4-09b771aa1aa6?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D29623224-0a459086-a3ae-4fd8-8cb4-09b771aa1aa6%26entityType%3Dcollection%26workspaceId%3D27d3cd4e-a310-4045-94d7-3bcf52c944fd)<br>
[![fork](https://img.shields.io/badge/Fork%20this%20repository-37a779)](https://github.com/Junior1Plays/api-pix/fork)<br>
[![star](https://img.shields.io/badge/Add%20a%20star%20to%20this%20repository-37a779)](https://github.com/Junior1Plays/api-pix/)
