        document.addEventListener('DOMContentLoaded', function() {
            const icons = [
                "fa-dna",           // Chromosome 1
                "fa-brain",         // Chromosome 2
                "fa-eye",           // Chromosome 3
                "fa-dumbbell",      // Chromosome 4
                "fa-baby",          // Chromosome 5
                "fa-shield-alt",    // Chromosome 6
                "fa-ruler",         // Chromosome 7
                "fa-heartbeat",     // Chromosome 8
                "fa-cogs",          // Chromosome 9
                "fa-seedling",      // Chromosome 10
                "fa-lungs",         // Chromosome 11
                "fa-dna",           // Chromosome 12
                "fa-ribbon",        // Chromosome 13
                "fa-shield-virus",  // Chromosome 14
                "fa-brain",         // Chromosome 15
                "fa-bacon",         // Chromosome 16
                "fa-dna",           // Chromosome 17
                "fa-child",         // Chromosome 18
                "fa-pills",         // Chromosome 19
                "fa-shield-alt",    // Chromosome 20
                "fa-heart",         // Chromosome 21
                "fa-shield-virus",  // Chromosome 22
                "fa-venus-mars",    // Chromosome 23
                "fa-venus",         // Chromosome X
                "fa-mars"           // Chromosome Y
            ];

            const chromosomes = Array.from({ length: 22 }, (_, i) => ({ name: ``, icon: icons[i] }));
            const chromosomesGrid = document.getElementById('chromosomes-grid');
            const defaultValues = [1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2.0, 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 2.9, 3.0, 3.1, 3.2]; // Example default values

            chromosomes.forEach((chromosome, index) => {
                const gridItem = document.createElement('div');
                gridItem.classList.add('grid-item');
                gridItem.innerHTML = `
                    <i class="fas ${chromosome.icon}"></i>
                    <div>${chromosome.name}${defaultValues[index]}</div>
                `;
                //Add22 chromosomesGrid.appendChild(gridItem);
            });

            // Add the 23rd chromosome selector
            const chromosome23Item = document.createElement('div');
            chromosome23Item.classList.add('grid-item');
            chromosome23Item.innerHTML = `
                <i class="fas fa-venus-mars"></i>
                <select id="chromosome" name="chromosome" class="w3-select w3-border">
                    <option value="XX" title="X🚺👩">♀️</option>
                    <option value="XY" title="Y🚹👨">♂️</option>
                </select>
            `;
            //Add+Chr23 chromosomesGrid.appendChild(chromosome23Item);

            const dob = document.getElementById('dob');
            const weight = document.getElementById('weight');
            const height = document.getElementById('height');
            const chromosome = document.getElementById('chromosome');
            const activityLevel = document.getElementById('activity-level');

            // Set default value for date of birth
            const today = new Date().toISOString().split('T')[0];
            dob.value = today;

            [dob, weight, height, chromosome, activityLevel].forEach(element => {
                element.addEventListener('input', calculateMetabolism);
            });

            function calculateMetabolism() {
                const chromosomeValue = chromosome.value;
                const dobValue = dob.value;
                const weightValue = parseFloat(weight.value);
                const heightValue = parseFloat(height.value);
                const activityMultiplier = parseFloat(activityLevel.value);
                if (dobValue && weightValue && heightValue && chromosomeValue) {
                    const age = calculateAge(dobValue);
                    let mb;

                    if (chromosomeValue === 'XX') {
                        mb = 2.741 + 0.0402 * weightValue + 0.711 * heightValue - 0.0197 * age;
                    } else if (chromosomeValue === 'XY') {
                        mb = 0.276 + 0.0573 * weightValue + 2.073 * heightValue - 0.0285 * age;
                    }

                    const dailyExpenditure = mb * activityMultiplier;

                    document.getElementById('mb-result').textContent = `Votre Métabolisme de Base est de ${mb.toFixed(2)} kcal/jour. Votre dépense quotidienne est de ${dailyExpenditure.toFixed(2)} kcal/jour.`;

                    updateLifeExpectancy(age, chromosomeValue);
                }
            }

            function calculateAge(dob) {
                const diffMs = Date.now() - new Date(dob).getTime();
                const ageDate = new Date(diffMs);
                return Math.abs(ageDate.getUTCFullYear() - 1970);
            }

            const ctx = document.getElementById('myChart').getContext('2d');
            const myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: [
                        'Investing in Stocks (08:00)', 'Networking (09:00)', 'Personal Development (10:00)', 
                        'Fitness Routine (11:00)', 'Reading (12:00)', 'Managing Businesses (13:00)', 
                        'Traveling (14:00)', 'Learning New Skills (15:00)', 'Real Estate Investments (16:00)', 
                        'Meditation (17:00)', 'Philanthropy (18:00)', 'High-End Dining (19:00)', 
                        'Luxury Shopping (20:00)', 'Golfing (21:00)', 'Collecting Art (22:00)', 
                        'Attending Conferences (23:00)', 'Advising Startups (00:00)', 'Yachting (01:00)', 
                        'Skiing (02:00)', 'Spa Days (03:00)', 'Driving Luxury Cars (04:00)', 
                        'Charity Events (05:00)', 'Exclusive Parties (06:00)'
                    ],
                    datasets: [{
                        label: '/ DAY',
                        data: [12, 19, 15, 10, 8, 20, 14, 16, 30, 6, 18, 21, 11, 7, 13, 5, 4, 3, 2, 1, 0, 1, 2],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)',
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)',
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)',
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });

            function updateLifeExpectancy(age, chromosome) {
                const maxLifeExpectancyFemale = 82;
                const maxLifeExpectancyMale = 78;
                let remainingLifeExpectancy;

                if (chromosome === 'XX') {
                    remainingLifeExpectancy = maxLifeExpectancyFemale - age;
                } else if (chromosome === 'XY') {
                    remainingLifeExpectancy = maxLifeExpectancyMale - age;
                }

                remainingLifeExpectancy = remainingLifeExpectancy < 0 ? 0 : remainingLifeExpectancy;

                const percentage = (remainingLifeExpectancy / (chromosome === 'XX' ? maxLifeExpectancyFemale : maxLifeExpectancyMale)) * 100;
                const progressBar = chromosome === 'XX' ? document.getElementById('lifeExpectancyFemale') : document.getElementById('lifeExpectancyMale');

                progressBar.style.width = percentage + '%';
                progressBar.textContent = remainingLifeExpectancy + ' ans';

                // Mettre à jour la barre de progression principale
                document.getElementById('mainProgressBar').style.width = percentage + '%';
                document.getElementById('mainProgressBar').textContent = percentage.toFixed(2) + '%';
            }

            // Change theme color based on MBTI type
            const mbtiSelect = document.getElementById('mbti-select');
            mbtiSelect.addEventListener('change', function() {
                const mbtiColors = {
                    "ISTJ": "#ff9999", // Light Red
                    "ISFJ": "#ffcc99", // Light Orange
                    "INFJ": "#ffff99", // Light Yellow
                    "INTJ": "#99ff99", // Light Green
                    "ISTP": "#99ffcc", // Light Cyan
                    "ISFP": "#99ccff", // Light Blue
                    "INFP": "#cc99ff", // Light Purple
                    "INTP": "#ff99cc", // Light Pink
                    "ESTP": "#ff6666", // Red
                    "ESFP": "#ffb366", // Orange
                    "ENFP": "#ffff66", // Yellow
                    "ENTP": "#66ff66", // Green
                    "ESTJ": "#66ffb3", // Cyan
                    "ESFJ": "#66b3ff", // Blue
                    "ENFJ": "#b366ff", // Purple
                    "ENTJ": "#ff66b3"  // Pink
                };
                const mbtiInfo = {
                    "ISTJ": {
                        "functionAux": "Pensée extravertie",
                        "functionPrimary": "Sensation introvertie",
                        "demographic": "11,6%",
                        "subtype": "Logisticien",
                        "nickname": "Inspecteur"
                    },
                    "ISFJ": {
                        "functionAux": "Sentiment extraverti",
                        "functionPrimary": "Sensation introvertie",
                        "demographic": "13,8%",
                        "subtype": "Défenseur",
                        "nickname": "Protecteur"
                    },
                    "INFJ": {
                        "functionAux": "Sentiment extraverti",
                        "functionPrimary": "Intuition introvertie",
                        "demographic": "1,5%",
                        "subtype": "Avocat",
                        "nickname": "Mystique"
                    },
                    "INTJ": {
                        "functionAux": "Pensée extravertie",
                        "functionPrimary": "Intuition introvertie",
                        "demographic": "2,1%",
                        "subtype": "Architecte",
                        "nickname": "Maître de la stratégie"
                    },
                    "ISTP": {
                        "functionAux": "Sensation extravertie",
                        "functionPrimary": "Pensée introvertie",
                        "demographic": "5,4%",
                        "subtype": "Virtuose",
                        "nickname": "Artisan"
                    },
                    "ISFP": {
                        "functionAux": "Sensation extravertie",
                        "functionPrimary": "Sentiment introverti",
                        "demographic": "8,8%",
                        "subtype": "Aventurier",
                        "nickname": "Artiste"
                    },
                    "INFP": {
                        "functionAux": "Intuition extravertie",
                        "functionPrimary": "Sentiment introverti",
                        "demographic": "4,4%",
                        "subtype": "Médiateur",
                        "nickname": "Rêveur"
                    },
                    "INTP": {
                        "functionAux": "Intuition extravertie",
                        "functionPrimary": "Pensée introvertie",
                        "demographic": "3,3%",
                        "subtype": "Logicien",
                        "nickname": "Penseur"
                    },
                    "ESTP": {
                        "functionAux": "Pensée introvertie",
                        "functionPrimary": "Sensation extravertie",
                        "demographic": "4,3%",
                        "subtype": "Entrepreneur",
                        "nickname": "Dynamique"
                    },
                    "ESFP": {
                        "functionAux": "Sentiment introverti",
                        "functionPrimary": "Sensation extravertie",
                        "demographic": "8,5%",
                        "subtype": "Animateur",
                        "nickname": "Artiste de la scène"
                    },
                    "ENFP": {
                        "functionAux": "Sentiment introverti",
                        "functionPrimary": "Intuition extravertie",
                        "demographic": "8,1%",
                        "subtype": "Mobilisateur",
                        "nickname": "Champion"
                    },
                    "ENTP": {
                        "functionAux": "Pensée introvertie",
                        "functionPrimary": "Intuition extravertie",
                        "demographic": "3,2%",
                        "subtype": "Débateur",
                        "nickname": "Visionnaire"
                    },
                    "ESTJ": {
                        "functionAux": "Sensation extravertie",
                        "functionPrimary": "Pensée introvertie",
                        "demographic": "8,7%",
                        "subtype": "Cadre",
                        "nickname": "Superviseur"
                    },
                    "ESFJ": {
                        "functionAux": "Sensation extravertie",
                        "functionPrimary": "Sentiment introverti",
                        "demographic": "12,3%",
                        "subtype": "Conseiller",
                        "nickname": "Fournisseur"
                    },
                    "ENFJ": {
                        "functionAux": "Intuition extravertie",
                        "functionPrimary": "Sentiment introverti",
                        "demographic": "2,5%",
                        "subtype": "Protagoniste",
                        "nickname": "Enseignant"
                    },
                    "ENTJ": {
                        "functionAux": "Intuition extravertie",
                        "functionPrimary": "Pensée extravertie",
                        "demographic": "1,8%",
                        "subtype": "Commandant",
                        "nickname": "Maréchal de champ"
                    }
                };

                const selectedType = mbtiSelect.value;
                document.body.style.backgroundColor = mbtiColors[selectedType];

                const info = mbtiInfo[selectedType];
                const infoHtml = `
                    <p>${info.demographic} ${info.nickname} ${info.subtype}</p>
                    <div><small><b class="w3-text-gray">${info.functionPrimary}</b></small></div>
                    <div><small><b class="w3-text-gray">${info.functionAux}</b></small></div>

                `;
                document.getElementById('mbti-info').innerHTML = infoHtml;
            });

            // Trigger the change event to set the initial theme
            mbtiSelect.dispatchEvent(new Event('change'));

            // Modal functionality
            const modal = document.getElementById("metabolismModal");
            const btn = document.getElementById("openModalBtn");
            const span = document.getElementsByClassName("close")[0];

            btn.onclick = function() {
                modal.style.display = "block";
            }

            span.onclick = function() {
                modal.style.display = "none";
            }

            window.onclick = function(event) {
                if (event.target == modal) {
                    modal.style.display = "none";
                }
            }

            // Display modal on page load
            modal.style.display = "block";

        });
