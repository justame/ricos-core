//@ts-nocheck
import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AddPluginFloatingToolbar from './AddPluginFloatingToolbar';

Enzyme.configure({ adapter: new Adapter() });
const { mount } = Enzyme;

describe('AddPluginFloatingToolbar', () => {
  it('should trigger "onMenuLoad" when clicked', () => {
    let params = {};
    const fn = jest.fn(args => (params = args));
    const getEditorStateMock = () => ({
      getCurrentContent: () => ({
        ID: '123',
      }),
    });
    const moreButton = mount(
      <AddPluginFloatingToolbar
        helpers={{ onMenuLoad: fn }}
        structure={[]}
        t={() => ''}
        getEditorState={getEditorStateMock}
      />
    );
    moreButton.instance().onClick({ preventDefault: () => '', stopPropagation: () => '' });
    expect(fn).toBeCalledTimes(1);
    const { version, ...rest } = params;
    expect(version).toBeTruthy(); // split due to CI cache, causing different versions
    expect(rest).toStrictEqual({
      menu: 'SIDE',
      contentId: '123',
    });
  });
});
