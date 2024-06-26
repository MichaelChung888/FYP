import { createElement } from "react";
import { createObj } from "../../fable_modules/fable-library.4.1.4/Util.js";
import { Helpers_combineClasses } from "../../fable_modules/Feliz.Bulma.3.0.0/./ElementBuilders.fs.js";
import { map, empty, singleton, append, delay, toList } from "../../fable_modules/fable-library.4.1.4/Seq.js";
import { join } from "../../fable_modules/fable-library.4.1.4/String.js";
import { streams, categories, FilterType, getFormattedCategory } from "../../Common.fs.js";
import { Msg } from "./ProposalsTypes.fs.js";
import { cons, ofArray, singleton as singleton_1, exists } from "../../fable_modules/fable-library.4.1.4/List.js";
import { Interop_reactApi } from "../../fable_modules/Feliz.2.7.0/./Interop.fs.js";

export function TagFilter(dispatch, project, filterType, filter) {
    return createElement("span", createObj(Helpers_combineClasses("tag", toList(delay(() => append(singleton(["className", join(" ", ["filter-tag"])]), delay(() => append(singleton(["children", getFormattedCategory(filter)]), delay(() => append(singleton(["style", {
        marginBottom: 10,
        marginRight: 10,
        cursor: "pointer",
    }]), delay(() => ((filterType.tag === 1) ? append(singleton(["onClick", (_arg_1) => {
        dispatch(new Msg(15, [filter]));
    }]), delay(() => (exists((c_1) => (c_1 === filter), project.streams) ? singleton(["className", "is-info"]) : empty()))) : append(singleton(["onClick", (_arg) => {
        dispatch(new Msg(14, [filter]));
    }]), delay(() => (exists((c) => (c === filter), project.categories) ? singleton(["className", "is-info"]) : empty())))))))))))))));
}

export function ProjectTitle(project, dispatch) {
    let elems_2, elems_1, elems;
    return createElement("div", createObj(Helpers_combineClasses("field", singleton_1((elems_2 = [createElement("label", createObj(Helpers_combineClasses("label", singleton_1(["children", "Project Title"])))), createElement("div", createObj(ofArray([["className", join(" ", ["control", "has-icons-left"])], (elems_1 = [createElement("input", createObj(cons(["type", "text"], Helpers_combineClasses("input", ofArray([["required", true], ["placeholder", "Enter the title of your project"], ["onChange", (ev) => {
        dispatch(new Msg(13, [ev.target.value]));
    }], ["value", project.title]]))))), createElement("span", createObj(Helpers_combineClasses("icon", ofArray([["className", "is-small"], ["className", "is-left"], (elems = [createElement("i", {
        className: join(" ", ["fas fa-heading"]),
    })], ["children", Interop_reactApi.Children.toArray(Array.from(elems))])]))))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_1))])])))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_2))])))));
}

export function Categories(project, dispatch) {
    let elems;
    return createElement("div", createObj(ofArray([["className", join(" ", ["field"])], (elems = toList(delay(() => append(singleton(createElement("label", createObj(Helpers_combineClasses("label", singleton_1(["children", "Select the relevant Project Categories"]))))), delay(() => map((c) => TagFilter(dispatch, project, new FilterType(0, []), c), categories))))), ["children", Interop_reactApi.Children.toArray(Array.from(elems))])])));
}

export function Streams(project, dispatch) {
    let elems;
    return createElement("div", createObj(ofArray([["className", join(" ", ["field"])], (elems = toList(delay(() => append(singleton(createElement("label", createObj(Helpers_combineClasses("label", singleton_1(["children", "Select the relevant Student Streams"]))))), delay(() => map((s) => TagFilter(dispatch, project, new FilterType(1, []), s), streams))))), ["children", Interop_reactApi.Children.toArray(Array.from(elems))])])));
}

export function Requirements(project, dispatch) {
    let elems;
    return createElement("div", createObj(ofArray([["className", join(" ", ["field"])], (elems = [createElement("label", createObj(Helpers_combineClasses("label", singleton_1(["children", "Student Requirements"])))), createElement("textarea", {
        required: true,
        rows: 5,
        cols: 33,
        placeholder: "Enter the student requirements for this project",
        onChange: (ev) => {
            dispatch(new Msg(16, [ev.target.value]));
        },
        value: project.requirements,
    })], ["children", Interop_reactApi.Children.toArray(Array.from(elems))])])));
}

export function Skills(project, dispatch) {
    let elems;
    return createElement("div", createObj(ofArray([["className", join(" ", ["field"])], (elems = [createElement("label", createObj(Helpers_combineClasses("label", singleton_1(["children", "Desired Skills"])))), createElement("textarea", {
        required: true,
        rows: 5,
        cols: 33,
        placeholder: "Enter the desired skills for this project",
        onChange: (ev) => {
            dispatch(new Msg(17, [ev.target.value]));
        },
        value: project.skills,
    })], ["children", Interop_reactApi.Children.toArray(Array.from(elems))])])));
}

export function Description(project, dispatch) {
    let elems;
    return createElement("div", createObj(ofArray([["className", join(" ", ["field"])], (elems = [createElement("label", createObj(Helpers_combineClasses("label", singleton_1(["children", "Description"])))), createElement("textarea", {
        required: true,
        rows: 5,
        cols: 33,
        placeholder: "Enter the project description",
        onChange: (ev) => {
            dispatch(new Msg(18, [ev.target.value]));
        },
        value: project.description,
    })], ["children", Interop_reactApi.Children.toArray(Array.from(elems))])])));
}

export function Meetings(project, dispatch) {
    let elems;
    return createElement("div", createObj(ofArray([["className", join(" ", ["field"])], (elems = [createElement("label", createObj(Helpers_combineClasses("label", singleton_1(["children", "Meeting dates"])))), createElement("textarea", {
        required: true,
        rows: 5,
        cols: 33,
        placeholder: "Enter your availability for meetings",
        onChange: (ev) => {
            dispatch(new Msg(19, [ev.target.value]));
        },
        value: project.meetings,
    })], ["children", Interop_reactApi.Children.toArray(Array.from(elems))])])));
}

//# sourceMappingURL=ProposalsEditForm.fs.js.map
