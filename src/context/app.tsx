import React, { createContext, Dispatch, useContext, useReducer } from 'react'
import { TModal } from '../components/Modal'

type State = {
  modalShown: boolean
  modalType: TModal
  loading: boolean
}

type Action =
  | { type: 'SET_MODAL'; modalShown: boolean; modalType: TModal }
  | { type: 'SET_LOADING'; loading: boolean }

type AppDispatch = Dispatch<Action>

const AppContext = createContext<State | null>(null)
const AppDispatchContext = createContext<AppDispatch | null>(null)

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_MODAL':
      return {
        ...state,
        modalShown: action.modalShown,
        modalType: action.modalType,
      }
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.loading,
      }
    default:
      throw new Error('Unhandled action')
  }
}

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, {
    modalShown: false,
    modalType: TModal.BLANK,
    loading: false,
  })
  return (
    <AppContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>
        {children}
      </AppDispatchContext.Provider>
    </AppContext.Provider>
  )
}

export const useAppState = () => {
  const state = useContext(AppContext)
  if (!state) throw new Error('Cannot find AppProvider')
  return state
}

export const useAppDispatch = () => {
  const dispatch = useContext(AppDispatchContext)
  if (!dispatch) throw new Error('Cannot find AppDispatchProvider')
  return dispatch
}

export default AppProvider
