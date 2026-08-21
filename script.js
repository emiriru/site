const year = document.querySelector('#year');
const contactForm = document.querySelector('.contact-form');

year.textContent = new Date().getFullYear();

contactForm.addEventListener('submit', (event) => {
    const endpoint = contactForm.dataset.formEndpoint.trim();
    const status = contactForm.querySelector('.form-status');

    if (!endpoint)
    {
        event.preventDefault();
        status.textContent = 'フォームの送信先が未設定です。FormspreeなどのURLを設定してください。';
        return;
    }

    contactForm.action = endpoint;
    status.textContent = '送信しています。';
});