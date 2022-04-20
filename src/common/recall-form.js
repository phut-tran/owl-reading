import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import translate from 'translate'
import randomWords from 'random-words'
import { getEncourageFeedback, gradeReproduceCheck, shuffle } from '../utils'
import { practice } from '../modals/db'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import Stack from '@mui/material/Stack'
const wrongAnsers = 1

export default function RecallForm({ card, increaseStep }) {
  const { keyword, isFrontSide, translation } = card
  const [answers, setAnswers] = useState([])
  const [isFormSubmit, setIsFormSubmit] = useState(false)
  const [answerState, setAnswerState] = useState({ isCorrect: false, answer: null })

  useEffect(() => {
    async function getTranslations() {
      const { langCode } = JSON.parse(window.localStorage.getItem('owl-reading-settings'))
      const baseArr = Array(wrongAnsers).fill(null)
      const answers = await Promise.all(baseArr.map(async () => {
        // Prevent the case where the random word indentical to the correct answer
        let randomWord
        do {
          randomWord = await translate(randomWords(), langCode)
        } while (randomWord === translation)
        return randomWord.toLowerCase()
      }))

      const shuffleAnsers = shuffle([...answers, translation])
      setAnswers(shuffleAnsers)
    }

    if (!isFrontSide) {
      getTranslations()
    }

  }, [isFrontSide, translation])

  function handleFormSubmit(event) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)

    if (isFormSubmit) {
      setIsFormSubmit(false)
      increaseStep()
      event.target.reset()
    } else {
      saveProgress(data)
      setIsFormSubmit(true)
    }
  }

  function saveProgress(data) {
    if (isFrontSide) {
      const reproduce = data.get('reproduce-check')
      const grade = gradeReproduceCheck(keyword, reproduce)
      practice(card, grade)
      setAnswerState({
        isCorrect: reproduce === keyword,
        answer: reproduce === keyword ? null : keyword,
      })
    } else {
      const pickedAnswer = data.get('recognize-check')
      const grade = pickedAnswer === translation ? 5 : 0
      practice(card, grade)
      setAnswerState({
        isCorrect: grade === 5,
        answer: grade === 5 ? null : translation
      })
    }
  }

  const form = isFrontSide ?
    (<FormControl>
      <FormLabel
        name='reproduce-check'
        sx={{ fontSize: '1.5rem', mb: 4 }} >
        <strong style={{ textTransform: 'capitalize' }}>{translation}</strong> in English
      </FormLabel>
      <TextField name='reproduce-check' label='Answer' variant='outlined' />
    </FormControl>) :

    (<FormControl>
      <FormLabel
        sx={{ fontSize: '1.5rem', mb: 4 }} >
        <strong style={{ textTransform: 'capitalize' }}>{keyword}</strong> mean
      </FormLabel>
      <RadioGroup
        aria-labelledby='reconize-check'
        name='recognize-check' >
        {answers.map(answer => (
          <FormControlLabel key={answer} value={answer} control={<Radio />} label={answer} />
        ))}
      </RadioGroup>
    </FormControl>)

  const { isCorrect, answer } = answerState
  return (
    <Box
      noValidate
      component='form'
      autoComplete='off'
      onSubmit={handleFormSubmit}
      sx={{
        m: 1,
        maxWidth: 960,
      }}>
      <Box sx={{ minHeight: 150 }}>
        {form}
      </Box>
      <Stack maxWidth='100%' direction='row' justifyContent='flex-end' >
        <Button
          type='submit'
          fullWidth
          variant={isFormSubmit ? 'outlined' : 'contained'}
          sx={{ maxWidth: 150, mt: 4 }} >
          {isFormSubmit ? 'Next' : 'Check'}
        </Button>
      </Stack>
      {isFormSubmit ? <FeedbackAnsers isCorrect={isCorrect} answer={answer} /> : null}
    </Box>
  )
}

function FeedbackAnsers({ isCorrect, answer }) {
  const severity = isCorrect ? 'success' : 'warning'
  const title = isCorrect ? getEncourageFeedback() : 'Correct answer'
  return (
    <Alert severity={severity} sx={{ mt: 3, mb: 3 }}>
      <AlertTitle>{title}</AlertTitle>
      <strong>{answer}</strong>
    </Alert>
  )
}
