import Dexie from 'dexie'
import { populate } from './populate'

export const db = new Dexie('owl-reading')

export function initDB() {
  db.version(1).stores({
    docsMetaData: 'id, title, lastOpen, isComplete, created, *tags, contentPreview',
    docsContent: 'id',
    trash: 'id',
  })

  db.on('populate', populate)

  db.open().catch(function (e) {
    console.error('Error opening database: ' + e.stack || e)
  })
}

export function getAllTags() {
  return db.docsMetaData.orderBy('tags').uniqueKeys()
}

export function getFilteredDocs() {
  return db.docsMetaData.where('isComplete').equals(0).sortBy('lastOpen')
}

export function getDocById(id) {
  return Promise.all([
    db.docsMetaData.get(id),
    db.docsContent.get(id),
  ])
}

export function deleteDocument(id) {
  db.transaction(
    'rw',
    db.docsMetaData,
    db.docsContent,
    db.trash,
    async () => {
      const trashId = db.trash.add({
        docsMeta: await db.docsMetaData.get(id),
        docsContent: await db.docsContent.get(id),
      })
      db.docsContent.where({ id }).delete()
      db.docsMetaData.delete(id)

      return trashId
    })
}

export function restoreDocument(id) {
  db.transaction(
    'rw',
    db.trash,
    db.docsMetaData,
    db.docsContent,
    async () => {
      const restore = await db.trash.get(id)
      db.docsMetaData.add(restore.docsMeta)
      db.docsContent.add(restore.docsContent)
      db.trash.delete(restore.id)
    })
}

export function resetDatabase() {
  return db.transaction('rw', db.docsMetaData, db.docsContent, async () => {
    await Promise.all(db.tables.map(table => table.clear()))
    await populate()
  })
}
