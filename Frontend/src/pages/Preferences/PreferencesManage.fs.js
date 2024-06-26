import { createElement } from "react";
import { equals, createObj } from "../../fable_modules/fable-library.4.1.4/Util.js";
import { Helpers_combineClasses } from "../../fable_modules/Feliz.Bulma.3.0.0/./ElementBuilders.fs.js";
import { empty, singleton, append, delay, toList } from "../../fable_modules/fable-library.4.1.4/Seq.js";
import { join } from "../../fable_modules/fable-library.4.1.4/String.js";
import { Msg } from "./PreferencesTypes.fs.js";
import { Interop_reactApi } from "../../fable_modules/Feliz.2.7.0/./Interop.fs.js";
import { map, singleton as singleton_1, ofArray } from "../../fable_modules/fable-library.4.1.4/List.js";
import { checkPreferenceChange } from "./PreferencesHelpers.fs.js";

export function Tabs(model, dispatch) {
    let elems_2, children;
    return createElement("div", createObj(Helpers_combineClasses("tabs", singleton_1((elems_2 = [(children = ofArray([createElement("li", createObj(Helpers_combineClasses("", toList(delay(() => append(model.isPreferenceTab ? singleton(["className", join(" ", ["is-active"])]) : empty(), delay(() => append(singleton(["onClick", (_arg) => {
        dispatch(new Msg(16, []));
    }]), delay(() => {
        let elems;
        return singleton((elems = [createElement("a", {
            children: "Preferences",
            style: {
                fontWeight: "bold",
            },
        })], ["children", Interop_reactApi.Children.toArray(Array.from(elems))]));
    }))))))))), createElement("li", createObj(Helpers_combineClasses("", toList(delay(() => append(!model.isPreferenceTab ? singleton(["className", join(" ", ["is-active"])]) : empty(), delay(() => append(singleton(["onClick", (_arg_1) => {
        dispatch(new Msg(17, []));
    }]), delay(() => {
        let elems_1;
        return singleton((elems_1 = [createElement("a", {
            children: "Comments",
            style: {
                fontWeight: "bold",
            },
        })], ["children", Interop_reactApi.Children.toArray(Array.from(elems_1))]));
    })))))))))]), createElement("ul", {
        children: Interop_reactApi.Children.toArray(Array.from(children)),
    }))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_2))])))));
}

export function Table(model, body) {
    let elems_1;
    return createElement("div", createObj(ofArray([["style", createObj(toList(delay(() => append(singleton(["overflowY", "auto"]), delay(() => append(singleton(["height", 76 + "%"]), delay(() => append(singleton(["marginBottom", 4 + "%"]), delay(() => (model.unsavedPreference.doc ? singleton(["opacity", 0.5]) : empty()))))))))))], ["className", join(" ", ["scrollbar"])], (elems_1 = [createElement("table", createObj(Helpers_combineClasses("table", ofArray([["style", {
        width: 100 + "%",
        position: "relative",
    }], ["children", Interop_reactApi.Children.toArray(Array.from(body))]]))))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_1))])])));
}

export function PreferenceRow(model, dispatch, _arg1_, _arg1__1, _arg1__2) {
    const _arg = [_arg1_, _arg1__1, _arg1__2];
    const rank = _arg[1] | 0;
    const projectInfo = _arg[0];
    const index = _arg[2] | 0;
    const isSelected = equals(model.selectedProject, projectInfo) && (model.selectedProject.pid !== 0);
    const isProject = projectInfo.pid !== 0;
    const isPrefEqual = rank !== index;
    return createElement("tr", createObj(toList(delay(() => append(singleton(["className", join(" ", ["table-row"])]), delay(() => append(singleton(["style", createObj(toList(delay(() => append(singleton(["cursor", "pointer"]), delay(() => (isSelected ? singleton(["backgroundColor", "#D3D3D3"]) : empty()))))))]), delay(() => append(isProject ? singleton(["onClick", (_arg_1) => {
        dispatch(new Msg(3, [projectInfo, index]));
    }]) : singleton(["onClick", (_arg_2) => {
        dispatch(new Msg(5, []));
    }]), delay(() => {
        let elems_2, children, children_2;
        return singleton((elems_2 = [createElement("td", {
            children: rank,
        }), (children = toList(delay(() => ((index !== 1) ? singleton(createElement("input", {
            checked: isPrefEqual,
            value: isPrefEqual,
            onChange: (ev) => {
                dispatch(new Msg(15, [index - 2, !isPrefEqual]));
            },
            onClick: (ev_1) => {
                ev_1.stopPropagation();
            },
            style: {
                width: 18,
                height: 18,
            },
            type: "checkbox",
        })) : empty()))), createElement("td", {
            children: Interop_reactApi.Children.toArray(Array.from(children)),
        })), createElement("td", createObj(toList(delay(() => (isProject ? singleton(["children", projectInfo.title]) : empty()))))), createElement("td", createObj(toList(delay(() => (isProject ? singleton(["children", projectInfo.supName]) : empty()))))), (children_2 = toList(delay(() => (isProject ? append(singleton(createElement("span", createObj(Helpers_combineClasses("icon", toList(delay(() => {
            let elems;
            return (index !== 1) ? append(singleton((elems = [createElement("i", {
                className: "fas fa-angle-double-up fa-lg",
            })], ["children", Interop_reactApi.Children.toArray(Array.from(elems))])), delay(() => append(singleton(["id", "swap-icon"]), delay(() => append(singleton(["onClick", (ev_2) => {
                ev_2.stopPropagation();
                dispatch(new Msg(18, [index]));
            }]), delay(() => singleton(["className", "is-medium"]))))))) : empty();
        })))))), delay(() => singleton(createElement("span", createObj(Helpers_combineClasses("icon", toList(delay(() => {
            let elems_1;
            return (index !== 10) ? append(singleton((elems_1 = [createElement("i", {
                className: "fas fa-angle-double-down fa-lg",
            })], ["children", Interop_reactApi.Children.toArray(Array.from(elems_1))])), delay(() => append(singleton(["id", "swap-icon"]), delay(() => append(singleton(["onClick", (ev_3) => {
                ev_3.stopPropagation();
                dispatch(new Msg(19, [index]));
            }]), delay(() => singleton(["className", "is-medium"]))))))) : empty();
        })))))))) : empty()))), createElement("td", {
            children: Interop_reactApi.Children.toArray(Array.from(children_2)),
        }))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_2))]));
    }))))))))));
}

