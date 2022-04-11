import { useEffect, useState } from 'react'

export function useTextSelection() {
  const [text, setText] = useState('')

  function handleDbClick() {
    const selection = window.getSelection().toString().trim()
    setText(selection)
  }

  useEffect(() => {
    document.addEventListener('dblclick', handleDbClick)
    return function cleanup() {
      document.removeEventListener('dblclick', handleDbClick)
    }
  }, [])

  return [text, setText]
}
