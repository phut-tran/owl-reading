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

export function deleteDocument(metaId) {
  return this.transaction('rw', this.docsMetaData, this.docsContent, () => {
    this.docsContent.where({ metaId }).delete()
    this.docsMetaData.delete(metaId)
  })
}

export function resetDatabase() {
  return db.transaction('rw', db.docsMetaData, db.docsContent, async () => {
    await Promise.all(db.tables.map(table => table.clear()))
    await populate()
  })
}
