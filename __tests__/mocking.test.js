function Person(name, foods) {
  this.name = name;
  this.foods = foods;
}

Person.prototype.fetchFood = () =>
  new Promise((resolve, reject) => {
    // Simulate API
    setTimeout(() => resolve(this.foods), 500);
  });

describe('mocking', () => {
  it('mock a fn', () => {
    const fetchDogs = jest.fn();
    fetchDogs();
    expect(fetchDogs).toHaveBeenCalled();
    fetchDogs('hugo');
    expect(fetchDogs).toHaveBeenCalledTimes(2);
    expect(fetchDogs).toHaveBeenCalledWith('hugo');
  });

  it('can fetch foods', () => {});
});
