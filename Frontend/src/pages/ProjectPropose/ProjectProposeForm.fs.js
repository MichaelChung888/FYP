import { createElement } from "react";
import { createObj } from "../../fable_modules/fable-library.4.1.4/Util.js";
import { map, empty, singleton, append, delay, toList } from "../../fable_modules/fable-library.4.1.4/Seq.js";
import { meetingsValid, descriptionValid, skillsValid, requirementsValid, streamValid, categoryValid, titleValid, isFormValid } from "./ProjectProposeHelpers.fs.js";
import { streams, categories, FilterType, getFormattedCategory, isStudent } from "../../Common.fs.js";
import { Interop_reactApi } from "../../fable_modules/Feliz.2.7.0/./Interop.fs.js";
import { exists, cons, singleton as singleton_1, ofArray } from "../../fable_modules/fable-library.4.1.4/List.js";
import { Helpers_combineClasses } from "../../fable_modules/Feliz.Bulma.3.0.0/./ElementBuilders.fs.js";
import { join } from "../../fable_modules/fable-library.4.1.4/String.js";
import { Msg } from "./ProjectProposeTypes.fs.js";

export function ResponseResultMessage(model) {
    return createElement("p", createObj(toList(delay(() => {
        const matchValue = model.responseResult;
        switch (matchValue.tag) {
            case 1:
                return append(singleton(["style", {
                    color: "#FF0000",
                }]), delay(() => singleton(["children", "Failed to create project"])));
            case 2: {
                return empty();
            }
            default:
                return append(singleton(["style", {
                    color: "#008000",
                }]), delay(() => singleton(["children", "Project created successfully"])));
        }
    }))));
}

export function ValidityCheck(model) {
    let elems;
    return createElement("p", createObj(ofArray([["style", {
        color: "#FF0000",
    }], (elems = toList(delay(() => append(!isFormValid(model) ? singleton(createElement("p", {
        children: ["Complete all requirements below to propose a project:"],
    })) : empty(), delay(() => {
        let children;
        return singleton((children = toList(delay(() => append(!titleValid(model) ? singleton(createElement("li", {
            children: ["Please enter the title of your project"],
        })) : empty(), delay(() => append(!categoryValid(model) ? singleton(createElement("li", {
            children: ["Please select at least one category"],
        })) : empty(), delay(() => append((!streamValid(model) && !isStudent(model.user)) ? singleton(createElement("li", {
            children: ["Please select at least one stream"],
        })) : empty(), delay(() => append((!requirementsValid(model) && !isStudent(model.user)) ? singleton(createElement("li", {
            children: ["Please enter the requirements for your project"],
        })) : empty(), delay(() => append((!skillsValid(model) && !isStudent(model.user)) ? singleton(createElement("li", {
            children: ["Please enter the skills required for your project"],
        })) : empty(), delay(() => append(!descriptionValid(model) ? singleton(createElement("li", {
            children: ["Please enter the description of your project"],
        })) : empty(), delay(() => (!meetingsValid(model) ? singleton(createElement("li", {
            children: ["Please enter the meeting details for your project"],
        })) : empty()))))))))))))))), createElement("ul", {
            children: Interop_reactApi.Children.toArray(Array.from(children)),
        })));
    })))), ["children", Interop_reactApi.Children.toArray(Array.from(elems))])])));
}

export function Tabs(model) {
    let elems_3, elems_2;
    return createElement("div", createObj(Helpers_combineClasses("tabs", singleton_1((elems_3 = [createElement("ul", createObj(ofArray([["style", {
        marginLeft: 0,
    }], (elems_2 = [createElement("li", createObj(Helpers_combineClasses("", toList(delay(() => append(isStudent(model.user) ? singleton(["className", join(" ", ["is-active"])]) : empty(), delay(() => {
        let elems;
        return singleton((elems = [createElement("a", {
            children: "Student",
            style: {
                fontWeight: "bold",
            },
        })], ["children", Interop_reactApi.Children.toArray(Array.from(elems))]));
    }))))))), createElement("li", createObj(Helpers_combineClasses("", toList(delay(() => append(!isStudent(model.user) ? singleton(["className", join(" ", ["is-active"])]) : empty(), delay(() => {
        let elems_1;
        return singleton((elems_1 = [createElement("a", {
            children: "Supervisor",
            style: {
                fontWeight: "bold",
            },
        })], ["children", Interop_reactApi.Children.toArray(Array.from(elems_1))]));
    })))))))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_2))])])))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_3))])))));
}

export function Name(model) {
    let elems_2, elems_1, elems;
    return createElement("div", createObj(Helpers_combineClasses("field", singleton_1((elems_2 = [createElement("label", createObj(Helpers_combineClasses("label", singleton_1(["children", "Name"])))), createElement("div", createObj(ofArray([["className", join(" ", ["control", "has-icons-left"])], (elems_1 = [createElement("input", createObj(cons(["type", "text"], Helpers_combineClasses("input", ofArray([["required", true], ["disabled", true], ["value", model.user.forenames]]))))), createElement("span", createObj(Helpers_combineClasses("icon", ofArray([["className", "is-small"], ["className", "is-left"], (elems = [createElement("i", {
        className: join(" ", ["fas fa-user"]),
    })], ["children", Interop_reactApi.Children.toArray(Array.from(elems))])]))))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_1))])])))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_2))])))));
}

