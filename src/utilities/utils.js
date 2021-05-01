const DB_NAME = 'stock_symbols';
const DB_VERSION = 1;
let DB = null;

export default {
    async getDb() {
        return new Promise((resolve, reject) => {
            if (DB) {
                resolve(DB);
            }
            let request = window.indexedDB.open(DB_NAME, DB_VERSION);

            request.onerror = e => {
                console.log('Error opening db', e);
                reject('Error');
            };

            request.onsuccess = e => {
                DB = e.target.result;
                resolve(DB);
            };

            request.onupgradeneeded = e => {
                let db = e.target.result;
                db.createObjectStore("exchanges", {autoIncrement: true, keyPath: 'id'});
            };
        });
    },
    async getExchanges() {
        let db = await this.getDb();

        return new Promise(resolve => {
            let trans = db.transaction(['exchanges'], 'readonly');
            trans.oncomplete = () => {
                resolve(res);
            };

            let store = trans.objectStore('exchanges');
            let res = [];

            store.openCursor().onsuccess = e => {
                let cursor = e.target.result;
                if (cursor) {
                    res.push(cursor.value)
                    cursor.continue();
                }
            };
        });
    },
    async addExchanges(exchange) {
        let db = await this.getDb();

        return new Promise(resolve => {
            let trans = db.transaction(['exchanges'],'readwrite');
            trans.oncomplete = () => {
                resolve();
            };

            let store = trans.objectStore('exchanges');
            store.put(exchange);
        });
    }
}
