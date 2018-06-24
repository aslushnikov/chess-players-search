const dataPromise = fetch('./chessplayers.json').then(response => response.text());
const $ = document.querySelector.bind(document);

let chessplayers = [];

window.addEventListener('DOMContentLoaded', async () => {
  chessplayers = JSON.parse(await dataPromise);
  chessplayers.sort((a, b) => a.title.localeCompare(b.title));

  const input = $('input[type=search]');
  input.addEventListener('input', () => {
  }, false);
  input.addEventListener('keyup', e => {
    if (e.key === 'Enter')
      doSearch(input.value);
    else if (!input.value)
      hideSuggestions();
    else
      plzSuggest(input.value);
  }, false);
  $('button[type=submit]').addEventListener('click', () => doSearch(input.value), false);
  $('#suggestions').addEventListener('click', e => {
    input.value = e.target.textContent;
    doSearch(e.target.textContent);
  }, false);
}, false);

function doSearch(query) {
  hideSuggestions();
  query = query.toLowerCase();
  const results = $('#results');
  results.textContent = '';
  for (const player of chessplayers) {
    if (player.title.toLowerCase().includes(query)) {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = player.href;
      a.title = player.title;
      a.textContent = player.title;
      li.appendChild(a);
      results.appendChild(li);
    }
  }
}

function plzSuggest(query) {
  query = query.toLowerCase();
  const results = $('#suggestions');
  results.textContent = '';
  for (const player of chessplayers) {
    if (!player.title.toLowerCase().includes(query))
      continue;
    const suggestion = document.createElement('div');
    suggestion.textContent = player.title;
    results.appendChild(suggestion);
    if (results.children.length > 10)
      break;
  }
  if (results.children.length)
    results.style.setProperty('display', 'block');
  else
    results.style.setProperty('display', 'none');
}

function hideSuggestions() {
  const results = $('#suggestions');
  results.textContent = '';
  results.style.setProperty('display', 'none');
}
