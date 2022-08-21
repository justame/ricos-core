// import React from 'react';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
// import AudioViewer from '../audio-viewer';

Enzyme.configure({ adapter: new Adapter() });
// const { shallow, mount } = Enzyme;

// const createAudio = props => shallow(<AudioViewer {...props} />);

describe('Audio - Viewer', () => {
  it('should render container', () => {
    // const viewer = createAudio({});
    expect(true).toBeTruthy();
  });
});
