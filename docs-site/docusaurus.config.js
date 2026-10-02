// @ts-check
const config = {
  title: 'Interview Preparation',
  tagline: '22 notes — frontend, backend, system design',
  url: 'http://localhost:3000',
  baseUrl: '/',
  trailingSlash: false,
  onBrokenLinks: 'warn',
  markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },
  themes: ['@docusaurus/theme-mermaid'],
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  presets: [
    [
      'classic',
      {
        docs: {
          // The 22 notes live in docs-site/notes — this site only reads them.
          path: './notes',
          routeBasePath: 'notes',
          include: ['**/*.md'],
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: undefined,
          showLastUpdateTime: false,
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};

module.exports = config;
