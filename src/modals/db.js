import Dexie from 'dexie';
import { populate } from './populate';

export const db = new Dexie('owl-reading');
db.version(1).stores({
  documents: '++id, title, lastOpen, isComplete, created, *tags',
});

db.on('populate', populate);
db.open();

export function deleteArticle(id) {
  return db.transaction('rw', this.documents, () => {
    db.documents.delete(id);
  });
}

export function resetDatabase() {
  return db.transaction('rw', db.documents, async () => {
    await Promise.all(db.tables.map(table => table.clear()));
    await populate();
  });
}
