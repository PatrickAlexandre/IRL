// Liste des biais cognitifs (quelques exemples)
const cognitiveBiases = [
    "Biais de confirmation : tendance à rechercher, interpréter, favoriser et se souvenir des informations de manière à confirmer ses propres croyances ou hypothèses.",
    "Biais de disponibilité : tendance à évaluer la probabilité d'un événement en fonction de la facilité avec laquelle des exemples viennent à l'esprit.",
    "Biais d'ancrage : influence de la première information rencontrée (l'ancre) sur la prise de décision.",
    "Biais de statu quo : préférence pour que les choses restent les mêmes plutôt que de changer."
    // Ajoutez ici les 176 autres biais cognitifs
];

// Liste des lois du pouvoir (quelques exemples)
const powerLaws = [
    "Ne jamais éclipser le maître : faire en sorte que ceux au-dessus de vous se sentent toujours supérieurs.",
    "Ne faites jamais trop confiance aux amis, apprenez à utiliser vos ennemis : les amis peuvent trahir, les ennemis peuvent surprendre.",
    "Dissimulez vos intentions : gardez vos objectifs cachés pour éviter les interférences.",
    "Dites-en moins que nécessaire : en disant moins, vous augmentez votre influence."
    // Ajoutez ici les 44 autres lois du pouvoir
];

// Liste des schémas décisionnels (quelques exemples)
const decisionSchemas = [
    "La Matrice d'Eisenhower : une méthode pour prioriser les tâches en fonction de leur urgence et de leur importance.",
    "Le SWOT : analyse des forces, faiblesses, opportunités et menaces.",
    "La Matrice BCG : outil d'analyse stratégique pour évaluer la position de marché des produits d'une entreprise.",
    "La Règle des 10-10-10 : évaluation des décisions en fonction de leur impact à 10 minutes, 10 mois et 10 ans."
    // Ajoutez ici les 14 autres schémas décisionnels
];

// Fonction pour remplir les listes dans le HTML
function populateList(listId, items) {
    const ul = document.getElementById(listId);
    items.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        ul.appendChild(li);
    });
}

// Remplir les sections avec les éléments correspondants
populateList('bias-list', cognitiveBiases);
populateList('laws-list', powerLaws);
populateList('schemas-list', decisionSchemas);
