export {}

test('check variables', () => {
    expect(process.env.CLIENT_ID).toBeTruthy()
})
