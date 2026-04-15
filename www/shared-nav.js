import { getApps } from 'https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js';
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js';
import { getFirestore, collection, doc, addDoc, onSnapshot, query, orderBy, limit, serverTimestamp, writeBatch, getDocs, deleteDoc } from 'https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js';
import { changelogData } from './changelog-data.js';

export class AppNavigation {
    constructor(config) {
        this.appName = config.appName || 'My App';
        this.appIcon = config.appIcon || 'fa-cube';
        this.themeColor = config.themeColor || 'blue'; 
        this.tabs = config.tabs || []; 
        this.activeTab = config.activeTab || '';
        this.userEmail = config.userEmail || 'Guest';
        this.version = (changelogData && changelogData.length > 0) ? changelogData[0].version : (config.version || '');
        this.search = config.search || null; 
        this.onThemeChange = config.onThemeChange || null;
        
        this.notifications = []; 
        this.unreadCount = 0;
        
        this.hubApps = [
            { name: 'Dashboard', url: '/dashboard', icon: 'fa-gauge-high', color: 'bg-slate-700' },
            { name: 'RouteTrackr', url: '/routetrackr', icon: 'fa-map-location-dot', color: 'bg-lime-600' },
            { name: 'FoodTrackr', url: '/foodtrackr', icon: 'fa-utensils', color: 'bg-orange-600' },
            { name: 'RecipeManagr', url: '/recipemanagr', icon: 'fa-book-open', color: 'bg-teal-600' },
            { name: 'TaskTrackr', url: '/tasktrackr', icon: 'fa-check-double', color: 'bg-blue-600' },
            { name: 'VidTrackr', url: '/vidtrackr', icon: 'fa-ticket', color: 'bg-red-600' },
            { name: 'BookTrackr', url: '/booktrackr', icon: 'fa-book-open', color: 'bg-amber-500' },
            { name: 'HealthManagr', url: '/healthmanagr', icon: 'fa-notes-medical', color: 'bg-pink-600' },
            { name: 'PodTrackr', url: '/podtrackr', icon: 'fa-podcast', color: 'bg-purple-600' },
            { name: 'Loggr', url: '/log', icon: 'fa-pen-to-square', color: 'bg-green-600' },
            { name: 'Analyser', url: '/analyser', icon: 'fa-chart-line', color: 'bg-indigo-600' },
            { name: 'Hydration', url: '/hydrationtrackr', icon: 'fa-droplet', color: 'bg-cyan-600' },
            { name: 'Vehicle', url: '/vehiclemanagr', icon: 'fa-car-tunnel', color: 'bg-zinc-600' },
            { name: 'Warranty', url: '/warrantytrackr', icon: 'fa-shield-halved', color: 'bg-emerald-600' },
            { name: 'PetManagr', url: '/petmanagr', icon: 'fa-paw', color: 'bg-indigo-600' },
            { name: 'PlantTrackr', url: '/planttrackr', icon: 'fa-leaf', color: 'bg-green-600' },
            { name: 'MoneyManagr', url: '/moneymanagr', icon: 'fa-piggy-bank', color: 'bg-blue-500' },
        ];

        this.hubTools = [
            { name: 'Account', url: '/account', icon: 'fa-user-gear', color: 'bg-gray-600' },
            { name: 'Text Generator', url: '/work', icon: 'fa-envelope-open-text', color: 'bg-fuchsia-600' },
            { name: 'Label Generator', url: '/labelgenerator', icon: 'fa-print', color: 'bg-lime-600' },
            { name: 'PDF Tools', url: '/pdftools', icon: 'fa-file-pdf', color: 'bg-rose-600' },
            { name: 'Time Tool', url: '/time', icon: 'fa-clock', color: 'bg-sky-600' },
            { name: 'Converter', url: '/converter', icon: 'fa-exchange-alt', color: 'bg-amber-600' },
            { name: 'Palette Generator', url: '/palette', icon: 'fa-palette', color: 'bg-emerald-600' },
            { name: 'Icon Generator', url: '/icongenerator', icon: 'fa-box', color: 'bg-pink-400' },
            { name: 'LightManagr', url: '/lightmanagr', icon: 'fa-lightbulb', color: 'bg-yellow-500' },
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

        // Start listening to the cloud database
        this.listenToNotifications();
        
        // Fetch and display Service Worker version
        this.displayServiceWorkerVersion();
    }

    async displayServiceWorkerVersion() {
        const swDisplay = document.getElementById('nav-sw-version');
        if (!swDisplay) return;
        
        try {
            const res = await fetch('/sw-version');
            if (res.ok) {
                const version = await res.text();
                swDisplay.textContent = `SW: v${version}`;
            } else {
                swDisplay.textContent = 'SW: Updating...';
            }
        } catch (e) {
            swDisplay.textContent = 'SW: Offline';
        }
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

                            <div id="hub-dropdown-menu" class="hidden absolute top-full left-0 mt-2 w-72 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-100 dark:border-gray-700 p-3 z-[100] transform origin-top-left transition-all duration-200 flex flex-col gap-3">
                                
                                <div class="grid grid-cols-3 gap-2">
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

                                <div class="border-t border-gray-100 dark:border-gray-700 pt-2">
                                    <div class="grid grid-cols-9 gap-1 justify-items-center">
                                        ${this.hubTools.map(tool => `
                                        <a href="${tool.url}" class="${tool.color} text-white w-6 h-6 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity" title="${tool.name}">
                                            <i class="fa-solid ${tool.icon} text-[10px]"></i>
                                        </a>
                                        `).join('')}
                                    </div>
                                </div>

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

                        <div class="relative group" id="nav-notifications-container">
                            <button id="nav-bell-btn" class="relative w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-900/50 text-gray-500 dark:text-gray-400 hover:text-${this.themeColor}-600 dark:hover:text-${this.themeColor}-400 flex items-center justify-center transition-all">
                                <i class="fa-regular fa-bell"></i>
                                <span id="nav-bell-badge" class="hidden absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white dark:border-gray-800"></span>
                            </button>
                            
                            <div id="nav-notifications-menu" class="hidden absolute top-full right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden z-[100] transform origin-top-right transition-all duration-200">
                                <div class="p-3 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-800/80">
                                    <h3 class="text-xs font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider">Notifications</h3>
                                    <button id="nav-clear-notifications" class="text-[10px] text-${this.themeColor}-600 dark:text-${this.themeColor}-400 hover:underline">Clear All</button>
                                </div>
                                <div id="nav-notifications-list" class="max-h-64 overflow-y-auto p-2 flex flex-col gap-1">
                                    <div class="p-4 text-center text-xs text-gray-400 dark:text-gray-500">No new notifications</div>
                                </div>
                            </div>
                        </div>
                        
                        <a href="#" id="nav-user-avatar" class="hidden lg:flex items-center justify-center w-8 h-8 rounded-full bg-${this.themeColor}-100 dark:bg-${this.themeColor}-900/30 text-${this.themeColor}-600 dark:text-${this.themeColor}-400 font-bold text-xs border border-${this.themeColor}-200 dark:border-${this.themeColor}-800 cursor-pointer hover:opacity-80 transition-opacity" title="Logged in as: ${this.userEmail}">
                            ${userInitial}
                        </a>

                        <button id="nav-theme-toggle" class="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-900/50 text-gray-500 dark:text-gray-400 hover:text-${this.themeColor}-600 dark:hover:text-${this.themeColor}-400 flex items-center justify-center transition-all duration-500 ease-in-out">
                            <i id="theme-icon-moon" class="fas fa-moon"></i>
                            <i id="theme-icon-sun" class="fas fa-sun" style="display: none;"></i>
                        </button>
                        
                        <button id="nav-logout-btn" class="bg-red-50 dark:bg-red-900/20 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/40 text-xs font-bold py-1.5 px-3 rounded-lg transition-colors">
                            Log Out
                        </button>
                    </div>
                </div>
            </div>
            
            <div class="fixed top-1 right-2 flex flex-col items-end z-[100]">
                ${this.version ? `
                    <a href="/changelog" class="text-[10px] font-mono text-gray-400 dark:text-gray-600 hover:text-gray-600 dark:hover:text-gray-400 transition-colors" title="App Version ${this.version}">
                        App: ${this.version}
                    </a>
                ` : ''}
                <span id="nav-sw-version" class="text-[9px] font-mono text-gray-300 dark:text-gray-700" title="Service Worker Version">SW: ---</span>
            </div>
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
                moon.style.display = 'none';
                sun.style.display = 'inline-block';
            } else {
                moon.style.display = 'inline-block';
                sun.style.display = 'none';
            }
        }
    }

    addNotification(notification) {
        const auth = getAuth();
        const user = auth.currentUser;
        if (!user) return; 

        const db = getFirestore();
        const notifRef = collection(db, 'users', user.uid, 'notifications');

        addDoc(notifRef, {
            title: notification.title || 'New Notification',
            body: notification.body || '',
            appName: notification.appName || this.appName || null, // Added appName tracking
            time: serverTimestamp(),
            read: false,
            actionUrl: notification.actionUrl || null,
            actionEvent: notification.actionEvent || null,
            actionText: notification.actionText || 'Resolve',
            priority: notification.priority || false,
            color: notification.color || this.themeColor || 'gray'
        });
    }

    updateNotificationBadge() {
        const badge = document.getElementById('nav-bell-badge');
        const bellIcon = document.querySelector('#nav-bell-btn i');
        
        if (badge && bellIcon) {
            if (this.unreadCount > 0) {
                badge.classList.remove('hidden');
                bellIcon.classList.replace('fa-regular', 'fa-solid'); // Solid bell when unread
                bellIcon.classList.add('animate-pulse', `text-${this.themeColor}-500`);
            } else {
                badge.classList.add('hidden');
                bellIcon.classList.replace('fa-solid', 'fa-regular');
                bellIcon.classList.remove('animate-pulse', `text-${this.themeColor}-500`);
            }
        }
    }

    markNotificationsAsRead() {
        if (this.unreadCount === 0) return;
        const auth = getAuth();
        const user = auth.currentUser;
        if (!user) return;

        const db = getFirestore();
        const batch = writeBatch(db);

        this.notifications.forEach(n => {
            if (!n.read) {
                const ref = doc(db, 'users', user.uid, 'notifications', n.id);
                batch.update(ref, { read: true });
            }
        });

        batch.commit().catch(err => console.error("Error marking notifications read:", err));
    }

    listenToNotifications() {
        // Wait for Firebase to be fully initialized by the host page
        if (getApps().length === 0) {
            setTimeout(() => this.listenToNotifications(), 50);
            return;
        }

        const auth = getAuth();
        onAuthStateChanged(auth, user => {
            if (user) {
                const db = getFirestore();
                const notifRef = collection(db, 'users', user.uid, 'notifications');
                const q = query(notifRef, orderBy('time', 'desc'), limit(20));

                onSnapshot(q, snapshot => {
                    this.notifications = [];
                    let unread = 0;
                    
                    snapshot.forEach(docSnap => {
                        const data = docSnap.data();
                        this.notifications.push({
                            id: docSnap.id,
                            ...data,
                            time: data.time ? data.time.toDate() : new Date() 
                        });
                        if (!data.read) unread++;
                    });
                    
                    this.unreadCount = unread;
                    this.updateNotificationBadge();
                    this.renderNotificationsList();
                }, error => {
                    console.error("Error listening to notifications:", error);
                });
            } else {
                this.notifications = [];
                this.unreadCount = 0;
                this.updateNotificationBadge();
                this.renderNotificationsList();
            }
        });
    }

    renderNotificationsList() {
        const listEl = document.getElementById('nav-notifications-list');
        if (!listEl) return;

        if (this.notifications.length === 0) {
            listEl.innerHTML = `<div class="p-4 text-center text-xs text-gray-400 dark:text-gray-500">No new notifications</div>`;
            return;
        }

        listEl.innerHTML = this.notifications.map(notif => `
            <div class="p-2 rounded-lg relative ${notif.read ? 'opacity-70' : `bg-${notif.color || this.themeColor}-50 dark:bg-${notif.color || this.themeColor}-900/20`} hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors border ${notif.priority ? 'border-red-300 dark:border-red-900/50' : (!notif.read ? `dark:border-${notif.color || this.themeColor}-900/50 border-${notif.color || this.themeColor}-100` : 'border-transparent')}">
                ${!notif.priority ? `<button class="delete-single-notif absolute top-1 right-2 text-gray-400 hover:text-red-500" data-id="${notif.id}"><i class="fa-solid fa-xmark text-[11px]"></i></button>` : ''}
                
                <div class="flex justify-between items-start mb-0.5 pr-5">
                    <span class="text-xs font-bold text-gray-800 dark:text-gray-200 flex items-center gap-1">
                        ${notif.priority ? '<i class="fa-solid fa-circle-exclamation text-red-500" title="Priority Task - Must be completed to dismiss"></i>' : ''}
                        ${notif.title}
                    </span>
                    <span class="text-[9px] text-gray-400">${notif.time.toLocaleDateString([], {month: 'short', day: 'numeric'})} ${notif.time.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                </div>
                
                ${notif.appName ? `<div class="flex justify-between items-center mb-1"><span class="text-[9px] text-${notif.color || this.themeColor}-500 font-semibold">${notif.appName}</span> <button class="clear-app-notifs text-[9px] text-gray-400 hover:text-red-500 hover:underline" data-app="${notif.appName}">Clear App</button></div>` : ''}
                
                <div class="notif-body-container text-[10px] text-gray-600 dark:text-gray-400 leading-tight mb-1">
                    <div class="line-clamp-2 transition-all duration-200">${notif.body}</div>
                    ${notif.body && notif.body.length > 65 ? `<button class="text-[9px] text-blue-500 hover:underline expand-notif-btn mt-0.5">Show more</button>` : ''}
                </div>
                
                ${notif.actionUrl ? `<a href="${notif.actionUrl}" class="inline-block text-[10px] font-bold text-${notif.color || this.themeColor}-600 dark:text-${notif.color || this.themeColor}-400 hover:underline mt-1">${notif.actionText}</a>` : ''}
                ${notif.actionEvent && !notif.actionUrl ? `<button onclick="window.dispatchEvent(new Event('${notif.actionEvent}'))" class="text-[10px] font-bold text-${notif.color || this.themeColor}-600 dark:text-${notif.color || this.themeColor}-400 hover:underline mt-1">${notif.actionText}</button>` : ''}
            </div>
        `).join('');
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

        // Add this inside attachEvents()
        const bellBtn = document.getElementById('nav-bell-btn');
        const notifMenu = document.getElementById('nav-notifications-menu');
        const clearNotifsBtn = document.getElementById('nav-clear-notifications');

        if (bellBtn && notifMenu) {
            bellBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                notifMenu.classList.toggle('hidden');
                this.markNotificationsAsRead();
            });

            document.addEventListener('click', (e) => {
                if (!bellBtn.contains(e.target) && !notifMenu.contains(e.target)) {
                    notifMenu.classList.add('hidden');
                }
            });
            
            // Inside attachEvents():
            clearNotifsBtn.addEventListener('click', async (e) => {
                e.stopPropagation();
                const auth = getAuth();
                const user = auth.currentUser;
                if (!user) return;

                const db = getFirestore();
                const batch = writeBatch(db);
                const notifRef = collection(db, 'users', user.uid, 'notifications');
                
                try {
                    const snapshot = await getDocs(notifRef);
                    snapshot.docs.forEach(docSnap => {
                        if (docSnap.data().priority !== true) {
                            batch.delete(docSnap.ref);
                        }
                    });
                    await batch.commit();
                } catch (err) {
                    console.error("Error clearing notifications:", err);
                }
            });
        }

        // Connect to the Service Worker BroadcastChannel for FCM messages
        const channel = new BroadcastChannel('app-notifications');
        channel.onmessage = (event) => {
            if (event.data && event.data.notification) {
                // Pass the notification object to the app
                this.addNotification(event.data.notification);
            }
        };

        // Fallback for in-app triggered events (if you still use them elsewhere)
        window.addEventListener('app-new-notification', (e) => {
            if (e.detail) {
                this.addNotification(e.detail);
            }
        });

        const themeBtn = document.getElementById('nav-theme-toggle');
        if(themeBtn) {
            themeBtn.addEventListener('click', () => {
                const isDark = !document.documentElement.classList.contains('dark');
                this.applyTheme(isDark);
                if (this.onThemeChange) {
                    this.onThemeChange(isDark ? 'dark' : 'light');
                }
                themeBtn.classList.add('rotate-360');
                setTimeout(() => themeBtn.classList.remove('rotate-360'), 500);
            });
        }
        
        document.getElementById('nav-logout-btn').addEventListener('click', () => {
             if(window.confirm('Log out?')) window.dispatchEvent(new CustomEvent('app-logout-request'));
        });

        const avatarBtn = document.getElementById('nav-user-avatar');
        if (avatarBtn) {
            avatarBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const user = getAuth().currentUser;
                if (user) {
                    window.location.href = `/public/index.html?id=${user.uid}`;
                }
            });
        }
        // Add this inside attachEvents() at the very end
        const listEl = document.getElementById('nav-notifications-list');
        if (listEl) {
            listEl.addEventListener('click', async (e) => {
                const deleteBtn = e.target.closest('.delete-single-notif');
                const clearAppBtn = e.target.closest('.clear-app-notifs');
                const expandBtn = e.target.closest('.expand-notif-btn');
                
                const auth = getAuth();
                const user = auth?.currentUser;
                const db = getFirestore();

                if (deleteBtn && user) {
                    e.stopPropagation();
                    const id = deleteBtn.dataset.id;
                    await deleteDoc(doc(db, 'users', user.uid, 'notifications', id));
                }
                
                if (clearAppBtn && user) {
                    e.stopPropagation();
                    const appName = clearAppBtn.dataset.app;
                    const batch = writeBatch(db);
                    this.notifications.filter(n => n.appName === appName && n.priority !== true).forEach(n => {
                        batch.delete(doc(db, 'users', user.uid, 'notifications', n.id));
                    });
                    await batch.commit();
                }

                if (expandBtn) {
                    e.stopPropagation();
                    const bodyDiv = expandBtn.previousElementSibling;
                    if (bodyDiv.classList.contains('line-clamp-2')) {
                        bodyDiv.classList.remove('line-clamp-2');
                        expandBtn.textContent = 'Show less';
                    } else {
                        bodyDiv.classList.add('line-clamp-2');
                        expandBtn.textContent = 'Show more';
                    }
                }
            });
        }
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