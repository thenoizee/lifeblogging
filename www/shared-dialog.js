// /shared-dialog.js
// Unified, dark-mode-aware, mobile-first dialog modal (replaces native alert/confirm/prompt).

let dialogQueue = Promise.resolve();

function ensureDialogModal() {
    let modal = document.getElementById('shared-app-dialog-modal');
    if (modal) return modal;

    modal = document.createElement('div');
    modal.id = 'shared-app-dialog-modal';
    modal.className = 'fixed inset-0 bg-black/65 hidden items-end md:items-center justify-center p-0 md:p-4';
    modal.style.zIndex = '2147483647';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-labelledby', 'shared-dialog-title');

    modal.innerHTML = `
        <div id="shared-dialog-panel" class="bg-white dark:bg-gray-800 rounded-t-2xl md:rounded-2xl shadow-2xl w-full md:max-w-md p-5 pb-[max(1.25rem,env(safe-area-inset-bottom,0px))] md:pb-5 border-t md:border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
            <div class="flex items-start gap-3 mb-3">
                <div id="shared-dialog-icon-wrap" class="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400">
                    <i id="shared-dialog-icon" class="fa-solid fa-circle-question text-base"></i>
                </div>
                <div class="min-w-0 flex-1">
                    <h3 id="shared-dialog-title" class="text-base md:text-lg font-bold text-gray-900 dark:text-gray-100 leading-snug"></h3>
                    <p id="shared-dialog-message" class="text-sm text-gray-600 dark:text-gray-300 mt-1 whitespace-pre-line break-words hidden"></p>
                </div>
            </div>
            <input id="shared-dialog-input" type="text" class="w-full px-3.5 py-2.5 mb-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-base md:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 hidden" />
            <div class="flex gap-2.5 justify-end pt-1">
                <button id="shared-dialog-cancel" type="button" class="flex-1 md:flex-none px-4 py-2.5 rounded-xl text-sm font-bold bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors cursor-pointer">Cancel</button>
                <button id="shared-dialog-confirm" type="button" class="flex-1 md:flex-none px-4 py-2.5 rounded-xl text-sm font-bold bg-indigo-600 hover:bg-indigo-700 text-white transition-colors cursor-pointer">Confirm</button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    return modal;
}

function openDialog(opts) {
    const run = () => new Promise((resolve) => {
        const modal = ensureDialogModal();
        const iconWrap = document.getElementById('shared-dialog-icon-wrap');
        const iconEl = document.getElementById('shared-dialog-icon');
        const titleEl = document.getElementById('shared-dialog-title');
        const msgEl = document.getElementById('shared-dialog-message');
        const inputEl = document.getElementById('shared-dialog-input');
        const cancelBtn = document.getElementById('shared-dialog-cancel');
        const confirmBtn = document.getElementById('shared-dialog-confirm');

        const {
            mode = 'confirm', // 'alert' | 'confirm' | 'prompt'
            title = '',
            message = '',
            defaultValue = '',
            placeholder = '',
            confirmText = mode === 'alert' ? 'OK' : (mode === 'prompt' ? 'Save' : 'Confirm'),
            cancelText = 'Cancel',
            danger = false
        } = opts;

        titleEl.textContent = title || (mode === 'alert' ? 'Notice' : (mode === 'prompt' ? 'Enter Value' : 'Confirm Action'));

        if (message) {
            msgEl.textContent = message;
            msgEl.classList.remove('hidden');
        } else {
            msgEl.textContent = '';
            msgEl.classList.add('hidden');
        }

        if (danger) {
            iconWrap.className = 'w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400';
            iconEl.className = 'fa-solid fa-triangle-exclamation text-base';
        } else if (mode === 'prompt') {
            iconWrap.className = 'w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400';
            iconEl.className = 'fa-solid fa-pen-to-square text-base';
        } else if (mode === 'alert') {
            iconWrap.className = 'w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400';
            iconEl.className = 'fa-solid fa-circle-info text-base';
        } else {
            iconWrap.className = 'w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400';
            iconEl.className = 'fa-solid fa-circle-question text-base';
        }

        if (mode === 'prompt') {
            inputEl.value = defaultValue ?? '';
            inputEl.placeholder = placeholder || '';
            inputEl.classList.remove('hidden');
        } else {
            inputEl.value = '';
            inputEl.classList.add('hidden');
        }

        if (mode === 'alert') {
            cancelBtn.classList.add('hidden');
        } else {
            cancelBtn.textContent = cancelText;
            cancelBtn.classList.remove('hidden');
        }

        confirmBtn.textContent = confirmText;
        if (danger) {
            confirmBtn.className = 'flex-1 md:flex-none px-4 py-2.5 rounded-xl text-sm font-bold bg-red-600 hover:bg-red-700 text-white transition-colors cursor-pointer';
            confirmBtn.style.backgroundColor = '';
        } else {
            confirmBtn.className = 'flex-1 md:flex-none px-4 py-2.5 rounded-xl text-sm font-bold bg-indigo-600 hover:opacity-90 text-white transition-opacity cursor-pointer';
            confirmBtn.style.backgroundColor = 'var(--primary, #4f46e5)';
        }

        const cancelVal = mode === 'prompt' ? null : (mode === 'alert' ? undefined : false);
        const confirmVal = () => (mode === 'prompt' ? inputEl.value : (mode === 'alert' ? undefined : true));

        const onKeyDown = (e) => {
            if (e.key === 'Escape') {
                e.preventDefault();
                cleanup(cancelVal);
            } else if (e.key === 'Enter' && document.activeElement !== cancelBtn) {
                e.preventDefault();
                cleanup(confirmVal());
            }
        };

        const cleanup = (val) => {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
            cancelBtn.onclick = null;
            confirmBtn.onclick = null;
            modal.onclick = null;
            document.removeEventListener('keydown', onKeyDown);
            resolve(val);
        };

        cancelBtn.onclick = () => cleanup(cancelVal);
        confirmBtn.onclick = () => cleanup(confirmVal());
        modal.onclick = (e) => {
            if (e.target === modal) cleanup(cancelVal);
        };
        document.addEventListener('keydown', onKeyDown);

        modal.classList.remove('hidden');
        modal.classList.add('flex');

        if (mode === 'prompt') {
            setTimeout(() => {
                inputEl.focus();
                inputEl.select();
            }, 30);
        } else {
            setTimeout(() => confirmBtn.focus(), 30);
        }
    });

    dialogQueue = dialogQueue.then(run, run);
    return dialogQueue;
}

export function appConfirm(optionsOrMessage = {}, title = 'Confirm Action', confirmText = 'Confirm', danger = false) {
    const opts = typeof optionsOrMessage === 'string'
        ? { message: optionsOrMessage, title, confirmText, danger }
        : optionsOrMessage;
    return openDialog({ ...opts, mode: 'confirm' });
}

export function appPrompt(optionsOrMessage = {}, title = 'Enter Value', defaultValue = '', placeholder = '', confirmText = 'Save') {
    const opts = typeof optionsOrMessage === 'string'
        ? { message: optionsOrMessage, title, defaultValue, placeholder, confirmText }
        : optionsOrMessage;
    return openDialog({ ...opts, mode: 'prompt' });
}

export function appAlert(optionsOrMessage = {}, title = 'Notice', confirmText = 'OK', danger = false) {
    const opts = typeof optionsOrMessage === 'string'
        ? { message: optionsOrMessage, title, confirmText, danger }
        : optionsOrMessage;
    return openDialog({ ...opts, mode: 'alert' });
}

if (typeof window !== 'undefined') {
    window.appConfirm = appConfirm;
    window.appPrompt = appPrompt;
    window.appAlert = appAlert;
}
