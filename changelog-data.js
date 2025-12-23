// /changelog-data.js

export const changelogData = [
    {
    version: "v9.61.0-alpha",
    date: "2025-12-23",
    changes: [
        "In TaskTrackr: Added 'Zen Mode' - A distraction-free, full-screen focus view with a large synced Pomodoro timer.",
        "In TaskTrackr: Added 'Brain Dump Scratchpad' - A persistent side drawer for quick notes with a 'Convert to Task' feature.",
        "In TaskTrackr: UI/UX Improvements - Fixed non-centre aligned Add New Task button in bottom right corner."
    ]
    },
    {
    version: "v9.60.2-alpha",
    date: "2025-12-22",
    changes: [
        "In Account: Callback auth bug fix 2."
    ]
    },
    {
    version: "v9.60.1-alpha",
    date: "2025-12-22",
    changes: [
        "In Account: Callback auth bug fix."
    ]
    },
    {
    version: "v9.60.0-alpha",
    date: "2025-12-22",
    changes: [
        "In TaskTrackr: Implemented a centralized `callback.html` to handle OAuth authentication redirects, ensuring consistent login behavior across the application.",
        "In TaskTrackr: Updated the login flow to preserve the user's session state, automatically redirecting them back to their previous page (Hub or Account) after connecting.",
        "In Account: Integrated the new authentication callback to allow users to connect or disconnect their TickTick account directly from the settings interface.",
        "In Account: Added logic to verify and display the TickTick connection status using the shared token stored in Firestore."
    ]
    },
    {
    version: "v9.59.0-alpha",
    date: "2025-12-22",
    changes: [
        "In TaskTrackr: Introduced a 'Review Mode' wizard that allows users to process Inbox tasks one-by-one with options to Delete, Skip, Schedule, or Complete.",
        "In TaskTrackr: Enhanced the right-click context menu to include quick actions for 'Complete', 'Move to Inbox', and a dedicated 'Priority' selection submenu.",
        "In TaskTrackr: Streamlined navigation by moving all filter chips (Today, Tomorrow, Overdue, etc.) from the top bar to the persistent left sidebar on desktop layouts.",
        "In TaskTrackr: Added a 'Process Inbox' button and a 'Clear Project Filter' option to the sidebar for improved workflow efficiency.",
        "In TaskTrackr: Fixed layout issues in Compact Mode for Kanban and Matrix views to ensure cards remain readable.",
        "In TaskTrackr: Optimized the Calendar view rendering for mobile devices and fixed the positioning logic of the context menu to prevent it from being cut off by the screen edge."
    ]
    },
    {
    version: "v9.58.0-alpha",
    date: "2025-12-22",
    changes: [
        "In TaskTrackr: Introduced a new persistent left-hand sidebar for seamless navigation between projects and filters, replacing the top-bar dropdown menu for faster access.",
        "In TaskTrackr: Implemented auto-save functionality in the Side Pane; task titles and descriptions now save automatically to the server when you click away or close the pane.",
        "In TaskTrackr: Fixed an issue where edits made in the side pane would sometimes be lost if the pane was closed without an explicit save action."
    ]
    },
    {
    version: "v9.57.0-alpha",
    date: "2025-12-22",
    changes: [
        "In TaskTrackr: Implemented a custom right-click context menu for tasks, offering quick actions to Edit, Delete, or reschedule to Today/Tomorrow without opening the full details pane.",
        "In TaskTrackr: Revamped the task card interaction design; the main left-hand strip is now a dedicated 'Complete' button for faster, one-click check-offs.",
        "In TaskTrackr: Relocated the 'Select' action to a discrete inner icon next to the task title, preventing accidental selections during normal workflow.",
        "In TaskTrackr: Improved visual cues with distinct hover states for the new completion strip and selection toggle."
    ]
    },
    {
    version: "v9.56.0-alpha",
    date: "2025-12-22",
    changes: [
        "In TaskTrackr: Implemented drag-and-drop rescheduling in the Classic view; users can now drag tasks between day sections (e.g., 'Today' to 'Tomorrow') to automatically update their due dates.",
        "In TaskTrackr: Made all list sections (Overdue, Today, Tomorrow, Later, No Date, Completed) fully collapsible, allowing for a cleaner and more focused workspace.",
        "In TaskTrackr: Enhanced task card visuals to clearly distinguish between 'All Day' items and time-specific tasks, which now display their scheduled time alongside a clock icon.",
        "In TaskTrackr: Added visual empty states to task groups when dragging, ensuring drop targets are always accessible even in empty sections."
    ]
    },
    {
    version: "v9.55.0-alpha",
    date: "2025-12-22",
    changes: [
        "In TaskTrackr: Restored the 'Completed' section by integrating a Firebase Firestore query to fetch and display historical tasks ordered by completion date.",
        "In TaskTrackr: Improved the Side Panel UI with an auto-expanding title text area, allowing full visibility of long task names without scrolling.",
        "In TaskTrackr: Updated the application logic to differentiate between active tasks and history items, ensuring completed tasks can be viewed in detail from the side pane.",
        "In TaskTrackr: Refined the task completion handler to prevent duplicate logging of history items and ensure smoother state transitions.",
        "In TaskTrackr: Fixed the 'Completed' filter behavior to trigger an immediate fetch of historical data, resolving the issue where completed tasks would disappear.",
        "In Account Page: Added ability to link & disconnect account to TickTick directly in the Account Page."
    ]
    },
    {
    version: "v9.54.0-alpha",
    date: "2025-12-21",
    changes: [
        "In TaskTrackr: Added a new 'Timeline' view, visualizing tasks sequentially along a vertical line based on their due dates.",
        "In TaskTrackr: Implemented sorting functionality in the Classic List view, allowing users to toggle between 'By Date' and 'A-Z' (Title) sorting.",
        "In TaskTrackr: Enhanced the Classic List view with distinct section headers (Overdue, Today, Tomorrow, Later) to clearly distinguish task urgency.",
        "In TaskTrackr: Added a fixed Floating Action Button (FAB) (+) in the bottom-right corner for quick task creation.",
        "In TaskTrackr: Overhauled the Side Panel UI with cleaner typography, better spacing, and an improved layout for task details.",
        "In TaskTrackr: Fixed an issue where the task list would refresh and interrupt drag-and-drop operations; drag interactions are now smoother and preserve selection state.",
        "In TaskTrackr: Renamed the 'Cal' navigation tab to 'Calendar' for better clarity."
    ]
    },
    {
    version: "v9.53.0-alpha",
    date: "2025-12-20",
    changes: [
        "In TaskTrackr: Implemented project color coding; task cards now display a visual color strip and tinted badges matching their project's theme.",
        "In TaskTrackr: Enhanced recurring task logic with a 'Complete Session' action that hides the task and automatically schedules the next occurrence.",
        "In TaskTrackr: Added smart toast notifications for recurring tasks, which now calculate and display the exact date and day count for the next scheduled session (e.g., 'Next: Jan 25 (in 5 days)').",
        "In TaskTrackr: Upgraded the Calendar view with drag-and-drop scheduling, allowing users to drag tasks directly onto calendar days to instantly update their due date.",
        "In TaskTrackr: Added a 'Completed' filter tab for viewing task history, a 'Today' jump button for the calendar, and a global 'Back to Hub' navigation button.",
        "In TaskTrackr: Improved general UX with relative date labels (Today, Tomorrow, Yesterday) and better visual feedback for empty lists."
    ]
    },
    {
    version: "v9.52.0-alpha",
    date: "2025-12-20",
    changes: [
        "In TaskTrackr: Launched a fully interactive Kanban Board view using SortableJS for drag-and-drop priority management.",
        "In TaskTrackr: Enhanced the 'Quick Add' input to be context-aware, automatically applying due dates based on the currently active view (e.g., adding a task while viewing 'Tomorrow' sets the due date automatically)."
    ]
    },
    {
    version: "v9.51.0-alpha",
    date: "2025-12-18",
    changes: [
        "Launched VehicleManagr: A comprehensive fleet management application accessible from the Hub.",
        "In VehicleManagr: Features a 'Virtual Glovebox' to store vital metadata like VIN, insurance expiry, and oil type.",
        "In VehicleManagr: Includes a full logging system for fuel, service, expenses, and trips, with automatic MPG calculation.",
        "In VehicleManagr: Implemented an interactive tyre health visualizer to track pressure and tread depth per wheel."
    ]
    },
    {
    version: "v9.50.0-alpha",
    date: "2025-12-15",
    changes: [
        "In TaskTrackr: Implemented cloud synchronization for TickTick authentication tokens, allowing single sign-on across multiple devices.",
        "In TaskTrackr: Integrated Firebase Firestore to securely store and retrieve TickTick session tokens linked to the user's Lifeblogging account.",
        "In TaskTrackr: Added automatic session restoration so logging in on one device (e.g., laptop) automatically logs you in on others (e.g., phone)."
    ]
    },
    {
    version: "v9.49.0-alpha",
    date: "2025-12-14",
    changes: [
        "Launched TaskTrackr: A new comprehensive task management application powered by the TickTick API, accessible directly from the Hub.",
        "In TaskTrackr: Features three distinct views: a Classic List, an interactive Calendar with daily dot indicators, and a Kanban board for visual priority management.",
        "In TaskTrackr: Implemented full task management capabilities, including creating, editing, completing, and deleting tasks, with support for subtasks and tagging.",
        "In TaskTrackr: Added advanced filtering options for Inbox, Today, Tomorrow, Overdue, and specific Projects to help focus your workflow.",
        "In TaskTrackr: Includes a 'Quick Add' feature for rapid task entry and bulk action tools to move or manage multiple tasks efficiently."
    ]
    },
    {
    version: "v9.48.0-alpha",
    date: "2025-12-14",
    changes: [
        "In Changelog: Added a new 'App Filter' dropdown, allowing users to isolate and view version history specific to a single application.",
        "In Changelog: Implemented dynamic grouping of entries; changes within each version are now categorized and visually separated by their respective app (e.g., 'VidTrackr', 'Hub').",
        "In Changelog: Added a search bar to filter the changelog history by version number or date.",
        "In Changelog: The app filter dropdown is dynamic and automatically populates based on the applications found in your data."
    ]
    },
    {
    version: "v9.47.0-alpha",
    date: "2025-12-13",
    changes: [
        "In HydrationTrackr: Split the logging interface into two distinct sections: 'Log a Drink Now' for immediate updates and a dedicated 'Log a Drink at Custom Time' card for historical entries.",
        "In HydrationTrackr: Added 'Quick Options (Historical)' buttons to the custom time section, allowing users to quickly log standard amounts (e.g., 250ml Water) for a specific past date and time."
    ]
    },
    {
    version: "v9.46.1-alpha",
    date: "2025-12-10",
    changes: [
        "In the Logger: The updated Daily Plan tab will no longer be open by default upon opening."
    ]
    },
    {
    version: "v9.46.0-alpha",
    date: "2025-12-10",
    changes: [
        "In the Logger: Implemented a new modal-based editing workflow, replacing the previous inline field editing for a smoother user experience.",
        "In the Logger: Reorganized the Dailies section into collapsible panels (Daily Plan, Calendar, Data Triage) to reduce visual clutter and improve page navigation."
    ]
    },
    {
    version: "v9.45.0-alpha",
    date: "2025-12-08",
    changes: [
        "In Account Page: Introduced last.fm account connection in account page for upcoming Dashboard feature release.",
        "In Account Page: Bug fix - Updated Account Page VidTrackr notes export to only include notes from VidTrackr when exporting."
    ]
    },
    {
    version: "v9.44.0-alpha",
    date: "2025-12-07",
    changes: [
        "In VidTrackr: Implemented database synchronization for the Trakt authentication token, resolving persistent 'Reconnect' errors on the Dashboard.",
        "In VidTrackr: Added a real-time duplicate check that queries the Trakt API before logging, warning users if they attempt to log an item watched within the last 5 minutes.",
        "In VidTrackr: Fixed a critical bug where the 'Delete' button in the history list was non-functional.",
        "In VidTrackr: The History page now auto-refreshes whenever the browser tab is reopened or focused to ensure data is strictly up-to-date."
    ]
    },
    {
    version: "v9.43.2-alpha",
    date: "2025-12-07",
    changes: [
        "In VidTrackr: Authentication bug fix."
    ]
    },
    {
    version: "v9.43.1-alpha",
    date: "2025-12-07",
    changes: [
        "In PDF Tools: Bug fix."
    ]
    },
    {
    version: "v9.43.0-alpha",
    date: "2025-12-07",
    changes: [
        "In PDF Tools: Added a dedicated 'Edit Metadata' tool to the sidebar, allowing users to view and edit standard PDF properties including Title, Author, Subject, Keywords, Creator, and Dates.",
        "In PDF Tools: Implemented a 'Filename (Save As)' feature within the Metadata tool, automatically populating with the original name (minus extension) to allow easy renaming before download.",
        "In PDF Tools: Enhanced the metadata saving logic to automatically default the 'Producer' field to 'SH's PDF Editing Tool' if it is missing or set to the library default.",
        "In PDF Tools: Added 'Download Updated PDF' functionality and UI feedback (loading spinners, status text) for the new metadata operations.",
        "In PDF Tools: Fixed a critical syntax error in the drag-and-drop event listeners (dragleave) that was preventing the script from executing."
    ]
    },
    {
    version: "v9.42.0-alpha",
    date: "2025-12-06",
    changes: [
        "In Account Page: Added a comprehensive 'Data Export' tool allowing users to back up their entire account lifetime data.",
        "In Account Page: Implemented granular export controls, letting users select specific apps (e.g., VidTrackr, MediManagr) via checkboxes to export only the data they need.",
        "In Account Page: Added smart file handling where single-source exports download as timestamped JSON files, while multi-source selections are automatically bundled into a structured ZIP file using JSZip.",
        "In Account Page: Configured specific export paths for the entire suite of apps, including FoodTrackr, WarrantyTrackr, RecipeManagr, Label Generator, and Email Templates.",
        "In Account Page: Enhanced the exporter to intelligently include shared dependencies, such as the 'notes' collection when exporting VidTrackr or PodTrackr."
    ]
    },
    {
    version: "v9.41.0-alpha",
    date: "2025-12-03",
    changes: [
        "In VidTrackr: Fixed episode navigation buttons (left/right arrows) to correctly load the previous or next episode, handling season boundaries automatically.",
        "In VidTrackr: Overhauled the History tab with new filters for 'Movies' and 'Episodes', and added date-based grouping headers (e.g., 'Today', 'Yesterday') for better readability.",
        "In VidTrackr: Added an 'Add to List' button to Movie and Episode detail pages, allowing users to quickly save content to their custom lists via a new selection modal."
    ]
    },
    {
    version: "v9.40.0-alpha",
    date: "2025-12-02",
    changes: [
        "In VidTrackr: Fixed critical authentication loop by switching to Implicit Grant flow, eliminating '401 Unauthorized' errors.",
        "In VidTrackr: Added a 'Stream Now' button to details pages, linking directly to Trakt's 'Watch Now' service to find available streaming platforms.",
        "In VidTrackr: Merged separate Watchlist and Custom Lists pages into a single, unified 'Library' tab with sub-navigation.",
        "In VidTrackr: Implemented local token persistence to ensure users remain logged in across sessions even if database connectivity lags.",
        "In VidTrackr: Updated mobile navigation bar to point to the new Library section."
    ]
    },
    {
        version: "v9.39.1-alpha",
        date: "2025-12-01",
        changes: [
            "In VidTrackr: Added date watched next to time watched on recently watched media (Dashboard page).",
            ]
    },
    {
        version: "v9.39.0-alpha",
        date: "2025-11-30",
        changes: [
            "In VidTrackr: Fixed the Cast images in the Detail view. The API call now includes `extended=images`, and the renderer uses actual headshots instead of generic icons.",
            "In VidTrackr: Resolved a bug where Genres displayed as 'undefined'. The logic now correctly handles the plain string array returned by the API.",
            "In VidTrackr: Expanded the Movie/Show Detail metadata to include a 'Production Info' box, displaying Director/Creator, Studio, Language, and Revenue data.",
            "In VidTrackr: Updated title icon to match the one used in the header ribbon.",
            "All: Updated service worker."
        ]
    },
    {
    version: "v9.38.0-alpha",
    date: "2025-11-30",
    changes: [
        "In VidTrackr: Implemented a comprehensive mobile UI overhaul, introducing a fixed bottom navigation bar and a dedicated mobile search input for better small-screen accessibility.",
        "In VidTrackr: Enhanced routing capabilities to support deep linking directly to specific seasons (e.g., `#detail/show/:id/season/:num`) and added 'View Season' navigation buttons to episode detail pages.",
        "In VidTrackr: Improved image handling in detail views by switching to an `object-contain` layout, preventing cropping and ensuring full posters/backdrops are visible on all device aspect ratios.",
        "In VidTrackr: Increased touch target sizes for 'Up Next' actions and renamed the primary button to 'Rate & Mark Watched Now' for clearer interaction.",
        "In VidTrackr: Updated viewport settings to disable user scaling (`user-scalable=no`), giving the interface a more native, app-like feel on mobile devices."
    ]
},
    {
        version: "v9.37.0-alpha",
        date: "2025-11-29",
        changes: [
            "In VidTrackr: Completely refactored the 'Up Next' logic. It now pulls from the 'watched shows' endpoint instead of raw history, ensuring a diverse list of shows and preventing a single binged show from displacing others.",
            "In VidTrackr: Updated the 'Up Next' card UI on the dashboard. Replaced the standard 'Check In' button with a 'Rate & Watch' dropdown, allowing for quicker 1-click rating and logging.",
            "In VidTrackr: Added the 'First Aired' date to the metadata header on the Episode Detail page.",
        ]
    },
    {
        version: "v9.36.2-alpha",
        date: "2025-11-28",
        changes: [
            "In VidTrackr: Bug fix 2.",
            ]
    },
    {
        version: "v9.36.1-alpha",
        date: "2025-11-27",
        changes: [
            "In VidTrackr: Bug fix.",
            ]
    },
    {
        version: "v9.36.0-alpha",
        date: "2025-11-27",
        changes: [
            "Launched VidTrackr: A comprehensive new movie and TV show tracking application integrated into the Hub, powered by the Trakt.tv API.",
            "In VidTrackr: Users can now manage their viewing habits with a dashboard featuring 'Up Next' queues, 'Recently Watched' history, and a 7-day airing calendar.",
            "In VidTrackr: Implemented a full scrobbling system allowing users to log content, assign ratings (1-10), and save private notes to specific watch history entries.",
            "In VidTrackr: Added a 'Progress' section with visual charts for weekly activity and percentage-based completion tracking for TV shows.",
        ]
    },
    {
    version: "v9.35.0-alpha",
    date: "2025-11-24",
    changes: [
        "Introduced a central Dashboard page to provide a unified overview of existing standalone apps (HydrationTrackr, PodTrackr, FoodTrackr, MediManagr).",
        "Created widgets to display real-time summaries of daily stats (Mood, Water, Calories, Meds) in a single grid view, pulling data from the existing app sources.",
    ]
    },
    {
    "version": "v9.34.0-alpha",
    "date": "2025-11-13",
    "changes": [
        "In MediManagr: Re-architected the 'Contact Lenses' tab to support separate stock management for the left and right eye, including new UI and database collections.",
        "In MediManagr: Implemented a visual icon picker modal for adding or editing medicines, replacing the previous manual text input for Font Awesome classes.",
        "In MediManagr: Added data export functionality to the 'Settings' tab, allowing users to download all their data as a JSON file or their dose history as a CSV file.",
    ]
},
    {
  "version": "v9.33.0-alpha",
  "date": "2025-11-13",
  "changes": [
    "In Label Generator: Overhauled the UI, replacing the long list of settings with a clear 4-step 'wizard' interface (Template, Layout, Content, Print).",
    "In Label Generator: Clarified layout controls by replacing the 'Maximize' checkbox with 'Define by Grid' and 'Define by Label Size' radio buttons.",
    "In Label Generator: Replaced the grid alignment dropdown with a 3x3 visual icon grid for more intuitive control.",
    "In Label Generator: Added direct label editing. Users can now type directly into the first label in the preview grid, with content syncing to the main template box.",
    "In Label Generator: Improved selection logic. Users can now select or deselect any label, and the print function will print *only* the selected labels.",
    "In Label Generator: Fixed a bug where the first label in the grid could not be deselected.",
  ]
},
    {
  "version": "v9.32.0-alpha",
  "date": "2025-11-12",
  "changes": [
    "In FoodTrackr: Overhauled quantity logging. Replaced the single 'grams' input with a dynamic 'Amount' and 'Unit' system (e.g., '2', 'slices').",
    "In FoodTrackr: Implemented 'Serving Units' for Favorite Foods. The app now learns custom units (like '1 slice' = 35g) when you save a new favorite, making future logging much faster.",
    "In FoodTrackr: Streamlined the logging GUI. Clicking a search result or favorite food now shows an inline logging form directly on the page, removing the extra modal step.",
    "In FoodTrackr: Search result cards now have a 'View Details' button to open the full product modal, separating the 'viewing' and 'logging' actions.",
    "In FoodTrackr: Added a barcode scanner. Users can now tap the barcode icon to use their camera, scan a product, and instantly search for it.",
    "In FoodTrackr: Enhanced Manual Entry. The form now includes a collapsible section for detailed nutrients (Fiber, Sugar, Sodium, Saturated Fat, Salt) for more accurate manual logging.",
    "In FoodTrackr: The Dashboard's 'Detailed Nutrients' table has been updated to correctly calculate and display all new nutrients (Fiber, Sugar, etc.).",
    "In FoodTrackr: Updated the 'Edit' flow for logs and favorites to correctly populate all new quantity, unit, and detailed nutrient fields.",
  ]
},
    {
  "version": "v9.31.0-alpha",
  "date": "2025-11-10",
  "changes": [
    "In Template Generator: Implemented live preview; the generated subject and body now update instantly as you type in the fields, without needing to press the 'Generate' button.",
    "In Template Generator: Reworked template versioning. The 'Edit' button on old versions is now 'View/Restore'. Saving a restored version always creates a new version, preserving template history and preventing accidental overwrites.",
    "In Template Generator: The template list is now grouped into collapsible folder sections, making it easier to navigate large libraries.",
    "In Template Generator: Significantly refined the Dark Mode theme for better consistency and fixed visual bugs in the template list. Added `color-scheme` support for native browser dark mode elements (e.g., scrollbars).",
    "In Template Generator: Fixed a visual bug where generated email bodies lacked padding and did not respect line breaks.",
    "In Template Generator: The folder list in Step 1 now has a border and a scrollbar if the list is long, improving layout.",
  ]
},
    {
    "version": "v9.30.0-alpha",
    "date": "2025-11-04",
    "changes": [
      "In Label Generator: Custom preset saving upgraded to use your Firebase account for cloud storage.",
      "In Label Generator: Fixed printing alignment issue; labels now correctly honor vertical/horizontal alignment.",
      "In Label Generator: Fixed manual data input bug; manual text now only fills selected labels in the grid.",
      "In Label Generator: Fixed visual bug for the right and bottom borders of the preview grid, restoring the complete grid.",
      "In Label Generator: Advanced content features added, including Field Mapping for CSV columns, Barcode/QR Code generation, and Serial Number Auto-Increment.",
    ]
  },
    {
  "version": "v9.29.0-alpha",
  "date": "2025-10-31",
  "changes": [
    "In Converter: Major refactor of the page from a simple converter to a comprehensive 'Data Tools' hub.",
    "In Converter: Added a new 'CSV Viewer & Editor' tool to load, edit, and save CSV data in a table.",
    "In Converter: Added a 'Transpose CSV' tool to swap the rows and columns of CSV data.",
    "In Converter: Added a 'Pivot CSV' tool to summarize data with field selection and aggregation functions (COUNT, SUM, AVG, etc.).",
    "In Converter: Implemented a new tabbed interface to organize the original converter and the new CSV tools.",
    "In Converter: Replaced the generic download button with specific 'Download CSV' and 'Download JSON' buttons.",
  ]
},
    {
    "version": "v9.28.0-alpha", 
    "date": "2025-10-31",
    "changes": [
        "In FoodTrackr: Added day navigation to the Dashboard, allowing users to view summaries for previous days or return to 'Today' using new 'Previous'/'Next' buttons.",
        "In FoodTrackr: Upgraded the Dashboard's 'Nutrients' table. It now sums all available data from `baseNutrients` (e.g., Fiber, Sugar, Sodium, Saturated Fat) for items logged via search, providing a much more detailed breakdown beyond the four main macros.",
        "In FoodTrackr: The Dashboard now maintains its state, remembering which day you were viewing when switching between tabs.",
        "In FoodTrackr: Re-organized the Dashboard layout to place the macro chart alongside the new detailed nutrients table for a better comparison.",
        "In FoodTrackr: Streamlined the 'Log Food' workflow; the entry form is now hidden by default and appears only when an item is selected for logging or editing.",
        "In FoodTrackr: Made the main app layout wider (1200px) for a more spacious, 'flush' feel on larger screens.",
        "In FoodTrackr: Fixed a bug where the product details modal would fail to load an image, even if one was visible in the search results. The modal now correctly gathers all available images.",
        "In FoodTrackr: Improved image rendering logic to robustly handle old log items with invalid `imageUrl` data (e.g., a 'null' string), defaulting to a placeholder to prevent broken image icons."
    ]
    },
    {
    "version": "v9.27.0-alpha", 
    "date": "2025-10-28",
    "changes": [
        "In FoodTrackr: Implemented a new 'Copy/Move' feature, allowing log items from 'Today's Log' or 'History' to be duplicated or moved to a new date, time, and section via a modal.",
        "In FoodTrackr: Added product photos to all relevant locations, including 'Today's Log', the 'History' table, 'Frequently Logged' list, and 'Foods & Meals' management tab for a richer visual experience.",
        "In FoodTrackr: Overhauled the 'Log Food' tab layout, re-introducing the multi-column grid (Breakfast, Brunch, Lunch, etc.) and a centered 'Drinks' section.",
        "In FoodTrackr: Added a dedicated 'Add Food' section with quick-access buttons for Search, Frequent, Meals, Foods, and Manual Entry.",
        "In FoodTrackr: Streamlined meal creation by removing the manual 'Create a Meal' builder. Users can now save all items in a daily log section (e.g., 'Lunch') directly as a new meal using a 'Save' icon.",
        "In FoodTrackr: Added a 'Today's Nutrients' summary table to the Dashboard tab for an at-a-glance view of daily totals.",
        "In FoodTrackr: Renamed the 'My Foods' tab to 'Foods & Meals' to clarify its purpose as a management area for saved favorites and meals.",
    ]
    },
    {
    "version": "v9.26.1-alpha", 
    "date": "2025-10-27",
    "changes": [
        "In the Logger: Added a distinct visual indicator when editing a log entry for better clarity.",
        "In the Logger: Changed 'Frequent Activity Combos' to dynamically display the top 5 most logged 'Activity @ Location' combinations based on user data.",
        "In the Logger: Clicking a 'Frequent Activity Combo' button now immediately logs the entry instead of just pre-filling the form."
    ]
    },
    {
    "version": "v9.26.0-alpha",
    "date": "2025-10-27",
    "changes": [
        "In FoodTrackr: Re-categorized log sections into 'Breakfast', 'Lunch', 'Dinner', 'Brunch', 'Afternoon Tea', 'Puddings', and 'Drinks'.",
        "In FoodTrackr: Enabled drag-and-drop re-categorization of items between the new daily log sections.",
        "In FoodTrackr: Relocated the 'Today's Log' sections from 'History' to the 'Log Food' tab for a more intuitive logging workflow.",
        "In FoodTrackr: The 'History' tab is now dedicated to the full, filterable history table.",
        "In FoodTrackr: Added the application's SVG favicon.",
        "In FoodTrackr: Fixed a bug where a developer comment was visible on the page."
    ]
    },
    {
    "version": "v9.25.1-alpha",
    "date": "2025-10-22",
    "changes": [
        "In PDF Tools: Added option to edit another PDF on each mode.",
        "In PDF Tools: Fixed dark/night mode toggle sync."
    ]
    },
    {
    "version": "v9.25.0-beta",
    "date": "2025-10-22",
    "changes": [
        "In the Template Generator: Redesigned the template selection on the 'Use Templates' page with a two-panel layout, featuring a folder list on the left and a template list on the right for easier navigation.",
        "In the Template Generator: Added a search bar to quickly filter templates by name.",
        "In the Template Generator: The three main steps on the 'Use Templates' page are now collapsible sections to improve focus and reduce clutter.",
        "In the Template Generator: Template list items now display the version description and target audience more clearly, aiding in faster template identification.",
        "In the Template Generator: Corrected low-contrast text elements across the application to ensure readability in dark mode.",
        "In the Template Generator: Improved the color contrast of the 'target audience' label to make it easily readable in light mode."
    ]
},
    {
        "version": "v9.24.1-alpha",
        "date": "2025-10-21",
        "changes": [
            "Complete visual overhaul of Dark Mode for the Email Template Generator, focusing on readability and a professional aesthetic.",
            "Live, real-time theme syncing added. Dark and light mode settings now sync instantly across all open tabs and devices without needing a page refresh.",
            "Theme toggle button has been updated with new SVG icons to match the design standard used across other LifeBlogging applications.",
            "Fixed major issues where headings and primary text were nearly invisible in dark mode.",
            "Addressed problems with both excessively high and low contrast areas in dark mode.",
            "When a pronoun or time preset is selected, the corresponding form fields are now correctly made read-only to prevent accidental edits.",
        ]
    },
    {
    "version": "v9.24.0-alpha",
    "date": "2025-10-20",
    "changes": [
        "Dark mode preference now syncs with your Firebase account settings across the LifeBlogging hub.",
        "Added a 'Scheduled Time' input in the 'Use Templates' tab. This automatically populates the `{{Greeting}}` placeholder based on the time you enter, making it easy to prepare emails in advance.",
    ]
    },
    {
    "version": "v9.23.0-alpha",
    "date": "2025-10-20",
    "changes": [
        "In PDF Tools: Introduced the 'ADF Scan Fixer' tool to automatically correct PDFs where every second page is scanned upside down, a common issue with duplex scanning.",
    ]
    },
    {
    "version": "v9.22.0-alpha",
    "date": "2025-10-19",
    "changes": [
        "In FoodTrackr: Initial release of the FoodTrackr application for comprehensive food and macronutrient logging.",
        "In FoodTrackr: Added dashboard with daily nutritional summary and macro chart.",
        "In FoodTrackr: Implemented Open Food Facts API for barcode and product name search.",
        "In FoodTrackr: Enabled manual entry for custom foods and nutritional information.",
        "In FoodTrackr: Added ability to create, save, and edit custom meals and favorite foods.",
        "In FoodTrackr: Implemented 'Frequently Logged' section for quick-adding common foods.",
        "In FoodTrackr: Created a detailed product info popup with a full image scrollwheel, expanded nutritional data (Nutri-Score, Eco-Score, NOVA), and ingredient/allergen information.",
        "In FoodTrackr: Added 'Quick Quantity' buttons (e.g., Serving, Half, Whole) to the info popup for faster logging.",
        "In FoodTrackr: Favorites are now starred and prioritized at the top of API search results.",
        "In FoodTrackr: Fixed critical bugs related to package quantity calculations, service worker registration, and various JavaScript errors."
    ]
},
    {
    "version": "v9.21.0-alpha",
    "date": "2025-10-17",
    "changes": [
        "In the Template Generator: Added latest updated time to Conflict Sync Modal. ",
        "In the Template Generator: Bug fix to Pronoun presets auto-fill detection feature.",
        "In PDF Tools: Added a crop PDF feature.",
        "In PDF Tools: Added a stitch/cut PDF page tool.",
    ]
    },
    {
    "version": "v9.20.0-alpha",
    "date": "2025-10-15",
    "changes": [
        "In the Label Generator: Added a 'Maximize layout from label size' option to automatically calculate the most efficient grid.",
        "In the Label Generator: Added a 'Grid Alignment' control for positioning the entire block of labels on the page.",
        "In the Label Generator: The Suspension File Tab template now defaults to 54x14mm with cut lines enabled for a faster workflow.",
        "In the Label Generator: Fixed a visual bug to ensure the on-screen preview's label borders perfectly match the final print output for clean cutting.",
    ]
    },
    {
    version: "v9.19.0-alpha",
    date: "2025-10-14",
    changes: [
    "In Label Generator: Added multi-page printing capability to handle large CSV imports across all templates.",
    "In Label Generator: Introduced an 'Envelope' template for printing directly onto standard envelope sizes.",
    "In Label Generator: Added a dedicated 'Suspension File Tab' template with presets for plain card and pre-punched sheets.",
    "In Label Generator: Included a 'Print Cut Lines' option for the Suspension File Tab template.",
    "In Label Generator: Added a 'First row is a header' checkbox to ignore header rows in CSV imports.",
    "In Label Generator: The UI now dynamically shows/hides controls relevant to the selected template type.",
    "In Label Generator: Reorganized presets into logical groups for easier navigation.",
    "In Label Generator: In Envelope mode, the label is now selected by default to streamline workflow.",
    "In Label Generator: Fixed a critical issue that prevented multi-page printing from CSV data.",
    "In Label Generator: Ensured the print output is correctly centered, matching the on-screen preview.",
    "In Label Generator: Resolved a bug causing incorrect margins on all pages after the first.",
    "In Label Generator: Corrected print styles to ensure top and bottom margins are equal.",
    "In Label Generator: Fixed a CSS issue to prevent the main UI from appearing on printed pages.",
    "In Label Generator: Adjusted presets to prevent extra blank pages from being printed.",
    ]
    },
    {
        version: "v9.18.6-alpha",
        date: "2025-10-05",
        changes: [
            "In PDF Tools: Fixed the core functionality for the 'Organize PDF' tool. Users can now upload a PDF to see page thumbnails.",
            "In PDF Tools: Fixed a critical 'detached ArrayBuffer' error that occurred when saving changes in the 'Organize PDF' tool, ensuring the file can be processed and saved correctly.",
        ]
    },
    {
        version: "v9.18.5-alpha",
        date: "2025-10-03",
        changes: [
            "In the Email Template Generator: Added quick-edit functionality; selecting a template now loads it in the editor.",
            "In the Email Template Generator: Now displays the target audience in brackets within the template selection dropdown.",
            "In the Email Template Generator: Enhanced template management with options to duplicate a template or add a new blank version.",
            "In the Email Template Generator: Fixed a bug that incorrectly allowed placeholders to be dragged into the subject line.",
        ]
    },
    {
        version: "v9.18.4-alpha",
        date: "2025-10-02",
        changes: [
            "In the Hub: Re-ordered the apps to more accurately represent frequency of each app accessed.",
        ]
    },
    {
    version: "v9.18.3-alpha",
    date: "2025-10-01",
    changes: [
        "In the Email Template Generator: Enhanced the Pronoun Presets to include a wider range of pronoun types (subjective, objective, possessive, and reflexive).",
        "In the Email Template Generator: Moved the 'How to use Pronoun Presets' guide to the 'Manage Templates' tab for better contextual relevance.",
        "In the Email Template Generator: Fixed a visibility issue where the pronoun guide was unreadable in light mode.",
        "In the Email Template Generator: Improved the layout by relocating the Pronoun Presets to Step 1 for a more logical workflow.",
    ]
    },
    {
        version: "v9.18.2-alpha",
        date: "2025-09-29",
        changes: [
            "In the Timestamp Converter: Added a function to convert Excel & Google Sheet serial numbers (e.g. 45956) into readable dates (26 October 2025).",
        ]
    },
    {
        version: "v9.18.1-alpha",
        date: "2025-09-29",
        changes: [
            "In the Label Generator: Added separate controls for vertical and horizontal gaps between labels for more precise layout adjustments.",
            "In the Label Generator: The 'Auto-fit to page' options for label width and height are now enabled by default for a more intuitive user experience.",
        ]
    },
    {
        version: "v9.18.0-alpha",
        date: "2025-09-28",
        changes: [
            "In the Email Template Generator: Enhanced Folder Management: The folder input field now suggests existing folders and allows for the creation of new ones seamlessly.",
            "In the Email Template Generator: Improved Template Organization: The 'Manage Templates' view now groups templates by folder, making them much easier to navigate.",
            "In the Email Template Generator: Quick 'Use Latest' Access: Added a 'Use Latest' button directly to each template in the management list, allowing for one-click use of the most recent version without needing to expand the version history.",
            "In the Email Template Generator: Intuitive Collapse/Expand Icons: Replaced text links with rotating triangle icons for a clearer visual cue on expandable sections.",
            "In the Email Template Generator: Consistent Dark Mode Toggle: Updated the dark mode switcher to match the style and functionality of other applications in the Lifeblogging hub.",
            "In the Email Template Generator: Fixed Placeholder Saving: Resolved an issue where a newly added placeholder would not save correctly without a workaround.",
            "In the Email Template Generator: Resolved Sync Loop: Corrected the Firebase synchronization logic to eliminate the infinite loop of 'checking for conflicts' messages that spammed the developer console.",
        ]
    },
    {
    version: "v9.17.0-alpha",
    date: "2025-09-28",
    changes: [
        "In the Color Palette Generator: Added the ability to create and save custom palettes from individual colors.",
        "In the Color Palette Generator: Users can now edit saved custom palettes, including adding, removing, or changing colors.",
        "In the Color Palette Generator: Implemented a feature to add descriptive labels to saved palettes and a filter to search by those labels.",
        "In the Color Palette Generator: Added a full range of default Tailwind CSS colors for more comprehensive palette generation.",
    ]
    },
    {
        version: "v9.16.0-alpha",
        date: "2025-09-28",
        changes: [
            "All: Update links to apps and tools to be more accurate to their official title.",
        ]
    },
    {
        version: "v9.15.2-alpha",
        date: "2025-09-28",
        changes: [
            "In the MediManagr: Added basic contact lens tracking features.",
            "All: Updated favicons."
        ]
    },
    {
        version: "v9.15.1-alpha",
        date: "2025-09-27",
        changes: [
            "Added the WarrantyTrackr app to manage product warranties, with RecipeManagr integration for importing appliances."
        ]
    },
    {
    version: "v9.15.0-alpha",
    date: "2025-09-25",
    changes: [
        "In Email Template Generator: Users can now generate drafts and load directly into Gmail once authorized.",
        "In Email Template Generator: Improved folder layout, dark mode toggle, and latest template updated time is now readily available.",
        
    ]
    },
    {
        version: "v9.14.0-alpha",
        date: "2025-09-23",
        changes: [
        "In MediManagr: Fixed a layout issue on the 'Record Doses' page where the schedule would overflow on mobile devices.",
        "In MediManagr: Added clearer visual feedback when logging a dose from the schedule modal to confirm the action was successful.",
        "In MediManagr: Corrected a bug where the reminder time for scheduled doses was not being saved, causing it to display as 'N/A' in the history table.",
        "In MediManagr: Implemented a check to prevent users from logging more scheduled doses than required for a given day from the calendar view.",
        "In MediManagr: Users can now edit the stock batch of a previously logged dose directly from the history tab's edit modal.",
    ]
    },
    {
        version: "v9.13.0-alpha",
        date: "2025-09-23",
        changes: [
            "In the Hub: Introduced a new 'Color Palette Generator' tool.",
            "In the Color Palette Generator: The color picker now displays detailed information about the selected color, including the closest Tailwind CSS class, HEX code, RGB values, and HSL values.",
        ]
    },
    {
        version: "v9.12.2-alpha",
        date: "2025-09-19",
        changes: [
        "In the Email Template Generator: Added Conflict Resolution UI: When a sync conflict is found, a new modal now appears, allowing users to compare versions and choose whether to keep the local or cloud data.",
        "In the Email Template Generator: Implemented Live Syncing: Changes to templates (creating, editing, archiving) are now automatically saved to the cloud in real-time while signed in.",
        "In the Email Template Generator: Added Live Sync Status Indicator: The main UI now includes a status badge that provides instant feedback on the current sync state (e.g., 'Synced', 'Syncing...', 'Unsynced Changes').",
        "In the Email Template Generator: Fixed Critical Sync Bug: Resolved a recurring issue where the conflict modal would reappear after being resolved. The fix ensures the comparison logic is deterministic by ignoring timestamps and unstable object property order, focusing purely on content.",
        "In the Email Template Generator: Fixed Sync Race Condition: The 'Apply Resolutions' button now enters a disabled, loading state to prevent page reloads before the cloud save is complete, which previously caused conflicts to reappear.",
    ]
    },
    {
        version: "v9.12.1-alpha",
        date: "2025-09-16",
        changes: [
        "In PDF Tools: Improved the unlocking engine to successfully process files with non-standard or slightly corrupted structures.",
        "In PDF Tools: Fixed a bug where incorrect 'wrong password' errors were shown for corrupted files.",
        "In PDF Tools: Added a new alert with instructions on how to repair corrupted PDFs using the 'Print to PDF' method.",
        ]
    },
    {
        version: "v9.12.0-alpha",
        date: "2025-09-16",
        changes: [
            "In the Email Template Generator: The notification for copying generated text is now clearer and more prominent.",
            "In the Email Template Generator: Added smarter template saving logic to prevent accidental creation of duplicate templates with the same name.",
            "In the Email Template Generator: Users can now define custom options for dropdown placeholders.",
            "In the Email Template Generator: Fixed a bug that caused an error when saving templates that included dropdown placeholders.",
        ]
    },
    {
        version: "v9.11.1-alpha",
        date: "2025-09-15",
        changes: [
            "In the Mergetool: Added ability to reorder placeholder descriptions.",
            "In the Mergetool: Added placeholder descriptions.",
        ]
    },
    {
        version: "v9.11.0",
        date: "2025-09-15",
        changes: [
            "In the Merge Generator: Saving an existing template now creates a new version instead of overwriting, preserving the template's history.",
            "Added a version dropdown in the 'Use Templates' tab to select and load any version of a template.",
            "Added the ability to edit the content of any past version in-place (with confirmation).",
            "Added 'Duplicate as New Version' to branch from any past version.",
            "Added 'Duplicate as New Template' to create an entirely new template from a single version.",
            "Added a '+ Add Blank New Version' button to start a fresh revision within a template.",
            "Added 'Duplicate Template' to clone an entire template and its full version history.",
            "Overhauled the 'Manage Templates' view with an expandable version history and granular action buttons for each version.",
            "Added a 'Use' button to quickly load any specific version directly from the management tab.",
            "The application will now automatically migrate older, non-versioned templates to the new versioned format.",
            "Fixed a critical bug in the template replacement engine, making it more robust. It can now correctly handle placeholders that include special characters (e.g., parentheses, brackets) in their names.",
        ]
    },
    {
        version: "v9.10.0-alpha",
        date: "2025-09-15",
        changes: [
            "In the Hub: Added a new 'PDF Tools' suite, accessible from the main hub.",
            "In PDF Tools: Added features to organize, merge, and extract pages from PDF files.",
            "In PDF Tools: Added capabilities for signing, adding text, redacting, and watermarking PDFs.",
            "In PDF Tools: Implemented tools to convert PDFs to images and vice-versa.",
            "In PDF Tools: Added options for flattening, protecting, and unlocking PDF files.",
        ]
    },
    {
    version: "v9.9.2-alpha",
    date: "2025-09-14",
    changes: [
        "In MediManagr: Fixed a significant layout issue on the 'Record Doses' page where the 'Scheduled Doses' calendar would overflow both horizontally and vertically on mobile devices, making it difficult to use. The calendar is now properly constrained to the screen.",
    ]
    },
    {
        version: "v9.9.1-alpha",
        date: "2025-09-14",
        changes: [
            "In the Text/Merge Generator: Renamed the tool to 'Email Template Generator' to better reflect its purpose.",
            "In the Email Template Generator: Implemented automatic syncing of templates with Firebase when a user is logged in.",
            "In the Email Template Generator: Updated the Firebase data structure to be consistent with the Analyser app for better data integration.",
            "In the Email Template Generator: Fixed a bug that was preventing templates from being loaded from Firebase.",
        ]
    },
    {
        version: "v9.9.0-alpha",
        date: "2025-09-12",
        changes: [
            "In HydrationTrackr: The dashboard now shows your daily intake as a percentage of your goal, and also displays the remaining amount needed to drink to reach your goal.",
            "In HydrationTrackr: You can now export your entire hydration history to a CSV file from the Settings > Data Management section.",
            "In HydrationTrackr: When importing data from a WaterMinder CSV, the specific daily goal from the file is now correctly imported for each entry.",
            "In HydrationTrackr: Generic CSV imports now support a 'dailyGoal' column to allow for historical goals to be imported.",
            "In HydrationTrackr: The internal status for a logged drink has been updated from 'taken' to 'drank' for better clarity and consistency.",
            "In HydrationTrackr: The 'fileSource' for all data logged within the app is now consistently set to 'HydrationTrackr', making it easier to distinguish from imported data in the Analyser App.",
        ]
    },
    {
        version: "v9.8.0-alpha",
        date: "2025-09-12",
        changes: [
            "In the Hub: Added a new 'Label Generator' tool, accessible from the main hub.",
            "In the Text/Merge Generator: Implemented auto-syncing to Firebase whenever a new template is created.",
            "In the Text/Merge Generator: Fixed a bug that was preventing the navigation tabs from working correctly.",
            "In the Text/Merge Generator: Removed the Google Drive sync option.",
            "In the Text/Merge Generator: Added a 'Back to Hub' button and the current version number for consistency with other apps.",
        ]
    },
    {
        version: "v9.7.4-alpha",
        date: "2025-09-10",
        changes: [
            "In the Text/Merge Generator: Bug fix.",
        ]
    },
    {
        version: "v9.7.3-alpha",
        date: "2025-09-10",
        changes: [
            "In the Text/Merge Generator: Bug fix.",
        ]
    },
    {
        version: "v9.7.2-alpha",
        date: "2025-09-09",
        changes: [
            "In the Text/Merge Generator: Bug fix."
        ]
    },
    {
        version: "v9.7.1-alpha",
        date: "2025-09-09",
        changes: [
            "Released Text/Merge Generator: The tool is now integrated into the main Lifeblogging Hub with a new icon and category for simple text merges."
        ]
    },
    {
        version: "v9.7.0-alpha",
        date: "2025-09-09",
        changes: [
            "In RecipeManagr: Users can now link recipes to each other. A new multi-select option in the recipe editor allows for creating relationships between recipes, which are then displayed in the recipe detail view.",
            "In RecipeManagr: Fixed a bug where the theme toggle was unresponsive, and implemented local storage persistence for the user's light/dark mode preference.",
            "In RecipeManagr: Inline comments (tips) for ingredients and instructions are now editable directly from the recipe detail modal by clicking on the note.",
            "In RecipeManagr: Introduced a new 'Timeline' tab that displays a complete, reverse chronological history of all cooked recipes, conveniently grouped by year."
        ]
    },
    {
    version: "v9.6.0-alpha",
    date: "2025-09-09",
    changes: [
        "In HydrationTrackr: Introduced a dual streak system on the dashboard, now tracking both consecutive days of meeting the hydration goal (Goal Streak) and consecutive days of logging any amount (Log Streak).",
        "In HydrationTrackr: Users can now add notes to custom hydration entries, and these notes are visible in the history table.",
        "In HydrationTrackr: The history table now also displays any tags associated with an entry, providing more context at a glance.",
        "In HydrationTrackr: Fixed a UI bug where the multi-selection bar in the history view had poor contrast in dark mode.",
        "In HydrationTrackr: Corrected the streak calculation logic to ensure the log streak starts at 1 on the first day data is entered.",
        ]
     },
     {
        version: "v9.5.0-alpha",
        date: "2025-09-07",
        changes: [
            "In HydrationTrackr: Fixed a critical bug where dates from WaterMinder CSV imports were incorrectly parsed as MM/DD/YYYY, causing entries to be logged in the future. The importer now correctly handles the DD/MM/YYYY format.",
            "In HydrationTrackr: Added the ability for users to edit past hydration entries. From the history table, users can now modify the date, time, drink type, and amount of any log.",
            "In HydrationTrackr: Implemented entry deletion, allowing users to remove individual logs from their history via the new edit modal.",
            "In HydrationTrackr: Introduced a bulk actions bar on the history page, allowing users to select multiple entries at once and perform actions, starting with bulk deletion."
        ]
    },
    {
        version: "v9.4.0-alpha",
        date: "2025-09-06",
        changes: [
            "In HydrationTrackr: Overhauled the data model to be consistent with other apps, now writing to a dedicated 'hydrationtrackr' collection and including detailed metadata for both the collection and each individual entry (e.g., `attributeName`, `attributeValue`, `status`, `uploadedBy`).",
            "In HydrationTrackr: Improved mobile accessibility by replacing top tabs with a more user-friendly bottom navigation bar.",
            "In HydrationTrackr: Added a CSV import feature and the ability to log entries with a custom date and time, which now defaults to the current time.",
            "In HydrationTrackr: Implemented backward compatibility to ensure older data entries remain visible and functional.",
        ]
    },
    {
        version: "v9.3.1-alpha",
        date: "2025-09-06",
        changes: [
            "In HydrationTrackr: Added the project version number to the top-right corner of the page for consistency with other hub applications."
        ]
    },
    {
        version: "v9.3.0-alpha",
        date: "2025-09-06",
        changes: [
            "In the Hub: Integrated the new HydrationTrackr app, accessible from the main hub.",
            "In the Hub: Updated the Service Worker to dynamically use the latest version from the changelog for caching, improving update reliability.",
            "In the HydrationTrackr: Added a 'Back to Hub' link for consistent navigation across all applications.",
            "In the Hub: Added HydrationTrackr to the list of cached applications for offline use in the service worker."
        ]
    },
    {
        version: "v9.2.0-alpha",
        date: "2025-09-06",
        changes: [
            "In RecipeManagr: Fixed a critical bug that caused ingredients to display as 'undefined' when importing recipes with special characters or from certain JSON-LD formats.",
            "In RecipeManagr: Improved the recipe import logic to correctly identify section headings (e.g., `[Sauce]`) in various formats, preventing them from being misinterpreted as recipe steps.",
            "In RecipeManagr: Added the ability for users to click on ingredients and instructions in the recipe detail view to strike them through, useful for tracking progress while cooking.",
            "In RecipeManagr: Implemented a new feature allowing users to add and manage an 'Approved By' list for each recipe to keep track of who enjoyed the meal.",
            "In RecipeManagr: Fixed a visual bug where using 'Select all in Label' would not update the selection count display.",
        ]
    },
    {
    version: "v9.1.0-alpha",
    date: "2025-09-05",
    changes: [
        "In the Analyser: Fixed a critical bug where dates in DD/MM/YYYY format were not being sorted chronologically in the data table.",
        "In the Analyser: Resolved an issue where clicking on a table column header did not correctly toggle between ascending and descending sort order.",
        "In the Analyser: Added a new feature allowing users to select the number of entries displayed per page in the data table for better navigation of large datasets.",
    ]
    },
    {
        version: "v9.0.0-alpha",
        date: "2025-09-02",
        changes: [
            "Hub: Introduced RecipeManagr, a powerful new app for managing your digital recipe collection.",
            "In RecipeManagr: Store detailed recipes with ingredients, instructions, and metadata like cooking times and ratings.",
            "In RecipeManagr: Import recipes in bulk from services like RecipeSage via URL or file upload (.txt and .jsonld).",
            "In RecipeManagr: Includes features like a shopping list generator, appliance management, and unit conversion.",
        ]
    },
    {
        version: "v8.11.0-alpha",
        date: "2025-09-01",
        changes: [
            "In the Hub: Introduced a dedicated Account page, replacing the previous dropdown menu for a more robust user management experience.",
            "In the Account Page: Implemented Dark Mode on the new Account page, ensuring theme consistency across the hub.",
            "In the Account Page: Added a comprehensive Data Management section, allowing users to export all their data from every app into a single JSON file, and import it back.",
            "In the Account Page: Introduced a secure account deletion feature, allowing users to permanently remove their account and all associated data.",
            "In the Account Page: Added functionality for linking and unlinking third-party accounts, starting with Google.",
        ]
    },
    {
        version: "v8.10.0-alpha",
        date: "2025-08-31",
        changes: [
            "In MediManagr: The 'Record Doses' page is now optimized for mobile devices, featuring a swipeable single-day view for scheduled doses on smaller screens.",
            "In MediManagr: Dose entries in the full-month calendar on the 'History' tab are now clickable, opening the edit modal.",
            "In MediManagr: The history table now correctly displays the scheduled time for doses logged via the calendar in the 'Dose Reminder Sent At' column.",
            "In MediManagr: Added a note to the data import guide clarifying that ISO 8601 dates use UTC time.",
        ]
    },
    {
    version: "v8.9.3-alpha",
    date: "2025-08-30",
    changes: [
        "In the Logger: Data now refreshes automatically in the Dailies section after adding entries via quick log.",
        "In the Logger: Users can now mark Reviewed Days as not reviewed after submission, and other visual improvements.",
    ]
    },
    {
    version: "v8.9.2-alpha",
    date: "2025-08-30",
    changes: [
        "In PodTrackr: Fixed a critical bug where the 'View History' buttons for specific podcasts and episodes incorrectly displayed the entire listening history instead of a filtered view.",
        "In PodTrackr: Resolved an issue that caused long loading times for podcast episode pages and fixed a related console error.",
        "In PodTrackr: Corrected a bug that showed 'No history for undefined' for episodes that had not been listened to yet.",
        "In PodTrackr: On a podcast's detail page, episodes that have been listened to are now highlighted with an italicized title and a green 'listened' button for better visibility.",
        "In PodTrackr: Users can now add a podcast to their Listenlist directly from the podcast's main page.",
        ]
    },
    {
        version: "v8.9.1-alpha",
        date: "2025-08-30",
        changes: [
            "In the Analyser: Fixed an issue where importing data from CSV or JSON files would not apply the correct metadata. Imports now correctly include the 'imported' tag, the file source, and the original file name.",
        ]
    },
    {
        version: "v8.9.0-alpha",
        date: "2025-08-29",
        changes: [
            "In the Analyser: Added a note to the importer recommending users import no more than 500 entries at a time to ensure stability.",
            "In the Analyser: Implemented data pagination in the data table to improve performance with large datasets.",
            "In the Analyser: Users can now select which columns to display for each collection, and these preferences are saved.",
        ]
    },
    {
        version: "v8.8.0-alpha",
        date: "2025-08-29",
        changes: [
            "In the Hub: Re-organized the main page into 'Apps' and 'Tools' sections.",
            "In the Hub: Introduced a new CSV to JSON (and vice-versa) converter tool.",
            "In the Hub: Added a new Timestamp Converter tool for handling timezones and various time formats.",
        ]
    },
    {
    version: "v8.7.1-alpha",
    date: "2025-08-28",
    changes: [
        "All: Updated the icon(512x512) for the entire application.",
        "In the Analyser: It is now possible to import more than 500 entries at one time."
        ]
    },
    {
    version: "v8.7.0-alpha",
    date: "2025-08-28",
    changes: [
        "In the Logger: Merged the 'Dailies' app functionality directly into the Logger page for a more streamlined experience.",
        "In the Logger: The separate '/dailies' page has been deprecated and is no longer needed.",
        "In the Logger (Dailies): Fixed an issue where the triage view incorrectly stated a log was 'Moved from' a date when it was the original log date.",
        "In the Logger (Dailies): The calendar heatmap now displays a checkmark icon for reviewed days, preserving the color gradient for completion status.",
        "In the Logger: Restored the original narrower layout and styling for a more focused user interface.",
        "In the Logger: Added app icons to the 'Logger' and 'Dailies' section headers for better visual identification.",
        "In the Logger: The 'Back to Hub' button has been restyled to be consistent with other applications in the hub.",
        ]
    },
    {
        version: "v8.6.0-alpha",
        date: "2025-08-28",
        changes: [
            "In PodTrackr: Implemented a routing system, allowing tabs to function as separate pages and enabling browser back/forward navigation.",
            "In PodTrackr: Added an option to log an episode with an 'unknown' listen date.",
            "In PodTrackr: The Listenlist now displays more detailed information, including the date an episode was added, its original publishing date, and its duration.",
        ]
    },
    {
        version: "v8.5.0-alpha",
        date: "2025-08-27",
        changes: [
            "In Dailies: Manual entries from the Logger/Analyser can now be assigned a specific day, improving daily overviews without altering original data.",
            "In Dailies: Visual improvements in dark mode.",
           ]
    },
    {
        version: "v8.4.1-alpha",
        date: "2025-08-27",
        changes: [
            "In Dailies: Added dark mode, current version information, and the favicon.",
            "In the Hub: Updated MediManagr link.",
           ]
    },
    {
        version: "v8.4.0-alpha",
        date: "2025-08-27",
        changes: [
            "Hub: Introduced Dailies, a new app for tracking daily task completion with a heatmap-style calendar view.",
            "In Dailies: Users can define a daily plan with required tasks and track their completion percentage.",
            "In Dailies: The app provides year, month, and week views of your daily task history.",
        ]
    },
    {
        version: "v8.3.0-alpha",
        date: "2025-08-25",
        changes: [
            "In the MediManagr: Updated name of app from 'MediManager' to 'MediManagr' in line with the other apps.",
            "In the MediManagr: Updated streak calculation logic - imported doses are now included as part of the streak, assuming it meets criteria.",
            "In the MediManagr: Added bar charts and pie charts to visualise overall spread of different medicines on the Dashboard.",
        ]
    },


    {
        version: "v8.2.2-alpha",
        date: "2025-08-25",
        changes: [
            "All: Added favicons to every page.",
        ]
    },
    {
        version: "v8.2.1-alpha",
        date: "2025-08-25",
        changes: [
            "In PodTrackr: Added a meta field for SEO.",
        ]
    },
    {
        version: "v8.2.0-alpha",
        date: "2025-08-25",
        changes: [
            "All: Updated the frequency of data refreshes in the Mood Widget in release v1.1.0-dev.",
            "In the Logger: Visual update to Activity & Location.",
            "In the MediManager: Bugfix with scheduled doses not appearing as taken if it was not taken on time.",
        ]
    },
     {
        version: "v8.1.0-alpha",
        date: "2025-08-25",
        changes: [
            "In the MediManager: The 'Record Doses' page is now optimized for mobile devices, featuring a swipeable single-day view for scheduled doses on smaller screens.",
            "In the MediManager: Fixed a bug where the dose logging modal would not appear for future scheduled doses. The modal will now correctly appear for any scheduled dose that has not yet been logged.",
        ]
    },
    {
        version: "v8.0.1-alpha",
        date: "2025-08-25",
        changes: [
            "In PodTrackr: Added a link back to the Hub page for consistency.",
            "In PodTrackr: Updated dark mode logic to align with user settings across the hub.",
        ]
    },
    {
        version: "v8.0.0-alpha",
        date: "2025-08-25",
        changes: [
            "Hub: Introduced PodTrackr, a new app for tracking podcast listening history.",
            "In PodTrackr: Users can now search for any podcast via the Podcast Index API and add them to a personal library.",
            "In PodTrackr: View detailed podcast pages, including full episode lists and descriptions.",
            "In PodTrackr: Log listened episodes with specific dates/times and add a star rating.",
            "In PodTrackr: View personal listening history and statistics, filterable by podcast or episode.",
            "In PodTrackr: Added a 'Listenlist' to save both podcasts and individual episodes for later.",
        ]
    },
    {
        version: "v7.19.0-alpha",
        date: "2025-08-24",
        changes: [
            "In the MediManager: Imported data with a reminder time but no 'taken' status/date will now appear as unknown in the history calendar.",
            "In the MediManager: Added a 'Stock will run out on' view on dashboard, assuming taking at correct times all the time.",
            "In the MediManager: Added 'Unknown expiry date' option (choosing this will default to the expiry date in either 1 month, or the date the supply is calculated to run out, whichever is sooner).",
            "In the MediManager: You can no longer edit imported data. You can still apply tags to doses.",
        ]
    },
    {
        version: "v7.18.1-alpha",
        date: "2025-08-24",
        changes: [
            "In the MediManager: Fixed import bug where any value in the taken column was written as 'Taken'.",
        ]
    },
    {
        version: "v7.18.0-alpha",
        date: "2025-08-24",
        changes: [
            "In the MediManager: Users can now specify a One-off dosage (does not affect scheduled doses).",
            "In the MediManager: Users can now specify dosage sizes from specific days without creating a new Medicine ie. it may decrease/increase from a certain day.",
            "In the MediManager: Updated the importing data guide.",
        ]
    },
    {
        version: "v7.17.0-alpha",
        date: "2025-08-24",
        changes: [
            "In the MediManager: The importer now imports 'Reminders' column from apps that may record this data.",
            "In the MediManager: Imported data now has updated metadata and tags. 'Tags' on Medicines are now called 'Labels'.",
            "In the MediManager: Added a guide to the import process.",
            "In the MediManager: Users can now review the data being imported before confirming.",

        ]
    },
    {
        version: "v7.16.0-alpha",
        date: "2025-08-24",
        changes: [
            "In the MediManager: Made improvements to the Import Data function.",
            "Updated .gitignore file.",
        ]
    },
    {
        version: "v7.15.1-alpha",
        date: "2025-08-24",
        changes: [
            "In the MediManager: Stock count bug fix v2.",
        ]
    },
    {
        version: "v7.15.0-alpha",
        date: "2025-08-24",
        changes: [
            "In the MediManager: Stock count bug fix.",
            "In the MediManager: The 'skip' dose button has been re-instated.",
            "In the MediManager: The log dose menu now shows which medicine stock the dose will be taken from.",
            "In the MediManager: The Batch field is now disabled in the edit dose menu.",
        ]
    },
    {
        version: "v7.14.0-alpha",
        date: "2025-08-23",
        changes: [
            "In the MediManager: Fixed issue with schedule logging calendar being off-set by 1 day, and 1 hour.",
            "In the MediManager: Updated the stock counting logic.",
            "In the MediManager: Introduced more dose logging options: when you log a past-due dose from the schedule, you can now choose to log the dose as 'Taken on Time' or 'Taken Now' with a single click, or at a custom date and time.",
            "In the MediManager: Introduced a new full-calendar view in the History tab for a better visual overview of past doses.",
            "In the MediManager: Users can now edit existing medicine re-stocks.",
            "In the MediManager: Batch number is now displayed on each logged dose.",
        ]
    },
    {
        version: "v7.13.1-alpha",
        date: "2025-08-23",
        changes: [
            "In the MediManager: Medicine icon choices have been made clearer with a link to the Font Awesome library.",
            "In the MediManager: Tag filtering has been made easier with option to click existing tags.",
            "In the MediManager: Moved 'Stock Management' under Medicines and moved Schedule and Log one-off doses under 'Record Doses'.",
        ]
    },

    {
        version: "v7.13.0-alpha",
        date: "2025-08-23",
        changes: [
            "All: 1st release of the .apk with Mood widget for android devices.",
        "In the MediManager: Improved the stock tracking features - stock tab, view all current/expired stocks, log from specific stock, stock disposal visual reminders.",
        "In the MediManager: Last restocked data added.",
        "In the MediManager: Introduced notes to logging doses.",
        "In the MediManager: Introduced archive medicine feature.",
        "In the MediManager: Improved metadata handling.",
        "In the Analyser: Updated title heading of Analyser App to 'Lifeblogging & Self-Quantifying Analyser App'.",
        ]
    },
    {
        version: "v7.12.0-alpha",
        date: "2025-08-22",
        changes: [
            "In MediManager: Introduced feature - users can now select an icon and pick a colour for each medicine.",
            "In MediManager: Users can now filter medicines by applied tags.",
        ]
    },
    {
        version: "v7.11.1-alpha",
        date: "2025-08-22",
        changes: [
            "Bug fix.",
        ]
    },
    {
        version: "v7.11.0-alpha",
        date: "2025-08-22",
        changes: [
            "Updated manifest.json.",
        ]
    },
    {
        version: "v7.10.0-alpha",
        date: "2025-08-22",
        changes: [
            "In the Logger: Introduced new Energy item in the Quick Log section.",
        ]
    },
    {
        version: "v7.9.0-alpha",
        date: "2025-08-22",
        changes: [
            "In the Analyser: Introduced ability to display a second attribute on the Chart.",
            "In the Analyser: Moved the sort, search, and filter options to their own section to unify the analysis process.",
        ]
    },
    {
        version: "v7.8.1-alpha",
        date: "2025-08-21",
        changes: [
            "Moved live site from 'lifeblogging.hubblenet.uk' to simply 'lifeblogging.app'.",
            "In the App: Renamed App to Analyser for clearer identification and URL purposes.",
        ]
    },
    {
        version: "v7.8.0-alpha",
        date: "2025-08-21",
        changes: [
            "In the App: New function where users can select their own colour for the attribute name bubbles in the table.",
            "In the App: Users can sort by the data created time.",
            "In the App: Data points with the same data and time should now take data created time into consideration when loading.",
            "In the App: The data table headings now displays which column is currently being sorted.",
        ]
    },
    {
        version: "v7.7.0-alpha",
        date: "2025-08-20",
        changes: [
            "In the Logger: To ensure data accuracy, users can no longer enter data before page/elements have fully loaded.",
            "In the Logger: Activity and Location have been swapped around (visual change only).",
            "In the Logger: To improve data accuracy when adding lots of data at once, the time and date input field automatically refreshes after each entry.",
        ]
    },
    {
        version: "v7.6.0-alpha",
        date: "2025-08-20",
        changes: [
            "The MediManager title bar now displays with better formatting in line with the existing pages.",
            "Users can no longer log or edit data in the future.",
            "Added link to GitHub project to the Hub.",
        ]
    },
    {
        version: "v7.5.0-alpha",
        date: "2025-08-19",
        changes: [
            "Updated PWA files so the entire project is now covered, not just the logger, in preparation for further development.",
        ]
    },
    {
        version: "v7.4.0-alpha",
        date: "2025-08-19",
        changes: [
            "Initial release of MediManager: Create medicines, schedule, track and log medicine, restock and expiry dates. Export functions for full data control.",
        ]
    },
    {
        version: "v7.3.0-alpha",
        date: "2025-08-19",
        changes: [
            "Specific attribute names now display as colourful tags for easy visual identification.",
            "Chart filters time filters now apply to the Data Table.",
            "Introduced lots more specific options to the date filters in the Charts and Table.",
        ]
    },
    {
        version: "v7.2.0-alpha",
        date: "2025-08-18",
        changes: [
            "Introduced a basic table filtering system to the App - filter by date, value, or tag. ",
            "Added icons to the App in line with the other pages."
        ]
    },
    {
        version: "v7.1.0-alpha",
        date: "2025-08-18",
        changes: [
            "Changed sleep quality and productiveness to display as descriptions (visual change only).",
            "Created retainer yes/no quick log buttons.",
            "Created total tasks remaining number box.",
            "Shuffled quick log section into correct order.",
            "Data added via Quick Log section is now assigned to collection 'dailies'.",
            "Fixed issue where adding lots of data at once made the data added during this session section become large and cause issues with displaying all the content on the page.",
        ]
    },
    {
        version: "v7.0.0-alpha",
        date: "2025-08-18",
        changes: [
            "Changed structure of user light/dark mode setting for future scalability purposes.",
            "Created initial .gitignore file."
        ]
    },
    {
        version: "v6.4.1-alpha",
        date: "2025-08-17",
        changes: [
            "Added icons from Font Awesome to the Hub and the Log Tool."
        ]
    },
    {
        version: "v6.4.0-alpha",
        date: "2025-08-17",
        changes: [
            "When in bulk edit mode in the App, you can now click anywhere on the datapoints to select them.",
            "When in bulk edit mode in the App, clicking the select all tick box now shows when all points have been selected and if not every point is selected it will not show as all selected.",
            "Fixed an issue where the table heading appeared over the Data Info modal in the App.",
            "In the App, selecting anywhere outside the Data Info modal now closes it.",
        ]
    },
    {
        version: "v6.3.0-alpha",
        date: "2025-08-17",
        changes: [
            "The App and the Log now display pre-existing tags to help quickly auto-fill the tags entry field.",
            "Updated Log PWA service worker logic to always use the latest changelog version as the cache name.",
        ]
    },
    {
        version: "v6.2.1-alpha",
        date: "2025-08-16",
        changes: [
            "Updated icon of the Log PWA.",
        ]
    },
    {
        version: "v6.2.0-alpha",
        date: "2025-08-16",
        changes: [
            "The correlate data section now has a button to click on to open so it is less prominent and more reflective of user usage. Charts now display every day for the selected Data Collection and Data Attributes, including those with no data points. Users can delete tags added to individual data points within the modal display.",
        ]
    },
    {
        version: "v6.1.0-alpha",
        date: "2025-08-16",
        changes: [
            "Added bulk edit mode shift-select for to select multiple data points at once. Updated table source display/collection name for data added via Log through offline-sync. Added version number display to top right in line with other apps.",
        ]
    },
    {
        version: "v6.0.1-alpha",
        date: "2025-08-16",
        changes: [
            "Replaced the Go to Logger button with a return to Hub button on the App. Each box now has a container outline, identical to the one around Manage Collections.",
        ]
    },
    {
        version: "v6.0.0-alpha",
        date: "2025-08-16",
        changes: [
            "Updated import data function to define key attributes (for analysis). Users can now select the key attribute name and values to be duplicated as new fields. The original data is not modified.",
        ]
    },
    {
        version: "v5.2.0",
        date: "2025-08-16",
        changes: [
            "Updated import data function to define key attributes (for analysis). Users can now select the key attribute name and values to be duplicated as new fields. The original data is not modified.",
        ]
    },
    {
        version: "v5.1.0",
        date: "2025-08-16",
        changes: [
            "Linked latest log tool (imported_log) to the Hub and removed existing deprecated version.",
        ]
    },
    {
        version: "v5.0.0",
        date: "2025-08-16",
        changes: [
            "Merged thenoizee/log at v2.10.1-dev into this repository project into imported_log.",
        ]
    },
    {
        version: "v4.0.1",
        date: "2025-08-16",
        changes: [
            "Updated link back to Hub on changelog with cleaner root page.",
        ]
    },
    {
        version: "v4.0.0",
        date: "2025-08-16",
        changes: [
            "Updated project file structure for cleaner URLs in preparation for full log tool merge.",
            "Updated name and title of app.",
            
        ]
    },
    {
        version: "v3.3.0",
        date: "2025-08-16",
        changes: [
            "Added this changelog page to track updates.",
            "Linked the changelog from the main hub page.",
            
        ]
    },
    {
        version: "xyz",
        date: "2025-08-16",
        changes: [
            
            "Fixed multiple dark mode styling issues in the Analyser.",
            "Corrected tag styling to be consistent across the app.",
        ]
    },
    {
        version: "v1.1.0",
        date: "2025-08-15",
        changes: [
            "Implemented dark mode across the Hub and Analyser pages.",
            "Theme preference is now saved per user account.",
            "Added account management features (change password/email).",
        ]
    },
    {
        version: "v1.0.0",
        date: "2025-08-14",
        changes: [
            "Initial release of the Lifeblogging Hub.",
            "Includes the Analyser and Logger tools.",
            "Firebase authentication and data storage implemented.",
        ]
    }
];