/* global chrome */
import { copyToScrapbox } from './libs/copy-to-scrapbox'
import { copyUrlToScrapbox } from './libs/copy-url-to-scrapbox'
import { countString } from './libs/count-string'
import { extractMessage } from './libs/with/extract-message'
import { fetchProfile } from './libs/with/fetch-profile'

// ------------------------------------------------
// 右クリックメニュー
// ------------------------------------------------
const updateContextMenus = async () => {
  await chrome.contextMenus.removeAll()
  chrome.contextMenus.create({ id: 'copy-to-scrapbox', title: 'scrapboxへコピーする', contexts: ['all'] })
  chrome.contextMenus.create({ id: 'copy-url-to-scrapbox', title: 'URLをscrapboxへコピーする', contexts: ['all'] })
  chrome.contextMenus.create({ id: 'count-string', title: '文字数をカウントする', contexts: ['all'] })
  chrome.contextMenus.create({ id: 'extract-message', title: 'with-メッセージを抜き出す', contexts: ['all'] })
  chrome.contextMenus.create({ id: 'fetch-profile', title: 'with-プロフィールを取得する', contexts: ['all'] })
}

// ------------------------------------------------
// 紐付け
// ------------------------------------------------
chrome.runtime.onInstalled.addListener(updateContextMenus)
chrome.runtime.onStartup.addListener(updateContextMenus)
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (!tab) throw new Error('タブが誤っています')
  const tabId = tab.id || 0
  const selectionText = info.selectionText || ''

  // scrapbox-util
  if (info.menuItemId === 'copy-to-scrapbox') await copyToScrapbox({ tabId, selectionText })
  if (info.menuItemId === 'copy-url-to-scrapbox') {
    const url = tab.url || ''
    const title = tab.title || ''
    await copyUrlToScrapbox({ tabId, url, title })
  }
  if (info.menuItemId === 'count-string') await countString({ tabId, selectionText })

  // with
  if (info.menuItemId === 'extract-message') await extractMessage({ tabId })
  if (info.menuItemId === 'fetch-profile') await fetchProfile({ tabId })
})
