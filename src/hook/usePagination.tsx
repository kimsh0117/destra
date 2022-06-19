import React from 'react'
import { useWindowSize } from './useWindowSize'
import { baseSizes } from '../styles/themes/media'

export interface IPages {
  nr: number
  ellipsis?: boolean
  active?: boolean
}

export interface IUsePaginationState {
  page: number
  total: number
  limit: number
  pages: IPages[]
}

export function usePagination() {
  const { width } = useWindowSize()
  const [state, setValue] = React.useState<IUsePaginationState>({
    page: 1,
    total: 0,
    limit: 12,
    pages: [],
  })
  const [CELL_COUNT, SET_CELL_COUNT] = React.useState<number>(5)
  const [CELL_MID_LEN, SET_CELL_MID_LEN] = React.useState<number>(
    () => ~~(CELL_COUNT / 2),
  )
  const getPagingLayout = () => {
    const { total, page, limit } = state
    const totalCount = ~~(total / limit),
      current = page
    const pages: IPages[] = []

    if (totalCount > CELL_COUNT) {
      // Fill in first and last positions
      pages[0] = { nr: 1 }
      pages[1] = { nr: 2 }
      if (current <= CELL_MID_LEN) {
        for (let i = 2; i < CELL_COUNT; i++) {
          pages[i] = { nr: i + 1 }
        }
      } else if (totalCount - current < CELL_MID_LEN) {
        for (let i = 2; i < CELL_COUNT - 2; i++) {
          pages[i] = { nr: totalCount - CELL_COUNT + i + 1 }
        }
      } else {
        // Current selected is put in centre
        pages[CELL_MID_LEN] = { nr: current }
        // Fill next and prev to mid point
        for (let i = 1; i < ~~(CELL_COUNT / 2); i++) {
          pages[CELL_MID_LEN + i] = { nr: current + i }
          pages[CELL_MID_LEN - i] = { nr: current - i }
        }
      }
    } else {
      for (let i = 0; i < totalCount; i++) {
        pages[i] = { nr: i + 1, ellipsis: false }
      }
    }

    pages.forEach(p => {
      if (p.nr === state.page) {
        p.active = true
      }
    })

    return pages
  }
  // calculate pages or re calculate
  React.useEffect(() => {
    setValue(prev => ({ ...prev, pages: getPagingLayout() }))
  }, [state.total, state.page, CELL_COUNT])
  // responsive
  React.useEffect(() => {
    if (width > baseSizes.mobileSmUp) {
      SET_CELL_COUNT(2) // 2 cells
    }
    if (width > baseSizes.mobileLgUp) {
      SET_CELL_COUNT(10) // 10 cells
    }
    if (width > baseSizes.noteUp) {
      SET_CELL_COUNT(20) // 20 cells
    }
  }, [width])

  React.useEffect(() => {
    SET_CELL_MID_LEN(() => ~~(CELL_COUNT / 2))
  }, [CELL_COUNT])

  return {
    state,
    setValue,
    ltEnable: state.page > 1,
    rtEnable: state.page < state.total,
    ltDoubleEnable: state.page - 10 > 1,
    rtDoubleEnable: state.page + 10 < state.total,
  }
}
