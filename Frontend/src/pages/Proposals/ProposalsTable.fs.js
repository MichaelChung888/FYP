import { createElement } from "react";
import { createObj } from "../../fable_modules/fable-library.4.1.4/Util.js";
import { map as map_1, singleton as singleton_1, length, ofArray, append } from "../../fable_modules/fable-library.4.1.4/List.js";
import { join } from "../../fable_modules/fable-library.4.1.4/String.js";
import { Helpers_combineClasses } from "../../fable_modules/Feliz.Bulma.3.0.0/./ElementBuilders.fs.js";
import { Interop_reactApi } from "../../fable_modules/Feliz.2.7.0/./Interop.fs.js";
import { map, empty, singleton, append as append_1, delay, toList } from "../../fable_modules/fable-library.4.1.4/Seq.js";
import { Msg } from "./ProposalsTypes.fs.js";

export function Table(model, css, body) {
    let elems_1;
    return createElement("div", createObj(ofArray([["style", createObj(append(ofArray([["overflowY", "auto"], ["marginBottom", 4 + "%"]]), css))], ["className", join(" ", ["scrollbar"])], (elems_1 = [createElement("table", createObj(Helpers_combineClasses("table", ofArray([["style", {
        width: 100 + "%",
        position: "relative",
    }], ["children", Interop_reactApi.Children.toArray(Array.from(body))]]))))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_1))])])));
}

export function ProposalRow(model, dispatch, proposal) {
    let elems;
    const applicants = proposal.applicants;
    const project = proposal.project;
    const isSelected = model.selectedProposal.project.pid === project.pid;
    const popularityList = ofArray([project.r1, project.r2, project.r3, project.r4, project.r5, project.r6, project.r7, project.r8, project.r9, project.r10]);
    const popularity = (amount) => createElement("td", {
        children: amount,
    });
    return createElement("tr", createObj(ofArray([["className", join(" ", ["table-row"])], ["style", createObj(toList(delay(() => append_1(singleton(["cursor", "pointer"]), delay(() => (isSelected ? singleton(["backgroundColor", "#D3D3D3"]) : empty()))))))], ["onClick", (_arg) => {
        dispatch(new Msg(5, [proposal]));
    }], (elems = toList(delay(() => append_1(singleton(createElement("td", {
        children: project.title,
    })), delay(() => append_1(singleton(createElement("td", {
        children: length(applicants),
    })), delay(() => map(popularity, popularityList))))))), ["children", Interop_reactApi.Children.toArray(Array.from(elems))])])));
}

export function ProposalTable(model, dispatch) {
    let children_2, children, children_4;
    return Table(model, singleton_1(["height", 95 + "%"]), ofArray([(children_2 = singleton_1((children = ofArray([createElement("th", {
        title: "Title",
        children: "Title",
    }), createElement("th", {
        title: "No of Applicants",
        children: "No of Applicants",
    }), createElement("th", {
        title: "P1",
        children: "P1",
    }), createElement("th", {
        title: "P2",
        children: "P2",
    }), createElement("th", {
        title: "P3",
        children: "P3",
    }), createElement("th", {
        title: "P4",
        children: "P4",
    }), createElement("th", {
        title: "P5",
        children: "P5",
    }), createElement("th", {
        title: "P6",
        children: "P6",
    }), createElement("th", {
        title: "P7",
        children: "P7",
    }), createElement("th", {
        title: "P8",
        children: "P8",
    }), createElement("th", {
        title: "P9",
        children: "P9",
    }), createElement("th", {
        title: "P10",
        children: "P10",
    })]), createElement("tr", {
        children: Interop_reactApi.Children.toArray(Array.from(children)),
    }))), createElement("thead", {
        children: Interop_reactApi.Children.toArray(Array.from(children_2)),
    })), (children_4 = map_1((proposal) => ProposalRow(model, dispatch, proposal), model.proposals), createElement("tbody", {
        children: Interop_reactApi.Children.toArray(Array.from(children_4)),
    }))]));
}

//# sourceMappingURL=ProposalsTable.fs.js.map
