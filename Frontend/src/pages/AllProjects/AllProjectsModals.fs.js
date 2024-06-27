import { createElement } from "react";
import { int32ToString, createObj } from "../../fable_modules/fable-library.4.1.4/Util.js";
import { Helpers_combineClasses } from "../../fable_modules/Feliz.Bulma.3.0.0/./ElementBuilders.fs.js";
import { Interop_reactApi } from "../../fable_modules/Feliz.2.7.0/./Interop.fs.js";
import { singleton, ofArray } from "../../fable_modules/fable-library.4.1.4/List.js";
import { join } from "../../fable_modules/fable-library.4.1.4/String.js";
import { ProjectPopularityTable } from "../../Common.fs.js";
import { map, singleton as singleton_1, append, delay, toList } from "../../fable_modules/fable-library.4.1.4/Seq.js";
import { TableStreams, TableCategories } from "./AllProjectsHelpers.fs.js";
import { Msg } from "./AllProjectsTypes.fs.js";

export function ModalProjectInfoMedia(sp) {
    let elems_3, elms, elems, elms_1;
    return createElement("article", createObj(Helpers_combineClasses("media", ofArray([["style", {
        marginBottom: 40,
    }], (elems_3 = [(elms = singleton(createElement("figure", createObj(Helpers_combineClasses("image", ofArray([["className", "is-48x48"], (elems = [createElement("img", {
        src: "https://bulma.io/assets/images/placeholders/96x96.png",
    })], ["children", Interop_reactApi.Children.toArray(Array.from(elems))])]))))), createElement("div", {
        className: "media-left",
        children: Interop_reactApi.Children.toArray(Array.from(elms)),
    })), (elms_1 = ofArray([createElement("h1", createObj(Helpers_combineClasses("title", ofArray([["className", join(" ", ["is-4"])], ["children", sp.supName]])))), createElement("h2", createObj(Helpers_combineClasses("subtitle", ofArray([["className", join(" ", ["is-6"])], ["children", "example123@ic.ac.uk"]]))))]), createElement("div", {
        className: "media-content",
        children: Interop_reactApi.Children.toArray(Array.from(elms_1)),
    }))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_3))])]))));
}

export function ModalProjectInfoBody(model, sp) {
    let elms_1, elems, elms;
    const elms_2 = ofArray([(elms_1 = ofArray([createElement("div", createObj(Helpers_combineClasses("column", ofArray([["className", join(" ", ["is-3"])], (elems = [createElement("h3", {
        children: ["Project Rankings"],
    }), ProjectPopularityTable(sp)], ["children", Interop_reactApi.Children.toArray(Array.from(elems))])])))), createElement("div", createObj(Helpers_combineClasses("column", singleton(["className", join(" ", ["is-1"])])))), (elms = toList(delay(() => append(singleton_1(createElement("h3", {
        children: ["Project Categories"],
    })), delay(() => append(map((c) => c, TableCategories(model, sp.categories)), delay(() => append(singleton_1(createElement("h3", {
        children: ["Streams"],
    })), delay(() => append(map((c_1) => c_1, TableStreams(model, sp.tstream)), delay(() => append(singleton_1(createElement("h3", {
        children: ["Student Requirements"],
    })), delay(() => singleton_1(createElement("p", {
        children: [sp.requirements],
    })))))))))))))), createElement("div", {
        className: "column",
        children: Interop_reactApi.Children.toArray(Array.from(elms)),
    }))]), createElement("div", {
        className: "columns",
        children: Interop_reactApi.Children.toArray(Array.from(elms_1)),
    })), createElement("h3", {
        children: ["Desired Skills"],
    }), createElement("p", {
        children: [sp.skills],
    }), createElement("h3", {
        children: ["Project Description"],
    }), createElement("p", {
        children: [sp.descr],
    }), createElement("h3", {
        children: ["Meeting Dates"],
    }), createElement("p", {
        children: [sp.meetings],
    })]);
    return createElement("div", {
        className: "content",
        children: Interop_reactApi.Children.toArray(Array.from(elms_2)),
    });
}

export function ModalProjectInfo(model, dispatch) {
    let elms, elems_1, elms_2, elms_1;
    const sp = model.selectedProject;
    const elms_3 = ofArray([(elms = ofArray([createElement("p", {
        className: "modal-card-title",
        children: (("#" + int32ToString(sp.pid)) + " ") + sp.title,
    }), createElement("button", createObj(Helpers_combineClasses("modal-close", ofArray([["className", join(" ", ["is-large"])], ["onClick", (_arg) => {
        dispatch(new Msg(4, []));
    }]]))))]), createElement("header", {
        className: "modal-card-head",
        children: Interop_reactApi.Children.toArray(Array.from(elms)),
    })), createElement("section", createObj(Helpers_combineClasses("modal-card-body", ofArray([["className", join(" ", ["scrollbar"])], (elems_1 = [ModalProjectInfoMedia(sp), ModalProjectInfoBody(model, sp)], ["children", Interop_reactApi.Children.toArray(Array.from(elems_1))])])))), (elms_2 = singleton((elms_1 = singleton(createElement("button", createObj(Helpers_combineClasses("button", ofArray([["children", "Close Project"], ["onClick", (_arg_1) => {
        dispatch(new Msg(4, []));
    }]]))))), createElement("div", {
        className: "buttons",
        children: Interop_reactApi.Children.toArray(Array.from(elms_1)),
    }))), createElement("footer", {
        className: "modal-card-foot",
        children: Interop_reactApi.Children.toArray(Array.from(elms_2)),
    }))]);
    return createElement("div", {
        className: "modal-card",
        children: Interop_reactApi.Children.toArray(Array.from(elms_3)),
    });
}

//# sourceMappingURL=AllProjectsModals.fs.js.map
