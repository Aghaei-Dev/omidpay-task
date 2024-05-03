import styled from '@emotion/styled'

type Props = {
  isChecked: boolean
  setIsChecked: React.Dispatch<React.SetStateAction<any>>
}
export default function CheckBox({ isChecked, setIsChecked }: Props) {
  const changeHandler = () => {
    setIsChecked((prev) => (isChecked = !prev))
  }
  return (
    <Wrapper
      style={{
        borderColor: isChecked ? 'var(--primary-500)' : 'var(--text-500)',
      }}
    >
      <input type='checkbox' checked={isChecked} onChange={changeHandler} />
      <div className='checkmark'></div>
    </Wrapper>
  )
}
const Wrapper = styled.label`
  position: relative;
  cursor: pointer;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  user-select: none;
  border: 2px solid var(--text-500);
  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  .checkmark {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .checkmark:after {
    content: '';
    position: absolute;
    top: 25%;
    left: 25%;
    background-color: var(--primary-500);
    width: 50%;
    height: 50%;
    border-radius: 50%;
    transform: scale(0);
    transition: 100ms ease;
  }

  input:checked ~ .checkmark:after {
    transform: scale(1);
  }
`
