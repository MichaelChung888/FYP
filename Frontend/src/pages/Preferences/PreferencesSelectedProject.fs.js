import { createElement } from "react";
import { int32ToString, createObj } from "../../fable_modules/fable-library.4.1.4/Util.js";
import { Helpers_combineClasses } from "../../fable_modules/Feliz.Bulma.3.0.0/./ElementBuilders.fs.js";
import { Interop_reactApi } from "../../fable_modules/Feliz.2.7.0/./Interop.fs.js";
import { singleton, ofArray } from "../../fable_modules/fable-library.4.1.4/List.js";
import { join } from "../../fable_modules/fable-library.4.1.4/String.js";
import { map, singleton as singleton_1, append, delay, toList } from "../../fable_modules/fable-library.4.1.4/Seq.js";
import { TableCategories } from "../../Common.fs.js";
import { Msg } from "./PreferencesTypes.fs.js";

export function projectInfoMedia(sp) {
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

export function projectInfoBody(model, sp) {
    let elms_1, elems_1, elems, elms;
    const elms_2 = ofArray([(elms_1 = ofArray([createElement("div", createObj(Helpers_combineClasses("column", ofArray([["className", join(" ", ["is-4"])], (elems_1 = [createElement("h3", {
        children: ["Project Rankings"],
    }), createElement("ol", createObj(ofArray([["style", {
        fontWeight: 700,
    }], (elems = [createElement("li", {
        key: "1",
        children: int32ToString(sp.r1),
    }), createElement("li", {
        key: "2",
        children: int32ToString(sp.r2),
    }), createElement("li", {
        key: "3",
        children: int32ToString(sp.r3),
    }), createElement("li", {
        key: "4",
        children: int32ToString(sp.r4),
    }), createElement("li", {
        key: "5",
        children: int32ToString(sp.r5),
    }), createElement("li", {
        key: "6",
        children: int32ToString(sp.r6),
    }), createElement("li", {
        key: "7",
        children: int32ToString(sp.r7),
    }), createElement("li", {
        key: "8",
        children: int32ToString(sp.r8),
    }), createElement("li", {
        key: "9",
        children: int32ToString(sp.r9),
    }), createElement("li", {
        key: "10",
        children: int32ToString(sp.r10),
    })], ["children", Interop_reactApi.Children.toArray(Array.from(elems))])])))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_1))])])))), (elms = toList(delay(() => append(singleton_1(createElement("h3", {
        children: ["Project Categories"],
    })), delay(() => append(map((c) => c, TableCategories(sp.categories)), delay(() => append(singleton_1(createElement("h3", {
        children: ["Student Requirements"],
    })), delay(() => singleton_1(createElement("p", {
        children: [sp.requirements],
    })))))))))), createElement("div", {
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

export function selectedProject(model) {
    let elems_2, elms, elems_1;
    const sp = model.selectedProject;
    return createElement("div", createObj(Helpers_combineClasses("card", ofArray([["style", {
        overflowY: "auto",
        height: 89.5 + "%",
    }], ["className", join(" ", ["scrollbar"])], (elems_2 = [(elms = singleton(createElement("p", {
        className: "card-header-title",
        children: (("#" + int32ToString(sp.pid)) + " ") + sp.title,
    })), createElement("header", {
        className: "card-header",
        children: Interop_reactApi.Children.toArray(Array.from(elms)),
    })), createElement("div", createObj(Helpers_combineClasses("card-content", singleton((elems_1 = [projectInfoMedia(sp), projectInfoBody(model, sp)], ["children", Interop_reactApi.Children.toArray(Array.from(elems_1))])))))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_2))])]))));
}

export function removeProjectButtons(model, dispatch) {
    const elms = ofArray([createElement("button", createObj(Helpers_combineClasses("button", ofArray([["className", "is-danger"], ["style", {
        marginRight: 30,
    }], ["children", "Remove Preference"], ["onClick", (_arg) => {
        dispatch(new Msg(7, []));
    }]])))), createElement("button", createObj(Helpers_combineClasses("button", ofArray([["children", "Close Project"], ["onClick", (_arg_1) => {
        dispatch(new Msg(4, []));
    }]]))))]);
    return createElement("div", {
        className: "box",
        children: Interop_reactApi.Children.toArray(Array.from(elms)),
    });
}

//# sourceMappingURL=PreferencesSelectedProject.fs.js.map
