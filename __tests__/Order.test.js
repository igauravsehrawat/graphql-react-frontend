import { mount } from 'enzyme';
import wait from 'waait';
import toJSON from 'enzyme-to-json';
import NProgress from 'nprogress';
import Router from 'next/router';
import { ApolloConsumer } from 'react-apollo';
import { MockedProvider } from 'react-apollo/test-utils';
import Order, { SINGLE_ORDER_QUERY } from '../components/Order';
import { fakeUser, fakeOrder } from '../lib/testUtils';
import { CURRENT_USER_QUERY } from '../components/User';

const mocks = [
  {
    request: {
      query: SINGLE_ORDER_QUERY,
      variables: { id: 'ord123' },
    },
    result: {
      data: {
        order: fakeOrder(),
      },
    },
  },
];

describe('<Order />', () => {
  it('renders and matches the snap shot', async () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <Order id="ord123" />
      </MockedProvider>
    );
    // await wait is when data is to rendered
    await wait();
    wrapper.update();
    expect(toJSON(wrapper.find('OrderStyles'))).toMatchSnapshot();
  });
});
