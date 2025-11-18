const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

const { predios, TARIFA_ENERGIA_KWH, FATOR_CO2_POR_KWH } = require('./dados.js');

app.use(cors()); 
app.use(express.json());

app.get('/api/dados/geral', (req, res) => {
    console.log("GET: /api/dados/geral - Enviando dados consolidados...");
    
    const labels = predios[0].dados.labels; 
    let dadosEnergia = [];
    let dadosEconomia = [];

    for (let i = 0; i < labels.length; i++) {
        let energiaMes = 0;
        let economiaMes = 0;
        predios.forEach(p => {
            energiaMes += p.dados.energiaKWh[i];
            economiaMes += p.dados.economiaRS[i];
        });
        dadosEnergia.push(energiaMes);
        dadosEconomia.push(economiaMes);
    }

    const totalEnergia = dadosEnergia.reduce((t, v) => t + v, 0);
    const totalEconomia = dadosEconomia.reduce((t, v) => t + v, 0);
    const totalCO2 = totalEnergia * FATOR_CO2_POR_KWH;
    
    res.json({
        tipo: 'geral',
        titulo: 'Desempenho Geral (Todos os Prédios)',
        labels: labels,
        dadosEnergia: dadosEnergia,
        dadosEconomia: dadosEconomia,
        totalEnergia: totalEnergia,
        totalEconomia: totalEconomia,
        totalCO2: totalCO2,
        totalPredios: predios.length
    });
});

app.get('/api/dados/predio/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const predio = predios.find(p => p.id === id);

    if (!predio) {
        return res.status(404).json({ error: 'Predio nao encontrado' });
    }

    console.log(`GET: /api/dados/predio/${id} - Enviando dados de ${predio.nome}`);

    const totalEnergia = predio.dados.energiaKWh.reduce((t, v) => t + v, 0);
    const totalEconomia = predio.dados.economiaRS.reduce((t, v) => t + v, 0);
    const totalCO2 = totalEnergia * FATOR_CO2_POR_KWH;

    res.json({
        tipo: 'predio',
        titulo: `Desempenho: ${predio.nome}`,
        labels: predio.dados.labels,
        dadosEnergia: predio.dados.energiaKWh,
        dadosEconomia: predio.dados.economiaRS,
        totalEnergia: totalEnergia,
        totalEconomia: totalEconomia,
        totalCO2: totalCO2,
        totalPredios: 1
    });
});

app.get('/api/predios', (req, res) => {
    console.log("GET: /api/predios - Enviando lista para o mapa...");
    const listaMapa = predios.map(p => ({
        id: p.id,
        nome: p.nome,
        lat: p.lat,
        lon: p.lon
    }));
    res.json(listaMapa);
});

app.listen(PORT, () => {
    console.log(`Servidor (Mock API) do SolSertão rodando em http://localhost:${PORT}`);
});