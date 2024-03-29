
/**
 * 当数据为假时，使用默认值
 * @param val
 * @param _default
 * @returns {*}
 */
function ecjia_default(val, _default = null) {
    if (val == null || val === false) {
        return _default;
    }

    return val;
}

/**
 * Returns a function which, when invoked, will add a hook.
 *
 * @param  {Object}   hooks Stored hooks, keyed by hook name.
 *
 * @return {Function}       Function that adds a new hook.
 */
export function createAddHook( hooks ) {
    /**
     * Adds the hook to the appropriate hooks container.
     *
     * @param {string}   hookName Name of hook to add
     * @param {Function} callback Function to call when the hook is run
     * @param {?number}  priority Priority of this hook (default=10)
     */
    return function addHook( hookName, callback, priority ) {

        priority = ecjia_default(priority, 10);

        if ( typeof hookName !== 'string' ) {
            console.error( 'The hook name must be a string.' );
            return;
        }

        if ( /^__/.test( hookName ) ) {
            console.error( 'The hook name cannot begin with `__`.' );
            return;
        }

        if ( typeof callback !== 'function' ) {
            console.error( 'The hook callback must be a function.' );
            return;
        }

        // Validate numeric priority
        if ( typeof priority !== 'number' ) {
            console.error( 'If specified, the hook priority must be a number.' );
            return;
        }

        let handler = {callback: callback, priority: priority };

        if ( hooks.hasOwnProperty( hookName ) ) {
            // Find the correct insert index of the new hook.
            let handlers = hooks[ hookName ].handlers;
            let i = 0;
            while ( i < handlers.length ) {
                if ( handlers[ i ].priority > priority ) {
                    break;
                }
                i++;
            }
            // Insert (or append) the new hook.
            handlers.splice( i, 0, handler );
            // We may also be currently executing this hook.  If the callback
            // we're adding would come after the current callback, there's no
            // problem; otherwise we need to increase the execution index of
            // any other runs by 1 to account for the added element.
            ( hooks.__current || [] ).forEach( function (hookInfo)  {
                if ( hookInfo.name === hookName && hookInfo.currentIndex >= i ) {
                    hookInfo.currentIndex++;
                }
            } );
        } else {
            // This is the first hook of its type.
            hooks[ hookName ] = {
                handlers: [ handler ],
                runs: 0
            };
        }
    };
}

