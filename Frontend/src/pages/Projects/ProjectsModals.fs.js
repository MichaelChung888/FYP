import { createElement } from "react";
import { int32ToString, createObj } from "../../fable_modules/fable-library.4.1.4/Util.js";
import { Helpers_combineClasses } from "../../fable_modules/Feliz.Bulma.3.0.0/./ElementBuilders.fs.js";
import { Interop_reactApi } from "../../fable_modules/Feliz.2.7.0/./Interop.fs.js";
import { map as map_1, singleton, ofArray } from "../../fable_modules/fable-library.4.1.4/List.js";
import { join } from "../../fable_modules/fable-library.4.1.4/String.js";
import { map, singleton as singleton_1, append, delay, toList } from "../../fable_modules/fable-library.4.1.4/Seq.js";
import { TableCategories } from "./ProjectsHelpers.fs.js";
import { Msg } from "./ProjectsTypes.fs.js";
import { Table } from "../../Common.fs.js";

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
    })), delay(() => append(map((c) => c, TableCategories(model, sp.categories)), delay(() => append(singleton_1(createElement("h3", {
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
    })), createElement("section", createObj(Helpers_combineClasses("modal-card-body", ofArray([["className", join(" ", ["scrollbar"])], (elems_1 = [ModalProjectInfoMedia(sp), ModalProjectInfoBody(model, sp)], ["children", Interop_reactApi.Children.toArray(Array.from(elems_1))])])))), (elms_2 = singleton((elms_1 = ofArray([createElement("button", createObj(Helpers_combineClasses("button", toList(delay(() => (model.preference.doc ? append(singleton_1(["children", "You\'ve entered DOC allocation"]), delay(() => append(singleton_1(["disabled", true]), delay(() => singleton_1(["className", "is-warning"]))))) : append(singleton_1(["className", "is-success"]), delay(() => append(singleton_1(["children", "Add Project"]), delay(() => singleton_1(["onClick", (_arg_1) => {
        dispatch(new Msg(6, []));
    }]))))))))))), createElement("button", createObj(Helpers_combineClasses("button", ofArray([["children", "Close Project"], ["onClick", (_arg_2) => {
        dispatch(new Msg(4, []));
    }]]))))]), createElement("div", {
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

export function PreferenceRow(model, dispatch, _arg1_, _arg1__1) {
    const _arg = [_arg1_, _arg1__1];
    const rank = _arg[1] | 0;
    const projectInfo = _arg[0];
    return createElement("tr", createObj(toList(delay(() => append(singleton_1(["className", join(" ", ["table-row"])]), delay(() => append(singleton_1(["onClick", (_arg_1) => {
        dispatch(new Msg(8, [rank]));
    }]), delay(() => append(singleton_1(["style", {
        cursor: "pointer",
    }]), delay(() => {
        let elems, elems_1, elems_2;
        const matchValue = model.selectedProjectRank === rank;
        return matchValue ? singleton_1((elems = [createElement("td", {
            style: {
                color: "#FF0000",
            },
            children: rank,
        }), createElement("td", {
            style: {
                color: "#FF0000",
            },
            children: model.selectedProject.title,
        }), createElement("td", {
            style: {
                color: "#FF0000",
            },
            children: model.selectedProject.supName,
        })], ["children", Interop_reactApi.Children.toArray(Array.from(elems))])) : ((projectInfo.pid === 0) ? singleton_1((elems_1 = [createElement("td", {
            children: rank,
        }), createElement("td", {}), createElement("td", {})], ["children", Interop_reactApi.Children.toArray(Array.from(elems_1))])) : singleton_1((elems_2 = [createElement("td", {
            children: rank,
        }), createElement("td", {
            children: projectInfo.title,
        }), createElement("td", {
            children: projectInfo.supName,
        })], ["children", Interop_reactApi.Children.toArray(Array.from(elems_2))])));
    }))))))))));
}

export function PreferenceTable(model, dispatch) {
    let children_2, children, children_4;
    const pref = model.preference;
    const prefList = ofArray([[pref.p1, pref.n1], [pref.p2, pref.n2], [pref.p3, pref.n3], [pref.p4, pref.n4], [pref.p5, pref.n5], [pref.p6, pref.n6], [pref.p7, pref.n7], [pref.p8, pref.n8], [pref.p9, pref.n9], [pref.p10, pref.n10]]);
    return Table(ofArray([(children_2 = singleton((children = ofArray([createElement("th", {
        title: "Rank",
        children: "Rank",
    }), createElement("th", {
        title: "Title",
        children: "Title",
    }), createElement("th", {
        title: "Professor",
        children: "Professor",
    })]), createElement("tr", {
        children: Interop_reactApi.Children.toArray(Array.from(children)),
    }))), createElement("thead", {
        children: Interop_reactApi.Children.toArray(Array.from(children_2)),
    })), (children_4 = map_1((tupledArg) => PreferenceRow(model, dispatch, tupledArg[0], tupledArg[1]), prefList), createElement("tbody", {
        children: Interop_reactApi.Children.toArray(Array.from(children_4)),
    }))]));
}

export function ModalAddProject(model, dispatch) {
    let elms, elems_2, elms_1, value_14, elms_3, elms_2;
    const sp = model.selectedProject;
    const elms_4 = ofArray([(elms = ofArray([createElement("p", {
        className: "modal-card-title",
        children: (("#" + int32ToString(sp.pid)) + " ") + sp.title,
    }), createElement("button", createObj(Helpers_combineClasses("modal-close", ofArray([["className", join(" ", ["is-large"])], ["onClick", (_arg) => {
        dispatch(new Msg(4, []));
    }]]))))]), createElement("header", {
        className: "modal-card-head",
        children: Interop_reactApi.Children.toArray(Array.from(elms)),
    })), createElement("section", createObj(Helpers_combineClasses("modal-card-body", ofArray([["className", join(" ", ["scrollbar"])], (elems_2 = [(elms_1 = ofArray([createElement("h3", {
        children: ["Add Project"],
    }), createElement("p", {
        children: ["You are about to add the following project to your preferences:"],
    }), createElement("blockquote", {
        children: [("\'" + sp.title) + "\'"],
    }), (value_14 = "Below in your preferences, please select a preference rank \r\n                            of where you would like to replace or place the project.", createElement("p", {
        children: [value_14],
    })), createElement("h3", {
        children: ["Your Preferences"],
    }), PreferenceTable(model, dispatch)]), createElement("div", {
        className: "content",
        children: Interop_reactApi.Children.toArray(Array.from(elms_1)),
    }))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_2))])])))), (elms_3 = singleton((elms_2 = ofArray([createElement("button", createObj(Helpers_combineClasses("button", toList(delay(() => append(singleton_1(["children", "Save Changes"]), delay(() => ((model.selectedProjectRank === 0) ? singleton_1(["disabled", true]) : append(singleton_1(["onClick", (_arg_1) => {
        dispatch(new Msg(5, []));
    }]), delay(() => singleton_1(["className", "is-success"]))))))))))), createElement("button", createObj(Helpers_combineClasses("button", ofArray([["children", "Go Back"], ["onClick", (_arg_2) => {
        dispatch(new Msg(7, []));
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

//# sourceMappingURL=ProjectsModals.fs.js.map
