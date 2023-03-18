import { defineManifest } from '@crxjs/vite-plugin'

export const manifest = defineManifest({
  manifest_version: 3,
  name: 'my-chrome-extension2',
  version: '1.0.0',
  icons: { 48: 'icon-48.png' },
  permissions: ['bookmarks', 'activeTab', 'contextMenus', 'clipboardWrite', 'scripting', 'tabs'],
  action: { default_popup: 'src/index.html' },
  background: {
    service_worker: './src/background.ts',
    type: 'module'
  }
})
