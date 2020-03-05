describe('sample test 101', () => {
  it('expect to work', () => {
    expect(1).toEqual(1);
  });

  it('works with ranges', () => {
    const age = 200;
    expect(age).toBeGreaterThan(100);
  });

  it('makes a list of dogs name', () => {
    const dogs = ['hugo', 'boss', 'snickers'];
    expect(dogs).toEqual(dogs);
    expect(dogs).toContain('snickers');
  });
});
