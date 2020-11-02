# simpleSSLserver

I dag skal vi lave en simpel express-server om til en https-server, altså implementere SSL i en applikation.

## Step 1
Første skridt er at downloade OpenSSL på jeres computer.
Hvis du har MacOS kan det downloades med homebrew med "brew install openssl". Hvis du har Windows prøv at følge denne guide: https://tecadmin.net/install-openssl-on-windows/

## Step 2
Da I nu har arbejdet med express før, prøver vi at lave vores projekt for bunden. Åbn en et nyt projekt i jeres IDE og lav en app.js fil.
Skriv derefter `npm init -y` og installér express med `npm install express --save`.

## Step 3
Vi skal bruge nogle modules for at lave en SSL-server. I skal derfor require 'express', 'https', 'path' og 'fs' og gemme dem i en constant.

## Step 4
Som ved en normal express-applikation skal vi have defineret vores rute. Skriv derfor `app.use('/', (req, res) => {<En eller anden respons til serveren>})`.

## Step 5
Nu skal i lave jeres SSL-server. Lav en constant der hedder sslServer som i sætter til at være `= https.createServer({}, app)`. Den skal indeholde 2 properties; "key" og "cert", som kommer til at være vores private key og certifikatet. Vi starter med at sætte dem som tomme.

## Step 6
Til sidst skal i sætte jeres sslServer til at lytte på en port, ligesom vi gør med alle andre servere. For standardisering bedes i vælge port `3443`

## Step 7
Nu skal vi generere jeres private key. Først lav en mappe hvori vi skal have jeres private key og certifikat. Dette kan gøres ved at skrive `mkdir <folder name>` i jeres terminal. Diriger derefter om til denne folder og skriv `openssl genrsa -out key.pem` i terminalen. Hvis alt går som det skal, burde i nu have en private key .pem fil i jeres mappe. "genrsa" betyder vi genererer en private key baseret på RSA algoritmen og "-out key.pem" er blot hvad outputtet skal hedde.
  
## Step 8
Nu skal vi lave en certificate signing request. Det vil sige vi skal bede en autoritet om at verificerer os med en digital identitet. Hvis I kan huske fra undervisningen, er det normalt en third-party autoritet der verificerer sådan en request, men i dag bruger vi blot os selv som autoritet. Det er vigtigt at huske at man under professionelle forhold ikke vil få noget ud af at registerere sig hos sig selv!

I kan lave en certificate signing request ved at skrive `openssl req -new -key key.pem -out csr.pem`. Dette betyder vi requester et nyt certifikat baseret på vores private key i key.pem.

Hvis alt går rigtig burde I blive spurgt om en masse information, der skal identificerer jeres digitale identitet. I behøver ikke at udefylde dem alle, men for eksempel kan i skrive "DK" i Country Code og "CBS" i Organization. Resten kan springes over ved at trykke enter. I burde nu have en csr.pem fil i jeres folder.

## Step 9
Nu skal vi generere jeres certifikat. Skriv `openssl x509 -req -days 365 -in csr.pem -signkey key.pem -out cert.pem`. "x509" er certifikat formattet, "-days" er hvor lang tid det er gyldigt, "-in" er hvilken request det er baseret på og "-signkey" er jeres privatekey som det er baseret på. Efter dette, burde i have et SSL certifikat i jeres folder.

## Step 10
Vend nu tilbage til jeres app.js. I de to properties I lavede tidligere, skal vi nu indsætte vores private key og vores certifikat. Dette gøres ved at skrive `fs.readFileSync(path.join(__dirname, 'cert', 'key.pem'))` i jeres key-property og `fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem'))` i jeres cert-property. Dette fortæller blot jeres program hvorfra den skal læse jeres private key og certifikat. 

## Step 11
I burde nu kunne start serveren og går ind på jeres side i browseren. Hvis I lægger mærke til det, vil I ikke få nogen forbindelse ved localhost:<jeres port> fordi det vil antage en normal http-forbindelse. I skal derimod skrive https://localhost:<jeres port> for at oprette en SSL-forbindelse.
  
Det er muligt at jeres browser ikke vil tillade dette, da den har nogle trusted authorities den kun tillader. Hvis I har chrome, kan i åbne en ny fane og skrive chrome://flags og derefter søge på "Allow invalid certificates for resources loaded from localhost" og trykke enable. Dette vil kræve en genstart af jeres browser.

Tillykke! I har nu lavet jeres første SSL-server. 


## Aflevering
1. Implementere det i jeres banking applikation.
2. Gem jeres projekt som en <jeres_navn>.zip fil, og aflever. Vær sikker på at i kører serveren på port `3443` da det vil gøre det lettere for os at køre.



