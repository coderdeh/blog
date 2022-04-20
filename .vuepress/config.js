module.exports = {
  base: '/coderdeh/blog/',
  title: 'coderdeh',
  description: 'talk is cheap, show me the code',
  dest: 'public',
  head: [
    [
      'link',
      {
        rel: 'icon',
        href: '/avatar.ico',
      },
    ],
    [
      'meta',
      {
        name: 'viewport',
        content: 'width=device-width,initial-scale=1,user-scalable=no',
      },
    ],
  ],
  theme: 'reco',
  themeConfig: {
    subSidebar: 'auto',
    nav: [
      {
        text: '主页',
        link: '/',
        icon: 'reco-home',
      },
      // {
      //   text: '文档',
      //   icon: 'reco-message',
      //   items: [
      //     {
      //       text: '知识点',
      //       link: '/docs',
      //     },
      //   ],
      // },
      {
        text: 'Contact',
        icon: 'reco-github',
        items: [
          {
            text: 'GitHub',
            link: 'https://github.com/coderdeh',
          },
        ],
      },
    ],
    sidebar: {
      '/docs/': ['JS', 'vue', 'webpack', 'browser', 'micro-front-end', 'git', 'nginx'],
    },
    type: 'blog',
    blogConfig: {
      category: {
        location: 2,
        text: '博客',
      },
      tag: {
        location: 3,
        text: '分类',
      },
    },
    friendLink: [
      {
        title: 'vuepress-theme-reco',
        desc: 'A simple and beautiful vuepress Blog & Doc theme.',
        avatar: 'https://vuepress-theme-reco.recoluan.com/icon_vuepress_reco.png',
        link: 'https://vuepress-theme-reco.recoluan.com',
      },
    ],
    logo: '/avatar.png',
    search: true,
    searchMaxSuggestions: 10,
    lastUpdated: 'Last Updated', // string | boolean
    author: 'coderdeh',
    authorAvatar: '/avatar.png',
    startYear: '2020',
    valineConfig: {
      appId: 'm4jGv2Gqw5325aV4IV0ahqK5-gzGzoHsz', // your appId
      appKey: 'ul1kbEfqfDKECzSEeejRFfGC', // your appKey
    },
  },
  plugins: [
    [
      'vuepress-plugin-comment',
      {
        choosen: 'valine',
        visitor: true, // 阅读量统计
        // options选项中的所有参数，会传给Valine的配置
        options: {
          el: '#valine-vuepress-comment',
          appId: 'AfFAE0L44yanB796wFczMbzG-gzGzoHsz',
          appKey: 'dp9nuN1hb1mLaDjqJnV8kd0b',
        },
      },
    ],
  ],
  markdown: {
    lineNumbers: true,
  },
}
