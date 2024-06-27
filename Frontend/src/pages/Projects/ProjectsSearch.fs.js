import { createElement } from "react";
import { createObj } from "../../fable_modules/fable-library.4.1.4/Util.js";
import { Helpers_combineClasses } from "../../fable_modules/Feliz.Bulma.3.0.0/./ElementBuilders.fs.js";
import { exists, cons, ofArray, singleton } from "../../fable_modules/fable-library.4.1.4/List.js";
import { join } from "../../fable_modules/fable-library.4.1.4/String.js";
import { Msg } from "./ProjectsTypes.fs.js";
import { Interop_reactApi } from "../../fable_modules/Feliz.2.7.0/./Interop.fs.js";
import { map, empty, singleton as singleton_1, append, delay, toList } from "../../fable_modules/fable-library.4.1.4/Seq.js";
import { streams, categories, FilterType, getFormattedCategory } from "../../Common.fs.js";

export function ProjectInput(dispatch) {
    let elems_2, elems_1, elems;
    return createElement("div", createObj(Helpers_combineClasses("field", singleton((elems_2 = [createElement("label", createObj(Helpers_combineClasses("label", singleton(["children", "Project Title"])))), createElement("div", createObj(ofArray([["className", join(" ", ["control", "has-icons-left"])], (elems_1 = [createElement("input", createObj(cons(["type", "text"], Helpers_combineClasses("input", ofArray([["required", true], ["placeholder", "Enter a Project Title"], ["onChange", (ev) => {
        dispatch(new Msg(9, [ev.target.value]));
    }]]))))), createElement("span", createObj(Helpers_combineClasses("icon", ofArray([["className", "is-small"], ["className", "is-left"], (elems = [createElement("i", {
        className: "fas fa-search",
    })], ["children", Interop_reactApi.Children.toArray(Array.from(elems))])]))))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_1))])])))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_2))])))));
}

export function ProfessorInput(dispatch) {
    let elems_2, elems_1, elems;
    return createElement("div", createObj(Helpers_combineClasses("field", singleton((elems_2 = [createElement("label", createObj(Helpers_combineClasses("label", singleton(["children", "Professor Name"])))), createElement("div", createObj(ofArray([["className", join(" ", ["control", "has-icons-left"])], (elems_1 = [createElement("input", createObj(cons(["type", "text"], Helpers_combineClasses("input", ofArray([["required", true], ["placeholder", "Enter a Professor Name"], ["onChange", (ev) => {
        dispatch(new Msg(10, [ev.target.value]));
    }]]))))), createElement("span", createObj(Helpers_combineClasses("icon", ofArray([["className", "is-small"], ["className", "is-left"], (elems = [createElement("i", {
        className: "fas fa-search",
    })], ["children", Interop_reactApi.Children.toArray(Array.from(elems))])]))))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_1))])])))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_2))])))));
}

export function TagFilter(dispatch, model, filterType, filter) {
    return createElement("span", createObj(Helpers_combineClasses("tag", toList(delay(() => append(singleton_1(["className", join(" ", ["filter-tag"])]), delay(() => append(singleton_1(["children", getFormattedCategory(filter)]), delay(() => append(singleton_1(["style", {
        marginBottom: 10,
        marginRight: 10,
        cursor: "pointer",
    }]), delay(() => ((filterType.tag === 1) ? append(singleton_1(["onClick", (_arg_1) => {
        dispatch(new Msg(12, [filter]));
    }]), delay(() => (exists((c_1) => (c_1 === filter), model.selectedStreams) ? singleton_1(["className", "is-info"]) : empty()))) : append(singleton_1(["onClick", (_arg) => {
        dispatch(new Msg(11, [filter]));
    }]), delay(() => (exists((c) => (c === filter), model.selectedCategories) ? singleton_1(["className", "is-info"]) : empty())))))))))))))));
}

export function topOrBottom5Select(model, dispatch) {
    let elems_1, elems;
    return createElement("div", createObj(ofArray([["className", join(" ", ["custom-select"])], ["style", {
        marginBottom: 35 + "px",
    }], (elems_1 = [createElement("select", createObj(ofArray([["value", model.topOrBottom5], ["onChange", (ev) => {
        dispatch(new Msg(13, [ev]));
    }], (elems = [createElement("option", {
        value: "top",
        children: "Top 5",
    }), createElement("option", {
        value: "bottom",
        children: "Bottom 5",
    })], ["children", Interop_reactApi.Children.toArray(Array.from(elems))])])))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_1))])])));
}

export function SearchFilters(dispatch, model) {
    return toList(delay(() => append(singleton_1(ProjectInput(dispatch)), delay(() => append(singleton_1(ProfessorInput(dispatch)), delay(() => append(singleton_1(createElement("label", createObj(Helpers_combineClasses("label", singleton(["children", "Top or Bottom 5 Popularities"]))))), delay(() => append(singleton_1(topOrBottom5Select(model, dispatch)), delay(() => append(singleton_1(createElement("label", createObj(Helpers_combineClasses("label", singleton(["children", "Relevant Project Categories"]))))), delay(() => append(map((c) => TagFilter(dispatch, model, new FilterType(0, []), c), categories), delay(() => append(singleton_1(createElement("label", createObj(Helpers_combineClasses("label", singleton(["children", "Stream"]))))), delay(() => map((s) => TagFilter(dispatch, model, new FilterType(1, []), s), streams)))))))))))))))));
}

//# sourceMappingURL=ProjectsSearch.fs.js.map
