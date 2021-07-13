export {}

test('check variables', () => {
    expect(process.env.CLIENT_ID).toBe('TEST_VALUE_1')
    expect(process.env.CLIENT_SECRET).toBe('TEST_VALUE_2')
})
