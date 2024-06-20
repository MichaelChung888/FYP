import { Record, Union } from "../../fable_modules/fable-library.4.1.4/Types.js";
import { class_type, record_type, option_type, list_type, string_type, bool_type, union_type } from "../../fable_modules/fable-library.4.1.4/Reflection.js";
import { streams, categories, FilterType, getFormattedCategory, ProjectProposeRequest_$reflection, ProjectProposeRequest, Person_$reflection } from "../../../../Shared/Shared.fs.js";
import { cons, ofArray, singleton, append, filter as filter_1, exists, empty, length } from "../../fable_modules/fable-library.4.1.4/List.js";
import { Cmd_OfPromise_either, Cmd_none } from "../../fable_modules/Fable.Elmish.4.1.0/cmd.fs.js";
import { join, printf, toConsole } from "../../fable_modules/fable-library.4.1.4/String.js";
import { PromiseBuilder__Delay_62FBFDE1, PromiseBuilder__Run_212F1D4B } from "../../fable_modules/Fable.Promise.3.2.0/Promise.fs.js";
import { promise } from "../../fable_modules/Fable.Promise.3.2.0/PromiseImpl.fs.js";
import { PromiseBuilder__Delay_62FBFDE1 as PromiseBuilder__Delay_62FBFDE1_1, PromiseBuilder__Run_212F1D4B as PromiseBuilder__Run_212F1D4B_1 } from "../../fable_modules/Thoth.Fetch.3.0.1/../Fable.Promise.3.2.0/Promise.fs.js";
import { promise as promise_1 } from "../../fable_modules/Thoth.Fetch.3.0.1/../Fable.Promise.3.2.0/PromiseImpl.fs.js";
import { FetchError } from "../../fable_modules/Thoth.Fetch.3.0.1/Fetch.fs.js";
import { FSharpResult$2 } from "../../fable_modules/fable-library.4.1.4/Choice.js";
import { Helper_message, Helper_fetch, Helper_withContentTypeJson, Helper_withProperties } from "../../fable_modules/Thoth.Fetch.3.0.1/./Fetch.fs.js";
import { Types_HttpRequestHeaders, Types_RequestProperties } from "../../fable_modules/Fable.Fetch.2.7.0/Fetch.fs.js";
import { keyValueList } from "../../fable_modules/fable-library.4.1.4/MapUtil.js";
import { unwrap, map, defaultArg } from "../../fable_modules/fable-library.4.1.4/Option.js";
import { Auto_generateBoxedEncoderCached_437914C6 } from "../../fable_modules/Thoth.Json.10.2.0/./Encode.fs.js";
import { toString } from "../../fable_modules/Thoth.Fetch.3.0.1/../Thoth.Json.10.2.0/Encode.fs.js";
import { string } from "../../fable_modules/Thoth.Json.10.2.0/Decode.fs.js";
import { Auto_generateBoxedDecoderCached_Z6670B51 } from "../../fable_modules/Thoth.Json.10.2.0/./Decode.fs.js";
import { fromString } from "../../fable_modules/Thoth.Fetch.3.0.1/../Thoth.Json.10.2.0/Decode.fs.js";
import { createObj, uncurry2 } from "../../fable_modules/fable-library.4.1.4/Util.js";
import { createElement } from "react";
import { rgba } from "../../fable_modules/Feliz.2.7.0/Colors.fs.js";
import { Interop_reactApi } from "../../fable_modules/Feliz.2.7.0/./Interop.fs.js";
import { Helpers_combineClasses } from "../../fable_modules/Feliz.Bulma.3.0.0/./ElementBuilders.fs.js";
import { RouterModule_nav } from "../../fable_modules/Feliz.Router.4.0.0/./Router.fs.js";
import { map as map_1, empty as empty_1, singleton as singleton_1, append as append_1, delay, toList } from "../../fable_modules/fable-library.4.1.4/Seq.js";

export class ResponseResult extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["Success", "Failed", "Neither"];
    }
}

export function ResponseResult_$reflection() {
    return union_type("ProjectPropose.ResponseResult", [], ResponseResult, () => [[], [], []]);
}

