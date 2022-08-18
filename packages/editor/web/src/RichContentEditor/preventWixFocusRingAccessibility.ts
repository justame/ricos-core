export default (ref: Element) => {
  try {
    ref.getElementsByClassName('public-DraftEditor-content')[0].classList.add('has-custom-focus');
  } catch (e) {}
};