export function ProjectTitle(model, dispatch) {
    let elems_2, elems_1, elems;
    return createElement("div", createObj(Helpers_combineClasses("field", singleton_1((elems_2 = [createElement("label", createObj(Helpers_combineClasses("label", singleton_1(["children", "Project Title"])))), createElement("div", createObj(ofArray([["className", join(" ", ["control", "has-icons-left"])], (elems_1 = [createElement("input", createObj(cons(["type", "text"], Helpers_combineClasses("input", ofArray([["required", true], ["placeholder", "Enter the title of your project"], ["onChange", (ev) => {
        dispatch(new Msg(3, [ev.target.value]));
    }], ["value", model.projectTitle]]))))), createElement("span", createObj(Helpers_combineClasses("icon", ofArray([["className", "is-small"], ["className", "is-left"], (elems = [createElement("i", {
        className: join(" ", ["fas fa-heading"]),
    })], ["children", Interop_reactApi.Children.toArray(Array.from(elems))])]))))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_1))])])))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_2))])))));
}

export function TagFilter(dispatch, model, filterType, filter) {
    return createElement("span", createObj(Helpers_combineClasses("tag", toList(delay(() => append(singleton(["className", join(" ", ["filter-tag"])]), delay(() => append(singleton(["children", getFormattedCategory(filter)]), delay(() => append(singleton(["style", {
        marginBottom: 10,
        marginRight: 10,
        cursor: "pointer",
    }]), delay(() => ((filterType.tag === 1) ? append(singleton(["onClick", (_arg_1) => {
        dispatch(new Msg(5, [filter]));
    }]), delay(() => (exists((c_1) => (c_1 === filter), model.selectedStreams) ? singleton(["className", "is-info"]) : empty()))) : append(singleton(["onClick", (_arg) => {
        dispatch(new Msg(4, [filter]));
    }]), delay(() => (exists((c) => (c === filter), model.selectedCategories) ? singleton(["className", "is-info"]) : empty())))))))))))))));
}

export function Categories(model, dispatch) {
    let elems;
    return createElement("div", createObj(ofArray([["className", join(" ", ["field"])], (elems = toList(delay(() => append(singleton(createElement("label", createObj(Helpers_combineClasses("label", singleton_1(["children", "Select the relevant Project Categories"]))))), delay(() => map((c) => TagFilter(dispatch, model, new FilterType(0, []), c), categories))))), ["children", Interop_reactApi.Children.toArray(Array.from(elems))])])));
}

export function Streams(model, dispatch) {
    let elems;
    return createElement("div", createObj(ofArray([["className", join(" ", ["field"])], (elems = toList(delay(() => append(singleton(createElement("label", createObj(Helpers_combineClasses("label", singleton_1(["children", "Select the relevant Student Streams"]))))), delay(() => map((s) => TagFilter(dispatch, model, new FilterType(1, []), s), streams))))), ["children", Interop_reactApi.Children.toArray(Array.from(elems))])])));
}

export function Requirements(model, dispatch) {
    let elems;
    return createElement("div", createObj(ofArray([["className", join(" ", ["field"])], (elems = [createElement("label", createObj(Helpers_combineClasses("label", singleton_1(["children", "Student Requirements"])))), createElement("textarea", {
        required: true,
        rows: 5,
        cols: 33,
        placeholder: "Enter the student requirements for this project",
        onChange: (ev) => {
            dispatch(new Msg(6, [ev.target.value]));
        },
        value: model.requirements,
    })], ["children", Interop_reactApi.Children.toArray(Array.from(elems))])])));
}

export function Skills(model, dispatch) {
    let elems;
    return createElement("div", createObj(ofArray([["className", join(" ", ["field"])], (elems = [createElement("label", createObj(Helpers_combineClasses("label", singleton_1(["children", "Desired Skills"])))), createElement("textarea", {
        required: true,
        rows: 5,
        cols: 33,
        placeholder: "Enter the desired skills for this project",
        onChange: (ev) => {
            dispatch(new Msg(7, [ev.target.value]));
        },
        value: model.skills,
    })], ["children", Interop_reactApi.Children.toArray(Array.from(elems))])])));
}

export function Description(model, dispatch) {
    let elems;
    return createElement("div", createObj(ofArray([["className", join(" ", ["field"])], (elems = [createElement("label", createObj(Helpers_combineClasses("label", singleton_1(["children", "Description"])))), createElement("textarea", {
        required: true,
        rows: 5,
        cols: 33,
        placeholder: "Enter the project description",
        onChange: (ev) => {
            dispatch(new Msg(8, [ev.target.value]));
        },
        value: model.description,
    })], ["children", Interop_reactApi.Children.toArray(Array.from(elems))])])));
}

export function Meetings(model, dispatch) {
    let elems;
    return createElement("div", createObj(ofArray([["className", join(" ", ["field"])], (elems = [createElement("label", createObj(Helpers_combineClasses("label", singleton_1(["children", "Meeting dates"])))), createElement("textarea", {
        required: true,
        rows: 5,
        cols: 33,
        placeholder: "Enter your availability for meetings",
        onChange: (ev) => {
            dispatch(new Msg(9, [ev.target.value]));
        },
        value: model.meetings,
    })], ["children", Interop_reactApi.Children.toArray(Array.from(elems))])])));
}

export function SubmitButton(model) {
    let elems_1, elms;
    return createElement("div", createObj(ofArray([["className", join(" ", ["field", "is-grouped", "is-grouped-centered"])], (elems_1 = [(elms = singleton_1(createElement("button", createObj(Helpers_combineClasses("button", toList(delay(() => append(singleton(["className", "is-info"]), delay(() => append(singleton(["children", "Submit"]), delay(() => (!isFormValid(model) ? singleton(["disabled", true]) : empty()))))))))))), createElement("div", {
        className: "control",
        children: Interop_reactApi.Children.toArray(Array.from(elms)),
    }))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_1))])])));
}

//# sourceMappingURL=ProjectProposeForm.fs.js.map
