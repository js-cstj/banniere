export default class App {
	/**
	 * Méthode principale. Sera appelée après le chargement de la page.
	 * Initialise le formulaire et la bannière, et gère la soumission du formulaire.
	 */
	static main() {
		// Récupère l'élément avec l'ID 'app' et y ajoute le formulaire généré
		const app = document.getElementById('app');
		const formBanniere = app.appendChild(this.html_formulaire());

		// Ajoute un gestionnaire d'événements pour la soumission du formulaire
		formBanniere.addEventListener('submit', (event) => {
			// Empêche le comportement par défaut de rechargement de la page
			event.preventDefault();

			// Récupère les valeurs du texte et de la longueur spécifiées par l'utilisateur
			const texte = formBanniere.texte.value;
			const longueur = formBanniere.longueur.valueAsNumber;

			// Modifie la largeur de la bannière en fonction de la longueur donnée par l'utilisateur
			document.querySelector('.banniere.teletype').style.width = `${longueur}ch`;

			// Si un ticker est déjà en cours, on l'arrête pour éviter les conflits
			if (this.intervalBanniere) {
				clearInterval(this.intervalBanniere); // Arrête le ticker existant
				this.intervalBanniere = null;        // Réinitialise la variable pour permettre un nouveau ticker
			} else {
				// Démarre un nouveau ticker avec le texte et la longueur spécifiés
				this.demarrer(texte, longueur);
			}
		});

		// Ajoute la bannière à l'application (en bas de la page)
		app.appendChild(this.html_banniere());
	}

	/**
	 * Crée et retourne l'élément HTML représentant la bannière "teletype".
	 * @return {HTMLElement} La bannière sous forme de div avec les classes appropriées.
	 */
	static html_banniere() {
		// Crée une div qui représentera la bannière
		const divBanniere = document.body.appendChild(document.createElement("div"));

		// Ajoute les classes CSS 'banniere' et 'teletype' pour le style
		divBanniere.classList.add("banniere");
		divBanniere.classList.add("teletype");

		// Retourne l'élément de bannière pour qu'il soit ajouté au DOM
		return divBanniere;
	}

	/**
	 * Crée et retourne le formulaire HTML permettant de configurer la bannière.
	 * @return {HTMLFormElement} Le formulaire contenant les champs pour le texte et la longueur.
	 */
	static html_formulaire() {
		// Crée le formulaire pour la bannière
		const formBanniere = document.body.appendChild(document.createElement("form"));
		formBanniere.id = "form-banniere"; // Donne un ID unique au formulaire

		// Création du champ texte (pour le texte à afficher)
		const texte = document.createElement("input");
		texte.type = "text";
		texte.name = "texte";
		texte.id = "texte";
		texte.required = true; // Le champ est obligatoire

		// Ajoute le champ texte au formulaire via une méthode helper pour structurer les champs
		formBanniere.appendChild(this.html_rangeeChamp("Texte", "Texte à afficher", texte));

		// Création du champ nombre (pour la longueur de la bannière)
		const longueur = document.createElement("input");
		longueur.type = "number";
		longueur.name = "longueur";
		longueur.id = "longueur";
		longueur.min = "10";  // Minimum de 10 caractères
		longueur.max = "100"; // Maximum de 100 caractères
		longueur.value = "20"; // Valeur par défaut de 20 caractères
		longueur.required = true; // Le champ est obligatoire

		// Ajoute le champ longueur au formulaire
		formBanniere.appendChild(this.html_rangeeChamp("longueur", "Longueur", longueur));

		// Ajout d'un bouton de soumission
		const divBouton = formBanniere.appendChild(document.createElement("div"));
		const button = divBouton.appendChild(document.createElement("button"));
		button.type = "submit";
		button.textContent = "Lancer la bannière"; // Texte du bouton

		// Retourne le formulaire complet
		return formBanniere;
	}

	/**
	 * Crée une rangée de formulaire contenant une étiquette et un champ d'entrée.
	 * @param {string} name - Le nom du champ.
	 * @param {string} etiquette - L'étiquette à afficher.
	 * @param {HTMLElement} champ - Le champ d'entrée correspondant (input, select, etc.).
	 * @return {HTMLElement} Une div contenant l'étiquette et le champ d'entrée.
	 */
	static html_rangeeChamp(name, etiquette, champ) {
		// Crée un conteneur pour une rangée de champ
		const div = document.createElement("div");

		// Ajoute une étiquette pour le champ avec une association 'for'
		const label = div.appendChild(document.createElement("label"));
		label.setAttribute("for", name);   // L'étiquette est liée au champ via l'attribut 'for'
		label.textContent = etiquette;     // Texte de l'étiquette

		// Ajoute le champ (input ou autre) dans la même rangée
		div.appendChild(champ);

		// Retourne la rangée complète
		return div;
	}

	/**
	 * Démarre le ticker dans la bannière avec un texte défilant à largeur fixe.
	 * @param {string} texte - Le texte à afficher.
	 * @param {number} longueur - La longueur visible de la bannière (en caractères).
	 */
	static demarrer(texte, longueur = 20) {
		// Récupère l'élément de la bannière dans le DOM
		const divBanniere = document.querySelector('.banniere.teletype');

		// Initialisation de l'index courant pour gérer le défilement
		let indexCourant = 0;

		// Ajoute des espaces au début du texte pour un défilement fluide au démarrage
		texte = ' '.repeat(longueur) + texte;

		// Utilise setInterval pour faire défiler le texte à intervalles réguliers
		this.intervalBanniere = setInterval(() => {
			// Crée la portion de texte visible avec la longueur spécifiée
			const texteVisible = (texte + texte).slice(indexCourant).slice(0, longueur);

			// Met à jour le contenu de la bannière avec la portion visible du texte
			divBanniere.textContent = texteVisible;

			// Incrémente l'index pour faire défiler le texte
			indexCourant++;

			// Si la fin du texte est atteinte, on recommence au début
			if (indexCourant > texte.length) {
				indexCourant = 0;
			}
		}, 200); // Intervalle de 200 ms pour la vitesse de défilement
	}
}
