import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import ItemComponent from '../components/Item';

const fakeItem = {
  id: 'abc',
  image: 'dog.jpg',
  largeImage: 'largeDog.jpg',
  price: 100,
  description: 'This is dummy description',
  title: 'This is title here',
};

describe('Item', () => {
  it('renders and matches the snapshot', () => {
    const wrapper = shallow(<ItemComponent item={fakeItem} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('renders img src and alt', () => {
    const rendered = shallow(<ItemComponent item={fakeItem} />);
    const img = rendered.find('img');
    expect(img.props().src).toBe(fakeItem.image);
    expect(img.props().alt).toBe(fakeItem.title);
  });
  it('renders title and price tag', () => {
    const rendered = shallow(<ItemComponent item={fakeItem} />);
    const priceTag = rendered.find('PriceTag');
    expect(priceTag.children().text()).toBe('€1');
    expect(rendered.find('Title Link a').text()).toBe(fakeItem.title);
  });

  it('renders out the buttons properly', () => {
    const wrapper = shallow(<ItemComponent item={fakeItem} />);
    const buttonList = wrapper.find('.buttonList');
    expect(buttonList.children()).toHaveLength(3);
    expect(buttonList.find('Link')).toHaveLength(1);
    expect(buttonList.find('AddToCart').exists()).toBe(true);
    expect(buttonList.find('DeleteItem').exists()).toBe(true);
  });
});
