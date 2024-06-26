import { createElement } from "react";
import { createObj } from "../../fable_modules/fable-library.4.1.4/Util.js";
import { Helpers_combineClasses } from "../../fable_modules/Feliz.Bulma.3.0.0/./ElementBuilders.fs.js";
import { join } from "../../fable_modules/fable-library.4.1.4/String.js";
import { Msg } from "./PreferencesTypes.fs.js";
import { singleton, ofArray } from "../../fable_modules/fable-library.4.1.4/List.js";
import { Interop_reactApi } from "../../fable_modules/Feliz.2.7.0/./Interop.fs.js";

export function removePreferenceModal(model, dispatch) {
    let elms, elems_2, elms_1, elms_3, elms_2;
    const sp = model.selectedProject;
    const elms_4 = ofArray([(elms = ofArray([createElement("p", {
        className: "modal-card-title",
        children: "Remove Preference",
    }), createElement("button", createObj(Helpers_combineClasses("modal-close", ofArray([["className", join(" ", ["is-large"])], ["onClick", (_arg) => {
        dispatch(new Msg(11, []));
    }]]))))]), createElement("header", {
        className: "modal-card-head",
        children: Interop_reactApi.Children.toArray(Array.from(elms)),
    })), createElement("section", createObj(Helpers_combineClasses("modal-card-body", ofArray([["className", join(" ", ["scrollbar"])], (elems_2 = [(elms_1 = ofArray([createElement("h3", {
        children: ["Are you sure you want to remove the following project from your preferences:"],
    }), createElement("blockquote", {
        children: [("\'" + sp.title) + "\'"],
    }), createElement("p", {
        children: ["You can always undo your changes by pressing \'Discard Changes\' in the bottom left."],
    })]), createElement("div", {
        className: "content",
        children: Interop_reactApi.Children.toArray(Array.from(elms_1)),
    }))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_2))])])))), (elms_3 = singleton((elms_2 = ofArray([createElement("button", createObj(Helpers_combineClasses("button", ofArray([["children", "Remove Preference"], ["onClick", (_arg_1) => {
        dispatch(new Msg(8, []));
    }], ["className", "is-danger"]])))), createElement("button", createObj(Helpers_combineClasses("button", ofArray([["children", "Cancel"], ["onClick", (_arg_2) => {
        dispatch(new Msg(11, []));
    }]]))))]), createElement("div", {
        className: "buttons",
        children: Interop_reactApi.Children.toArray(Array.from(elms_2)),
    }))), createElement("footer", {
        className: "modal-card-foot",
        children: Interop_reactApi.Children.toArray(Array.from(elms_3)),
    }))]);
    return createElement("div", {
        className: "modal-card",
        children: Interop_reactApi.Children.toArray(Array.from(elms_4)),
    });
}

export function addPreferenceModal(model, dispatch) {
    let elms, elems_2, elms_1, elms_3, elms_2;
    const elms_4 = ofArray([(elms = ofArray([createElement("p", {
        className: "modal-card-title",
        children: "Go to Projects Page",
    }), createElement("button", createObj(Helpers_combineClasses("modal-close", ofArray([["className", join(" ", ["is-large"])], ["onClick", (_arg) => {
        dispatch(new Msg(11, []));
    }]]))))]), createElement("header", {
        className: "modal-card-head",
        children: Interop_reactApi.Children.toArray(Array.from(elms)),
    })), createElement("section", createObj(Helpers_combineClasses("modal-card-body", ofArray([["className", join(" ", ["scrollbar"])], (elems_2 = [(elms_1 = ofArray([createElement("h3", {
        children: ["Do you want to go to the Projects Page to add projects?"],
    }), createElement("p", {
        style: {
            color: "#FF0000",
        },
        children: "Make sure to save any changes before leaving the page.",
    })]), createElement("div", {
        className: "content",
        children: Interop_reactApi.Children.toArray(Array.from(elms_1)),
    }))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_2))])])))), (elms_3 = singleton((elms_2 = ofArray([createElement("button", createObj(Helpers_combineClasses("button", ofArray([["children", "Go to Projects Page"], ["onClick", (_arg_1) => {
        dispatch(new Msg(6, []));
    }], ["className", "is-success"]])))), createElement("button", createObj(Helpers_combineClasses("button", ofArray([["children", "Cancel"], ["onClick", (_arg_2) => {
        dispatch(new Msg(11, []));
    }]]))))]), createElement("div", {
        className: "buttons",
        children: Interop_reactApi.Children.toArray(Array.from(elms_2)),
    }))), createElement("footer", {
        className: "modal-card-foot",
        children: Interop_reactApi.Children.toArray(Array.from(elms_3)),
    }))]);
    return createElement("div", {
        className: "modal-card",
        children: Interop_reactApi.Children.toArray(Array.from(elms_4)),
    });
}

export function saveChangesModal(model, dispatch) {
    let elms, elems_2, elms_1, elms_3, elms_2;
    const elms_4 = ofArray([(elms = ofArray([createElement("p", {
        className: "modal-card-title",
        children: "Save Changes",
    }), createElement("button", createObj(Helpers_combineClasses("modal-close", ofArray([["className", join(" ", ["is-large"])], ["onClick", (_arg) => {
        dispatch(new Msg(11, []));
    }]]))))]), createElement("header", {
        className: "modal-card-head",
        children: Interop_reactApi.Children.toArray(Array.from(elms)),
    })), createElement("section", createObj(Helpers_combineClasses("modal-card-body", ofArray([["className", join(" ", ["scrollbar"])], (elems_2 = [(elms_1 = ofArray([createElement("h3", {
        children: ["Would you like to save your preferences?"],
    }), createElement("p", {
        style: {
            color: "#FF0000",
        },
        children: "Unsaved changes will be lost so save changes before closing?",
    })]), createElement("div", {
        className: "content",
        children: Interop_reactApi.Children.toArray(Array.from(elms_1)),
    }))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_2))])])))), (elms_3 = singleton((elms_2 = ofArray([createElement("button", createObj(Helpers_combineClasses("button", ofArray([["children", "Save Changes"], ["onClick", (_arg_1) => {
        dispatch(new Msg(10, []));
    }], ["className", "is-success"]])))), createElement("button", createObj(Helpers_combineClasses("button", ofArray([["children", "Not Yet"], ["onClick", (_arg_2) => {
        dispatch(new Msg(11, []));
    }]]))))]), createElement("div", {
        className: "buttons",
        children: Interop_reactApi.Children.toArray(Array.from(elms_2)),
    }))), createElement("footer", {
        className: "modal-card-foot",
        children: Interop_reactApi.Children.toArray(Array.from(elms_3)),
    }))]);
    return createElement("div", {
        className: "modal-card",
        children: Interop_reactApi.Children.toArray(Array.from(elms_4)),
    });
}

//# sourceMappingURL=PreferencesModals.fs.js.map
