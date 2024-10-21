import { defineManifest } from '@crxjs/vite-plugin'

export default defineManifest({
  name: 'light off(关灯)',
  description: 'One-click Toggle for Web Page Dark Mode',
  version: '2.0.0',
  manifest_version: 3,
  icons: { '16': 'imgs/logo16.png', '128': 'imgs/logo128.png' },
  action: {
    default_popup: 'popup.html',
    default_icon: 'imgs/logo16.png',
  },
  background: {
    service_worker: 'src/background/index.ts',
    type: 'module',
  },
  content_scripts: [
    {
      js: ['src/content/index.ts'],
      matches: ['<all_urls>'],
      run_at: 'document_end',
    },
  ],
  web_accessible_resources: [
    {
      resources: [],
      matches: [],
    },
  ],
  permissions: ['activeTab'],
  host_permissions: ['<all_urls>'],
})
