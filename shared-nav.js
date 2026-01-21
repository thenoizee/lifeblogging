export class AppNavigation {
    constructor(config) {
        this.appName = config.appName || 'My App';
        this.appIcon = config.appIcon || 'fa-cube';
        this.themeColor = config.themeColor || 'blue'; 
        this.tabs = config.tabs || []; 
        this.activeTab = config.activeTab || '';
        this.userEmail = config.userEmail || 'Guest';
        this.version = config.version || '';
        this.search = config.search || null; // NEW: Search Config
        this.onThemeChange = config.onThemeChange || null; // <--- ADD THIS
        
        this.hubApps = [
            { name: 'Dashboard', url: '/dashboard', icon: 'fa-gauge-high', color: 'bg-slate-700' },
            { name: 'FoodTrackr', url: '/foodtrackr', icon: 'fa-utensils', color: 'bg-orange-600' },
            { name: 'RecipeManagr', url: '/recipemanagr', icon: 'fa-book-open', color: 'bg-teal-600' },
            { name: 'TaskTrackr', url: '/tasktrackr', icon: 'fa-check-double', color: 'bg-blue-600' },
            { name: 'VidTrackr', url: '/vidtrackr', icon: 'fa-ticket', color: 'bg-red-600' },
            { name: 'MediManagr', url: '/medimanagr', icon: 'fa-pills', color: 'bg-pink-600' },
            { name: 'PodTrackr', url: '/podtrackr', icon: 'fa-podcast', color: 'bg-purple-600' },
            { name: 'Logger', url: '/log', icon: 'fa-pen-to-square', color: 'bg-green-600' },
            { name: 'Analyser', url: '/analyser', icon: 'fa-chart-line', color: 'bg-indigo-600' },
            { name: 'Hydration', url: '/hydrationtrackr', icon: 'fa-droplet', color: 'bg-cyan-600' },
            { name: 'Vehicle', url: '/vehiclemanagr', icon: 'fa-car-tunnel', color: 'bg-zinc-600' },
            { name: 'Warranty', url: '/warrantytrackr', icon: 'fa-shield-halved', color: 'bg-emerald-600' },
        ];

        this.init();
    }

    init() {
        this.injectGlobalStyles();
        this.renderHeader();
        this.renderMobileNav();
        this.attachEvents();
        
        const storedTheme = localStorage.getItem('theme') || 'dark';
        this.applyTheme(storedTheme === 'dark');
        
        this.updateActiveTab(this.activeTab);
    }

    updateUser(email) {
        this.userEmail = email || 'Guest';
        const initial = this.userEmail.charAt(0).toUpperCase();
        
        const avatarEl = document.getElementById('nav-user-avatar');
        if (avatarEl) {
            avatarEl.textContent = initial;
            avatarEl.title = `Logged in as: ${this.userEmail}`;
        }
    }

    injectGlobalStyles() {
        const styleId = 'shared-nav-styles';
        if (document.getElementById(styleId)) return;

        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = `
            /* Custom Scrollbar */
            ::-webkit-scrollbar { width: 8px; height: 8px; }
            ::-webkit-scrollbar-track { background: transparent; }
            .dark ::-webkit-scrollbar-track { background: #111827; }
            ::-webkit-scrollbar-thumb { background: #9ca3af; border-radius: 4px; }
            .dark ::-webkit-scrollbar-thumb { background: #4b5563; }
            ::-webkit-scrollbar-thumb:hover { background: #6b7280; }
            
            /* Theme Toggle Animation */
            .rotate-360 { transform: rotate(360deg); }
        `;
        document.head.appendChild(style);
    }

    renderHeader() {
        const userInitial = this.userEmail.charAt(0).toUpperCase();

        const headerHtml = `
<header class="sticky top-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md shadow-sm z-50 shrink-0 border-b border-gray-200 dark:border-gray-700 transition-colors duration-300 md:mb-8">
            <div class="container mx-auto px-4 py-2">
                <div class="flex items-center justify-between h-12">
                    
                    <div class="flex items-center gap-3">
                        <div id="hub-container" class="relative group">
                            <div class="flex rounded-lg shadow-sm overflow-hidden">
                                <a href="/" class="bg-${this.themeColor}-600 hover:bg-${this.themeColor}-700 text-white text-xs font-bold py-2 px-3 flex items-center gap-1 transition-colors">
                                    <i class="fa-solid fa-arrow-left"></i> Hub
                                </a>
                                <button id="hub-dropdown-btn" class="bg-${this.themeColor}-700 hover:bg-${this.themeColor}-800 text-white px-2 flex items-center justify-center border-l border-${this.themeColor}-600 transition-colors">
                                    <i class="fa-solid fa-chevron-down text-[10px]"></i>
                                </button>
                            </div>

                            <div id="hub-dropdown-menu" class="hidden absolute top-full left-0 mt-2 w-72 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-100 dark:border-gray-700 p-3 grid grid-cols-3 gap-2 z-[100] transform origin-top-left transition-all duration-200">
                                ${this.hubApps.map(app => {
                                    const isCurrent = app.name === this.appName;
                                    const pointerClass = isCurrent ? 'cursor-default opacity-50 ring-2 ring-gray-200 dark:ring-gray-700' : 'hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer group/item';
                                    
                                    return `
                                    <a href="${isCurrent ? '#' : app.url}" class="flex flex-col items-center justify-center p-2 rounded-lg transition-all text-center ${pointerClass}">
                                        <div class="${app.color} text-white w-8 h-8 rounded-full flex items-center justify-center mb-1 shadow-sm ${!isCurrent ? 'group-hover/item:scale-110' : ''} transition-transform">
                                            <i class="fa-solid ${app.icon} text-xs"></i>
                                        </div>
                                        <span class="text-[10px] font-semibold text-gray-600 dark:text-gray-300 truncate w-full">${app.name}</span>
                                    </a>
                                    `;
                                }).join('')}
                            </div>
                        </div>

                        <div class="h-6 w-px bg-gray-300 dark:bg-gray-600 mx-1 hidden sm:block"></div>

                        <a href="#" class="flex items-center gap-2 text-xl font-bold text-${this.themeColor}-600 dark:text-${this.themeColor}-500 no-underline hover:opacity-80 transition">
                            <i class="fa-solid ${this.appIcon}"></i>
                            <span class="hidden sm:inline">${this.appName}</span>
                        </a>
                    </div>

                    <nav class="hidden md:flex items-center gap-1 bg-gray-100/80 dark:bg-gray-900/50 p-1 rounded-lg">
                        ${this.tabs.map(tab => `
                            <button class="nav-tab-btn px-4 py-1.5 rounded-md text-sm font-semibold text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-all" data-tab="${tab.id}">
                                <i class="fa-solid ${tab.icon} mr-1.5"></i>${tab.label}
                            </button>
                        `).join('')}
                    </nav>

                    <div class="flex items-center gap-3">
                        ${this.search ? `
                        <div class="hidden md:block relative mx-2">
                             <i class="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs"></i>
                             <input type="search" id="${this.search.id}" placeholder="${this.search.placeholder || 'Search...'}" 
                                class="bg-gray-100 dark:bg-gray-900/50 border-none text-gray-600 dark:text-gray-300 text-xs rounded-lg py-1.5 pl-8 pr-4 w-40 lg:w-48 focus:ring-2 focus:ring-${this.themeColor}-500 focus:outline-none transition-all">
                        </div>
                        ` : ''}

                        <div id="nav-user-avatar" class="hidden lg:flex items-center justify-center w-8 h-8 rounded-full bg-${this.themeColor}-100 dark:bg-${this.themeColor}-900/30 text-${this.themeColor}-600 dark:text-${this.themeColor}-400 font-bold text-xs border border-${this.themeColor}-200 dark:border-${this.themeColor}-800 cursor-help" title="Logged in as: ${this.userEmail}">
                            ${userInitial}
                        </div>

                        <button id="nav-theme-toggle" class="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-900/50 text-gray-500 dark:text-gray-400 hover:text-${this.themeColor}-600 dark:hover:text-${this.themeColor}-400 flex items-center justify-center transition-all duration-500 ease-in-out">
                            <i id="theme-icon-moon" class="fas fa-moon"></i>
                            <i id="theme-icon-sun" class="fas fa-sun hidden"></i>
                        </button>
                        
                        <button id="nav-logout-btn" class="bg-red-50 dark:bg-red-900/20 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/40 text-xs font-bold py-1.5 px-3 rounded-lg transition-colors">
                            Log Out
                        </button>
                    </div>
                </div>
            </div>
            
            ${this.version ? `
                <a href="/changelog" class="fixed top-1 right-1 text-[10px] font-mono text-gray-300 dark:text-gray-600 hover:text-gray-500 dark:hover:text-gray-400 z-[100] transition-colors" title="v${this.version}">
                    ${this.version}
                </a>
            ` : ''}
        </header>
        `;

        const existingHeader = document.querySelector('header');
        if (existingHeader) existingHeader.remove();
        document.body.insertAdjacentHTML('afterbegin', headerHtml);
    }

    renderMobileNav() {
        if (!this.tabs.length) return;
        const mobileHtml = `
        <nav class="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border-t border-gray-200 dark:border-gray-700 z-40 pb-safe shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
            <div class="flex justify-around items-center h-16">
                <a href="/" class="flex flex-col items-center justify-center w-full h-full text-gray-400 hover:text-${this.themeColor}-500 transition-colors gap-1">
                    <i class="fa-solid fa-arrow-left text-lg"></i>
                    <span class="text-[10px] font-medium">Hub</span>
                </a>
                ${this.tabs.map(tab => `
                    <button class="mobile-nav-btn flex flex-col items-center justify-center w-full h-full text-gray-400 hover:text-${this.themeColor}-500 transition-colors gap-1" data-tab="${tab.id}">
                        <i class="fa-solid ${tab.icon} text-lg"></i>
                        <span class="text-[10px] font-medium">${tab.label}</span>
                    </button>
                `).join('')}
            </div>
        </nav>
        <style> .pb-safe { padding-bottom: env(safe-area-inset-bottom, 0px); } body { padding-bottom: 5rem; } </style>
        `;

        const existingNav = document.querySelector('nav.md\\:hidden');
        if (existingNav) existingNav.remove();
        document.body.insertAdjacentHTML('beforeend', mobileHtml);
    }

    applyTheme(isDark) {
        if(isDark) {
            document.documentElement.classList.add('dark');
            document.documentElement.classList.remove('light');
        } else {
            document.documentElement.classList.remove('dark');
            document.documentElement.classList.add('light');
        }
        localStorage.setItem('theme', isDark ? 'dark' : 'light');

        const moon = document.getElementById('theme-icon-moon');
        const sun = document.getElementById('theme-icon-sun');
        if (moon && sun) {
            if(isDark) {
                moon.classList.add('hidden');
                sun.classList.remove('hidden');
            } else {
                moon.classList.remove('hidden');
                sun.classList.add('hidden');
            }
        }
    }

    attachEvents() {
        const handleTabClick = (e) => {
            const btn = e.target.closest('button');
            if (!btn) return;
            const tabId = btn.dataset.tab;
            this.switchTab(tabId);
        };
        document.querySelectorAll('.nav-tab-btn').forEach(b => b.addEventListener('click', handleTabClick));
        document.querySelectorAll('.mobile-nav-btn').forEach(b => b.addEventListener('click', handleTabClick));

        const dropBtn = document.getElementById('hub-dropdown-btn');
        const dropMenu = document.getElementById('hub-dropdown-menu');
        let hoverTimeout;

        if (dropBtn && dropMenu) {
            const showMenu = () => { clearTimeout(hoverTimeout); dropMenu.classList.remove('hidden'); };
            const hideMenu = () => { hoverTimeout = setTimeout(() => { dropMenu.classList.add('hidden'); }, 300); };

            dropBtn.addEventListener('mouseenter', showMenu);
            dropBtn.addEventListener('mouseleave', hideMenu);
            dropMenu.addEventListener('mouseenter', showMenu);
            dropMenu.addEventListener('mouseleave', hideMenu);
            
            dropBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                if(dropMenu.classList.contains('hidden')) showMenu(); else { clearTimeout(hoverTimeout); dropMenu.classList.add('hidden'); }
            });
            document.addEventListener('click', (e) => {
                if (!dropBtn.contains(e.target) && !dropMenu.contains(e.target)) dropMenu.classList.add('hidden');
            });
        }

        const themeBtn = document.getElementById('nav-theme-toggle');
        if(themeBtn) {
            themeBtn.addEventListener('click', () => {
                const isDark = !document.documentElement.classList.contains('dark');
                this.applyTheme(isDark);
                // <--- ADD THIS BLOCK --->
                if (this.onThemeChange) {
                    this.onThemeChange(isDark ? 'dark' : 'light');
                }
                // <--- END ADD BLOCK --->
                themeBtn.classList.add('rotate-360');
                setTimeout(() => themeBtn.classList.remove('rotate-360'), 500);
            });
        }
        
        document.getElementById('nav-logout-btn').addEventListener('click', () => {
             if(window.confirm('Log out?')) window.dispatchEvent(new CustomEvent('app-logout-request'));
        });
    }

    switchTab(tabId) {
        this.activeTab = tabId;
        const activeClassDesktop = `text-${this.themeColor}-600 dark:text-${this.themeColor}-400 bg-white dark:bg-gray-900 shadow-sm ring-1 ring-gray-200 dark:ring-gray-700`;
        const inactiveClassDesktop = `text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100`;

        document.querySelectorAll('.nav-tab-btn').forEach(btn => {
            if (btn.dataset.tab === tabId) btn.className = `nav-tab-btn px-4 py-1.5 rounded-md text-sm font-bold transition-all ${activeClassDesktop}`;
            else btn.className = `nav-tab-btn px-4 py-1.5 rounded-md text-sm font-semibold transition-all ${inactiveClassDesktop}`;
        });

        document.querySelectorAll('.mobile-nav-btn').forEach(btn => {
            if (btn.dataset.tab === tabId) {
                btn.classList.add(`text-${this.themeColor}-600`, `dark:text-${this.themeColor}-400`);
                btn.classList.remove('text-gray-400');
            } else {
                btn.classList.remove(`text-${this.themeColor}-600`, `dark:text-${this.themeColor}-400`);
                btn.classList.add('text-gray-400');
            }
        });
        window.dispatchEvent(new CustomEvent('tab-changed', { detail: { tabId } }));
    }
    
    updateActiveTab(tabId) { this.switchTab(tabId); }
}