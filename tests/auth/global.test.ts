import { createCode, createState } from '../../src'

test(createCode.name, () => {
    const code = createCode()
    expect(code).toStrictEqual<typeof code>({
        code_challenge: expect.any(String),
        code_verifier: expect.any(String),
    })
    expect(code.code_verifier.length).toBeGreaterThanOrEqual(43)
    expect(code.code_verifier.length).toBeLessThanOrEqual(128)
})

test(createState.name, () => {
    const state = createState()
    expect(state.length).toBeGreaterThanOrEqual(24)
    expect(state.length).toBeLessThanOrEqual(32)
    expect(state).toMatch(/[a-z-\._~]+/i)
})
