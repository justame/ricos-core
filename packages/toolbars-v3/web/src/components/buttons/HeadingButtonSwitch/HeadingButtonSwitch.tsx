import React from 'react';
import { withToolbarContext } from 'ricos-context';
import CustomHeadingButton from '../CustomHeadingButton/CustomHeadingButton';
import HeadingButton from '../HeadingButton/HeadingButton';

const HeadingButtonSwitch = ({ toolbarItem, context, dataHook }) => {
  const { headingsData } = context || {};
  if (!context) return null;

  return headingsData?.allowHeadingCustomization ? (
    <CustomHeadingButton toolbarItem={toolbarItem} dataHook={dataHook} />
  ) : (
    <HeadingButton toolbarItem={toolbarItem} dataHook={dataHook} />
  );
};

export default withToolbarContext(HeadingButtonSwitch);
