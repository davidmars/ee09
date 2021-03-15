## Langues

### Les drapeaux
Les drapeaux associés aux langues sont des images.
Vous devez donc définir ces images pour chaque langue.

Pour vous simplifier la tâche, la librairie [svg-country-flags](https://www.npmjs.com/package/svg-country-flags) est installée via le `package.json`.
Cependant, pour des raisons de performance, on ne charge pas tous les drapeaux de la planète.

Nous vous coonseillons donc de procéder ainsi:

```javascript
//ajout de la langue française
window.$db.settings.addLanguage(
    "fr",
    "Français",
    require("svg-country-flags/svg/fr.svg")
);
```