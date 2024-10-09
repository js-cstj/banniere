
## Description générale

Cette classe `App` représente une application qui génère une bannière "teletype" animée dans laquelle le texte défile, tout en permettant à l'utilisateur de spécifier le texte et la longueur visible de la bannière via un formulaire.

L'application fonctionne de la manière suivante :
1. Un formulaire est généré et inséré dans la page, permettant à l'utilisateur d'entrer du texte et de définir la longueur de la bannière.
2. Une fois le formulaire soumis, le texte commence à défiler à l'intérieur d'une zone de bannière avec une largeur fixe définie par l'utilisateur.
3. L'utilisateur peut relancer la bannière avec un nouveau texte ou une nouvelle longueur.

## Détail des méthodes

### `static main()`
C'est la méthode principale de l'application, appelée après le chargement de la page.

- **Description** : 
  - Récupère l'élément avec l'ID `'app'` dans le DOM.
  - Ajoute un formulaire généré par la méthode `html_formulaire()` à cet élément.
  - Attache un gestionnaire d'événement `submit` au formulaire pour capturer la soumission.
  - Lors de la soumission :
    - Empêche le comportement par défaut de rechargement de la page avec `event.preventDefault()`.
    - Récupère le texte saisi par l'utilisateur et la longueur souhaitée.
    - Modifie la largeur de la bannière selon la longueur spécifiée.
    - Si une bannière est déjà en cours, elle est arrêtée avec `clearInterval()`. Sinon, la méthode `demarrer()` est appelée pour démarrer le défilement.

### `static html_banniere()`
Crée et renvoie un élément `<div>` qui représente la bannière "teletype".

- **Description** :
  - Ajoute une `div` à la page avec les classes CSS `banniere` et `teletype`.
  - Retourne cet élément pour l'insérer dans le DOM.

### `static html_formulaire()`
Génère et retourne un formulaire HTML pour permettre à l'utilisateur de configurer le texte de la bannière et sa longueur.

- **Description** :
  - Crée un formulaire qui contient :
    - Un champ texte pour entrer le texte à afficher.
    - Un champ numérique pour choisir la longueur visible de la bannière.
    - Un bouton de soumission pour lancer le ticker.
  - Chaque champ est ajouté au formulaire à l'aide de la méthode auxiliaire `html_rangeeChamp()`.
  - Le formulaire est ensuite ajouté au corps de la page.

### `static html_rangeeChamp(name, etiquette, champ)`
Crée un élément contenant une rangée avec une étiquette et un champ de formulaire.

- **Paramètres** :
  - `name` : Le nom de l'input (utilisé pour associer le label à l'input).
  - `etiquette` : Le texte à afficher dans l'étiquette du champ.
  - `champ` : L'élément de champ de formulaire (par exemple, input).

- **Description** :
  - Crée une `div` qui contient une `label` associée au champ de formulaire (`champ`).
  - Retourne cette `div`.

### `static demarrer(texte, longueur = 20)`
Lance le ticker (bannière défilante) qui affiche le texte dans un format à largeur fixe.

- **Paramètres** :
  - `texte` : Le texte à afficher dans la bannière.
  - `longueur` : La longueur visible de la bannière (par défaut 20 caractères).

- **Description** :
  - Récupère l'élément `div` correspondant à la bannière.
  - Ajoute des espaces au début du texte pour créer un effet de défilement fluide.
  - Utilise `setInterval()` pour mettre à jour le texte visible toutes les 200 millisecondes.
  - Le texte est affiché progressivement, en se décalant à chaque intervalle.
  - Si l'index atteint la fin du texte, il est réinitialisé à 0, créant un défilement en boucle.

## Explication de la logique de défilement
- La bannière a une largeur fixe en "ch" (caractères), définie par l'utilisateur via le champ "longueur".
- Le texte saisi par l'utilisateur est stocké avec des espaces au début pour simuler l'entrée progressive du texte dans la zone de la bannière.
- Le texte visible est une sous-chaîne du texte total, qui change à chaque intervalle pour donner l'impression qu'il défile.
- Une fois que l'index dépasse la longueur du texte, il recommence au début pour un défilement infini.

## Exemple d'utilisation
1. L'utilisateur saisit un texte comme "Bonjour le monde" et définit une longueur de 30 caractères pour la bannière.
2. Le texte commence à défiler dans la bannière avec une largeur de 30 caractères, en boucle.
3. Le ticker est réinitialisé si l'utilisateur soumet un nouveau texte ou modifie la longueur de la bannière. 

Ce modèle est très flexible et peut être utilisé pour tout type d'affichage défilant basé sur du texte dynamique.