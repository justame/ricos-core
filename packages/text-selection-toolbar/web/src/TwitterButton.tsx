import type { FunctionComponent } from 'react';
import React from 'react';
import styles from '../statics/styles/viewer-inline-toolbar.rtlignore.scss';
import Twitter from './icons/twitter';

function openTwitter(selectedText: string) {
  let text = '“' + selectedText + '“—';
  const url = window.location.href;

  const maxTweetLength = 279;
  if (text.length + url.length > maxTweetLength) {
    const maxTextLength = maxTweetLength - url.length;
    text = handleText(text, maxTextLength);
  }

  const TWEET_ON_TWITTER_URL = `https://twitter.com/intent/tweet?text=${encodeURI(
    text
  )}&url=${encodeURI(url)}`;

  window.open(TWEET_ON_TWITTER_URL);
}

function handleText(text: string, maxTextLength: number) {
  let content = text.substring(0, maxTextLength - 2);
  content = content.slice(0, content.lastIndexOf(' '));
  content += '…“—';
  return content;
}

const TwitterButton: FunctionComponent<{
  selectedText: string;
  onClick?: (selectedText: string) => void;
}> = ({ selectedText, onClick }) => {
  const handleOnClick = selectedText => {
    onClick?.(selectedText);
    openTwitter(selectedText);
  };
  return (
    <button
      data-hook="twitter-button"
      className={styles.button}
      onClick={() => handleOnClick(selectedText)}
    >
      <Twitter />
    </button>
  );
};

export default TwitterButton;
