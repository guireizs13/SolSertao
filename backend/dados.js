const predios = [
    {
        id: 1,
        nome: "EREM Carlos Pena Filho",
        lat: -8.074259,
        lon: -39.129635,
        dados: {
            labels: ["Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro"],
            energiaKWh: [1200, 1350, 1400, 1500, 1450, 1600],
            economiaRS: [900, 1012, 1050, 1125, 1087, 1200]
        }
    },
    {
        id: 2,
        nome: "UBS N. S. de Aparecida",
        lat: -8.075339,
        lon: -39.126018,
        dados: {
            labels: ["Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro"],
            energiaKWh: [800, 850, 900, 880, 920, 950],
            economiaRS: [600, 637, 675, 660, 690, 712]
        }
    },
    {
        id: 3,
        nome: "EREM Prof. Urbano Gomes",
        lat: -8.073406,
        lon: -39.127633,
        dados: {
            labels: ["Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro"],
            energiaKWh: [1500, 1550, 1600, 1700, 1650, 1800],
            economiaRS: [1125, 1162, 1200, 1275, 1237, 1350]
        }
    },
    {
        id: 4,
        nome: "Prefeitura de Salgueiro",
        lat: -8.06985,
        lon: -39.12274,
        dados: {
            labels: ["Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro"],
            energiaKWh: [2000, 2100, 2200, 2300, 2250, 2400],
            economiaRS: [1500, 1575, 1650, 1725, 1687, 1800]
        }
    },
    {
        id: 5,
        nome: "UPE Salgueiro",
        lat: -8.05780,
        lon: -39.10712,
        dados: {
            labels: ["Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro"],
            energiaKWh: [3500, 3600, 3800, 3900, 3700, 4000],
            economiaRS: [2625, 2700, 2850, 2925, 2775, 3000]
        }
    },
    {
        id: 6,
        nome: "Hosp. Regional Inácio de Sá",
        lat: -8.05851,
        lon: -39.11369,
        dados: {
            labels: ["Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro"],
            energiaKWh: [5000, 5200, 5300, 5500, 5400, 5600], 
            economiaRS: [3750, 3900, 3975, 4125, 4050, 4200]
        }
    }
];

const TARIFA_ENERGIA_KWH = 0.75;
const FATOR_CO2_POR_KWH = 0.09;

module.exports = { predios, TARIFA_ENERGIA_KWH, FATOR_CO2_POR_KWH };