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
                const textElements = document.querySelectorAll('p, h1, h2, h3');
                let found = false;

                textElements.forEach(element => {
                    if (element.textContent.toLowerCase().includes(query)) {
                        element.scrollIntoView({ behavior: 'smooth' });
                        element.style.backgroundColor = 'yellow';
                        found = true;
                    } else {
                        element.style.backgroundColor = '';
                    }
                });

                if (!found) {
                    alert('Tidak ada hasil yang ditemukan.');
                }
            }
        });