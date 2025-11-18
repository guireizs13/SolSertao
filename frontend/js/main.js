const API_URL = 'http://localhost:3000/api';

window.addEventListener('load', function() {
    
    const SALGUEIRO_COORDS = [-8.0734, -39.1209];
    const ZOOM_LEVEL = 15;
    let meuGrafico = null; 
    const cardEconomia = document.getElementById('card-economia-total');
    const cardEnergia = document.getElementById('card-energia-total');
    const cardCO2 = document.getElementById('card-co2');
    const cardPredios = document.getElementById('card-predios');

    function formatarDinheiro(valor) {
        return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    const map = L.map('map').setView(SALGUEIRO_COORDS, ZOOM_LEVEL);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    function inicializarGrafico() {
        const ctx = document.getElementById('meuGrafico').getContext('2d');
        meuGrafico = new Chart(ctx, {
            type: 'bar', 
            data: {
                labels: [], 
                datasets: [
                    {
                        type: 'bar',
                        label: 'Energia Gerada (kWh)',
                        data: [], 
                        backgroundColor: 'rgba(54, 162, 235, 0.6)',
                        yAxisID: 'yEnergia',
                    },
                    {
                        type: 'line',
                        label: 'Economia (R$)',
                        data: [], 
                        backgroundColor: 'rgba(75, 192, 192, 0.6)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        fill: false,
                        tension: 0.1,
                        yAxisID: 'yEconomia',
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { title: { display: true, text: 'Carregando...' } },
                scales: {
                    yEnergia: { type: 'linear', position: 'left', beginAtZero: true },
                    yEconomia: { type: 'linear', position: 'right', beginAtZero: true,
                        ticks: { callback: (value) => formatarDinheiro(value) }
                    }
                }
            }
        });
    }

    async function atualizarDashboard(predioId = null) {
        let url = '';
        
        if (predioId) {
            url = `${API_URL}/dados/predio/${predioId}`;
        } else {
            url = `${API_URL}/dados/geral`;
        }

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Erro na API: ${response.statusText}`);
            }
            const dados = await response.json(); 

            cardEconomia.textContent = formatarDinheiro(dados.totalEconomia);
            cardEnergia.textContent = `${dados.totalEnergia.toFixed(0)} kWh`;
            cardCO2.textContent = `${dados.totalCO2.toFixed(1)} kg`;
            cardPredios.textContent = dados.totalPredios;

            meuGrafico.data.labels = dados.labels;
            meuGrafico.data.datasets[0].data = dados.dadosEnergia;
            meuGrafico.data.datasets[1].data = dados.dadosEconomia;
            meuGrafico.options.plugins.title.text = dados.titulo;
            meuGrafico.update();

        } catch (error) {
            console.error("Falha ao atualizar o dashboard:", error);
        }
    }
    
    async function carregarMarcadoresMapa() {
        try {
            const response = await fetch(`${API_URL}/predios`); 
            const prediosDoMapa = await response.json();

            prediosDoMapa.forEach(predio => {
                const marker = L.marker([predio.lat, predio.lon]).addTo(map);
                marker.bindPopup(`<b>${predio.nome}</b>`);
                marker.on('click', () => {
                    atualizarDashboard(predio.id);
                });
            });
        } catch (error) {
            console.error("Falha ao carregar marcadores do mapa:", error);
        }
    }
    
    map.on('click', () => {
        atualizarDashboard(null); 
    });

    inicializarGrafico(); 

    carregarMarcadoresMapa();

    atualizarDashboard(null); 

});