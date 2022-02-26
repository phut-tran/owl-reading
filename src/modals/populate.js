import { db } from './db'
import * as prologue from './sample-reading/pirate-cinema-prologue.json'
import * as chapterOne from './sample-reading/pirate-cinema-chap-one.json'

export async function populate() {
  await db.docsContent.bulkAdd([
    {
      id: 1,
      content: prologue,
    },
    {
      id: 2,
      content: chapterOne,
    },
  ])

  await db.docsMetaData.bulkAdd([
    {
      id: 1,
      title: 'Prologue: A star finds true love/A knock at the door/A family ruined/On the road/Alone',
      isComplete: false,
      created: new Date(),
      docsContentId: '1',
      contentPreview: 'I will never forget the day my family got cut off from the Internet. I was hiding in my room as I usually did after school let out, holed up',
      tags: ['pirate-cinema', 'sample-reading'],
    },
    {
      id: 2,
      title: 'Chapter 1: Alone no more/The Jammie Dodgers/Posh digs/Abstraction of Electricity',
      isComplete: false,
      created: new Date(),
      docsContentId: '2',
      contentPreview: 'My "adventure" wasn\'t much fun after that. I was smart enough to find a shelter for runaways run by a church in Shoreditch, and I checked myself in that night,',
      tags: ['pirate-cinema', 'sample-reading'],
    },
  ])
}
