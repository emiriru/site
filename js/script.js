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

  const activeClasses = ['bg-navy', 'text-white'];
  const inactiveClasses = ['bg-paper', 'text-clay', 'border', 'border-sand'];

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
  const hiddenIframe = document.getElementById('hidden_iframe');
  if (!form) return;

  // ------------------------------------------------------------------
  // 【重要】Googleフォームと連携しています。実送信するには index.html 側で
  // 以下2箇所を差し替えてください(README にも手順を記載しています)。
  // 1. <form> タグの action 属性を、Googleフォームの formResponse URL に変更する
  //    (例: https://docs.google.com/forms/d/e/xxxxxxxxxxxxx/formResponse)
  // 2. 各入力欄の name 属性 (entry.REPLACE_WITH_◯◯_ID) を、
  //    Googleフォーム側の実際の entry ID に変更する
  //
  // 送信は非表示のiframe(hidden_iframe)をtargetにしたネイティブなフォーム送信
  // で行うため、ページ遷移は発生しません。Googleフォーム側はCORS越しに応答を
  // 返さない仕様のため、JS側では「iframeの読み込み完了」をもって送信完了と
  // みなしています(実際に受理されたかどうかまでは検知できません)。
  // ------------------------------------------------------------------
  let submitted = false;

  form.addEventListener('submit', (event) => {
    if (!form.checkValidity()) {
      event.preventDefault();
      form.reportValidity();
      return;
    }
    // ここでpreventDefaultはしない。隠しiframeへネイティブ送信させる。
    submitted = true;
  });

  if (hiddenIframe) {
    // ページ読み込み直後の初回load(iframeの空の初期状態)は無視し、
    // フォーム送信によるload(2回目以降)だけを完了とみなす。
    hiddenIframe.addEventListener('load', () => {
      if (!submitted) return;
      submitted = false;
      form.reset();
      if (successMessage) {
        successMessage.classList.remove('hidden');
        setTimeout(() => successMessage.classList.add('hidden'), 5000);
      }
    });
  }
}

function initFooterYear() {
  const yearEl = document.getElementById('footer-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}
