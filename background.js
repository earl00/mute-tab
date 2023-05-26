chrome.browserAction.onClicked.addListener((tab) => {
  // Toggle the muted state
  const toggleMute = (tab) => {
    const newState = !tab.mutedInfo.muted;
    chrome.tabs.update(tab.id, { muted: newState }, () => {
      const path = newState ? 'icon_muted.png' : 'icon.png';
      chrome.browserAction.setIcon({ path: path, tabId: tab.id });
    });
  };

  if (!tab) {
    // If there's no tab provided, get the current one
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      toggleMute(tabs[0]);
    });
  } else {
    // If the tab is provided, mute it directly
    toggleMute(tab);
  }
});

// Handle the case when active tab changes
chrome.tabs.onActivated.addListener(activeInfo => {
  chrome.tabs.get(activeInfo.tabId, (tab) => {
    const path = tab.mutedInfo.muted ? 'icon_muted.png' : 'icon.png';
    chrome.browserAction.setIcon({ path: path, tabId: tab.id });
  });
});
