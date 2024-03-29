import React, { Component } from 'react';
import type { ComponentData, RichContentTheme, TranslationFunction } from 'wix-rich-content-common';
import { mergeStyles } from 'wix-rich-content-common';
import InfiniteScroll from 'react-infinite-scroller';
import MDSpinner from 'react-md-spinner';
import { Scrollbars } from 'react-custom-scrollbars';
import { SEARCH_TYPE, PAGE_SIZE, WAIT_INTERVAL } from '../constants';
import { PoweredByGiphy } from '../icons';
import GiphyEmptyState from './giphyEmptyState';
import styles from '../../statics/styles/giphy-selecter.scss';
import type { GIFObject } from '../types';

interface Props {
  onGifAdd: (gif) => void;
  componentData: ComponentData;
  searchTag: string;
  gifs: GIFObject[];
  onCloseRequested: () => void;
  onConfirm: (arg: unknown) => void;
  theme: RichContentTheme;
  t: TranslationFunction;
  giphySdkApiKey: string;
}

interface State {
  gifs: GIFObject[];
  hasMoreItems: boolean;
  page: number;
  didFail: boolean;
  url: string;
  isLoaded: boolean;
}

class GiphySelector extends Component<Props, State> {
  giphySdkCore;

  styles: Record<string, string>;

  timer;

  constructor(props) {
    super(props);
    const { componentData } = this.props;
    this.state = {
      url: componentData.src || '',
      isLoaded: false,
      hasMoreItems: true,
      gifs: [],
      page: 0,
      didFail: false,
    };
    this.styles = mergeStyles({ styles, theme: this.props.theme });
    const gphApiClient = require('giphy-js-sdk-core');
    this.giphySdkCore = gphApiClient(this.props.giphySdkApiKey);
  }

  getGifs = (searchTag, page?) => {
    if (searchTag) {
      this.giphySdkCore
        .search(SEARCH_TYPE, { q: searchTag, offset: page * PAGE_SIZE, limit: PAGE_SIZE })
        .then(response => {
          if (page > 1) {
            this.setState({
              gifs: this.state.gifs.concat(response.data),
              hasMoreItems: true,
              page: this.state.page + 1,
              didFail: false,
            });
          } else {
            this.setState({
              gifs: response.data,
              hasMoreItems: true,
              page: this.state.page + 1,
              didFail: false,
            });
          }
        })
        .catch(() => {
          this.setState({ didFail: true, hasMoreItems: false });
        });
    } else {
      this.giphySdkCore
        .trending(SEARCH_TYPE, { limit: 100 })
        .then(response => {
          if (!searchTag) {
            this.setState({ gifs: response.data, hasMoreItems: false, didFail: false });
          }
        })
        .catch(() => {
          this.setState({ didFail: true, hasMoreItems: false });
        });
    }
  };

  getMoreGifs = () => {
    const searchTag = this.props.searchTag;
    this.getGifs(searchTag, this.state.page);
  };

  selectGif(gif) {
    const { onGifAdd, onCloseRequested } = this.props;
    onGifAdd(gif);

    onCloseRequested();
  }

  convertGiphyToComponentData(giphy) {
    return {
      originalUrl: giphy.images.original.url,
      originalMp4: giphy.images.original.mp4,
      stillUrl: giphy.images.original_still.url,
      downsizedUrl: giphy.images.downsized?.url || giphy.images.original.url,
      downsizedStillUrl: giphy.images.downsized_still?.url || giphy.images.original.url,
      downsizedSmallMp4: giphy.images.downsized_small?.mp4 || giphy.images.original.mp4,
      height: parseInt(giphy.images.original.height, 10),
      width: parseInt(giphy.images.original.width, 10),
    };
  }

  getBoundOnClick = giphy => {
    const componentData = this.convertGiphyToComponentData(giphy);
    return () => this.selectGif(componentData);
  };

  getBoundKeyDown = giphy => {
    const componentData = this.convertGiphyToComponentData(giphy);
    return e => {
      const { onCloseRequested } = this.props;

      if (e.key === 'Escape') {
        onCloseRequested?.();
      }

      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.selectGif(componentData);
      }
    };
  };

  componentWillReceiveProps(nextProps) {
    if (this.timer !== null) {
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(() => this.getGifs(nextProps.searchTag), WAIT_INTERVAL);
  }

  componentDidMount() {
    this.timer = null;
  }

  render() {
    const { styles } = this;
    const { t, searchTag } = this.props;
    const { gifs, hasMoreItems, didFail } = this.state;
    const loader = (
      <div className={styles[`giphy_selecter_spinner_${gifs.length ? 'more' : 'empty_modal'}`]}>
        <MDSpinner borderSize={1.5} singleColor="#000000" />
      </div>
    );
    return (
      <div data-hook="giphySelector">
        <div className={styles.giphy_selecter_infinite_scroll_container}>
          {!gifs.length && searchTag ? (
            <GiphyEmptyState t={t} />
          ) : (
            <Scrollbars
              renderThumbVertical={() => <div className={styles.giphy_selecter_scrollbarThumb} />}
              className={styles.giphy_selecter_customize_scrollbar_container}
            >
              <InfiniteScroll
                pageStart={0}
                loadMore={this.getMoreGifs.bind(this)}
                hasMore={hasMoreItems}
                loader={!this.state.didFail ? loader : null}
                useWindow={false}
                className={styles.giphy_selecter_infinite_scroll}
              >
                {gifs.map((giphy, i) => {
                  return (
                    <div
                      key={i}
                      role="button"
                      tabIndex={0}
                      className={styles.giphy_selecter_gif_img_container}
                      onKeyDown={this.getBoundKeyDown(giphy)}
                      onClick={this.getBoundOnClick(giphy)}
                    >
                      <img
                        className={styles.giphy_selecter_gif_img}
                        src={giphy.images.fixed_width_downsampled.url}
                        alt={giphy.title || 'gif'}
                      />
                    </div>
                  );
                })}
              </InfiniteScroll>
            </Scrollbars>
          )}
        </div>
        <div className={styles.giphy_selecter_container}>
          <PoweredByGiphy className={styles.giphy_selecter_powerdByGiphy} />
        </div>
        {didFail && !gifs.length ? (
          <div className={styles.giphy_selecter_error_msg}> {t('GiphyPlugin_ApiErrorMsg')}</div>
        ) : null}
      </div>
    );
  }
}

export default GiphySelector;
