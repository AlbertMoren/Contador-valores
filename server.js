const express = require('express');
const path = require("path");

const app = express();
const PORTA = 3000;

const contagens = {};

app.use(express.json());

app.use(express.static(path.join(__dirname,"public")));

app.post("/contar",(req,res) => {
    const valorRecebido = req.body.valor;
    const numero = Number(valorRecebido)

    if(valorRecebido == undefined || valorRecebido == null ||  String(valorRecebido).trim() === "" || !Number.isFinite(numero)){
        return res.status(400).json({
            erro: "Digite um numero valido."
        });
    }

    const valor = String(numero);

    if(contagens[valor]==undefined){
        contagens[valor] = 1;
    }else{
        contagens[valor] += 1;
    }

    res.json({
        valor,
        quantidade: contagens[valor],
        mensagem: `o valor "${valor}" foi recebido "${contagens[valor]}" vezes.`
    });
});

app.listen(PORTA, () => {
    console.log(`Servidor iniciado em http://localhost:${PORTA}`);
})