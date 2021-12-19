This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## smp - coding challange

Entwicklungsserver starten:

```bash
npm run start
```

Applikation mit folgendem Link öffnen: [http://localhost:3000](http://localhost:3000)

## Anforderungen - Swiss Media Partners

- Programmiersprache HTML, PHP, Typescript, Javascript frei wählbar
- Eigenständiges HTML oder npm projekt welches mit npm start gestartet werden kann oder PHP etc.
- CSS/Layout Frameworks frei wählbar oder Vanilla CSS/Javascript
- README.md Datei mit der Beschreibung wie die Seite zu nutzen ist und Auflistung der Funktionalitäten/was es kann
- Als ZIP per E-Mail oder Github Repo.

## Funktionalitäten:

- Benutzername Feld mit Verifikation, dass es eine E-Mail-Adresse ist
- Passwort Feld
- Weitere Felder (falls SignUp Form)

Weitere Funktionen nach eigenem Ermessen.

## Umsetzung:

### Serverseitig

> Es können neue User angelegt werden. Die User werden dann in der data/users.json Datei abgelegt.

##### Endpoints

- api/users/newusers
- api/users/login

### Clientseitig

> Es können neue User registriert werden. Die Daten werden geprüft und bei korrektem Login wird ein JSON Webtoken zurückgegeben (siehe Konsole - ACHTUNG: ist nicht im Browser Storage implementiert)

##### Routes

- http://localhost:3000/
- http://localhost:3000/registrieren

### Packages/CLI

- Nextjs mit Typscript (Typescript strict Mode)
- Material-ui core
- Material-ui icon
- axios
- jsonwebtoken
- bcrypt
- React-Hook-Form
- Notistack
