/**
 * Mostra un popup dinamico
 * @param {string} titolo - Il titolo (es. "Ops!")
 * @param {string} messaggio - Il corpo del testo
 * @param {Object} opzioni - Testi e funzioni per i pulsanti
 */
function mostraMessaggio(titolo, messaggio, opzioni) {
    const overlay = document.getElementById('vr-overlay');
    
    overlay.querySelector('h3').innerText = titolo;
    overlay.querySelector('p').innerText = messaggio;
    
    const btnNo = overlay.querySelector('.btn-no');
    btnNo.innerText = opzioni.textNo || "Annulla";
    btnNo.onclick = () => {
        if (opzioni.actionNo) opzioni.actionNo();
        else overlay.style.display = 'none';
    };

    const btnYes = overlay.querySelector('.btn-yes');
    btnYes.innerText = opzioni.textYes || "Conferma";
    btnYes.onclick = () => {
        opzioni.actionYes();
        overlay.style.display = 'none';
    };

    overlay.style.display = 'flex';
}

/**
 * 1. Prende tutti i parametri dall'URL e li restituisce come oggetto.
 * Esempio: ?map=arena&user=123 -> { map: "arena", user: "123" }
 */
const getUrlParams = () => {
    const params = new URLSearchParams(window.location.search);
    const vars = {};
    params.forEach((value, key) => {
        vars[key] = value;
    });
    return vars;
};

/**
 * 2. Recupera tutti i dati dal LocalStorage e li restituisce come oggetto.
 */
const getStorageData = () => {
    const data = {};
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        data[key] = localStorage.getItem(key);
    }
    return data;
};

/**
 * 3. Salva, Rimuove o Pulisce lo Storage.
 * @param {string} action - 'save', 'delete' o 'clear'
 * @param {string} key - La chiave del dato
 * @param {string} value - Il valore da salvare
 */
const manageStorage = (action, key = null, value = null) => {
    switch (action) {
        case 'save':
            if (key && value) localStorage.setItem(key, value);
            break;
        case 'delete':
            if (key) localStorage.removeItem(key);
            break;
        case 'clear':
            localStorage.clear();
            break;
        default:
            console.warn("Azione storage non valida");
    }
};

 const log = (msg, color = "#00ff00") => {
    if(!getUrlParams().debug) return;

    const overlay = document.getElementById('debug-overlay');
    const content = document.getElementById('debug-content');
    overlay.style.display = 'block';
    const entry = document.createElement('div');
    entry.style.color = color;
    entry.innerHTML = `<strong>[${new Date().toLocaleTimeString()}]</strong> ${msg}`;
    content.insertBefore(entry, content.firstChild);
}

window.log = log;