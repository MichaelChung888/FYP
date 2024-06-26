import { createElement } from "react";
import { int32ToString, createObj } from "../../fable_modules/fable-library.4.1.4/Util.js";
import { Helpers_combineClasses } from "../../fable_modules/Feliz.Bulma.3.0.0/./ElementBuilders.fs.js";
import { join } from "../../fable_modules/fable-library.4.1.4/String.js";
import { ofArray, singleton } from "../../fable_modules/fable-library.4.1.4/List.js";
import { Interop_reactApi } from "../../fable_modules/Feliz.2.7.0/./Interop.fs.js";
import { projectInfoBody, projectInfoMedia } from "../../Common.fs.js";
import { Msg } from "./PreferencesTypes.fs.js";

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
    })), createElement("div", createObj(Helpers_combineClasses("card-content", singleton((elems_1 = [projectInfoMedia(sp), projectInfoBody(sp)], ["children", Interop_reactApi.Children.toArray(Array.from(elems_1))])))))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_2))])]))));
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
