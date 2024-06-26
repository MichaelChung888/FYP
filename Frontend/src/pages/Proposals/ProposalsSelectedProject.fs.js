import { createElement } from "react";
import { int32ToString, createObj } from "../../fable_modules/fable-library.4.1.4/Util.js";
import { Helpers_combineClasses } from "../../fable_modules/Feliz.Bulma.3.0.0/./ElementBuilders.fs.js";
import { map as map_1, empty, singleton, append, delay, toList } from "../../fable_modules/fable-library.4.1.4/Seq.js";
import { join } from "../../fable_modules/fable-library.4.1.4/String.js";
import { Msg } from "./ProposalsTypes.fs.js";
import { Interop_reactApi } from "../../fable_modules/Feliz.2.7.0/./Interop.fs.js";
import { map, empty as empty_1, singleton as singleton_1, ofArray } from "../../fable_modules/fable-library.4.1.4/List.js";
import { hsl } from "../../fable_modules/Feliz.2.7.0/Colors.fs.js";
import { Table } from "./ProposalsTable.fs.js";
import { getFormattedCategory } from "../../Common.fs.js";

export function Tabs(model, dispatch) {
    let elems_2, children;
    return createElement("div", createObj(Helpers_combineClasses("tabs", singleton_1((elems_2 = [(children = ofArray([createElement("li", createObj(Helpers_combineClasses("", toList(delay(() => append(model.isProjectInfoTab ? singleton(["className", join(" ", ["is-active"])]) : empty(), delay(() => append(singleton(["onClick", (_arg) => {
        dispatch(new Msg(3, []));
    }]), delay(() => {
        let elems;
        return singleton((elems = [createElement("a", {
            children: "Project Information",
            style: {
                fontWeight: "bold",
            },
        })], ["children", Interop_reactApi.Children.toArray(Array.from(elems))]));
    }))))))))), createElement("li", createObj(Helpers_combineClasses("", toList(delay(() => append(!model.isProjectInfoTab ? singleton(["className", join(" ", ["is-active"])]) : empty(), delay(() => append(singleton(["onClick", (_arg_1) => {
        dispatch(new Msg(4, []));
    }]), delay(() => {
        let elems_1;
        return singleton((elems_1 = [createElement("a", {
            children: "Suitabilities",
            style: {
                fontWeight: "bold",
            },
        })], ["children", Interop_reactApi.Children.toArray(Array.from(elems_1))]));
    })))))))))]), createElement("ul", {
        children: Interop_reactApi.Children.toArray(Array.from(children)),
    }))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_2))])))));
}

export function dropdown(model, dispatch, applicant) {
    let elems_1;
    return createElement("div", createObj(ofArray([["className", join(" ", ["custom-select"])], (elems_1 = [createElement("select", createObj(toList(delay(() => append(singleton(["value", applicant.suitability]), delay(() => {
        let matchValue;
        return append((matchValue = applicant.suitability, (matchValue === "Definite") ? singleton(["style", {
            color: hsl(141, 71, 38),
        }]) : ((matchValue === "Maybe") ? singleton(["style", {
            color: hsl(45, 100, 45),
        }]) : ((matchValue === "No") ? singleton(["style", {
            color: hsl(348, 100, 61),
        }]) : (empty())))), delay(() => append(singleton(["onChange", (ev) => {
            dispatch(new Msg(13, [ev, applicant.eeid]));
        }]), delay(() => {
            let elems;
            return singleton((elems = [createElement("option", {
                value: "Pending",
                disabled: true,
                children: "-- Pending --",
            }), createElement("option", {
                value: "Definite",
                children: "Definite",
            }), createElement("option", {
                value: "Maybe",
                children: "Maybe",
            }), createElement("option", {
                value: "No",
                children: "No",
            })], ["children", Interop_reactApi.Children.toArray(Array.from(elems))]));
        }))));
    }))))))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_1))])])));
}

export function suitabilityRow(model, dispatch, applicant) {
    let elems, children;
    return createElement("tr", createObj(singleton_1((elems = [createElement("td", {
        children: applicant.eeid,
    }), createElement("td", {
        children: applicant.forenames,
    }), createElement("td", {
        children: applicant.preference,
    }), (children = singleton_1(dropdown(model, dispatch, applicant)), createElement("td", {
        children: Interop_reactApi.Children.toArray(Array.from(children)),
    }))], ["children", Interop_reactApi.Children.toArray(Array.from(elems))]))));
}

