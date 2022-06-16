import React, { createContext, Dispatch, useContext, useReducer } from 'react'

type State = {
  modalShown: boolean
  modalType: string
}

type Action = { type: 'SET_MODAL'; modalShown: boolean; modalType: '' }

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
    default:
      throw new Error('Unhandled action')
  }
}

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, {
    modalShown: false,
    modalType: '',
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
