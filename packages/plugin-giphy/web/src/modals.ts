import GiphyInsertModal from './toolbar/giphyInsertModal';

const Modals = {
  GIPHY_API_INPUT: 'giphy-api-input',
};

const ModalsMap = {
  [Modals.GIPHY_API_INPUT]: GiphyInsertModal,
};

export { Modals, ModalsMap };
