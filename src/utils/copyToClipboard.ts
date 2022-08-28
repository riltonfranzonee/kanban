const copyToClipboard = async (text: string) => {
  try {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text);
    } else if (
      document.queryCommandSupported &&
      document.queryCommandSupported("copy")
    ) {
      // old browsers
      const textarea = document.createElement("textarea");
      textarea.textContent = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy"); // Security exception may be thrown by some browsers.
      document.body.removeChild(textarea);
    }
  } catch (error) {
    console.warn("Copy to clipboard failed.");
  }
};

export default copyToClipboard;
