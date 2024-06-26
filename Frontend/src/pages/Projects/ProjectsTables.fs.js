import { createElement } from "react";
import { createObj } from "../../fable_modules/fable-library.4.1.4/Util.js";
import { join } from "../../fable_modules/fable-library.4.1.4/String.js";
import { Msg } from "./ProjectsTypes.fs.js";
import { singleton, append, delay, toList } from "../../fable_modules/fable-library.4.1.4/Seq.js";
import { TableStreams, TableCategories } from "./ProjectsHelpers.fs.js";
import { Interop_reactApi } from "../../fable_modules/Feliz.2.7.0/./Interop.fs.js";
import { toString } from "../../fable_modules/fable-library.4.1.4/Date.js";
import { map, singleton as singleton_1, ofArray } from "../../fable_modules/fable-library.4.1.4/List.js";
import { Table } from "../../Common.fs.js";

export function TableRow(dispatch, model, projectInfo) {
    let elems;
    return createElement("tr", createObj(ofArray([["className", join(" ", ["table-row"])], ["onClick", (_arg) => {
        dispatch(new Msg(3, [projectInfo]));
    }], ["style", {
        cursor: "pointer",
    }], (elems = toList(delay(() => append(singleton(createElement("td", {
        children: projectInfo.title,
    })), delay(() => append(singleton(createElement("td", {
        children: projectInfo.supName,
    })), delay(() => append((model.topOrBottom5 === "top") ? append(singleton(createElement("td", {
        children: projectInfo.r1,
    })), delay(() => append(singleton(createElement("td", {
        children: projectInfo.r2,
    })), delay(() => append(singleton(createElement("td", {
        children: projectInfo.r3,
    })), delay(() => append(singleton(createElement("td", {
        children: projectInfo.r4,
    })), delay(() => singleton(createElement("td", {
        children: projectInfo.r5,
    })))))))))) : append(singleton(createElement("td", {
        children: projectInfo.r6,
    })), delay(() => append(singleton(createElement("td", {
        children: projectInfo.r7,
    })), delay(() => append(singleton(createElement("td", {
        children: projectInfo.r8,
    })), delay(() => append(singleton(createElement("td", {
        children: projectInfo.r9,
    })), delay(() => singleton(createElement("td", {
        children: projectInfo.r10,
    })))))))))), delay(() => {
        let children;
        return append(singleton((children = TableCategories(model, projectInfo.categories), createElement("td", {
            children: Interop_reactApi.Children.toArray(Array.from(children)),
        }))), delay(() => {
            let children_2;
            return append(singleton((children_2 = TableStreams(model, projectInfo.tstream), createElement("td", {
                children: Interop_reactApi.Children.toArray(Array.from(children_2)),
            }))), delay(() => singleton(createElement("td", {
                children: toString(projectInfo.updated, "yyyy/MM/dd"),
            }))));
        }));
    })))))))), ["children", Interop_reactApi.Children.toArray(Array.from(elems))])])));
}

export function ProjectTable(model, dispatch) {
    let children_2, children, children_4;
    return Table(95, ofArray([(children_2 = singleton_1((children = toList(delay(() => append(singleton(createElement("th", {
        title: "Title",
        children: "Title",
    })), delay(() => append(singleton(createElement("th", {
        title: "Supervisor",
        children: "Supervisor",
    })), delay(() => append((model.topOrBottom5 === "top") ? append(singleton(createElement("th", {
        title: "P1",
        children: "P1",
    })), delay(() => append(singleton(createElement("th", {
        title: "P2",
        children: "P2",
    })), delay(() => append(singleton(createElement("th", {
        title: "P3",
        children: "P3",
    })), delay(() => append(singleton(createElement("th", {
        title: "P4",
        children: "P4",
    })), delay(() => singleton(createElement("th", {
        title: "P5",
        children: "P5",
    })))))))))) : append(singleton(createElement("th", {
        title: "P6",
        children: "P6",
    })), delay(() => append(singleton(createElement("th", {
        title: "P7",
        children: "P7",
    })), delay(() => append(singleton(createElement("th", {
        title: "P8",
        children: "P8",
    })), delay(() => append(singleton(createElement("th", {
        title: "P9",
        children: "P9",
    })), delay(() => singleton(createElement("th", {
        title: "P10",
        children: "P10",
    })))))))))), delay(() => append(singleton(createElement("th", {
        title: "Related Categories",
        children: "Related Categories",
    })), delay(() => append(singleton(createElement("th", {
        title: "Streams",
        children: "Streams",
    })), delay(() => singleton(createElement("th", {
        title: "Last Updated",
        children: "Last Updated",
    })))))))))))))), createElement("tr", {
        children: Interop_reactApi.Children.toArray(Array.from(children)),
    }))), createElement("thead", {
        children: Interop_reactApi.Children.toArray(Array.from(children_2)),
    })), (children_4 = map((projectInfo) => TableRow(dispatch, model, projectInfo), model.projects), createElement("tbody", {
        children: Interop_reactApi.Children.toArray(Array.from(children_4)),
    }))]));
}

//# sourceMappingURL=ProjectsTables.fs.js.map
