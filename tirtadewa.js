const waterCtx = document.getElementById('waterLevelChart').getContext('2d');
        const temperatureCtx = document.getElementById('temperatureChart').getContext('2d');

        const waterLevelChart = new Chart(waterCtx, {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    label: 'Ketinggian Air',
                    data: [],
                    borderColor: 'rgba(54, 162, 235, 1)',
                    fill: false
                }]
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Waktu'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Ketinggian (m)'
                        },
                        beginAtZero: true
                    }
                }
            }
        });

        const temperatureChart = new Chart(temperatureCtx, {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    label: 'Suhu Air',
                    data: [],
                    borderColor: 'rgba(255, 99, 132, 1)',
                    fill: false
                }]
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Waktu'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Suhu (°C)'
                        },
                        beginAtZero: true
                    }
                }
            }
        });

        let currentPenampungan = null;

        function updateChart(chart, newLabel, newData) {
            if (chart.data.labels.length >= 10) {
                chart.data.labels.shift();
                chart.data.datasets[0].data.shift();
            }
            chart.data.labels.push(newLabel);
            chart.data.datasets[0].data.push(newData);
            chart.update();
        }

        function fetchData(penampungan) {
            currentPenampungan = penampungan; // Simpan penampungan saat ini
            let url = '';

            if (penampungan === 'penampungan1') {
                url = 'https://script.google.com/macros/s/AKfycbyW1-Nu818-6cJQ37dpUe_N6CKG6IehZwdZ77Zk6zr6nEWoIGuUkAWxEOJkTnVBqlcfeg/exec';
            } else if (penampungan === 'penampungan2') {
                url = 'https://script.google.com/macros/s/AKfycbwQNIKT1rTjBPHtk7RCNSoJZoG_bE_afv9YzbRuJ94UA71CSG8CQVgr9YeIZGq3ILgT1A/exec';
            } else if (penampungan === 'penampungan3') {
                url = 'URL_3'; // Ganti dengan URL untuk penampungan 3
            }

            fetch(url)
                .then(response => response.json())
                .then(data => {
                    document.getElementById('suhu').textContent = data.suhu + ' °C';
                    const newLabel = new Date().toLocaleTimeString();
                    const newTemperature = data.suhu;
                    document.getElementById('ketinggian').textContent = data.ketinggian + ' M';
                    const newWaterLevel = data.ketinggian;
                    document.getElementById('status').textContent = data.status;

                    updateChart(waterLevelChart, newLabel, newWaterLevel);
                    updateChart(temperatureChart, newLabel, newTemperature);
                })
                .catch(error => console.error('Error fetching data:', error));
        }

        setInterval(() => {
            if (currentPenampungan) {
                fetchData(currentPenampungan); // Ambil data berdasarkan penampungan saat ini
            }
        }, 5000);

        function toggleDropdown() {
            const dropdown = document.getElementById('dropdown');
            dropdown.classList.toggle('hidden');
        }

        window.onclick = function(event) {
            const dropdown = document.getElementById('dropdown');
            if (!event.target.closest('.relative')) {
                dropdown.classList.add('hidden');
            }
        }

        function toggleSearchInput() {
            const searchContainer = document.getElementById('searchContainer');
            searchContainer.classList.toggle('hidden');
            if (!searchContainer.classList.contains('hidden')) {
                document.getElementById('searchInput').focus();
            }
        }

        window.onclick = function(event) {
            const searchContainer = document.getElementById('searchContainer');
            if (!event.target.closest('#searchContainer') && !event.target.closest('button')) {
                searchContainer.classList.add('hidden');
            }
        }

        document.getElementById('searchInput').addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                const query = this.value.toLowerCase();
                const textElements = document.querySelectorAll('p, h1, h2, h3'); // Sesuaikan elemen yang ingin dicari
                let found = false;

                textElements.forEach(element => {
                    if (element.textContent.toLowerCase().includes(query)) {
                        element.scrollIntoView({ behavior: 'smooth' });
                        element.style.backgroundColor = 'yellow'; // Tandai yang ditemukan
                        found = true;
                    } else {
                        element.style.backgroundColor = ''; // Reset yang tidak ditemukan
                    }
                });

                if (!found) {
                    alert('Tidak ada hasil yang ditemukan.');
                }
            }
        });