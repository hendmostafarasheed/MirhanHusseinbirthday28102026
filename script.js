(() => {
  const pageOne = document.getElementById('pageOne');
  const pageTwo = document.getElementById('pageTwo');
  const openInvitation = document.getElementById('openInvitation');
  const backButton = document.getElementById('backButton');
  const modal = document.getElementById('commentModal');
  const openComments = document.getElementById('openComments');
  const closeComments = document.getElementById('closeComments');
  const form = document.getElementById('commentForm');
  const list = document.getElementById('commentsList');
  const birthdayMusic = document.getElementById('birthdayMusic');

  // Try autoplay on page load; mobile browsers may require a user gesture.
  function startBirthdayMusic() {
    if (!birthdayMusic) return;
    const playAttempt = birthdayMusic.play();
    if (playAttempt && typeof playAttempt.catch === 'function') playAttempt.catch(() => {});
  }
  startBirthdayMusic();
  document.addEventListener('pointerdown', startBirthdayMusic, { once: true });

  function showPageTwo() {
    pageOne.classList.add('hidden');
    pageTwo.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  function showPageOne() {
    modal.classList.add('hidden');
    pageTwo.classList.add('hidden');
    pageOne.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  function renderComments() {
    let comments = [];
    try { comments = JSON.parse(localStorage.getItem('mirhanBirthdayComments') || '[]'); } catch (_) {}
    list.replaceChildren();
    comments.slice().reverse().forEach(item => {
      const article = document.createElement('article');
      article.className = 'comment-item';
      const name = document.createElement('strong');
      name.textContent = item.name;
      const message = document.createElement('p');
      message.textContent = item.message;
      article.append(name, message);
      list.append(article);
    });
  }
  openInvitation.addEventListener('click', () => { startBirthdayMusic(); showPageTwo(); });
  backButton.addEventListener('click', showPageOne);
  openComments.addEventListener('click', () => {
    modal.classList.remove('hidden');
    renderComments();
    document.getElementById('visitorName').focus();
  });
  closeComments.addEventListener('click', () => modal.classList.add('hidden'));
  modal.addEventListener('click', event => {
    if (event.target === modal) modal.classList.add('hidden');
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') modal.classList.add('hidden');
  });
  form.addEventListener('submit', event => {
    event.preventDefault();
    const name = document.getElementById('visitorName').value.trim();
    const message = document.getElementById('visitorComment').value.trim();
    if (!name || !message) return;
    let comments = [];
    try { comments = JSON.parse(localStorage.getItem('mirhanBirthdayComments') || '[]'); } catch (_) {}
    comments.push({ name, message, createdAt: new Date().toISOString() });
    try { localStorage.setItem('mirhanBirthdayComments', JSON.stringify(comments.slice(-100))); } catch (_) {}
    form.reset();
    renderComments();
  });
})();
