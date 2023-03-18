/* global chrome */
interface ICopyToScrapbox {
    tabId:number
    selectionText: string
}

const injectedFunction = (selectionText:ICopyToScrapbox['selectionText']) => {
  try {
    const scrapbox = 'https://scrapbox.io/ampersand/temporarilyMemo?body='
    window.open(scrapbox + selectionText, '_blank')
  } catch (e) {
    console.log('failed', e)
  }
}

export const copyToScrapbox = async ({ tabId, selectionText }: ICopyToScrapbox) => {
  await chrome.scripting.executeScript({
    target: { tabId },
    func: injectedFunction,
    args: [selectionText]
  })
}
