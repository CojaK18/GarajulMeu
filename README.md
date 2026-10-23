# Garajul Meu

Aplicația permite gestionarea vehiculelor dintr-un garaj personal.

Am folosit HTML5 pentru structură, CSS pentru design și JavaScript pentru funcționalități.

API-ul folosit este: https://6adb407c3b7e90b8208f964b.mockapi.io/vehicule

Prin metoda GET, aplicația încarcă și afișează vehiculele existente.

Prin metoda POST, utilizatorul poate adăuga un vehicul nou, folosind date în format JSON.

Prin metoda DELETE, utilizatorul poate șterge vehiculele din garaj.

La cererile HTTP verific `response.ok` și afișez mesaje când apare o eroare.

GET folosește în mod normal răspunsul 200, iar POST pentru creare poate returna 201. Erorile 4xx și 5xx sunt tratate prin mesaje afișate utilizatorului.

CORS este gestionat de MockAPI, care permite cererile aplicației dintr-o altă origine.

Interfața este responsive și se adaptează ecranelor de telefon prin CSS media queries.

Datele sunt păstrate în MockAPI și pot fi accesate prin API-ul REST.