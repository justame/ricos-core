import React, { createRef, forwardRef } from 'react';
import type { RicosEditorProps } from '../index';
import RicosEditorWithContext, { RicosEditor } from '../RicosEditor';
import { withEditorContext } from 'wix-rich-content-editor-common/libs/EditorEventsContext';
import content from '../../../../../e2e/tests/fixtures/intro.json';
import { mount } from 'enzyme';

const WithRicosEditorContextConsumer = (props: RicosEditorProps) => {
  return withEditorContext(RicosEditorSwitcherWithRef)(props);
};

const RicosEditorSwitcherWithRef = forwardRef<RicosEditor>((props: RicosEditorProps, ref) => (
  <RicosEditorWithContext {...{ ...props, ref }} />
));

const RicosEditorSwitcher = (props: RicosEditorProps) => <RicosEditor {...props} />;

describe('RicosEditor', () => {
  it('should have access to ref', async () => {
    const ref = createRef<RicosEditor>();
    const props = { ref, content };
    mount(<RicosEditorSwitcherWithRef {...props} />);
    expect(ref.current).toBeTruthy();
  });

  it('should have no access to ref (ref = null)', async () => {
    const ref = createRef<RicosEditor>();
    const props = { ref, content };
    mount(<RicosEditorSwitcher {...props} />);
    expect(ref.current).toBe(null);
  });

  it('should trigger publish successfully', async () => {
    const editor = mount(<WithRicosEditorContextConsumer content={content} />);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const publish = (editor.find('RicosEditor').instance().props as any).editorEvents.publish;
    const publishedContent = await publish();
    expect(publishedContent).toBeTruthy();
  });
});
