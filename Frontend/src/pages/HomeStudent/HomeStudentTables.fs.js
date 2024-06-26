import { createElement } from "react";
import { Table, TableCategories } from "../../Common.fs.js";
import { Interop_reactApi } from "../../fable_modules/Feliz.2.7.0/./Interop.fs.js";
import { toString } from "../../fable_modules/fable-library.4.1.4/Date.js";
import { map, singleton, ofArray } from "../../fable_modules/fable-library.4.1.4/List.js";

export function ProjectRow(projectInfo) {
    let children;
    const children_2 = ofArray([createElement("td", {
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
    }), (children = TableCategories(projectInfo.categories), createElement("td", {
        children: Interop_reactApi.Children.toArray(Array.from(children)),
    })), createElement("td", {
        children: toString(projectInfo.updated, "yyyy/MM/dd"),
    })]);
    return createElement("tr", {
        children: Interop_reactApi.Children.toArray(Array.from(children_2)),
    });
}

export function NewTable(model) {
    let children_2, children, children_4;
    return Table(90, ofArray([(children_2 = singleton((children = ofArray([createElement("th", {
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
        title: "Related Categories",
        children: "Related Categories",
    }), createElement("th", {
        title: "Last Updated",
        children: "Last Updated",
    })]), createElement("tr", {
        children: Interop_reactApi.Children.toArray(Array.from(children)),
    }))), createElement("thead", {
        children: Interop_reactApi.Children.toArray(Array.from(children_2)),
    })), (children_4 = map(ProjectRow, model.projects), createElement("tbody", {
        children: Interop_reactApi.Children.toArray(Array.from(children_4)),
    }))]));
}

export function PreferenceRow(_arg1_, _arg1__1) {
    const _arg = [_arg1_, _arg1__1];
    const rank = _arg[1] | 0;
    const projectInfo = _arg[0];
    if (projectInfo.pid === 0) {
        const children = ofArray([createElement("td", {
            children: rank,
        }), createElement("td", {}), createElement("td", {})]);
        return createElement("tr", {
            children: Interop_reactApi.Children.toArray(Array.from(children)),
        });
    }
    else {
        const children_2 = ofArray([createElement("td", {
            children: rank,
        }), createElement("td", {
            children: projectInfo.title,
        }), createElement("td", {
            children: projectInfo.supName,
        })]);
        return createElement("tr", {
            children: Interop_reactApi.Children.toArray(Array.from(children_2)),
        });
    }
}

export function PreferenceTable(model) {
    let children_2, children, children_4;
    const pref = model.preference;
    const prefList = ofArray([[pref.p1, pref.n1], [pref.p2, pref.n2], [pref.p3, pref.n3], [pref.p4, pref.n4], [pref.p5, pref.n5], [pref.p6, pref.n6], [pref.p7, pref.n7], [pref.p8, pref.n8], [pref.p9, pref.n9], [pref.p10, pref.n10]]);
    return Table(90, ofArray([(children_2 = singleton((children = ofArray([createElement("th", {
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
    })), (children_4 = map((tupledArg) => PreferenceRow(tupledArg[0], tupledArg[1]), prefList), createElement("tbody", {
        children: Interop_reactApi.Children.toArray(Array.from(children_4)),
    }))]));
}

//# sourceMappingURL=HomeStudentTables.fs.js.map
