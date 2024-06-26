import { createElement } from "react";
import { map, singleton, ofArray, length } from "../../fable_modules/fable-library.4.1.4/List.js";
import { Interop_reactApi } from "../../fable_modules/Feliz.2.7.0/./Interop.fs.js";
import { Table } from "../../Common.fs.js";

export function ProposalRow(proposal) {
    const project = proposal.project;
    const applicants = proposal.applicants;
    const children = ofArray([createElement("td", {
        children: project.title,
    }), createElement("td", {
        children: length(applicants),
    }), createElement("td", {
        children: project.r1,
    }), createElement("td", {
        children: project.r2,
    }), createElement("td", {
        children: project.r3,
    }), createElement("td", {
        children: project.r4,
    }), createElement("td", {
        children: project.r5,
    })]);
    return createElement("tr", {
        children: Interop_reactApi.Children.toArray(Array.from(children)),
    });
}

export function ProposalTable(model) {
    let children_2, children, children_4;
    return Table(90, ofArray([(children_2 = singleton((children = ofArray([createElement("th", {
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
    })]), createElement("tr", {
        children: Interop_reactApi.Children.toArray(Array.from(children)),
    }))), createElement("thead", {
        children: Interop_reactApi.Children.toArray(Array.from(children_2)),
    })), (children_4 = map(ProposalRow, model.proposals), createElement("tbody", {
        children: Interop_reactApi.Children.toArray(Array.from(children_4)),
    }))]));
}

//# sourceMappingURL=HomeSupervisorTables.fs.js.map
