import { createElement } from "react";
import { createObj } from "../../fable_modules/fable-library.4.1.4/Util.js";
import { Helpers_combineClasses } from "../../fable_modules/Feliz.Bulma.3.0.0/./ElementBuilders.fs.js";
import { join } from "../../fable_modules/fable-library.4.1.4/String.js";
import { Msg } from "./ProposalsTypes.fs.js";
import { singleton, ofArray } from "../../fable_modules/fable-library.4.1.4/List.js";
import { Interop_reactApi } from "../../fable_modules/Feliz.2.7.0/./Interop.fs.js";
import { singleton as singleton_1, append, delay, toList } from "../../fable_modules/fable-library.4.1.4/Seq.js";
import { Meetings, Description, Skills, Requirements, Streams, Categories, ProjectTitle } from "./ProposalsEditForm.fs.js";

export function DeleteProposalModal(model, dispatch) {
    let elms, elems_2, elms_1, elms_3, elms_2;
    const sp = model.selectedProposal.project;
    const elms_4 = ofArray([(elms = ofArray([createElement("p", {
        className: "modal-card-title",
        children: "Remove Proposal",
    }), createElement("button", createObj(Helpers_combineClasses("modal-close", ofArray([["className", join(" ", ["is-large"])], ["onClick", (_arg) => {
        dispatch(new Msg(12, []));
    }]]))))]), createElement("header", {
        className: "modal-card-head",
        children: Interop_reactApi.Children.toArray(Array.from(elms)),
    })), createElement("section", createObj(Helpers_combineClasses("modal-card-body", ofArray([["className", join(" ", ["scrollbar"])], (elems_2 = [(elms_1 = ofArray([createElement("h3", {
        children: ["Are you sure you want to remove the following proposal:"],
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
        dispatch(new Msg(12, []));
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

export function EditProposalModal(model, dispatch) {
    let elms, elems_3, elms_1, elems_1, elms_3, elms_2;
    const elms_4 = ofArray([(elms = ofArray([createElement("p", {
        className: "modal-card-title",
        children: "Edit Project Form",
    }), createElement("button", createObj(Helpers_combineClasses("modal-close", ofArray([["className", join(" ", ["is-large"])], ["onClick", (_arg) => {
        dispatch(new Msg(12, []));
    }]]))))]), createElement("header", {
        className: "modal-card-head",
        children: Interop_reactApi.Children.toArray(Array.from(elms)),
    })), createElement("section", createObj(Helpers_combineClasses("modal-card-body", ofArray([["className", join(" ", ["scrollbar"])], (elems_3 = [(elms_1 = singleton(createElement("form", createObj(singleton((elems_1 = toList(delay(() => {
        const projectInfo = model.editProject;
        return append(singleton_1(ProjectTitle(projectInfo, dispatch)), delay(() => append(singleton_1(Categories(projectInfo, dispatch)), delay(() => append(singleton_1(Streams(projectInfo, dispatch)), delay(() => append(singleton_1(Requirements(projectInfo, dispatch)), delay(() => append(singleton_1(Skills(projectInfo, dispatch)), delay(() => append(singleton_1(Description(projectInfo, dispatch)), delay(() => singleton_1(Meetings(projectInfo, dispatch))))))))))))));
    })), ["children", Interop_reactApi.Children.toArray(Array.from(elems_1))]))))), createElement("div", {
        className: "content",
        children: Interop_reactApi.Children.toArray(Array.from(elms_1)),
    }))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_3))])])))), (elms_3 = singleton((elms_2 = ofArray([createElement("button", createObj(Helpers_combineClasses("button", ofArray([["children", "Save Changes"], ["onClick", (_arg_1) => {
        dispatch(new Msg(10, []));
    }], ["className", "is-success"]])))), createElement("button", createObj(Helpers_combineClasses("button", ofArray([["children", "Cancel"], ["onClick", (_arg_2) => {
        dispatch(new Msg(12, []));
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

//# sourceMappingURL=ProposalsModals.fs.js.map
