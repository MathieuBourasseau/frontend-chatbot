
# 🎨 Mistral Chat - Interface React professionnelle

Une interface de chat moderne, réactive et élégante, conçue pour interagir avec l'IA de Mistral. Ce projet a été développé pour offrir une expérience utilisateur (**UX**) fluide, proche des standards des meilleures IA actuelles.

**Important :**
- **L'entreprise Mistral n'est pas responsable de ce produit. Il s'agit d'un projet intégré à mon portfolio dans un but de recherche d'emploi ou d'alternance.**
- **Pour utiliser le projet il faut créer un compte depuis la page login !**
- **Je vous invite à la prudence lors du test du produit en ne mettant pas d'informations confidentielles, ni vos identifiants et mot de passe habituels.**

## ✨ Fonctionnalités clés

* **💬 Interface de Chat Intuitive** : Design épuré inspiré de ChatGPT/Claude/Gemini pour une prise en main immédiate.
* **🧩 Gestion de Session Intelligente** : Utilisation du `sessionStorage` pour conserver la conversation active lors d'un rafraîchissement (F5), tout en réinitialisant l'accueil lors d'une nouvelle connexion.
* **📱 Design Responsive** : Interface "Mobile-First" avec une barre latérale (Sidebar) coulissante et un Header adaptatif.
* **🔐 Authentification Complète** : Protection des routes, gestion des Tokens JWT et persistance de l'utilisateur.
* **🖌️ Rendu Markdown** : Support complet du formatage (gras, listes, titres, blocs de code) pour les réponses de l'IA via `react-markdown`.
* **✨ Animations Premium** : Transitions soignées avec **Framer Motion** pour les messages et les menus.

## 🛠️ Stack Technique

* **React 18** (Vite.js)
* **Tailwind CSS** (Design et mise en page)
* **Framer Motion** (Animations et micro-interactions)
* **React Router Dom** (Navigation et protection des routes)
* **React Icons** (Iconographie Lucide & FontAwesome)
* **React Markdown** (Interprétation du texte IA)

## 🚀 Installation et Lancement

1.  **Cloner le dépôt** :
    ```bash
    git clone [https://github.com/votre-compte/votre-repo-frontend.git](https://github.com/votre-compte/votre-repo-frontend.git)
    cd votre-repo-frontend
    ```

2.  **Installer les dépendances** :
    ```bash
    npm install
    ```

3.  **Configurer les variables d'environnement** :
    Créez un fichier `.env` à la racine du projet :
    ```env
    VITE_API_URL=[https://votre-api-backend.onrender.com/api](https://votre-api-backend.onrender.com/api)
    ```

4.  **Lancer le projet en mode développement** :
    ```bash
    npm run dev
    ```

## 🧠 Défis Techniques Relevés

* **Résolution des "Race Conditions"** : Mise en place d'un délai de sécurité (`setTimeout`) lors de la création de chat pour compenser la latence des bases de données sur hébergement gratuit (Render).
* **Synchronisation des types de données** : Gestion de la persistance via `sessionStorage` en corrigeant les conflits de types (String vs Number) pour assurer l'affichage du titre au rafraîchissement.
* **Optimisation de l'Espace** : Intégration de RegEx côté Backend pour formater les réponses et garantir un affichage aéré et structuré dans le Frontend.

---

*Développé avec passion dans le cadre d'un projet Fullstack Portfolio.*
