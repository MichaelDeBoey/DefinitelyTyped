//////////////////////////////////////////////////////
// BEWARE: DO NOT EDIT MANUALLY! Changes will be lost!
//////////////////////////////////////////////////////

/**
 * Namespace: browser.search
 */
export namespace Search {
    /**
     * An object encapsulating a search engine
     */
    interface SearchEngine {
        name: string;

        isDefault: boolean;

        /**
         * Optional.
         */
        alias?: string;

        /**
         * Optional.
         */
        favIconUrl?: string;
    }

    /**
     * Location where search results should be displayed.
     */
    type Disposition = "CURRENT_TAB" | "NEW_TAB" | "NEW_WINDOW";

    interface SearchSearchPropertiesType {
        /**
         * Terms to search for.
         */
        query: string;

        /**
         * Search engine to use. Uses the default if not specified.
         * Optional.
         */
        engine?: string;

        /**
         * Location where search results should be displayed. NEW_TAB is the default.
         * Optional.
         */
        disposition?: Disposition;

        /**
         * The ID of the tab for the search results. If not specified, a new tab is created, unless disposition is set.
         * tabId cannot be used with disposition.
         * Optional.
         */
        tabId?: number;
    }

    interface QueryQueryInfoType {
        /**
         * String to query with the default search provider.
         */
        text: string;

        /**
         * Location where search results should be displayed. CURRENT_TAB is the default.
         * Optional.
         */
        disposition?: Disposition;

        /**
         * Location where search results should be displayed. tabId cannot be used with disposition.
         * Optional.
         */
        tabId?: number;
    }

    interface Static {
        /**
         * Gets a list of search engines.
         *
         * @returns A Promise that will be fulfilled with an array of search engine objects.
         */
        get(): Promise<SearchEngine[]>;

        /**
         * Perform a search.
         */
        search(searchProperties: SearchSearchPropertiesType): Promise<void>;

        /**
         * Use the chrome.search API to search via the default provider.
         */
        query(queryInfo: QueryQueryInfoType): Promise<void>;
    }
}
