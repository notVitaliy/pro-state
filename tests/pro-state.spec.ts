import { createProState, ProState } from '../src/pro-state'
// import { createProState } from '../dist'

interface LocalState {
  readonly age: number
  readonly name: string
}

const localState: LocalState = {
  age: 17,
  name: 'Paul',
}

describe('pro-state', () => {
  let proState: ProState & LocalState

  beforeEach(() => {
    proState = createProState(localState)
  })

  test('creates an instance of ProState', () => {
    expect(proState).toBeInstanceOf(ProState)
  })

  describe('#next', () => {
    let nextProState: ProState & LocalState

    beforeEach(() => {
      nextProState = proState.next({ age: proState.age + 1 })
    })

    test('creates a new instance of ProState', () => {
      expect(nextProState).toBeInstanceOf(ProState)
      expect(nextProState).not.toEqual(proState)
    })

    test('changes the prop correctly', () => {
      expect(nextProState.age).toBe(18)
    })

    test('does not explicitly contain unmodified props from parent', () => {
      expect(nextProState.hasOwnProperty('name')).toBe(false)
    })

    test('has access to prop from parent state', () => {
      expect(nextProState.name).toBe(proState.name)
    })

    test('does not mutate original proState', () => {
      expect(nextProState.age).not.toBe(proState.age)
    })
  })

  describe('#prev', () => {
    let nextProState: ProState & LocalState
    let prevProState: ProState & LocalState

    beforeEach(() => {
      nextProState = proState.next({ age: proState.age + 1 })
      prevProState = nextProState.prev()
    })

    test('returns previous instance', () => {
      expect(prevProState).toBeInstanceOf(ProState)
      expect(prevProState).toEqual(proState)
    })

    test('is not mutated', () => {
      expect(prevProState.age).toBe(17)
    })
  })
})
