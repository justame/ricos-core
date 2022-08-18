import type { Node } from '@justame-ricos/ricos-schema';
import { AppEmbedData_AppType, Node_Type } from '@justame-ricos/ricos-schema';
import plugins from './pluginCreators';

describe('Plugin Creators', () => {
  it('should create appEmbed plugin', () => {
    const appEmbed: Node = plugins.appEmbed({
      data: { type: AppEmbedData_AppType.BOOKING },
    });
    expect(appEmbed).toStrictEqual<Node>({
      id: appEmbed.id,
      appEmbedData: { type: AppEmbedData_AppType.BOOKING },
      nodes: [],
      type: Node_Type.APP_EMBED,
    });
  });

  it('should create embed plugin', () => {
    const src =
      'https://www.youtube.com/watch?v=zoKn9_3xUIc&ab_channel=%D7%90%D7%95%D7%93%D7%99%D7%9B%D7%92%D7%9F';

    const oembed = {
      type: 'rich',
      title: 'אודי כגן - הלך לי שזלונג',
      // eslint-disable-next-line max-len
      html: '<iframe width="480" height="270" src="//www.youtube.com/embed/zoKn9_3xUIc" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
      thumbnailUrl: 'https://i.ytimg.com/vi/zoKn9_3xUIc/sddefault.jpg',
    };

    const embed: Node = plugins.embed({
      data: {
        src,
        oembed,
      },
    });
    expect(embed).toStrictEqual<Node>({
      id: embed.id,

      embedData: {
        src,
        oembed,
      },
      nodes: [],
      type: Node_Type.EMBED,
    });
  });
});
