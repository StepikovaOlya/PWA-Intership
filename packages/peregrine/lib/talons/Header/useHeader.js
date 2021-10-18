import { useCallback } from 'react';

import { useAppContext } from '@magento/peregrine/lib/context/app';
import { useDropdown } from '@magento/peregrine/lib/hooks/useDropdown';
import {useQuery} from "@apollo/client";
import {GET_STORE_CONFIG_DATA} from "./storeSwitcher.gql";

export const useHeader = () => {
    const [{ hasBeenOffline, isOnline, isPageLoading }] = useAppContext();
    const {
        elementRef: searchRef,
        expanded: isSearchOpen,
        setExpanded: setIsSearchOpen,
        triggerRef: searchTriggerRef
    } = useDropdown();

    const handleSearchTriggerClick = useCallback(() => {
        // Toggle the Search input form.
        setIsSearchOpen(isOpen => !isOpen);
    }, [setIsSearchOpen]);


    const { data, error, loading } = useQuery(GET_STORE_CONFIG_DATA, {
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first'
    });

    const logo = data ? (
        {
            header_logo_src: data.storeConfig.header_logo_src,
            logo_alt: data.storeConfig.logo_alt,
            logo_width: data.storeConfig.logo_width,
            logo_height: data.storeConfig.logo_height
        }
    ) : null;

    return {
        logo,
        error,
        handleSearchTriggerClick,
        hasBeenOffline,
        isOnline,
        isPageLoading,
        isSearchOpen,
        loading,
        searchRef,
        searchTriggerRef
    };
};
