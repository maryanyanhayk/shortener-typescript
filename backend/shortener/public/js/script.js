const form = document.getElementById('shorten-form');
const urlInput = document.getElementById('url');
const shortenedUrlDiv = document.getElementById('shortened-url-container');
const shortenButton = form.querySelector('button');
const shortenedUrlText = document.getElementById('shortened-url');
const copyButton = document.getElementById('copy-button');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const url = urlInput.value;

  if (!url) {
    shortenedUrlText.innerHTML = `<p style="color: red;">URL is required!</p>`;
    return;
  }

  try {
    
    shortenButton.disabled = true;

    const response = await fetch('/shorten', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url }),
    });

    if (!response.ok) {
      throw new Error('Failed to shorten URL');
    }

    const { shortUrl } = await response.json();
    
    shortenedUrlText.innerHTML = `Success! Here's your short URL: <a href="${shortUrl}" target="_blank">${shortUrl}</a>`;
    shortenedUrlDiv.style.display = 'flex';
    
    shortenedUrlText.style.color = 'green';
  } catch (error) {
    console.error('Error:', error);
    shortenedUrlText.innerHTML = `<p style="color: red;">Failed to shorten URL. Please try again.</p>`;
  }
});

copyButton.addEventListener('click', () => {
  const urlToCopy = shortenedUrlText.querySelector('a').textContent;
  navigator.clipboard.writeText(urlToCopy).then(() => {
    alert('URL copied to clipboard!');
  }).catch((error) => {
    console.error('Failed to copy URL:', error);
    alert('Failed to copy URL. Please try again.');
  });
});

window.addEventListener('load', () => {
  shortenButton.disabled = false;
  shortenedUrlDiv.style.display = 'none';
});
