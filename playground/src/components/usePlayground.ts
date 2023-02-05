import { useState } from 'react'
import { Layout } from './LayoutControl'

export type State = {
  code: string
  config: string
  view: string
}

export type UsePlayGroundProps = {
  intialState?: State | null
}

export const usePlayground = (props: UsePlayGroundProps) => {
  const { intialState } = props
  const [layout, setLayout] = useState<Layout>('horizontal')
  const [isPristine, setIsPristine] = useState(true)

  const [state, setState] = useState(
    intialState
      ? intialState
      : {
          code: '<button>Hello world</button>',
          config: 'export const config = {}',
          view: 'code',
        },
  )
  const share = async () =>
    fetch('/api/share', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(state),
    })
      .then((response) => response.json())
      .then((data) => {
        history.pushState({ id: data.id }, '', data.id)
        setIsPristine(true)
      })

  return {
    isPristine,
    layout,
    setLayout,
    state,
    setState: (newState: State) => {
      setIsPristine(false)
      setState(newState)
    },
    share,
  }
}
