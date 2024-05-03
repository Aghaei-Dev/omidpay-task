import styled from '@emotion/styled'
import { CheckBox } from './'
import { useState, useEffect } from 'react'
import { useAppSelector } from '../hooks'

type Props = {
  name: string
}

export default function SingleCity({ name }: Props) {
  const { query } = useAppSelector((store) => store.main)

  const [isChecked, setIsChecked] = useState(false)

  const toggleHandler = () => {
    setIsChecked((prev) => (prev = !isChecked))
  }
  useEffect(() => {
    setIsChecked(false)
  }, [query])

  return (
    <Wrapper className='fixed-width ' onClick={toggleHandler}>
      <CheckBox isChecked={isChecked} setIsChecked={setIsChecked} />
      <p>{name}</p>
    </Wrapper>
  )
}
const Wrapper = styled('article')(() => ({
  background: 'white',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderBottom: '2px solid var(--text-50)',
  padding: '.75rem 1rem',
  fontWeight: '500',
  color: 'var(--text-500)',
  userSelect: 'none',
  cursor: 'pointer',
}))
