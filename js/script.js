// ==============================
// Webライター ポートフォリオサイト用スクリプト
// ==============================

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initHeaderShadow();
  initWorksFilter();
  initContactForm();
  initFooterYear();
});

function initMobileMenu() {
  const btn = document.getElementById('menu-btn');
  const menu = document.getElementById('mobile-menu');
  const iconOpen = document.getElementById('icon-open');
  const iconClose = document.getElementById('icon-close');
  if (!btn || !menu) return;

  const closeMenu = () => {
    menu.classList.add('hidden');
    btn.setAttribute('aria-expanded', 'false');
    iconOpen.classList.remove('hidden');
    iconClose.classList.add('hidden');
  };

  btn.addEventListener('click', () => {
    const isOpen = !menu.classList.contains('hidden');
    if (isOpen) {
      closeMenu();
      return;
    }
    menu.classList.remove('hidden');
    btn.setAttribute('aria-expanded', 'true');
    iconOpen.classList.add('hidden');
    iconClose.classList.remove('hidden');
  });

  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });
}

function initHeaderShadow() {
  const header = document.getElementById('site-header');
  if (!header) return;

  const toggleShadow = () => {
    header.classList.toggle('shadow-md', window.scrollY > 8);
  };

  toggleShadow();
  window.addEventListener('scroll', toggleShadow, { passive: true });
}

function initWorksFilter() {
  const buttons = document.querySelectorAll('[data-filter]');
  const cards = document.querySelectorAll('[data-category]');
  if (!buttons.length || !cards.length) return;

  const activeClasses = ['bg-indigo-600', 'text-white'];
  const inactiveClasses = ['bg-white', 'text-slate-600', 'border', 'border-slate-200'];

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;

      buttons.forEach((b) => {
        b.classList.remove(...activeClasses);
        b.classList.add(...inactiveClasses);
      });
      button.classList.remove(...inactiveClasses);
      button.classList.add(...activeClasses);

      cards.forEach((card) => {
        const show = filter === 'all' || card.dataset.category === filter;
        card.classList.toggle('hidden', !show);
      });
    });
  });
}

function initContactForm() {
  const form = document.getElementById('contact-form');
  const successMessage = document.getElementById('form-success');
  if (!form) return;

  // ------------------------------------------------------------------
  // 【重要】このフォームは現在ダミー動作です(実際には何も送信されません)。
  // GitHub Pagesは静的サイトのため、フォーム送信を受け取るには外部サービス
  // (Formspree等)との連携が必要です。
  //
  // Formspreeで実送信を有効にする手順:
  // 1. https://formspree.io/ でアカウントを作成し、フォームを1つ作成する
  // 2. 発行されたEndpoint URL (例: https://formspree.io/f/xxxxxxx) を控える
  // 3. index.html の <form id="contact-form" ...> タグの action 属性に
  //    そのURLを設定する (method="POST" はそのままでよい)
  // 4. 下の event.preventDefault() 以降のダミー処理(送信成功メッセージの
  //    表示部分を除く)を削除し、フォームを通常送信に戻す
  //    ※ fetch(form.action, { method: 'POST', body: new FormData(form),
  //       headers: { Accept: 'application/json' } }) に置き換えれば、
  //       ページ遷移せずに送信することもできる
  // ------------------------------------------------------------------
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    // ダミー送信処理(実際には何も送信していません)
    form.reset();
    if (successMessage) {
      successMessage.classList.remove('hidden');
      setTimeout(() => successMessage.classList.add('hidden'), 5000);
    }
  });
}

function initFooterYear() {
  const yearEl = document.getElementById('footer-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}
