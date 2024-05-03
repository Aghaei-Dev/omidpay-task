import { useEffect, useState, useCallback } from 'react'
import { useAppSelector, useDebounce } from './hooks'
import styled from '@emotion/styled'

import { SearchBar, SingleCity } from './components'
import { City } from './Types'

export default function App() {
  const { query } = useAppSelector((store) => store.main)
  const [data, setData] = useState<City[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchCities = useDebounce(
    useCallback(async () => {
      setIsLoading(true)
      try {
        fetch(
          `https://iran-locations-api.ir/api/v1/fa/cities?state=${
            query ? query : 'تهران'
          }`
        )
          .then((response) => response.json())
          .then((json) => setData(json.cities))
      } catch (error) {
        setError('درخواست نامعتبر است ...')
      } finally {
        setIsLoading(false)
      }
    }, [query]),
    1000
  )

  useEffect(() => {
    fetchCities()
  }, [query])

  return (
    <Wrapper>
      <div className='fixed-width search  '>
        <SearchBar />
      </div>

      <div className='fixed-width list  '>
        {isLoading ? (
          <h2 style={{ textAlign: 'right' }}>در حال بارگیری</h2>
        ) : data ? (
          data.map((item) => {
            return <SingleCity name={item.name} key={item.id} />
          })
        ) : (
          <h2 style={{ textAlign: 'right' }}>{error ? error : '! نداریمش '}</h2>
        )}
      </div>
    </Wrapper>
  )
}

const Wrapper = styled('main')(() => ({
  background: 'var(--bg)',
  '.search': {
    background: 'white',
    padding: '.5rem',
    borderBottom: '1px solid #dfe1e5',
    boxShadow: '0 1px 6px rgb(32 33 36 / 28%)',
  },
  '.list': {
    background: 'var(--bg-background)',
    paddingTop: '1rem',
  },
}))
