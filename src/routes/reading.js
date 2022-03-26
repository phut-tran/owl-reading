import { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { db } from '../modals/db'
import { Editor, EditorState, convertFromRaw } from 'draft-js'
import 'draft-js/dist/Draft.css'

function Reading() {
  const { docId } = useParams()

  const editor = useRef(null)
  const [title, setTitle] = useState('')
  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty()
  )

  useEffect(() => {
    if (docId) {
      db.docsMetaData.get(docId)
        .then(docMeta => { setTitle(docMeta.title) })
        .catch(error => { console.log(error) })

      db.docsContent.get(docId)
        .then(docContent => {
          const content = convertFromRaw(docContent.content)
          const contentState = EditorState.createWithContent(content)
          setEditorState(contentState)
        })
    }
  })
  return (
    <Box sx={{ maxWidth: '560px', margin: 'auto' }}>
      <Typography variant='h1' sx={{ fontSize: 32 }}>{title}</Typography>
      <Editor
        readOnly
        editorState={editorState}
        ref={editor} />
    </Box>
  )
}

export default Reading
