
/**
 * Returns a function which, when invoked, will return whether any handlers are
 * attached to a particular hook.
 *
 * @param  {Object}   hooks Stored hooks, keyed by hook name.
 *
 * @return {Function}       Function that returns whether any handlers are
 *                          attached to a particular hook.
 */
export function createHasHook( hooks ) {
    /**
     * Returns how many handlers are attached for the given hook.
     *
     * @param  {string}  hookName The name of the hook to check for.
     *
     * @return {number}           The number of handlers that are attached to
     *                            the given hook.
     */
    return function hasHook( hookName ) {
        return hooks.hasOwnProperty( hookName )
            ? hooks[ hookName ].handlers.length
            : 0;
    };
}
