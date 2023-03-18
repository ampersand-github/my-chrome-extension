/* global chrome */
interface IFetchProfile {
    tabId:number
}
const injectedFunction = () => {
  try {
    const profileContent = document.getElementsByClassName('profile-introduction_content')
    const profile = Array.from(profileContent).flatMap(balloon => {
      const pElements = balloon.getElementsByTagName('p')
      return Array.from(pElements).map(p => p.innerText.replace(/\r?\n/g, ''))
    }).join(' ')

    const scrapbox = 'https://scrapbox.io/ampersand/temporarilyMemo?body='
    window.open(scrapbox + JSON.stringify(profile), '_blank')
  } catch (e) {
    console.log('failed', e)
  }
}

export const fetchProfile = async ({ tabId }: IFetchProfile) => {
  await chrome.scripting.executeScript({
    target: { tabId },
    func: injectedFunction,
    args: []
  })
}
