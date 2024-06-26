import { createElement } from "react";
import { createObj } from "../../fable_modules/fable-library.4.1.4/Util.js";
import { join } from "../../fable_modules/fable-library.4.1.4/String.js";
import { Msg } from "./ProjectsTypes.fs.js";
import { TableStreams, TableCategories } from "./ProjectsHelpers.fs.js";
import { Interop_reactApi } from "../../fable_modules/Feliz.2.7.0/./Interop.fs.js";
import { toString } from "../../fable_modules/fable-library.4.1.4/Date.js";
import { map, singleton, ofArray } from "../../fable_modules/fable-library.4.1.4/List.js";
import { Table } from "../../Common.fs.js";

export function TableRow(dispatch, model, projectInfo) {
    let elems, children, children_2;
    return createElement("tr", createObj(ofArray([["className", join(" ", ["table-row"])], ["onClick", (_arg) => {
        dispatch(new Msg(3, [projectInfo]));
    }], ["style", {
        cursor: "pointer",
    }], (elems = [createElement("td", {
        children: projectInfo.title,
    }), createElement("td", {
        children: projectInfo.supName,
    }), createElement("td", {
        children: projectInfo.r1,
    }), createElement("td", {
        children: projectInfo.r2,
    }), createElement("td", {
        children: projectInfo.r3,
    }), createElement("td", {
        children: projectInfo.r4,
    }), createElement("td", {
        children: projectInfo.r5,
    }), createElement("td", {
        children: projectInfo.r6,
    }), createElement("td", {
        children: projectInfo.r7,
    }), createElement("td", {
        children: projectInfo.r8,
    }), createElement("td", {
        children: projectInfo.r9,
    }), createElement("td", {
        children: projectInfo.r10,
    }), (children = TableCategories(model, projectInfo.categories), createElement("td", {
        children: Interop_reactApi.Children.toArray(Array.from(children)),
    })), (children_2 = TableStreams(model, projectInfo.tstream), createElement("td", {
        children: Interop_reactApi.Children.toArray(Array.from(children_2)),
    })), createElement("td", {
        children: toString(projectInfo.updated, "yyyy/MM/dd"),
    })], ["children", Interop_reactApi.Children.toArray(Array.from(elems))])])));
}

export function ProjectTable(model, dispatch) {
    let children_2, children, children_4;
    return Table(ofArray([(children_2 = singleton((children = ofArray([createElement("th", {
        title: "Title",
        children: "Title",
    }), createElement("th", {
        title: "Supervisor",
        children: "Supervisor",
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
    }), createElement("th", {
        title: "Related Categories",
        children: "Related Categories",
    }), createElement("th", {
        title: "Streams",
        children: "Streams",
    }), createElement("th", {
        title: "Last Updated",
        children: "Last Updated",
    })]), createElement("tr", {
        children: Interop_reactApi.Children.toArray(Array.from(children)),
    }))), createElement("thead", {
        children: Interop_reactApi.Children.toArray(Array.from(children_2)),
    })), (children_4 = map((projectInfo) => TableRow(dispatch, model, projectInfo), model.projects), createElement("tbody", {
        children: Interop_reactApi.Children.toArray(Array.from(children_4)),
    }))]));
}

//# sourceMappingURL=ProjectsTables.fs.js.map
