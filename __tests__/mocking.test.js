function Person(name, foods) {
  this.name = name;
  this.foods = foods;
}

Person.prototype.fetchFood = function() {
  return new Promise((resolve, reject) => {
    // Simulate an API
    setTimeout(() => resolve(this.foods), 500);
  });
};

describe('mocking', () => {
  it('mock a fn', () => {
    const fetchDogs = jest.fn();
    fetchDogs();
    expect(fetchDogs).toHaveBeenCalled();
    fetchDogs('hugo');
    expect(fetchDogs).toHaveBeenCalledTimes(2);
    expect(fetchDogs).toHaveBeenCalledWith('hugo');
  });

  it('creates a person', () => {
    const me = new Person('GS', ['apple', 'banana']);
    expect(me.name).toEqual('GS');
  });

  it('can fetch foods', async () => {
    const me = new Person('me', ['apple', 'oranges']);
    console.log('meeee', me);
    me.fetchFood = jest.fn().mockResolvedValue(['apple', 'oranges']);
    const favFoods = await me.fetchFood();
    expect(favFoods).toContain('oranges');
  });
});