export function PreferenceTable(model, dispatch) {
    const pref = model.unsavedPreference;
    const prefList = ofArray([[pref.p1, pref.n1, 1], [pref.p2, pref.n2, 2], [pref.p3, pref.n3, 3], [pref.p4, pref.n4, 4], [pref.p5, pref.n5, 5], [pref.p6, pref.n6, 6], [pref.p7, pref.n7, 7], [pref.p8, pref.n8, 8], [pref.p9, pref.n9, 9], [pref.p10, pref.n10, 10]]);
    return Table(model, toList(delay(() => {
        let children_2, children;
        return append(singleton((children_2 = singleton_1((children = ofArray([createElement("th", {
            title: "Rank",
            children: "Rank",
        }), createElement("th", {
            title: "Title",
            children: "Title",
        }), createElement("th", {
            title: "Professor",
            children: "Professor",
        }), createElement("th", {
            title: "Equal Preferences",
            children: "Equal Preferences",
        }), createElement("th", {
            title: "Swap Preferences",
            children: "Swap Preferences",
        })]), createElement("tr", {
            children: Interop_reactApi.Children.toArray(Array.from(children)),
        }))), createElement("thead", {
            children: Interop_reactApi.Children.toArray(Array.from(children_2)),
        }))), delay(() => {
            let children_4;
            return append(singleton((children_4 = map((tupledArg) => PreferenceRow(model, dispatch, tupledArg[0], tupledArg[1], tupledArg[2]), prefList), createElement("tbody", {
                children: Interop_reactApi.Children.toArray(Array.from(children_4)),
            }))), delay(() => (model.unsavedPreference.doc ? singleton(createElement("div", {
                style: {
                    top: 0,
                    left: 0,
                    overflow: "hidden",
                    position: "absolute",
                    height: 100 + "%",
                    width: 100 + "%",
                    zIndex: 80,
                },
            })) : empty())));
        }));
    })));
}

export function Comments(model, dispatch) {
    return createElement("textarea", {
        rows: 5,
        cols: 33,
        placeholder: "Enter your comments here",
        value: model.unsavedPreference.comments,
        onChange: (ev) => {
            dispatch(new Msg(14, [ev.target.value]));
        },
    });
}

export function saveChangesButtons(model, dispatch) {
    let elems_1, elems;
    return createElement("div", createObj(Helpers_combineClasses("box", ofArray([["style", {
        display: "flex",
        alignItems: "center",
    }], (elems_1 = [createElement("button", createObj(Helpers_combineClasses("button", toList(delay(() => append(singleton(["style", {
        marginRight: 30,
    }]), delay(() => append(singleton(["children", "Save Changes"]), delay(() => (checkPreferenceChange(model) ? append(singleton(["onClick", (_arg) => {
        dispatch(new Msg(9, []));
    }]), delay(() => singleton(["className", "is-success"]))) : singleton(["disabled", true]))))))))))), createElement("button", createObj(Helpers_combineClasses("button", toList(delay(() => append(singleton(["style", {
        marginRight: 30,
    }]), delay(() => append(singleton(["children", "Discard Changes"]), delay(() => (checkPreferenceChange(model) ? append(singleton(["onClick", (_arg_1) => {
        dispatch(new Msg(12, []));
    }]), delay(() => singleton(["className", "is-danger"]))) : singleton(["disabled", true]))))))))))), createElement("div", createObj(ofArray([["style", {
        display: "flex",
        alignItems: "center",
    }], (elems = [createElement("input", {
        onChange: (ev) => {
            dispatch(new Msg(13, []));
        },
        checked: model.unsavedPreference.doc,
        style: {
            width: 18,
            height: 18,
            marginRight: 10,
        },
        type: "checkbox",
    }), createElement("label", {
        children: "Entering DOC Allocation",
    })], ["children", Interop_reactApi.Children.toArray(Array.from(elems))])])))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_1))])]))));
}

//# sourceMappingURL=PreferencesManage.fs.js.map
