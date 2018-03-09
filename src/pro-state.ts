export class ProState {
  next<T>(state: Partial<this & T>): Readonly<this & T> {
    const newObj = Object.assign({}, state)
    const newState = Object.setPrototypeOf(newObj, this)
    return Object.freeze(newState)
  }

  prev<T>(): Readonly<this & T> {
    const previous = Object.getPrototypeOf(this)

    return previous === ProState.prototype ? null : previous
  }
}

export const createProState = <T>(init: T): Readonly<ProState & T> => {
  const state = new ProState()
  return state.next(init)
}
