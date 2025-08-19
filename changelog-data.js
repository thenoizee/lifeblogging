// /changelog-data.js

export const changelogData = [
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