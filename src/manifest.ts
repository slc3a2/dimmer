import { defineManifest } from '@crxjs/vite-plugin'

export default defineManifest({
  name: 'Colora - Screenshot and Edit',
  description: 'Lightweight and user-friendly screenshot editing tool.',
  version: '1.2.1',
  manifest_version: 3,
  icons: {
    '16': 'img/logo.png',
    '32': 'img/logo.png',
    '48': 'img/logo.png',
    '128': 'img/logo.png',
  },
  action: {
    default_popup: 'popup.html',
    default_icon: 'img/logo.png',
  },
  options_page: 'options.html',
  background: {
    service_worker: 'src/background/index.ts',
    type: 'module',
  },
  content_scripts: [
    {
      matches: ['http://*/*', 'https://*/*'],
      js: ['src/content/index.ts'],
    },
  ],
  web_accessible_resources: [
    {
      resources: ['img/logo.png'],
      matches: [],
    },
  ],
  permissions: ['activeTab'],
  host_permissions: ['<all_urls>'],
})
