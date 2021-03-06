import Dexie from 'dexie'
import { populate } from './populate'
import { v4 as uuidv4 } from 'uuid'
import dayjs from 'dayjs'
import { supermemo } from 'supermemo'

const schema = {
  docsMetaData: 'id, title, lastOpen, isComplete, created, *tags, contentPreview',
  docsContent: 'id',
  flashcards: 'id, keyword, translation, efactor, dueDate',
  trash: 'id',
}

export const db = new Dexie('owl-reading')

export function initDB() {
  db.version(1).stores(schema)
  db.on('populate', populate)
  return db.open()
}

export function getAllTags() {
  return db.docsMetaData.orderBy('tags').uniqueKeys()
}

export function getFilteredDocs() {
  return new Promise((resolve, reject) => {
    try {
      db.docsMetaData
        .where('isComplete')
        .equals(0)
        .sortBy('lastOpen')
        .then(docs => resolve(docs))
    } catch (error) {
      reject(error)
    }
  })
}

export function getDocById(id) {
  return Promise.all([
    db.docsMetaData.get(id),
    db.docsContent.get(id),
  ])
}

export function deleteDocument(id) {
  return db.transaction(
    'rw',
    db.docsMetaData,
    db.docsContent,
    db.trash,
    async () => {
      const trashId = await db.trash.add({
        id: uuidv4(),
        docsMeta: await db.docsMetaData.get(id),
        docsContent: await db.docsContent.get(id),
      })
      db.docsContent.where({ id }).delete()
      db.docsMetaData.delete(id)

      return trashId
    })
}

export function restoreDocument(id) {
  return db.transaction(
    'rw',
    db.trash,
    db.docsMetaData,
    db.docsContent,
    async () => {
      const restore = await db.trash.get(id)
      await db.docsMetaData.add(restore.docsMeta)
      await db.docsContent.add(restore.docsContent)
      await db.trash.delete(restore.id)
      return restore.id
    })
}

export function resetDatabase() {
  return db.transaction('rw', db.docsMetaData, db.docsContent, async () => {
    await Promise.all(db.tables.map(table => table.clear()))
    await populate()
  })
}

export function saveFlashcard(flashcard) {
  const { keyword } = flashcard
  const isRecordExists = async () => await db.flashcards.where('keyword').equals(keyword).count()
  return new Promise((resolve, reject) => {
    isRecordExists()
      .then(count => {
        if (count) {
          reject(new Error(`${keyword} already added.`))
        } else {
          resolve(db.flashcards.bulkAdd([
            {
              ...flashcard,
              id: uuidv4(),
              isFrontSide: true,
            },
            {
              ...flashcard,
              id: uuidv4(),
              isFrontSide: false,
            }
          ]))
        }
      })
  })
}

export function updateFlashcard(flashcard) {
  const { id, ...rest } = flashcard
  return db.flashcards.update(id, rest)
}

export function getDueFlashcards() {
  const today = dayjs(Date.now()).format('YYYY-MM-DD')
  return db.flashcards.where('dueDate').belowOrEqual(today).sortBy('efactor')
}

export function practice(flashcard, grade) {
  const { interval, repetition, efactor } = supermemo(flashcard, grade)

  const dueDate = dayjs(Date.now()).add(interval, 'day').format('YYYY-MM-DD')

  updateFlashcard({ ...flashcard, interval, repetition, efactor, dueDate })
}

initDB()
