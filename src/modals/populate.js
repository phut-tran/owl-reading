import { db } from './db'
import * as prologue from './sample-reading/pirate-cinema-prologue.json'
import * as chapterOne from './sample-reading/pirate-cinema-chap-one.json'
import { v4 as uuidv4 } from 'uuid'

const [prologueId, chapterOneId] = Array(2).fill(null).map(_ => uuidv4())

export async function populate() {
  await db.docsContent.bulkAdd([
    {
      id: prologueId,
      content: prologue,
    },
    {
      id: chapterOneId,
      content: chapterOne,
    },
  ])

  await db.docsMetaData.bulkAdd([
    {
      id: prologueId,
      title: 'Prologue: A star finds true love/A knock at the door/A family ruined/On the road/Alone',
      isComplete: 0,
      created: new Date(),
      contentPreview: 'I will never forget the day my family got cut off from the Internet. I was hiding in my room as I usually did after school let out, holed up',
      tags: ['pirate-cinema', 'sample-reading'],
      lastOpen: new Date(),
    },
    {
      id: chapterOneId,
      title: 'Chapter 1: Alone no more/The Jammie Dodgers/Posh digs/Abstraction of Electricity',
      isComplete: 0,
      created: new Date(),
      contentPreview: 'My "adventure" wasn\'t much fun after that. I was smart enough to find a shelter for runaways run by a church in Shoreditch, and I checked myself in that night,',
      tags: ['pirate-cinema', 'sample-reading'],
      lastOpen: new Date(),
    },
  ])
}
