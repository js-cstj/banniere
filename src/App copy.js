
export default class App {
	/**
	 * Méthode principale. Sera appelée après le chargement de la page.
	 */
	static main() {
		var app = document.getElementById("app");
	}
	static banniere1() {
		let intervalBanniere;

		function demarrer(texte) {
			const divBanniere = document.getElementById('banniere');
			let position = divBanniere.offsetWidth;

			divBanniere.textContent = texte;

			intervalBanniere = setInterval(() => {
				divBanniere.style.transform = `translateX(${position}px)`;
				position -= 2;

				// Revenir à droite une fois que le texte a complètement disparu à gauche
				if (position < -divBanniere.scrollWidth) {
					position = divBanniere.offsetWidth;
				}
			}, 20);
		}

		const formBanniere = document.getElementById('form-banniere');
		formBanniere.addEventListener('submit', (event) => {
			event.preventDefault();

			const texte = formBanniere.texte.value;

			// Si une bannière est déjà en cours, on l'arrête avant de relancer
			if (intervalBanniere) {
				clearInterval(intervalBanniere);
			}

			demarrer(texte);
		});
	}
	static banniere2() {
		const formBanniere = document.getElementById('form-banniere');
		formBanniere.addEventListener('submit', (event) => {
			event.preventDefault();

			const texte = formBanniere.texte.value;
			const longueur = formBanniere.longueur.valueAsNumber;
			document.querySelector('.banniere.teletype').style.width = `${longueur}ch`;

			// Si une bannière est déjà en cours, on l'arrête avant de relancer
			if (this.intervalBanniere) {
				clearInterval(this.intervalBanniere);
				this.intervalBanniere = null;
			} else {
				this.demarrer2(texte, longueur);
			}
		});
	}
	static demarrer2(texte, longueur = 20) {
		const divBanniere = document.querySelector('.banniere.teletype');
		let indexCourant = 0;
		texte = ' '.repeat(longueur) + texte; // Ajouter des espaces au début pour un effet de défilement progressif

		this.intervalBanniere = setInterval(() => {
			// Afficher le texte progressivement avec une longueur fixe
			const texteVisible = (texte + texte).slice(indexCourant).slice(0, longueur);
			divBanniere.textContent = texteVisible;

			indexCourant++;

			// Si on a atteint la fin du texte, on recommence au début
			if (indexCourant > texte.length) {
				indexCourant = 0;
			}
		}, 200); // Change tous les 200 ms pour une vitesse modérée
	}
}
