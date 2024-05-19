document.addEventListener('DOMContentLoaded', function() {
    if ("Notification" in window) {
        Notification.requestPermission().then(permission => {
            if (permission !== "granted") {
                alert("Les notifications sont désactivées. Veuillez les activer pour recevoir des notifications.");
            }
        });
    }

    const icons = [
        "fa-dna", "fa-brain", "fa-eye", "fa-dumbbell", "fa-baby", "fa-shield-alt", "fa-ruler", "fa-heartbeat",
        "fa-cogs", "fa-seedling", "fa-lungs", "fa-dna", "fa-ribbon", "fa-shield-virus", "fa-brain", "fa-bacon",
        "fa-dna", "fa-child", "fa-pills", "fa-shield-alt", "fa-heart", "fa-shield-virus", "fa-venus-mars", "fa-venus",
        "fa-mars"
    ];

    const chromosomes = Array.from({ length: 22 }, (_, i) => ({ name: ``, icon: icons[i] }));
    const chromosomesGrid = document.getElementById('chromosomes-grid');
    const defaultValues = [1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2.0, 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 2.9, 3.0, 3.1, 3.2];

    chromosomes.forEach((chromosome, index) => {
        const gridItem = document.createElement('div');
        gridItem.classList.add('grid-item');
        gridItem.innerHTML = `<i class="fas ${chromosome.icon}"></i><div>${chromosome.name}${defaultValues[index]}</div>`;
    });

    const chromosome23Item = document.createElement('div');
    chromosome23Item.classList.add('grid-item');
    chromosome23Item.innerHTML = `
        <i class="fas fa-venus-mars"></i>
        <select id="chromosome" name="chromosome" class="w3-select w3-border">
            <option value="XX" title="X🚺👩">♀️</option>
            <option value="XY" title="Y🚹👨">♂️</option>
        </select>
    `;

    const dob = document.getElementById('dob');
    const weight = document.getElementById('weight');
    const height = document.getElementById('height');
    const chromosome = document.getElementById('chromosome');
    const activityLevel = document.getElementById('activity-level');
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
        document.getElementById('mainProgressBar').style.width = percentage + '%';
        document.getElementById('mainProgressBar').textContent = percentage.toFixed(2) + '%';
    }

    const mbtiSelect = document.getElementById('mbti-select');
    mbtiSelect.addEventListener('change', function() {
        const mbtiColors = {
            "ISTJ": "#ff9999", "ISFJ": "#ffcc99", "INFJ": "#ffff99", "INTJ": "#99ff99", "ISTP": "#99ffcc", "ISFP": "#99ccff",
            "INFP": "#cc99ff", "INTP": "#ff99cc", "ESTP": "#ff6666", "ESFP": "#ffb366", "ENFP": "#ffff66", "ENTP": "#66ff66",
            "ESTJ": "#66ffb3", "ESFJ": "#66b3ff", "ENFJ": "#b366ff", "ENTJ": "#ff66b3"
        };

        const mbtiInfo = {
            "ISTJ": { "functionAux": "Pensée extravertie", "functionPrimary": "Sensation introvertie", "demographic": "11,6%", "subtype": "Logisticien", "nickname": "Inspecteur" },
            "ISFJ": { "functionAux": "Sentiment extraverti", "functionPrimary": "Sensation introvertie", "demographic": "13,8%", "subtype": "Défenseur", "nickname": "Protecteur" },
            "INFJ": { "functionAux": "Sentiment extraverti", "functionPrimary": "Intuition introvertie", "demographic": "1,5%", "subtype": "Avocat", "nickname": "Mystique" },
            "INTJ": { "functionAux": "Pensée extravertie", "functionPrimary": "Intuition introvertie", "demographic": "2,1%", "subtype": "Architecte", "nickname": "Maître stratège" },
            "ISTP": { "functionAux": "Sensation extravertie", "functionPrimary": "Pensée introvertie", "demographic": "5,4%", "subtype": "Virtuose", "nickname": "Artisan" },
            "ISFP": { "functionAux": "Sensation extravertie", "functionPrimary": "Sentiment introverti", "demographic": "8,8%", "subtype": "Aventurier", "nickname": "Artiste" },
            "INFP": { "functionAux": "Intuition extravertie", "functionPrimary": "Sentiment introverti", "demographic": "4,4%", "subtype": "Médiateur", "nickname": "Rêveur" },
            "INTP": { "functionAux": "Intuition extravertie", "functionPrimary": "Pensée introvertie", "demographic": "3,3%", "subtype": "Logicien", "nickname": "Penseur" },
            "ESTP": { "functionAux": "Pensée introvertie", "functionPrimary": "Sensation extravertie", "demographic": "4,3%", "subtype": "Entrepreneur", "nickname": "Dynamique" },
            "ESFP": { "functionAux": "Sentiment introverti", "functionPrimary": "Sensation extravertie", "demographic": "8,5%", "subtype": "Animateur", "nickname": "Artiste de scène" },
            "ENFP": { "functionAux": "Sentiment introverti", "functionPrimary": "Intuition extravertie", "demographic": "8,1%", "subtype": "Mobilisateur", "nickname": "Champion" },
            "ENTP": { "functionAux": "Pensée introvertie", "functionPrimary": "Intuition extravertie", "demographic": "3,2%", "subtype": "Débatteur", "nickname": "Visionnaire" },
            "ESTJ": { "functionAux": "Sensation extravertie", "functionPrimary": "Pensée introvertie", "demographic": "8,7%", "subtype": "Cadre", "nickname": "Superviseur" },
            "ESFJ": { "functionAux": "Sensation extravertie", "functionPrimary": "Sentiment introverti", "demographic": "12,3%", "subtype": "Conseiller", "nickname": "Fournisseur" },
            "ENFJ": { "functionAux": "Intuition extravertie", "functionPrimary": "Sentiment introverti", "demographic": "2,5%", "subtype": "Protagoniste", "nickname": "Enseignant" },
            "ENTJ": { "functionAux": "Pensée extravertie", "functionPrimary": "Intuition extravertie", "demographic": "1,8%", "subtype": "Commandant", "nickname": "Maréchal" }
        };

        const selectedType = mbtiSelect.value;
        document.body.style.backgroundColor = mbtiColors[selectedType];
        const info = mbtiInfo[selectedType];
        const infoHtml = `
            <p>${info.nickname}</p>
            <p></p>
            <h5 contenteditable="true" class="w3-text-theme"><b>${info.subtype}</b></h5>
            <hr>
            <div>${info.demographic}</div>
            <small>
                <div>${info.functionPrimary}</div>
                <div>${info.functionAux}</div>
            </small>
        `;
        document.getElementById('mbti-info').innerHTML = infoHtml;
    });

    mbtiSelect.dispatchEvent(new Event('change'));

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

    modal.style.display = "block";
});
