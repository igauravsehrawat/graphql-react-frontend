import { shallow } from 'enzyme';
import ItemComponent from '../components/Item';

const fakeItem = {
  id: 'abc',
  image: 'dog.jpg',
  largeImage: 'largeDog.jpg',
  price: 1000,
  description: 'This is dummy description',
  title: 'This is title here',
};

describe('Item', () => {
  it('renders title and price', () => {
    const rendered = shallow(<ItemComponent item={fakeItem} />);
    console.log(rendered.debug());
    const priceTag = rendered.find('PriceTag');
    expect(priceTag.children().text()).toBe('€10');
    expect(rendered.find('Title a').text()).toBe(fakeItem.title);
  });
  it('renders img src and alt', () => {
    const rendered = shallow(<ItemComponent item={fakeItem} />);
    console.log(rendered.debug());
    const Img = rendered.find('Img');
    expect(Img.children().text()).toBe('€10');
    expect(rendered.find('Title a').text()).toBe(fakeItem.title);
  });
  it('renders title and pricetag', () => {
    const rendered = shallow(<ItemComponent item={fakeItem} />);
    console.log(rendered.debug());
    const priceTag = rendered.find('PriceTag');
    expect(priceTag.children().text()).toBe('€10');
    expect(rendered.find('Title a').text()).toBe(fakeItem.title);
  });

  it('renders out the buttons properly', () => {
    const wrapper = shallow(<ItemComponent item={fakeItem} />);
    console.log('wrapper', wrapper);
    const buttonList = wrapper.find('.buttonList');
    expect(buttonList.children()).toHaveLength(3);
    expect(buttonList.find('Link')).toHaveLength(1);
    expect(buttonList.find('AddToCart').exists()).toBe(true);
    expect(buttonList.find('DeleteItem').exists()).toBe(true);
  });
});
