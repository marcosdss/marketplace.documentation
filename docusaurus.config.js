// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Oba Hortifruti Developer',
  tagline: 'Documentação para desenvolvedores',
  favicon: 'img/obahortifruti-favicon.ico',

  // Set the production url of your site here
  url: 'https://oba-documentation.vercel.app',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'obahortrifrutideveloper', // Usually your GitHub org/user name.
  projectName: 'documentation', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
        },
        blog: {
          showReadingTime: true,
          tagsBasePath: 'tags'
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  plugins: [
    [
      '@docusaurus/plugin-content-blog',
      {
        id: 'tech-insights',
        routeBasePath: 'tech-insights',
        path: './tech-insights',
      },
    ],
    [
      '@docusaurus/plugin-content-blog',
      {
        id: 'spikes',
        routeBasePath: 'spikes',
        path: './spikes',
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: 'Início',
        logo: {
          alt: 'My Site Logo',
          src: 'img/obahortifruti-favicon.ico',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Componentes',
          },
          {to: '/spikes', label: 'Spikes', position: 'left'},
          {to: '/blog', label: 'Release Notes', position: 'left'},
          {to: '/tech-insights', label: 'Tech Insights', position: 'left'},
          {
            href: 'https://github.com/ObaHortifrutiDeveloper',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Oba Hortifruti',
            items: [
              {
                label: 'Store',
                href: 'https://www.obahortifruti.com.br',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/ObaHortifrutiDeveloper',
              },
              {
                label: 'Jira Projects',
                href: 'https://redeoba.atlassian.net/jira/projects',
              },
            ],
          },
          {
            title: 'VTEX',
            items: [
              {
                label: 'VTEX Help Center',
                href: 'https://help.vtex.com/pt/',
              },
              {
                label: 'VTEX API Guides',
                href: 'https://developers.vtex.com/docs/guides',
              },
              {
                label: 'VTEX Learning Center',
                href: 'https://learn.vtex.com',
              }
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'VTEX Release Notes',
                href: 'https://developers.vtex.com/updates/release-notes',
              },
              {
                label: 'VTEX Healthcheck',
                href: 'https://healthcheck.vtex.com',
              },
              {
                label: 'VTEX Status',
                href: 'https://status.vtex.com',
              }
            ],
          },
        ],
        copyright: `Oba Hortifruti © - ${new Date().getFullYear()}, Todos os direitos reservados.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }
  ),
};

module.exports = config;
