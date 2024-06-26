import { createElement } from "react";
import { createObj } from "../../fable_modules/fable-library.4.1.4/Util.js";
import { Helpers_combineClasses } from "../../fable_modules/Feliz.Bulma.3.0.0/./ElementBuilders.fs.js";
import { RouterModule_nav } from "../../fable_modules/Feliz.Router.4.0.0/./Router.fs.js";
import { ofArray, singleton } from "../../fable_modules/fable-library.4.1.4/List.js";
import { Interop_reactApi } from "../../fable_modules/Feliz.2.7.0/./Interop.fs.js";
import { Msg } from "./ProposalsTypes.fs.js";

export function NavBar(dispatch) {
    let elems_7, elems_1, elems, elms_4, elms, elms_3, elms_2, elms_1;
    return createElement("nav", createObj(Helpers_combineClasses("navbar", ofArray([["style", {
        backgroundColor: "#48D1CC",
        fontWeight: 700,
    }], (elems_7 = [createElement("div", createObj(Helpers_combineClasses("navbar-brand", ofArray([["onClick", (e) => {
        RouterModule_nav(singleton("home-supervisor"), 1, 2);
    }], ["style", {
        paddingTop: 3,
        paddingRight: 20,
        paddingLeft: 10,
        cursor: "pointer",
    }], (elems_1 = [createElement("span", createObj(Helpers_combineClasses("icon", ofArray([["className", "is-large"], (elems = [createElement("i", {
        className: "fas fa-home fa-2x",
    })], ["children", Interop_reactApi.Children.toArray(Array.from(elems))])]))))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_1))])])))), (elms_4 = ofArray([(elms = ofArray([createElement("a", createObj(Helpers_combineClasses("navbar-item", ofArray([["children", "Student Proposals"], ["onClick", (e_1) => {
        RouterModule_nav(ofArray(["home-supervisor", "projects"]), 1, 2);
    }]])))), createElement("a", createObj(Helpers_combineClasses("navbar-item", ofArray([["children", "Your Proposals"], ["onClick", (e_2) => {
        RouterModule_nav(ofArray(["home-supervisor", "proposals"]), 1, 2);
    }]])))), createElement("a", createObj(Helpers_combineClasses("navbar-item", ofArray([["children", "Propose a Project"], ["onClick", (e_3) => {
        RouterModule_nav(singleton("project-propose"), 1, 2);
    }]]))))]), createElement("div", {
        className: "navbar-start",
        children: Interop_reactApi.Children.toArray(Array.from(elms)),
    })), (elms_3 = singleton((elms_2 = singleton((elms_1 = singleton(createElement("a", createObj(Helpers_combineClasses("button", ofArray([["children", "Log Out"], ["onClick", (_arg) => {
        dispatch(new Msg(2, []));
    }]]))))), createElement("div", {
        className: "buttons",
        children: Interop_reactApi.Children.toArray(Array.from(elms_1)),
    }))), createElement("div", {
        className: "navbar-item",
        children: Interop_reactApi.Children.toArray(Array.from(elms_2)),
    }))), createElement("div", {
        className: "navbar-end",
        children: Interop_reactApi.Children.toArray(Array.from(elms_3)),
    }))]), createElement("div", {
        className: "navbar-menu",
        children: Interop_reactApi.Children.toArray(Array.from(elms_4)),
    }))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_7))])]))));
}

//# sourceMappingURL=ProposalsNavBar.fs.js.map
