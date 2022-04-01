# Het project opstarten
[![Netlify Status](https://api.netlify.com/api/v1/badges/999a2a2d-a66d-411b-8acf-cbc5c5831d3e/deploy-status)](https://app.netlify.com/sites/mvo-fluvius/deploys)

## Online versie
Deze web applicatie is online te vinden op [online te vinden op Netlify](https://mvo-fluvius.netlify.app/).

De inlog gegevens voor de authenticatie zijn:
```
...
```

## Lokale versie

Om een lokale versie van de applicatie voert men na het clonen van de repository eerst volgend commando uit om alle packages te intaleren:
```
yarn install
```

... backend ...


Indien de vorige stappen goed uitgevoert zijn kan men een lokale versie draaien via:
```
yarn start
```

De web app draait nu op [http://localhost:3000](http://localhost:3000) en kan in de browser bekeken worden.

Ook hier zijn de inlog gegevens:
```
...
```

### Lokale PWA
Om het PWA aspect van de web app lokaal te testen moet er een build worden gemaakt, dit kan via:
```
yarn build
```

Een lokale versie kan dan opgestart worden via:
```
yarn serve build
```
### Testen
De testen kunnen uitgevoert worden via:
```
yarn test
```