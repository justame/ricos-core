import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MoreButton from './MoreButton';

Enzyme.configure({ adapter: new Adapter() });
const { mount } = Enzyme;

describe('MoreButton', () => {
  it('should trigger "onMenuLoad" when clicked', () => {
    let params = {};
    const fn = jest.fn(args => (params = args));
    const moreButton = mount(
      <MoreButton helpers={{ onMenuLoad: fn }} structure={[]} t={() => ''} />
    );
    moreButton.instance().handleClick();
    expect(fn).toBeCalledTimes(1);
    const { version, ...rest } = params; // split due to CI cache, causing different versions
    expect(version).toBeTruthy();
    expect(rest).toStrictEqual({
      menu: 'SHORTCUT',
    });
  });
});
