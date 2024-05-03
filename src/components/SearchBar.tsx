import { ChangeEvent, useEffect, useState } from 'react'

import styled from '@emotion/styled'

import { Arrow, Cancel, Search } from '../assets/icons'
import { useAppDispatch, useAppSelector } from '../hooks'
import {
  changeHandler,
  changePlaceholderHandler,
} from '../features/main/mainSlice'

export default function SearchBar() {
  const { query, placeholder } = useAppSelector((store) => store.main)
  const dispatch = useAppDispatch()

  const [isFocused, setIsFocused] = useState(false)

  const focusInHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.type !== 'text') {
      return
    }
    dispatch(changePlaceholderHandler('جستوجو'))
    setIsFocused(true)
  }
  const focusOutHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.type !== 'text') {
      return
    }
    dispatch(changePlaceholderHandler('جستوجو در شهر تهران'))
    setIsFocused(false)
  }
  useEffect(() => {
    addEventListener('focusin', focusInHandler)
    addEventListener('focusout', focusOutHandler)

    return () => {
      removeEventListener('focus', focusInHandler)
      addEventListener('focusout', focusOutHandler)
    }
  }, [])

  return (
    <Wrapper>
      <div className='searchbar-wrapper'>
        <div className='searchbar-left'>
          <div className='search-icon-wrapper'>
            <span className='search-icon searchbar-icon'>
              {isFocused ? <Arrow /> : <Search />}
            </span>
          </div>
        </div>

        <div className='searchbar-center'>
          <div className='searchbar-input-spacer'></div>

          <input
            type='text'
            className='searchbar-input'
            name='q'
            placeholder={placeholder}
            value={query}
            onChange={(e) => dispatch(changeHandler(e.target.value))}
          />
        </div>

        {query && (
          <div
            className='searchbar-right'
            onClick={() => dispatch(changeHandler(''))}
          >
            <span className='voice-search '>
              <Cancel />
            </span>
          </div>
        )}
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  font-size: 14px;
  direction: rtl;

  color: #202124;
  display: flex;
  z-index: 3;
  height: 44px;
  background: var(--bg);

  box-shadow: none;
  border-radius: var(--radius);
  margin: 0 auto;
  width: 100%;

  :hover {
    border-color: rgba(223, 225, 229, 0);
  }

  .searchbar-wrapper {
    flex: 1;
    display: flex;
    padding: 5px 8px 0 14px;
  }

  .searchbar-left {
    font-size: 14px;
    font-family: arial, sans-serif;
    color: #202124;
    display: flex;
    align-items: center;
    padding-left: 13px;
    margin-top: -5px;
  }

  .search-icon-wrapper {
    margin: auto;
  }

  .search-icon {
    margin-top: 3px;
    color: #9aa0a6;
    height: 20px;
    line-height: 20px;
    width: 20px;
  }

  .searchbar-icon {
    display: inline-block;
    fill: currentColor;
    height: 24px;
    line-height: 24px;
    position: relative;
    width: 24px;
  }

  .searchbar-center {
    display: flex;
    flex: 1;
    flex-wrap: wrap;
  }

  .searchbar-input-spacer {
    color: transparent;
    flex: 100%;
    white-space: pre;
    height: 34px;
    font-size: 16px;
  }

  .searchbar-input {
    font-family: inherit;
    background-color: transparent;
    border: none;
    margin: 0;
    padding: 0;
    color: rgba(0, 0, 0, 0.87);
    word-wrap: break-word;
    outline: none;
    display: flex;
    flex: 100%;
    margin-top: -37px;
    height: 34px;
    font-size: 16px;
    max-width: 100%;
    width: 100%;
  }

  .searchbar-right {
    display: flex;
    flex: 0 0 auto;
    margin-top: -5px;
    margin-left: -15px;

    align-items: stretch;
    flex-direction: row;
  }

  .searchbar-clear-icon {
    margin-right: 12px;
  }

  .voice-search {
    flex: 1 0 auto;
    display: flex;
    cursor: pointer;
    align-items: center;
    border: 0;
    background: transparent;
    outline: none;
    padding: 0 8px;
    width: 2.8em;
  }
`
