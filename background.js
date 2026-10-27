browser.commands.onCommand.addListener((command) => {
  if (command === "open-extension-popup") {
    browser.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const urls = tabs
        .sort((left, right) => left.index - right.index)
        .map((tab) => tab.url)
        .filter(Boolean);

      if (!urls.length) {
        return;
      }

      navigator.clipboard.writeText(urls.join("\n"))
        .then(() => { })
        .catch((error) => {
          console.error("Error copying URL to clipboard:", error);
        });
    });
  }
});
