// /changelog-data.js

export const changelogData = [
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