export class Model extends Record {
    constructor(loading, token, user, projectTitle, selectedCategories, selectedStreams, requirements, description, skills, meetings, validationMessage, responseResult) {
        super();
        this.loading = loading;
        this.token = token;
        this.user = user;
        this.projectTitle = projectTitle;
        this.selectedCategories = selectedCategories;
        this.selectedStreams = selectedStreams;
        this.requirements = requirements;
        this.description = description;
        this.skills = skills;
        this.meetings = meetings;
        this.validationMessage = validationMessage;
        this.responseResult = responseResult;
    }
}

export function Model_$reflection() {
    return record_type("ProjectPropose.Model", [], Model, () => [["loading", bool_type], ["token", string_type], ["user", Person_$reflection()], ["projectTitle", string_type], ["selectedCategories", list_type(string_type)], ["selectedStreams", list_type(string_type)], ["requirements", string_type], ["description", string_type], ["skills", string_type], ["meetings", string_type], ["validationMessage", option_type(string_type)], ["responseResult", ResponseResult_$reflection()]]);
}

export class Msg extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["SuccessLoad", "Error", "Logout", "ProjectTitleChanged", "ClickedCategoryTag", "ClickedStreamTag", "RequirementsChanged", "SkillsChanged", "DescriptionChanged", "MeetingsChanged", "Submit"];
    }
}

export function Msg_$reflection() {
    return union_type("ProjectPropose.Msg", [], Msg, () => [[["Item", string_type]], [["Item", class_type("System.Exception")]], [], [["Item", string_type]], [["Item", string_type]], [["Item", string_type]], [["Item", string_type]], [["Item", string_type]], [["Item", string_type]], [["Item", string_type]], [["Item", class_type("Browser.Types.Event", void 0)]]]);
}

export function isStudent(user) {
    const matchValue = user.categ;
    switch (matchValue) {
        case "U":
        case "M":
            return true;
        default:
            return false;
    }
}

export function titleValid(model) {
    return model.projectTitle !== "";
}

export function requirementsValid(model) {
    return model.requirements !== "";
}

export function skillsValid(model) {
    return model.skills !== "";
}

export function descriptionValid(model) {
    return model.description !== "";
}

export function meetingsValid(model) {
    return model.meetings !== "";
}

export function streamValid(model) {
    return length(model.selectedStreams) > 0;
}

export function categoryValid(model) {
    return length(model.selectedCategories) > 0;
}

export function isFormValid(model) {
    if (isStudent(model.user)) {
        if ((titleValid(model) && descriptionValid(model)) && meetingsValid(model)) {
            return categoryValid(model);
        }
        else {
            return false;
        }
    }
    else if (((((titleValid(model) && requirementsValid(model)) && skillsValid(model)) && descriptionValid(model)) && meetingsValid(model)) && categoryValid(model)) {
        return streamValid(model);
    }
    else {
        return false;
    }
}

export function init(token, user) {
    const defaultModel = new Model(false, token, user, "", empty(), empty(), "", "", "", "", void 0, new ResponseResult(2, []));
    return [defaultModel, Cmd_none()];
}

