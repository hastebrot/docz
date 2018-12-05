import { useEffect } from 'react'
import { state } from '../state'

export const useDataServer = (url: string | undefined) => {
  useEffect(() => {
    if (!url) return

    const socket = new WebSocket(url)
    socket.onmessage = (ev: any) => {
      const { type, payload } = JSON.parse(ev.data)
      const prop = type.startsWith('state.') && type.split('.')[1]

      if (prop) {
        state.set(state => ({ ...state, [prop]: payload }))
      }
    }
  }, [])
}