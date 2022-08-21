import tableInsertModal from './toolbar/tableInsertModal';

const Modals = {
  TABLE_SETTINGS: 'table-settings',
};

const ModalsMap = {
  [Modals.TABLE_SETTINGS]: tableInsertModal,
};

export { Modals, ModalsMap };