export function update(msg, model) {
    switch (msg.tag) {
        case 1: {
            const res = msg.fields[0];
            toConsole(printf("%A"))(res);
            return [new Model(false, model.token, model.user, model.projectTitle, model.selectedCategories, model.selectedStreams, model.requirements, model.description, model.skills, model.meetings, model.validationMessage, new ResponseResult(1, [])), Cmd_none()];
        }
        case 2:
            return [model, Cmd_none()];
        case 3: {
            const title = msg.fields[0];
            return [new Model(model.loading, model.token, model.user, title, model.selectedCategories, model.selectedStreams, model.requirements, model.description, model.skills, model.meetings, model.validationMessage, new ResponseResult(2, [])), Cmd_none()];
        }
        case 4: {
            const tag = msg.fields[0];
            const sc = model.selectedCategories;
            if (exists((c) => (c === tag), sc)) {
                return [new Model(model.loading, model.token, model.user, model.projectTitle, filter_1((c_1) => (c_1 !== tag), sc), model.selectedStreams, model.requirements, model.description, model.skills, model.meetings, model.validationMessage, new ResponseResult(2, [])), Cmd_none()];
            }
            else {
                return [new Model(model.loading, model.token, model.user, model.projectTitle, append(sc, singleton(tag)), model.selectedStreams, model.requirements, model.description, model.skills, model.meetings, model.validationMessage, model.responseResult), Cmd_none()];
            }
        }
        case 5: {
            const tag_1 = msg.fields[0];
            const ss = model.selectedStreams;
            if (exists((c_2) => (c_2 === tag_1), ss)) {
                return [new Model(model.loading, model.token, model.user, model.projectTitle, model.selectedCategories, filter_1((c_3) => (c_3 !== tag_1), ss), model.requirements, model.description, model.skills, model.meetings, model.validationMessage, new ResponseResult(2, [])), Cmd_none()];
            }
            else {
                return [new Model(model.loading, model.token, model.user, model.projectTitle, model.selectedCategories, append(ss, singleton(tag_1)), model.requirements, model.description, model.skills, model.meetings, model.validationMessage, model.responseResult), Cmd_none()];
            }
        }
        case 6: {
            const requirements = msg.fields[0];
            return [new Model(model.loading, model.token, model.user, model.projectTitle, model.selectedCategories, model.selectedStreams, requirements, model.description, model.skills, model.meetings, model.validationMessage, new ResponseResult(2, [])), Cmd_none()];
        }
        case 8: {
            const description = msg.fields[0];
            return [new Model(model.loading, model.token, model.user, model.projectTitle, model.selectedCategories, model.selectedStreams, model.requirements, description, model.skills, model.meetings, model.validationMessage, new ResponseResult(2, [])), Cmd_none()];
        }
        case 7: {
            const skills = msg.fields[0];
            return [new Model(model.loading, model.token, model.user, model.projectTitle, model.selectedCategories, model.selectedStreams, model.requirements, model.description, skills, model.meetings, model.validationMessage, new ResponseResult(2, [])), Cmd_none()];
        }
        case 9: {
            const meetings = msg.fields[0];
            return [new Model(model.loading, model.token, model.user, model.projectTitle, model.selectedCategories, model.selectedStreams, model.requirements, model.description, model.skills, meetings, model.validationMessage, new ResponseResult(2, [])), Cmd_none()];
        }
        case 10: {
            const ev = msg.fields[0];
            ev.preventDefault();
            const data = new ProjectProposeRequest(isStudent(model.user), model.projectTitle, model.selectedCategories, isStudent(model.user) ? empty() : model.selectedStreams, isStudent(model.user) ? "" : model.requirements, isStudent(model.user) ? "" : model.description, isStudent(model.user) ? "" : model.skills, model.meetings);
            const handleSubmit = () => PromiseBuilder__Run_212F1D4B(promise, PromiseBuilder__Delay_62FBFDE1(promise, () => {
                const url = "http://localhost:1234/project-propose";
                return PromiseBuilder__Run_212F1D4B_1(promise_1, PromiseBuilder__Delay_62FBFDE1_1(promise_1, () => {
                    let data_3, caseStrategy_2, extra_2;
                    return ((data_3 = data, (caseStrategy_2 = void 0, (extra_2 = void 0, (() => {
                        let properties_4;
                        try {
                            const properties_3 = Helper_withProperties(void 0, (properties_4 = ofArray([new Types_RequestProperties(0, ["POST"]), new Types_RequestProperties(1, [keyValueList(Helper_withContentTypeJson(data_3, singleton(new Types_HttpRequestHeaders(5, [`Bearer ${model.token}`]))), 0)])]), defaultArg(map((data_1_1) => {
                                let encoder;
                                return cons(new Types_RequestProperties(2, [(encoder = Auto_generateBoxedEncoderCached_437914C6(ProjectProposeRequest_$reflection(), caseStrategy_2, extra_2), toString(0, encoder(data_1_1)))]), properties_4);
                            }, data_3), properties_4)));
                            const pr = PromiseBuilder__Run_212F1D4B_1(promise_1, PromiseBuilder__Delay_62FBFDE1_1(promise_1, () => (Helper_fetch(url, properties_3).then((_arg) => {
                                let response_1, decoder_1_1, decode;
                                const response = _arg;
                                return ((response_1 = response, (decoder_1_1 = defaultArg((path) => ((value) => string(path, value)), Auto_generateBoxedDecoderCached_Z6670B51(string_type, unwrap(caseStrategy_2), unwrap(extra_2))), (decode = ((body_1) => fromString(uncurry2(decoder_1_1), body_1)), PromiseBuilder__Run_212F1D4B_1(promise_1, PromiseBuilder__Delay_62FBFDE1_1(promise_1, () => (((response_1.ok) ? PromiseBuilder__Run_212F1D4B_1(promise_1, PromiseBuilder__Delay_62FBFDE1_1(promise_1, () => (response_1.text().then((_arg_1) => {
                                    let matchValue_2, msg_1, value_1_1;
                                    const body_1_1 = _arg_1;
                                    return Promise.resolve((matchValue_2 = decode(body_1_1), (matchValue_2.tag === 1) ? ((msg_1 = matchValue_2.fields[0], new FSharpResult$2(1, [new FetchError(1, [msg_1])]))) : ((value_1_1 = matchValue_2.fields[0], new FSharpResult$2(0, [value_1_1])))));
                                })))) : (Promise.resolve(new FSharpResult$2(1, [new FetchError(2, [response_1])])))).then((_arg_1_1) => {
                                    const result = _arg_1_1;
                                    return Promise.resolve(result);
                                }))))))));
                            }))));
                            return pr.catch((arg_4) => (new FSharpResult$2(1, [new FetchError(3, [arg_4])])));
                        }
                        catch (exn) {
                            return PromiseBuilder__Run_212F1D4B_1(promise_1, PromiseBuilder__Delay_62FBFDE1_1(promise_1, () => (Promise.resolve(new FSharpResult$2(1, [new FetchError(0, [exn])])))));
                        }
                    })())))).then((_arg_2) => {
                        const result_1 = _arg_2;
                        let response_1_1;
                        if (result_1.tag === 1) {
                            const error = result_1.fields[0];
                            throw new Error(Helper_message(error));
                        }
                        else {
                            const response_2 = result_1.fields[0];
                            response_1_1 = response_2;
                        }
                        return Promise.resolve(response_1_1);
                    });
                }));
            }));
            return [new Model(true, model.token, model.user, model.projectTitle, model.selectedCategories, model.selectedStreams, model.requirements, model.description, model.skills, model.meetings, model.validationMessage, new ResponseResult(2, [])), Cmd_OfPromise_either(handleSubmit, void 0, (arg_5) => (new Msg(0, [arg_5])), (arg_6) => (new Msg(1, [arg_6])))];
        }
        default: {
            const success = msg.fields[0];
            return [new Model(false, model.token, model.user, model.projectTitle, model.selectedCategories, model.selectedStreams, model.requirements, model.description, model.skills, model.meetings, model.validationMessage, new ResponseResult(0, [])), Cmd_none()];
        }
    }
}