export function suitabilityTable(model, dispatch) {
    let children_2, children, children_4;
    return Table(model, empty_1(), ofArray([(children_2 = singleton_1((children = ofArray([createElement("th", {
        title: "EEID",
        children: "EEID",
    }), createElement("th", {
        title: "Name",
        children: "Name",
    }), createElement("th", {
        title: "Applicant Ranked this Project",
        children: "Applicant Ranked this Project",
    }), createElement("th", {
        children: "Select their suitability",
    })]), createElement("tr", {
        children: Interop_reactApi.Children.toArray(Array.from(children)),
    }))), createElement("thead", {
        children: Interop_reactApi.Children.toArray(Array.from(children_2)),
    })), (children_4 = map((applicant) => suitabilityRow(model, dispatch, applicant), model.selectedProposal.applicants), createElement("tbody", {
        children: Interop_reactApi.Children.toArray(Array.from(children_4)),
    }))]));
}

export function Tag(model, filter) {
    return createElement("span", createObj(Helpers_combineClasses("tag", ofArray([["children", getFormattedCategory(filter)], ["style", {
        marginBottom: 10,
        marginRight: 10,
    }]]))));
}

export function TableCategories(model, categories) {
    return map((filter) => Tag(model, filter), ofArray(categories.split(",")));
}

export function projectInfoMedia(sp) {
    let elems_3, elms, elems, elms_1;
    return createElement("article", createObj(Helpers_combineClasses("media", ofArray([["style", {
        marginBottom: 40,
    }], (elems_3 = [(elms = singleton_1(createElement("figure", createObj(Helpers_combineClasses("image", ofArray([["className", "is-48x48"], (elems = [createElement("img", {
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
    })], ["children", Interop_reactApi.Children.toArray(Array.from(elems))])])))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_1))])])))), (elms = toList(delay(() => append(singleton(createElement("h3", {
        children: ["Project Categories"],
    })), delay(() => append(map_1((c) => c, TableCategories(model, sp.categories)), delay(() => append(singleton(createElement("h3", {
        children: ["Student Requirements"],
    })), delay(() => singleton(createElement("p", {
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

export function selectedProject(model, dispatch) {
    let elems_2;
    const sp = model.selectedProposal.project;
    return createElement("div", createObj(Helpers_combineClasses("card", ofArray([["style", {
        overflowY: "auto",
        height: 81 + "%",
    }], ["className", join(" ", ["scrollbar"])], (elems_2 = toList(delay(() => {
        let elms;
        return model.isProjectInfoTab ? append(singleton((elms = singleton_1(createElement("p", {
            className: "card-header-title",
            children: (("#" + int32ToString(sp.pid)) + " ") + sp.title,
        })), createElement("header", {
            className: "card-header",
            children: Interop_reactApi.Children.toArray(Array.from(elms)),
        }))), delay(() => {
            let elems_1;
            return singleton(createElement("div", createObj(Helpers_combineClasses("card-content", singleton_1((elems_1 = [projectInfoMedia(sp), projectInfoBody(model, sp)], ["children", Interop_reactApi.Children.toArray(Array.from(elems_1))]))))));
        })) : singleton(suitabilityTable(model, dispatch));
    })), ["children", Interop_reactApi.Children.toArray(Array.from(elems_2))])]))));
}

export function Buttons(model, dispatch) {
    const elms = ofArray([createElement("button", createObj(Helpers_combineClasses("button", ofArray([["className", "is-warning"], ["style", {
        marginRight: 30,
    }], ["children", "Edit Proposal"], ["onClick", (_arg) => {
        dispatch(new Msg(9, []));
    }]])))), createElement("button", createObj(Helpers_combineClasses("button", ofArray([["className", "is-danger"], ["style", {
        marginRight: 30,
    }], ["children", "Remove Proposal"], ["onClick", (_arg_1) => {
        dispatch(new Msg(7, []));
    }]])))), createElement("button", createObj(Helpers_combineClasses("button", ofArray([["children", "Close Project"], ["onClick", (_arg_2) => {
        dispatch(new Msg(6, []));
    }]]))))]);
    return createElement("div", {
        className: "box",
        children: Interop_reactApi.Children.toArray(Array.from(elms)),
    });
}

//# sourceMappingURL=ProposalsSelectedProject.fs.js.map
