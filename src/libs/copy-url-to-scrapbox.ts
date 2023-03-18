/* global chrome */
interface ICopyUrlToScrapbox {
    tabId:number
  url:string
  title:string
}

function injectedFunction (url:ICopyUrlToScrapbox['url'], title:ICopyUrlToScrapbox['title']) {
  try {
    const scrapbox = 'https://scrapbox.io/ampersand/temporarilyMemo?body='
    const text = '[' + url + ' ' + title + ']'
    window.open(scrapbox + text, '_blank')
  } catch (e) {
    console.log('failed', e)
  }
}

export const copyUrlToScrapbox = async ({ tabId, url, title }:ICopyUrlToScrapbox) => {
  await chrome.scripting.executeScript({
    target: { tabId },
    func: injectedFunction,
    args: [url, title]
  })
}