export const LoadingScreen = createElement("div", createObj(ofArray([["style", {
    top: 0,
    left: 0,
    overflow: "hidden",
    position: "absolute",
    height: 100 + "vh",
    width: 100 + "vw",
    display: "flex",
    zIndex: 100,
    backgroundColor: rgba(0, 0, 0, 0.6),
    justifyContent: "center",
    alignItems: "center",
}], (() => {
    const elems = [createElement("div", {
        className: join(" ", ["loader"]),
    })];
    return ["children", Interop_reactApi.Children.toArray(Array.from(elems))];
})()])));

export function TurquoiseBackground(opacity) {
    return createElement("div", {
        style: {
            top: 0,
            left: 0,
            overflow: "hidden",
            position: "absolute",
            height: 100 + "%",
            width: 100 + "%",
            opacity: opacity,
            zIndex: -1,
            backgroundColor: "#AFEEEE",
        },
    });
}

export function TurquoiseBackgroundRGBA(opacity) {
    return ["backgroundColor", rgba(175, 238, 238, opacity)];
}

export const ImageBackground = createElement("img", {
    style: {
        position: "absolute",
        height: 100 + "%",
        width: 100 + "%",
        zIndex: -2,
        overflow: "hidden",
    },
    src: "/images/imperial.jpg",
});

