
/**
 * Returns a function which, when invoked, will execute all callbacks
 * registered to a hook of the specified type, optionally returning the final
 * value of the call chain.
 *
 * @param  {Object}   hooks          Stored hooks, keyed by hook name.
 * @param  {?boolean}    returnFirstArg Whether each hook callback is expected to
 *                                   return its first argument.
 *
 * @return {Function}                Function that runs hook callbacks.
 */
export function createRunHook( hooks, returnFirstArg = false ) {
    /**
     * Runs all callbacks for the specified hook.
     *
     * @param  {string} hookName The name of the hook to run.
     * @param  {...*}   args     Arguments to pass to the hook callbacks.
     *
     * @return {*}               Return value of runner, if applicable.
     */
    return function runHooks(...options) {

        let args = options;
        let hookName = args.shift();

        if ( typeof hookName !== 'string' ) {
            console.error( 'The hook name must be a string.' );
            return;
        }

        if ( /^__/.test( hookName ) ) {
            console.error( 'The hook name cannot begin with `__`.' );
            return;
        }

        if ( ! hooks.hasOwnProperty( hookName ) ) {
            hooks[ hookName ] = {
                runs: 0,
                handlers: []
            };
        }

        let handlers = hooks[ hookName ].handlers;

        if ( ! handlers.length ) {
            return returnFirstArg
                ? args[ 0 ]
                : undefined;
        }

        let hookInfo = {
            name: hookName,
            currentIndex: 0
        };

        hooks.__current = hooks.__current || [];
        hooks.__current.push( hookInfo );
        hooks[ hookName ].runs++;

        let maybeReturnValue = args[ 0 ];

        while ( hookInfo.currentIndex < handlers.length ) {
            let handler = handlers[ hookInfo.currentIndex ];
            maybeReturnValue = handler.callback.apply( null, args );
            if ( returnFirstArg ) {
                args[ 0 ] = maybeReturnValue;
            }
            hookInfo.currentIndex++;
        }

        hooks.__current.pop();

        if ( returnFirstArg ) {
            return maybeReturnValue;
        }
    };
}