import {createAddHook} from "./creates/createAddHook";
import {createRemoveHook} from "./creates/createRemoveHook";
import {createHasHook} from "./creates/createHasHook";
import {createRunHook} from "./creates/createRunHook";
import {createCurrentHook} from "./creates/createCurrentHook";
import {createDoingHook} from "./creates/createDoingHook";
import {createDidHook} from "./creates/createDidHook";

export class EcjiaHook {
    
    constructor() {
        this.actions = {};
        this.filters = {};
    }

    // Add action/filter functions.
    add_action(hookName, callback, priority) {
        return createAddHook(this.actions)(hookName, callback, priority);
    }

    add_filter(hookName, callback, priority) {
        return createAddHook(this.filters)(hookName, callback, priority);
    }

    // Remove action/filter functions.
    remove_action(hookName, callback) {
        return createRemoveHook(this.actions)(hookName, callback);
    }

    remove_filter(hookName, callback) {
        return createRemoveHook(this.filters)(hookName, callback);
    }

    // Has action/filter functions.
    has_action(hookName) {
        return createHasHook(this.actions)(hookName);
    }

    has_filter(hookName) {
        return createHasHook(this.filters)(hookName);
    }

    // Remove all actions/filters functions.
    remove_all_actions(hookName, callback) {
        return createRemoveHook(this.actions, true)(hookName, callback);
    }

    remove_all_filters(hookName, callback) {
        return createRemoveHook(this.filters, true)(hookName, callback);
    }

    // Do action/apply filters functions.
    do_action(...options) {
        return createRunHook(this.actions)(...options);
    }

    apply_filters(...options) {
        return createRunHook(this.filters, true)(...options);
    }

    // Current action/filter functions.
    current_action() {
        return createCurrentHook(this.actions)();
    }

    current_filter() {
        return createCurrentHook(this.filters)();
    }

    // Doing action/filter: true while a hook is being run.
    doing_action(hookName) {
        return createDoingHook(this.actions)(hookName);
    }

    doing_filter(hookName) {
        return createDoingHook(this.filters)(hookName);
    }

    // Did action/filter functions.
    did_action(hookName) {
        return createDidHook(this.actions)(hookName);
    }

    did_filter(hookName) {
        return createDidHook(this.filters)(hookName);
    }

}