export function NavBar(dispatch) {
    let elems_7, elems_1, elems, elms_4, elms, elms_3, elms_2, elms_1;
    return createElement("nav", createObj(Helpers_combineClasses("navbar", ofArray([["style", {
        backgroundColor: "#48D1CC",
        fontWeight: 700,
    }], (elems_7 = [createElement("div", createObj(Helpers_combineClasses("navbar-brand", ofArray([["onClick", (e) => {
        RouterModule_nav(singleton("home-student"), 1, 2);
    }], ["style", {
        paddingTop: 3,
        paddingRight: 20,
        paddingLeft: 10,
        cursor: "pointer",
    }], (elems_1 = [createElement("span", createObj(Helpers_combineClasses("icon", ofArray([["className", "is-large"], (elems = [createElement("i", {
        className: "fas fa-home fa-2x",
    })], ["children", Interop_reactApi.Children.toArray(Array.from(elems))])]))))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_1))])])))), (elms_4 = ofArray([(elms = ofArray([createElement("a", createObj(Helpers_combineClasses("navbar-item", ofArray([["children", "Projects"], ["onClick", (e_1) => {
        RouterModule_nav(ofArray(["home-student", "projects"]), 1, 2);
    }]])))), createElement("a", createObj(Helpers_combineClasses("navbar-item", ofArray([["children", "Preferences"], ["onClick", (e_2) => {
        RouterModule_nav(ofArray(["home-student", "preferences"]), 1, 2);
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

export function BulmaTile(classes, styles, props) {
    return createElement("div", createObj(Helpers_combineClasses("tile", ofArray([["className", join(" ", classes)], ["style", createObj(styles)], ["children", Interop_reactApi.Children.toArray(Array.from(props))]]))));
}

export function Div(classes, styles, props) {
    return createElement("div", {
        className: join(" ", classes),
        style: createObj(styles),
        children: Interop_reactApi.Children.toArray(Array.from(props)),
    });
}

export const TileCss = ofArray([TurquoiseBackgroundRGBA(0.7), ["borderStyle", "solid"], ["borderColor", "#48D1CC"], ["overflow", "hidden"]]);

export function TagFilter(dispatch, model, filterType, filter) {
    return createElement("span", createObj(Helpers_combineClasses("tag", toList(delay(() => append_1(singleton_1(["className", join(" ", ["filter-tag"])]), delay(() => append_1(singleton_1(["children", getFormattedCategory(filter)]), delay(() => append_1(singleton_1(["style", {
        marginBottom: 10,
        marginRight: 10,
        cursor: "pointer",
    }]), delay(() => ((filterType.tag === 1) ? append_1(singleton_1(["onClick", (_arg_1) => {
        dispatch(new Msg(5, [filter]));
    }]), delay(() => (exists((c_1) => (c_1 === filter), model.selectedStreams) ? singleton_1(["className", "is-info"]) : empty_1()))) : append_1(singleton_1(["onClick", (_arg) => {
        dispatch(new Msg(4, [filter]));
    }]), delay(() => (exists((c) => (c === filter), model.selectedCategories) ? singleton_1(["className", "is-info"]) : empty_1())))))))))))))));
}

export function ResponseResultMessage(model) {
    return createElement("p", createObj(toList(delay(() => {
        const matchValue = model.responseResult;
        switch (matchValue.tag) {
            case 1:
                return append_1(singleton_1(["style", {
                    color: "#FF0000",
                }]), delay(() => singleton_1(["children", "Failed to create project"])));
            case 2: {
                return empty_1();
            }
            default:
                return append_1(singleton_1(["style", {
                    color: "#008000",
                }]), delay(() => singleton_1(["children", "Project created successfully"])));
        }
    }))));
}

export function ValidityCheck(model) {
    let elems;
    return createElement("p", createObj(ofArray([["style", {
        color: "#FF0000",
    }], (elems = toList(delay(() => append_1(!isFormValid(model) ? singleton_1(createElement("p", {
        children: ["Complete all requirements below to propose a project:"],
    })) : empty_1(), delay(() => {
        let children;
        return singleton_1((children = toList(delay(() => append_1(!titleValid(model) ? singleton_1(createElement("li", {
            children: ["Please enter the title of your project"],
        })) : empty_1(), delay(() => append_1(!categoryValid(model) ? singleton_1(createElement("li", {
            children: ["Please select at least one category"],
        })) : empty_1(), delay(() => append_1((!streamValid(model) && !isStudent(model.user)) ? singleton_1(createElement("li", {
            children: ["Please select at least one stream"],
        })) : empty_1(), delay(() => append_1((!requirementsValid(model) && !isStudent(model.user)) ? singleton_1(createElement("li", {
            children: ["Please enter the requirements for your project"],
        })) : empty_1(), delay(() => append_1((!skillsValid(model) && !isStudent(model.user)) ? singleton_1(createElement("li", {
            children: ["Please enter the skills required for your project"],
        })) : empty_1(), delay(() => append_1(!descriptionValid(model) ? singleton_1(createElement("li", {
            children: ["Please enter the description of your project"],
        })) : empty_1(), delay(() => (!meetingsValid(model) ? singleton_1(createElement("li", {
            children: ["Please enter the meeting details for your project"],
        })) : empty_1()))))))))))))))), createElement("ul", {
            children: Interop_reactApi.Children.toArray(Array.from(children)),
        })));
    })))), ["children", Interop_reactApi.Children.toArray(Array.from(elems))])])));
}

export function Tabs(model) {
    let elems_3, elems_2;
    return createElement("div", createObj(Helpers_combineClasses("tabs", singleton((elems_3 = [createElement("ul", createObj(ofArray([["style", {
        marginLeft: 0,
    }], (elems_2 = [createElement("li", createObj(Helpers_combineClasses("", toList(delay(() => append_1(isStudent(model.user) ? singleton_1(["className", join(" ", ["is-active"])]) : empty_1(), delay(() => append_1(singleton_1(["className", join(" ", ["is-active"])]), delay(() => {
        let elems;
        return singleton_1((elems = [createElement("a", {
            children: "Student",
            style: {
                fontWeight: "bold",
            },
        })], ["children", Interop_reactApi.Children.toArray(Array.from(elems))]));
    }))))))))), createElement("li", createObj(Helpers_combineClasses("", toList(delay(() => append_1(!isStudent(model.user) ? singleton_1(["className", join(" ", ["is-active"])]) : empty_1(), delay(() => {
        let elems_1;
        return singleton_1((elems_1 = [createElement("a", {
            children: "Supervisor",
            style: {
                fontWeight: "bold",
            },
        })], ["children", Interop_reactApi.Children.toArray(Array.from(elems_1))]));
    })))))))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_2))])])))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_3))])))));
}

export function Name(model) {
    let elems_2, elems_1, elems;
    return createElement("div", createObj(Helpers_combineClasses("field", singleton((elems_2 = [createElement("label", createObj(Helpers_combineClasses("label", singleton(["children", "Name"])))), createElement("div", createObj(ofArray([["className", join(" ", ["control", "has-icons-left"])], (elems_1 = [createElement("input", createObj(cons(["type", "text"], Helpers_combineClasses("input", ofArray([["required", true], ["disabled", true], ["value", model.user.forenames]]))))), createElement("span", createObj(Helpers_combineClasses("icon", ofArray([["className", "is-small"], ["className", "is-left"], (elems = [createElement("i", {
        className: join(" ", ["fas fa-user"]),
    })], ["children", Interop_reactApi.Children.toArray(Array.from(elems))])]))))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_1))])])))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_2))])))));
}

export function ProjectTitle(model, dispatch) {
    let elems_2, elems_1, elems;
    return createElement("div", createObj(Helpers_combineClasses("field", singleton((elems_2 = [createElement("label", createObj(Helpers_combineClasses("label", singleton(["children", "Project Title"])))), createElement("div", createObj(ofArray([["className", join(" ", ["control", "has-icons-left"])], (elems_1 = [createElement("input", createObj(cons(["type", "text"], Helpers_combineClasses("input", ofArray([["required", true], ["placeholder", "Enter the title of your project"], ["onChange", (ev) => {
        dispatch(new Msg(3, [ev.target.value]));
    }], ["value", model.projectTitle]]))))), createElement("span", createObj(Helpers_combineClasses("icon", ofArray([["className", "is-small"], ["className", "is-left"], (elems = [createElement("i", {
        className: join(" ", ["fas fa-heading"]),
    })], ["children", Interop_reactApi.Children.toArray(Array.from(elems))])]))))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_1))])])))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_2))])))));
}

export function Categories(model, dispatch) {
    let elems;
    return createElement("div", createObj(ofArray([["className", join(" ", ["field"])], (elems = toList(delay(() => append_1(singleton_1(createElement("label", createObj(Helpers_combineClasses("label", singleton(["children", "Select the relevant Project Categories"]))))), delay(() => map_1((c) => TagFilter(dispatch, model, new FilterType(0, []), c), categories))))), ["children", Interop_reactApi.Children.toArray(Array.from(elems))])])));
}

export function Streams(model, dispatch) {
    let elems;
    return createElement("div", createObj(ofArray([["className", join(" ", ["field"])], (elems = toList(delay(() => append_1(singleton_1(createElement("label", createObj(Helpers_combineClasses("label", singleton(["children", "Select the relevant Student Streams"]))))), delay(() => map_1((s) => TagFilter(dispatch, model, new FilterType(1, []), s), streams))))), ["children", Interop_reactApi.Children.toArray(Array.from(elems))])])));
}

export function Requirements(model, dispatch) {
    let elems;
    return createElement("div", createObj(ofArray([["className", join(" ", ["field"])], (elems = [createElement("label", createObj(Helpers_combineClasses("label", singleton(["children", "Student Requirements"])))), createElement("textarea", {
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
    return createElement("div", createObj(ofArray([["className", join(" ", ["field"])], (elems = [createElement("label", createObj(Helpers_combineClasses("label", singleton(["children", "Desired Skills"])))), createElement("textarea", {
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
    return createElement("div", createObj(ofArray([["className", join(" ", ["field"])], (elems = [createElement("label", createObj(Helpers_combineClasses("label", singleton(["children", "Description"])))), createElement("textarea", {
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
    return createElement("div", createObj(ofArray([["className", join(" ", ["field"])], (elems = [createElement("label", createObj(Helpers_combineClasses("label", singleton(["children", "Meeting dates"])))), createElement("textarea", {
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
    return createElement("div", createObj(ofArray([["className", join(" ", ["field", "is-grouped", "is-grouped-centered"])], (elems_1 = [(elms = singleton(createElement("button", createObj(Helpers_combineClasses("button", toList(delay(() => append_1(singleton_1(["className", "is-info"]), delay(() => append_1(singleton_1(["children", "Submit"]), delay(() => (!isFormValid(model) ? singleton_1(["disabled", true]) : empty_1()))))))))))), createElement("div", {
        className: "control",
        children: Interop_reactApi.Children.toArray(Array.from(elms)),
    }))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_1))])])));
}

export function view(model, dispatch) {
    let elems_4;
    return createElement("body", createObj(ofArray([["style", {
        height: 100 + "vh",
        position: "relative",
    }], (elems_4 = toList(delay(() => append_1(model.loading ? singleton_1(LoadingScreen) : empty_1(), delay(() => append_1(singleton_1(TurquoiseBackground(0.5)), delay(() => append_1(singleton_1(ImageBackground), delay(() => append_1(singleton_1(NavBar(dispatch)), delay(() => {
        let elems_3, elems_2, elems_1, elems;
        return singleton_1(createElement("div", createObj(Helpers_combineClasses("columns", ofArray([["className", join(" ", ["is-centered"])], ["style", {
            height: 90 + "vh",
            margin: 1 + "%",
            position: "relative",
        }], (elems_3 = [createElement("div", createObj(Helpers_combineClasses("column", ofArray([["style", createObj(TileCss)], ["className", join(" ", ["is-half"])], (elems_2 = [createElement("div", createObj(Helpers_combineClasses("content", ofArray([["style", {
            overflowY: "scroll",
            height: 100 + "%",
            padding: 50,
        }], ["className", join(" ", ["scrollbar"])], (elems_1 = [createElement("form", createObj(ofArray([["onSubmit", (arg_1) => {
            dispatch(new Msg(10, [arg_1]));
        }], (elems = toList(delay(() => append_1(singleton_1(createElement("h1", createObj(Helpers_combineClasses("title", singleton(["children", "Project Proposal Form"]))))), delay(() => append_1(singleton_1(Tabs(model)), delay(() => append_1(singleton_1(ResponseResultMessage(model)), delay(() => append_1(singleton_1(ValidityCheck(model)), delay(() => append_1(singleton_1(Name(model)), delay(() => append_1(singleton_1(ProjectTitle(model, dispatch)), delay(() => append_1(singleton_1(Categories(model, dispatch)), delay(() => append_1(!isStudent(model.user) ? singleton_1(Streams(model, dispatch)) : empty_1(), delay(() => append_1(!isStudent(model.user) ? singleton_1(Requirements(model, dispatch)) : empty_1(), delay(() => append_1(!isStudent(model.user) ? singleton_1(Skills(model, dispatch)) : empty_1(), delay(() => append_1(singleton_1(Description(model, dispatch)), delay(() => append_1(singleton_1(Meetings(model, dispatch)), delay(() => singleton_1(SubmitButton(model)))))))))))))))))))))))))))), ["children", Interop_reactApi.Children.toArray(Array.from(elems))])])))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_1))])]))))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_2))])]))))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_3))])])))));
    })))))))))), ["children", Interop_reactApi.Children.toArray(Array.from(elems_4))])])));
}

//# sourceMappingURL=ProjectPropose.fs.js.map
