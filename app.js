
const API_URL = 'https://6adb407c3b7e90b8208f964b.mockapi.io/vehicule';

const lista = document.querySelector('#lista-vehicule');
const status = document.querySelector('#status');

function creeazaElementVehicul(vehicul) {
    const element = document.createElement('li');

    const text = document.createElement('span');
    text.textContent =
        `${vehicul.marca} ${vehicul.model} - ${vehicul.an} (${vehicul.tip})`;

    const buton = document.createElement('button');
    buton.type = 'button';
    buton.textContent = 'Șterge';
    buton.classList.add('sterge-vehicul');
    buton.dataset.id = vehicul.id;

    element.append(text, buton);

    return element;
}

async function incarcaVehicule() {
    status.textContent = 'Se încarcă vehiculele...';

    try {
        const raspuns = await fetch(API_URL);

        if (!raspuns.ok) {
            throw new Error('Eroare HTTP: ' + raspuns.status);
        }

        const vehicule = await raspuns.json();

        lista.replaceChildren();

        if (vehicule.length === 0) {
            status.textContent = 'Garajul este gol.';
            return;
        }

        vehicule.forEach(vehicul => {
            lista.appendChild(creeazaElementVehicul(vehicul));
        });

        status.textContent = `Ai ${vehicule.length} vehicule în garaj.`;

    } catch (eroare) {
        status.textContent = 'Nu am putut încărca vehiculele.';
        console.error(eroare);
    }
}

incarcaVehicule();

const formular = document.querySelector('#formular-vehicul');
const mesajFormular = document.querySelector('#mesaj-formular');

formular.addEventListener('submit', async (event) => {
    event.preventDefault();

    const date = new FormData(formular);

    const vehiculNou = {
        tip: date.get('tip'),
        marca: date.get('marca').trim(),
        model: date.get('model').trim(),
        an: Number(date.get('an'))
    };

    if (!vehiculNou.marca || !vehiculNou.model) {
        mesajFormular.textContent = 'Completează marca și modelul.';
        return;
    }

    mesajFormular.textContent = 'Se salvează vehiculul...';

    try {
        const raspuns = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(vehiculNou)
        });

        const rezultat = await raspuns.json();

        if (!raspuns.ok) {
            throw new Error(rezultat.error || 'HTTP ' + raspuns.status);
        }

        lista.appendChild(creeazaElementVehicul(rezultat));

        status.textContent = `Ai ${lista.children.length} vehicule în garaj.`;
        mesajFormular.textContent = 'Vehicul adăugat cu succes!';

        formular.reset();

    } catch (eroare) {
        mesajFormular.textContent = 'Eroare la salvare: ' + eroare.message;
        console.error(eroare);
    }
});

lista.addEventListener('click', async (event) => {
    const buton = event.target.closest('.sterge-vehicul');

    if (!buton || !lista.contains(buton)) {
        return;
    }

    const id = buton.dataset.id;
    buton.disabled = true;

    status.textContent = 'Se șterge vehiculul...';

    try {
        const raspuns = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });

        if (!raspuns.ok) {
            throw new Error('HTTP ' + raspuns.status);
        }

        buton.closest('li').remove();

        const numar = lista.children.length;

        status.textContent = numar === 0
            ? 'Garajul este gol.'
            : `Ai ${numar} vehicule în garaj.`;

    } catch (eroare) {
        buton.disabled = false;
        status.textContent = 'Eroare la ștergere: ' + eroare.message;
        console.error(eroare);
    }
});
