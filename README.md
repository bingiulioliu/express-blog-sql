repo: `express-blog-sql`


### Esercizio

Prendiamo le API precedentemente create per il vostro blog ed aggiungiamo la persistenza tramite la connessione a un DB

**Milestone 1**

- Importiamo il db in allegato su MySQL Workbench
- Installiamo il client **mysql2** con `pnpm add mysql2` nell’app Express
- Creiamo un file di configurazione per connettere il database
- Inseriamo un console.log nella logica di connessione e proviamo ad avviare l’applicazione per verificare che non ci siano errori.

Date sempre un'occhiata alla documentazione https://sidorares.github.io/node-mysql2/docs e ricordate che noi utilizziamo la versione con le Promise. 📖 

**Milestone 2**

- Facciamo sì che l’API di INDEX restituisca la lista di post recuperata dal database in formato JSON
- Verifichiamo su Postman che la risposta sia corretta

**Milestone 3** 

- Facciamo sì che l’API di DESTROY permetta di eliminare un post dal database
- Verifichiamo su Postman che la chiamata non dia errore e risponda 204
- Verifichiamo su MySQL Workbench che il post venga effettivamente rimosso

**Milestone 4**

- Facciamo sì che l’API di SHOW restituisca il post desiderato in formato JSON
- Verifichiamo su Postman che la risposta sia corretta
- Ricordate che vanno  mostrato anche i relativi tag (quindi una sola query non basta)

**Bonus:**

- Implementare una delle più ostiche delle CRUD, ovvero la CREATE

**Consigli**
Nel live coding di oggi abbiamo visto il codice messo direttamente nel controller. Questo non vuol dire che utilizzare dei middleware o delle funzioni di supporto sia sbagliato, anzi rende il codice più semplice da leggere. 🧠 
Visto che la libreria `mysql2` lavora con le Promise è il caso di iniziare a diventare bravi ad utilizzare le `async/await` spiegate oggi. ⏲️ 

