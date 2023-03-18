/* global chrome */
interface ICountString {
    tabId:number
  selectionText:string
}

function injectedFunction (text:ICountString['selectionText']) {
  try {
    const scrapbox = 'https://scrapbox.io/ampersand/temporarilyMemo?body='
    window.open(scrapbox + text.length + '字', '_blank')
  } catch (e) {
    console.log('failed', e)
  }
}

export const countString = async ({ tabId, selectionText }:ICountString) => {
  await chrome.scripting.executeScript({
    target: { tabId },
    func: injectedFunction,
    args: [selectionText]
  })
}
