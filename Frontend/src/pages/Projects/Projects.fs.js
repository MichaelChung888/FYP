import { map as map_2, append, filter as filter_1, exists, cons, singleton, empty, ofArray } from "../../fable_modules/fable-library.4.1.4/List.js";
import { Record, Union } from "../../fable_modules/fable-library.4.1.4/Types.js";
import { obj_type, class_type, record_type, int32_type, bool_type, string_type, list_type, union_type } from "../../fable_modules/fable-library.4.1.4/Reflection.js";
import { getFormattedCategory, SearchRequest_$reflection, SearchRequest, PreferenceResponse_get_Decoder, Project_get_Decoder, Project_get_Default, PreferenceResponse_get_Default, PreferenceResponse_$reflection, Project_$reflection } from "../../../../Shared/Shared.fs.js";
import { PromiseBuilder__Delay_62FBFDE1, PromiseBuilder__Run_212F1D4B } from "../../fable_modules/Fable.Promise.3.2.0/Promise.fs.js";
import { promise } from "../../fable_modules/Fable.Promise.3.2.0/PromiseImpl.fs.js";
import { list as list_1 } from "../../fable_modules/Thoth.Json.10.2.0/Decode.fs.js";
import { int32ToString, createObj, uncurry2 } from "../../fable_modules/fable-library.4.1.4/Util.js";
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
import { Auto_generateBoxedDecoderCached_Z6670B51 } from "../../fable_modules/Thoth.Json.10.2.0/./Decode.fs.js";
import { fromString } from "../../fable_modules/Thoth.Fetch.3.0.1/../Thoth.Json.10.2.0/Decode.fs.js";
import { Cmd_none, Cmd_OfPromise_either } from "../../fable_modules/Fable.Elmish.4.1.0/cmd.fs.js";
import { split, join, printf, toConsole } from "../../fable_modules/fable-library.4.1.4/String.js";
import { createElement } from "react";
import { rgba } from "../../fable_modules/Feliz.2.7.0/Colors.fs.js";
import { Helpers_combineClasses } from "../../fable_modules/Feliz.Bulma.3.0.0/./ElementBuilders.fs.js";
import { RouterModule_nav } from "../../fable_modules/Feliz.Router.4.0.0/./Router.fs.js";
import { Interop_reactApi } from "../../fable_modules/Feliz.2.7.0/./Interop.fs.js";
import { map as map_1, empty as empty_1, singleton as singleton_1, append as append_1, delay, toList } from "../../fable_modules/fable-library.4.1.4/Seq.js";
import { toString as toString_1 } from "../../fable_modules/fable-library.4.1.4/Date.js";
import { PropHelpers_createOnKey } from "../../fable_modules/Feliz.2.7.0/./Properties.fs.js";
import { key_escape } from "../../fable_modules/Feliz.2.7.0/Key.fs.js";

export const categories = ofArray(["embedded_systems", "control_engineering", "electronics", "renewable_energy", "biomedical_engineering", "system_optimisation_and_modelling", "high_performance_computing", "computer_vision", "digital_signal_processing", "instrumentation_and_measurement", "cybersecurity", "robotics", "signal_processing", "power_systems", "machine_learning", "photonics", "other", "discrete_maths", "mathematics_signals_and_systems", "software_systems", "communications", "control_systems", "information_processing", "instruction_architectures_and_compilers", "circuit_and_systems", "power_electronics_and_power_systems", "electromagnetism"]);

export const streams = ofArray(["E", "I", "T", "D", "J"]);

export class FilterType extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["Category", "Stream"];
    }
}

export function FilterType_$reflection() {
    return union_type("Projects.FilterType", [], FilterType, () => [[], []]);
}

export class Model extends Record {
    constructor(projects, preference, token, modalState, addProjectState, searchTitle, selectedCategories, selectedStreams, selectedProject, selectedProjectRank) {
        super();
        this.projects = projects;
        this.preference = preference;
        this.token = token;
        this.modalState = modalState;
        this.addProjectState = addProjectState;
        this.searchTitle = searchTitle;
        this.selectedCategories = selectedCategories;
        this.selectedStreams = selectedStreams;
        this.selectedProject = selectedProject;
        this.selectedProjectRank = (selectedProjectRank | 0);
    }
}

export function Model_$reflection() {
    return record_type("Projects.Model", [], Model, () => [["projects", list_type(Project_$reflection())], ["preference", PreferenceResponse_$reflection()], ["token", string_type], ["modalState", bool_type], ["addProjectState", bool_type], ["searchTitle", string_type], ["selectedCategories", list_type(string_type)], ["selectedStreams", list_type(string_type)], ["selectedProject", Project_$reflection()], ["selectedProjectRank", int32_type]]);
}

export class InitalLoad extends Record {
    constructor(projects, preference) {
        super();
        this.projects = projects;
        this.preference = preference;
    }
}

export function InitalLoad_$reflection() {
    return record_type("Projects.InitalLoad", [], InitalLoad, () => [["projects", list_type(Project_$reflection())], ["preference", PreferenceResponse_$reflection()]]);
}

export class Msg extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["SuccessfulLoad", "ErrorLoad", "OpenModal", "CloseModal", "OpenAddProject", "CloseAddProject", "RankAddProject", "SearchTitleChanged", "ClickedCategoryTag", "ClickedStreamTag", "SearchRequest", "FetchedProjectsLoad"];
    }
}

export function Msg_$reflection() {
    return union_type("Projects.Msg", [], Msg, () => [[["Item", InitalLoad_$reflection()]], [["Item", class_type("System.Exception")]], [["Item", Project_$reflection()]], [], [], [], [["Item", int32_type]], [["Item", string_type]], [["Item", string_type]], [["Item", string_type]], [], [["Item", list_type(Project_$reflection())]]]);
}

export function init(token) {
    const defaultModel = new Model(empty(), PreferenceResponse_get_Default(), token, false, false, "", empty(), empty(), Project_get_Default(), 0);
    const initialLoad = () => PromiseBuilder__Run_212F1D4B(promise, PromiseBuilder__Delay_62FBFDE1(promise, () => {
        let decoder_1, decoder;
        const newProjectsUrl = "http://localhost:1234/new-projects";
        const preferenceUrl = "http://localhost:1234/preferences";
        return ((decoder_1 = ((decoder = Project_get_Decoder(), (path) => ((value) => list_1(uncurry2(decoder), path, value)))), PromiseBuilder__Run_212F1D4B_1(promise_1, PromiseBuilder__Delay_62FBFDE1_1(promise_1, () => {
            let data_2, caseStrategy_2, extra_2;
            return ((data_2 = void 0, (caseStrategy_2 = void 0, (extra_2 = void 0, (() => {
                let properties_4;
                try {
                    const properties_3 = Helper_withProperties(void 0, (properties_4 = ofArray([new Types_RequestProperties(0, ["GET"]), new Types_RequestProperties(1, [keyValueList(Helper_withContentTypeJson(data_2, singleton(new Types_HttpRequestHeaders(5, [`Bearer ${token}`]))), 0)])]), defaultArg(map((data_1_1) => {
                        let encoder;
                        return cons(new Types_RequestProperties(2, [(encoder = Auto_generateBoxedEncoderCached_437914C6(obj_type, caseStrategy_2, extra_2), toString(0, encoder(data_1_1)))]), properties_4);
                    }, data_2), properties_4)));
                    const pr = PromiseBuilder__Run_212F1D4B_1(promise_1, PromiseBuilder__Delay_62FBFDE1_1(promise_1, () => (Helper_fetch(newProjectsUrl, properties_3).then((_arg) => {
                        let response_1, decoder_1_1, decode;
                        const response = _arg;
                        return ((response_1 = response, (decoder_1_1 = defaultArg(decoder_1, Auto_generateBoxedDecoderCached_Z6670B51(list_type(Project_$reflection()), unwrap(caseStrategy_2), unwrap(extra_2))), (decode = ((body_1) => fromString(uncurry2(decoder_1_1), body_1)), PromiseBuilder__Run_212F1D4B_1(promise_1, PromiseBuilder__Delay_62FBFDE1_1(promise_1, () => (((response_1.ok) ? PromiseBuilder__Run_212F1D4B_1(promise_1, PromiseBuilder__Delay_62FBFDE1_1(promise_1, () => (response_1.text().then((_arg_1) => {
                            let matchValue, msg, value_1_1;
                            const body_1_1 = _arg_1;
                            return Promise.resolve((matchValue = decode(body_1_1), (matchValue.tag === 1) ? ((msg = matchValue.fields[0], new FSharpResult$2(1, [new FetchError(1, [msg])]))) : ((value_1_1 = matchValue.fields[0], new FSharpResult$2(0, [value_1_1])))));
                        })))) : (Promise.resolve(new FSharpResult$2(1, [new FetchError(2, [response_1])])))).then((_arg_1_1) => {
                            const result = _arg_1_1;
                            return Promise.resolve(result);
                        }))))))));
                    }))));
                    return pr.catch((arg_3) => (new FSharpResult$2(1, [new FetchError(3, [arg_3])])));
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
        })))).then((_arg_3) => {
            let decoder_5;
            const projects = _arg_3;
            return ((decoder_5 = PreferenceResponse_get_Decoder(), PromiseBuilder__Run_212F1D4B_1(promise_1, PromiseBuilder__Delay_62FBFDE1_1(promise_1, () => {
                let data_7, caseStrategy_10, extra_10;
                return ((data_7 = void 0, (caseStrategy_10 = void 0, (extra_10 = void 0, (() => {
                    let properties_8;
                    try {
                        const properties_3_1 = Helper_withProperties(void 0, (properties_8 = ofArray([new Types_RequestProperties(0, ["GET"]), new Types_RequestProperties(1, [keyValueList(Helper_withContentTypeJson(data_7, singleton(new Types_HttpRequestHeaders(5, [`Bearer ${token}`]))), 0)])]), defaultArg(map((data_1_2) => {
                            let encoder_1;
                            return cons(new Types_RequestProperties(2, [(encoder_1 = Auto_generateBoxedEncoderCached_437914C6(obj_type, caseStrategy_10, extra_10), toString(0, encoder_1(data_1_2)))]), properties_8);
                        }, data_7), properties_8)));
                        const pr_1 = PromiseBuilder__Run_212F1D4B_1(promise_1, PromiseBuilder__Delay_62FBFDE1_1(promise_1, () => (Helper_fetch(preferenceUrl, properties_3_1).then((_arg_4) => {
                            let response_4, decoder_1_2, decode_1;
                            const response_3 = _arg_4;
                            return ((response_4 = response_3, (decoder_1_2 = defaultArg(decoder_5, Auto_generateBoxedDecoderCached_Z6670B51(PreferenceResponse_$reflection(), unwrap(caseStrategy_10), unwrap(extra_10))), (decode_1 = ((body_3) => fromString(uncurry2(decoder_1_2), body_3)), PromiseBuilder__Run_212F1D4B_1(promise_1, PromiseBuilder__Delay_62FBFDE1_1(promise_1, () => (((response_4.ok) ? PromiseBuilder__Run_212F1D4B_1(promise_1, PromiseBuilder__Delay_62FBFDE1_1(promise_1, () => (response_4.text().then((_arg_5) => {
                                let matchValue_1, msg_1, value_1_2;
                                const body_1_2 = _arg_5;
                                return Promise.resolve((matchValue_1 = decode_1(body_1_2), (matchValue_1.tag === 1) ? ((msg_1 = matchValue_1.fields[0], new FSharpResult$2(1, [new FetchError(1, [msg_1])]))) : ((value_1_2 = matchValue_1.fields[0], new FSharpResult$2(0, [value_1_2])))));
                            })))) : (Promise.resolve(new FSharpResult$2(1, [new FetchError(2, [response_4])])))).then((_arg_1_2) => {
                                const result_2 = _arg_1_2;
                                return Promise.resolve(result_2);
                            }))))))));
                        }))));
                        return pr_1.catch((arg_7) => (new FSharpResult$2(1, [new FetchError(3, [arg_7])])));
                    }
                    catch (exn_1) {
                        return PromiseBuilder__Run_212F1D4B_1(promise_1, PromiseBuilder__Delay_62FBFDE1_1(promise_1, () => (Promise.resolve(new FSharpResult$2(1, [new FetchError(0, [exn_1])])))));
                    }
                })())))).then((_arg_6) => {
                    const result_3 = _arg_6;
                    let response_1_2;
                    if (result_3.tag === 1) {
                        const error_1 = result_3.fields[0];
                        throw new Error(Helper_message(error_1));
                    }
                    else {
                        const response_5 = result_3.fields[0];
                        response_1_2 = response_5;
                    }
                    return Promise.resolve(response_1_2);
                });
            })))).then((_arg_7) => {
                const preference = _arg_7;
                return Promise.resolve(new InitalLoad(projects, preference));
            });
        });
    }));
    return [defaultModel, Cmd_OfPromise_either(initialLoad, void 0, (arg_8) => (new Msg(0, [arg_8])), (arg_9) => (new Msg(1, [arg_9])))];
}

export function update(msg, model) {
    switch (msg.tag) {
        case 1: {
            const res = msg.fields[0];
            toConsole(printf("%A"))(res);
            return [model, Cmd_none()];
        }
        case 2: {
            const project = msg.fields[0];
            return [new Model(model.projects, model.preference, model.token, true, model.addProjectState, model.searchTitle, model.selectedCategories, model.selectedStreams, project, model.selectedProjectRank), Cmd_none()];
        }
        case 3:
            return [new Model(model.projects, model.preference, model.token, false, false, model.searchTitle, model.selectedCategories, model.selectedStreams, model.selectedProject, 0), Cmd_none()];
        case 4:
            return [new Model(model.projects, model.preference, model.token, model.modalState, true, model.searchTitle, model.selectedCategories, model.selectedStreams, model.selectedProject, model.selectedProjectRank), Cmd_none()];
        case 5:
            return [new Model(model.projects, model.preference, model.token, model.modalState, false, model.searchTitle, model.selectedCategories, model.selectedStreams, model.selectedProject, 0), Cmd_none()];
        case 6: {
            const rank = msg.fields[0] | 0;
            return [new Model(model.projects, model.preference, model.token, model.modalState, model.addProjectState, model.searchTitle, model.selectedCategories, model.selectedStreams, model.selectedProject, rank), Cmd_none()];
        }
        case 7: {
            const title = msg.fields[0];
            return [new Model(model.projects, model.preference, model.token, model.modalState, model.addProjectState, title, model.selectedCategories, model.selectedStreams, model.selectedProject, model.selectedProjectRank), singleton((dispatch) => {
                dispatch(new Msg(10, []));
            })];
        }
        case 8: {
            const tag = msg.fields[0];
            const sc = model.selectedCategories;
            if (exists((c) => (c === tag), sc)) {
                return [new Model(model.projects, model.preference, model.token, model.modalState, model.addProjectState, model.searchTitle, filter_1((c_1) => (c_1 !== tag), sc), model.selectedStreams, model.selectedProject, model.selectedProjectRank), singleton((dispatch_1) => {
                    dispatch_1(new Msg(10, []));
                })];
            }
            else {
                return [new Model(model.projects, model.preference, model.token, model.modalState, model.addProjectState, model.searchTitle, append(sc, singleton(tag)), model.selectedStreams, model.selectedProject, model.selectedProjectRank), singleton((dispatch_2) => {
                    dispatch_2(new Msg(10, []));
                })];
            }
        }
        case 9: {
            const tag_1 = msg.fields[0];
            const ss = model.selectedStreams;
            if (exists((c_2) => (c_2 === tag_1), ss)) {
                return [new Model(model.projects, model.preference, model.token, model.modalState, model.addProjectState, model.searchTitle, model.selectedCategories, filter_1((c_3) => (c_3 !== tag_1), ss), model.selectedProject, model.selectedProjectRank), singleton((dispatch_3) => {
                    dispatch_3(new Msg(10, []));
                })];
            }
            else {
                return [new Model(model.projects, model.preference, model.token, model.modalState, model.addProjectState, model.searchTitle, model.selectedCategories, append(ss, singleton(tag_1)), model.selectedProject, model.selectedProjectRank), singleton((dispatch_4) => {
                    dispatch_4(new Msg(10, []));
                })];
            }
        }
        case 10: {
            const data = new SearchRequest(model.searchTitle, model.selectedCategories, model.selectedStreams);
            const searchRequest = () => PromiseBuilder__Run_212F1D4B(promise, PromiseBuilder__Delay_62FBFDE1(promise, () => {
                let decoder_1, decoder;
                const url = "http://localhost:1234/search-projects";
                return ((decoder_1 = ((decoder = Project_get_Decoder(), (path) => ((value) => list_1(uncurry2(decoder), path, value)))), PromiseBuilder__Run_212F1D4B_1(promise_1, PromiseBuilder__Delay_62FBFDE1_1(promise_1, () => {
                    let data_3, caseStrategy_2, extra_2;
                    return ((data_3 = data, (caseStrategy_2 = void 0, (extra_2 = void 0, (() => {
                        let properties_4;
                        try {
                            const properties_3 = Helper_withProperties(void 0, (properties_4 = ofArray([new Types_RequestProperties(0, ["POST"]), new Types_RequestProperties(1, [keyValueList(Helper_withContentTypeJson(data_3, singleton(new Types_HttpRequestHeaders(5, [`Bearer ${model.token}`]))), 0)])]), defaultArg(map((data_1_1) => {
                                let encoder;
                                return cons(new Types_RequestProperties(2, [(encoder = Auto_generateBoxedEncoderCached_437914C6(SearchRequest_$reflection(), caseStrategy_2, extra_2), toString(0, encoder(data_1_1)))]), properties_4);
                            }, data_3), properties_4)));
                            const pr = PromiseBuilder__Run_212F1D4B_1(promise_1, PromiseBuilder__Delay_62FBFDE1_1(promise_1, () => (Helper_fetch(url, properties_3).then((_arg) => {
                                let response_1, decoder_1_1, decode;
                                const response = _arg;
                                return ((response_1 = response, (decoder_1_1 = defaultArg(decoder_1, Auto_generateBoxedDecoderCached_Z6670B51(list_type(Project_$reflection()), unwrap(caseStrategy_2), unwrap(extra_2))), (decode = ((body_1) => fromString(uncurry2(decoder_1_1), body_1)), PromiseBuilder__Run_212F1D4B_1(promise_1, PromiseBuilder__Delay_62FBFDE1_1(promise_1, () => (((response_1.ok) ? PromiseBuilder__Run_212F1D4B_1(promise_1, PromiseBuilder__Delay_62FBFDE1_1(promise_1, () => (response_1.text().then((_arg_1) => {
                                    let matchValue_2, msg_6, value_1_1;
                                    const body_1_1 = _arg_1;
                                    return Promise.resolve((matchValue_2 = decode(body_1_1), (matchValue_2.tag === 1) ? ((msg_6 = matchValue_2.fields[0], new FSharpResult$2(1, [new FetchError(1, [msg_6])]))) : ((value_1_1 = matchValue_2.fields[0], new FSharpResult$2(0, [value_1_1])))));
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
                }))));
            }));
            return [model, Cmd_OfPromise_either(searchRequest, void 0, (arg_5) => (new Msg(11, [arg_5])), (arg_6) => (new Msg(1, [arg_6])))];
        }
        case 11: {
            const projects = msg.fields[0];
            return [new Model(projects, model.preference, model.token, model.modalState, model.addProjectState, model.searchTitle, model.selectedCategories, model.selectedStreams, model.selectedProject, model.selectedProjectRank), Cmd_none()];
        }
        default: {
            const initialLoad = msg.fields[0];
            return [new Model(initialLoad.projects, initialLoad.preference, model.token, model.modalState, model.addProjectState, model.searchTitle, model.selectedCategories, model.selectedStreams, model.selectedProject, model.selectedProjectRank), Cmd_none()];
        }
    }
}

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

export const NavBar = createElement("nav", createObj(Helpers_combineClasses("navbar", ofArray([["style", {
    backgroundColor: "#48D1CC",
    fontWeight: 700,
}], (() => {
    let elems_1, elms, elms_5, elms_1, elms_4, elms_3, elms_2;
    const elems_7 = [createElement("div", createObj(Helpers_combineClasses("navbar-brand", ofArray([["onClick", (e) => {
        RouterModule_nav(singleton("home-student"), 1, 2);
    }], (elems_1 = [(elms = singleton(createElement("img", {
        src: "https://bulma.io/images/bulma-logo-white.png",
        height: 28,
        width: 112,
    })), createElement("a", {
        className: "navbar-item",
        children: Interop_reactApi.Children.toArray(Array.from(elms)),
    }))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_1))])])))), (elms_5 = ofArray([(elms_1 = ofArray([createElement("a", createObj(Helpers_combineClasses("navbar-item", ofArray([["children", "Projects"], ["onClick", (e_1) => {
        RouterModule_nav(ofArray(["home-student", "projects"]), 1, 2);
    }]])))), createElement("a", createObj(Helpers_combineClasses("navbar-item", singleton(["children", "Preferences"])))), createElement("a", createObj(Helpers_combineClasses("navbar-item", singleton(["children", "Propose a Project"]))))]), createElement("div", {
        className: "navbar-start",
        children: Interop_reactApi.Children.toArray(Array.from(elms_1)),
    })), (elms_4 = singleton((elms_3 = singleton((elms_2 = singleton(createElement("a", createObj(Helpers_combineClasses("button", singleton(["children", "Log Out"]))))), createElement("div", {
        className: "buttons",
        children: Interop_reactApi.Children.toArray(Array.from(elms_2)),
    }))), createElement("div", {
        className: "navbar-item",
        children: Interop_reactApi.Children.toArray(Array.from(elms_3)),
    }))), createElement("div", {
        className: "navbar-end",
        children: Interop_reactApi.Children.toArray(Array.from(elms_4)),
    }))]), createElement("div", {
        className: "navbar-menu",
        children: Interop_reactApi.Children.toArray(Array.from(elms_5)),
    }))];
    return ["children", Interop_reactApi.Children.toArray(Array.from(elems_7))];
})()]))));

export function ProjectInput(dispatch) {
    let elems_2, elems_1, elems;
    return createElement("div", createObj(Helpers_combineClasses("field", singleton((elems_2 = [createElement("label", createObj(Helpers_combineClasses("label", singleton(["children", "Project Title"])))), createElement("div", createObj(ofArray([["className", join(" ", ["control", "has-icons-left"])], (elems_1 = [createElement("input", createObj(cons(["type", "text"], Helpers_combineClasses("input", ofArray([["required", true], ["placeholder", "Enter your Query"], ["onChange", (ev) => {
        dispatch(new Msg(7, [ev.target.value]));
    }]]))))), createElement("span", createObj(Helpers_combineClasses("icon", ofArray([["className", "is-small"], ["className", "is-left"], (elems = [createElement("i", {
        className: "fas fa-search",
    })], ["children", Interop_reactApi.Children.toArray(Array.from(elems))])]))))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_1))])])))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_2))])))));
}

export const ProfessorInput = createElement("div", createObj(Helpers_combineClasses("field", singleton((() => {
    let elems_1, elems;
    const elems_2 = [createElement("label", createObj(Helpers_combineClasses("label", singleton(["children", "Professor Title"])))), createElement("div", createObj(ofArray([["className", join(" ", ["control", "has-icons-left"])], (elems_1 = [createElement("input", createObj(cons(["type", "text"], Helpers_combineClasses("input", ofArray([["required", true], ["placeholder", "Enter your Query"]]))))), createElement("span", createObj(Helpers_combineClasses("icon", ofArray([["className", "is-small"], ["className", "is-left"], (elems = [createElement("i", {
        className: "fas fa-search",
    })], ["children", Interop_reactApi.Children.toArray(Array.from(elems))])]))))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_1))])])))];
    return ["children", Interop_reactApi.Children.toArray(Array.from(elems_2))];
})()))));

export const TileCss = ofArray([TurquoiseBackgroundRGBA(0.7), ["borderStyle", "solid"], ["borderColor", "#48D1CC"], ["padding", 1.5 + "%"]]);

export function TagFilter(dispatch, model, filterType, filter) {
    return createElement("span", createObj(Helpers_combineClasses("tag", toList(delay(() => append_1(singleton_1(["className", join(" ", ["filter-tag"])]), delay(() => append_1(singleton_1(["children", getFormattedCategory(filter)]), delay(() => append_1(singleton_1(["style", {
        marginBottom: 10,
        marginRight: 10,
        cursor: "pointer",
    }]), delay(() => ((filterType.tag === 1) ? append_1(singleton_1(["onClick", (_arg_1) => {
        dispatch(new Msg(9, [filter]));
    }]), delay(() => (exists((c_1) => (c_1 === filter), model.selectedStreams) ? singleton_1(["className", "is-info"]) : empty_1()))) : append_1(singleton_1(["onClick", (_arg) => {
        dispatch(new Msg(8, [filter]));
    }]), delay(() => (exists((c) => (c === filter), model.selectedCategories) ? singleton_1(["className", "is-info"]) : empty_1())))))))))))))));
}

export function SearchFilters(dispatch, model) {
    return toList(delay(() => append_1(singleton_1(ProjectInput(dispatch)), delay(() => append_1(singleton_1(ProfessorInput), delay(() => append_1(singleton_1(createElement("label", createObj(Helpers_combineClasses("label", singleton(["children", "Relevant Modules and Skills"]))))), delay(() => append_1(map_1((c) => TagFilter(dispatch, model, new FilterType(0, []), c), categories), delay(() => append_1(singleton_1(createElement("label", createObj(Helpers_combineClasses("label", singleton(["children", "Stream"]))))), delay(() => map_1((s) => TagFilter(dispatch, model, new FilterType(1, []), s), streams)))))))))))));
}

export function Tag(model, filter) {
    return createElement("span", createObj(Helpers_combineClasses("tag", toList(delay(() => append_1(singleton_1(["children", getFormattedCategory(filter)]), delay(() => append_1(singleton_1(["style", {
        marginBottom: 10,
        marginRight: 10,
    }]), delay(() => (exists((c) => (c === filter), model.selectedCategories) ? singleton_1(["className", "is-info"]) : empty_1()))))))))));
}

export function TableCategories(model, categories_1) {
    return map_2((filter) => Tag(model, filter), ofArray(split(categories_1, [","], void 0, 0)));
}

export function TableRow(dispatch, model, projectInfo) {
    let elems, children;
    return createElement("tr", createObj(ofArray([["className", join(" ", ["table-row"])], ["onClick", (_arg) => {
        dispatch(new Msg(2, [projectInfo]));
    }], ["style", {
        cursor: "pointer",
    }], (elems = [createElement("td", {
        children: projectInfo.title,
    }), createElement("td", {}), createElement("td", {
        children: projectInfo.p1,
    }), createElement("td", {
        children: projectInfo.p2,
    }), createElement("td", {
        children: projectInfo.p3,
    }), createElement("td", {
        children: projectInfo.p4,
    }), createElement("td", {
        children: projectInfo.p5,
    }), createElement("td", {
        children: projectInfo.p6,
    }), createElement("td", {
        children: projectInfo.p7,
    }), createElement("td", {
        children: projectInfo.p8,
    }), createElement("td", {
        children: projectInfo.p9,
    }), createElement("td", {
        children: projectInfo.p10,
    }), (children = TableCategories(model, projectInfo.categories), createElement("td", {
        children: Interop_reactApi.Children.toArray(Array.from(children)),
    })), createElement("td", {
        children: toString_1(projectInfo.updated, "yyyy/MM/dd"),
    })], ["children", Interop_reactApi.Children.toArray(Array.from(elems))])])));
}

export function Table(body) {
    let elems_1;
    return createElement("div", createObj(ofArray([["style", {
        overflowY: "auto",
        height: 95 + "%",
    }], ["className", join(" ", ["scrollbar"])], (elems_1 = [createElement("table", createObj(Helpers_combineClasses("table", ofArray([["style", {
        width: 100 + "%",
    }], ["children", Interop_reactApi.Children.toArray(Array.from(body))]]))))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_1))])])));
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
        title: "Last Updated",
        children: "Last Updated",
    })]), createElement("tr", {
        children: Interop_reactApi.Children.toArray(Array.from(children)),
    }))), createElement("thead", {
        children: Interop_reactApi.Children.toArray(Array.from(children_2)),
    })), (children_4 = map_2((projectInfo) => TableRow(dispatch, model, projectInfo), model.projects), createElement("tbody", {
        children: Interop_reactApi.Children.toArray(Array.from(children_4)),
    }))]));
}

export function modalProjectInfo(model, dispatch) {
    let elms, elms_4, elms_3, elms_2, elems_2, elems_1, elms_1, elms_6, elms_5;
    const sp = model.selectedProject;
    const elms_7 = ofArray([(elms = ofArray([createElement("p", {
        className: "modal-card-title",
        children: (("#" + sp.pid) + " ") + sp.title,
    }), createElement("button", createObj(Helpers_combineClasses("modal-close", ofArray([["className", join(" ", ["is-large"])], ["onClick", (_arg) => {
        dispatch(new Msg(3, []));
    }]]))))]), createElement("header", {
        className: "modal-card-head",
        children: Interop_reactApi.Children.toArray(Array.from(elms)),
    })), (elms_4 = singleton((elms_3 = ofArray([(elms_2 = ofArray([createElement("div", createObj(Helpers_combineClasses("column", ofArray([["className", join(" ", ["is-5"])], (elems_2 = [createElement("h2", {
        children: ["Project Rankings"],
    }), createElement("ol", createObj(ofArray([["style", {
        fontWeight: 700,
    }], (elems_1 = [createElement("li", {
        children: [createElement("p", {
            children: [int32ToString(sp.p1)],
        })],
    }), createElement("li", {
        children: [createElement("p", {
            children: [int32ToString(sp.p2)],
        })],
    }), createElement("li", {
        children: [createElement("p", {
            children: [int32ToString(sp.p3)],
        })],
    }), createElement("li", {
        children: [createElement("p", {
            children: [int32ToString(sp.p4)],
        })],
    }), createElement("li", {
        children: [createElement("p", {
            children: [int32ToString(sp.p5)],
        })],
    }), createElement("li", {
        children: [createElement("p", {
            children: [int32ToString(sp.p6)],
        })],
    }), createElement("li", {
        children: [createElement("p", {
            children: [int32ToString(sp.p7)],
        })],
    }), createElement("li", {
        children: [createElement("p", {
            children: [int32ToString(sp.p8)],
        })],
    }), createElement("li", {
        children: [createElement("p", {
            children: [int32ToString(sp.p9)],
        })],
    }), createElement("li", {
        children: [createElement("p", {
            children: [int32ToString(sp.p10)],
        })],
    })], ["children", Interop_reactApi.Children.toArray(Array.from(elems_1))])])))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_2))])])))), (elms_1 = toList(delay(() => append_1(singleton_1(createElement("h2", {
        children: ["Project Categories"],
    })), delay(() => append_1(map_1((c) => c, TableCategories(model, sp.categories)), delay(() => append_1(singleton_1(createElement("h2", {
        children: ["Student Requirements"],
    })), delay(() => singleton_1(createElement("p", {
        children: [sp.requirements],
    })))))))))), createElement("div", {
        className: "column",
        children: Interop_reactApi.Children.toArray(Array.from(elms_1)),
    }))]), createElement("div", {
        className: "columns",
        children: Interop_reactApi.Children.toArray(Array.from(elms_2)),
    })), createElement("h2", {
        children: ["Desired Skills"],
    }), createElement("p", {
        children: [sp.skills],
    }), createElement("h2", {
        children: ["Project Description"],
    }), createElement("p", {
        children: [sp.descr],
    }), createElement("h2", {
        children: ["Meeting Dates"],
    }), createElement("p", {
        children: [sp.meetings],
    })]), createElement("div", {
        className: "content",
        children: Interop_reactApi.Children.toArray(Array.from(elms_3)),
    }))), createElement("section", {
        className: "modal-card-body",
        children: Interop_reactApi.Children.toArray(Array.from(elms_4)),
    })), (elms_6 = singleton((elms_5 = ofArray([createElement("button", createObj(Helpers_combineClasses("button", ofArray([["className", "is-success"], ["children", "Add Project"], ["onClick", (_arg_1) => {
        dispatch(new Msg(4, []));
    }]])))), createElement("button", createObj(Helpers_combineClasses("button", ofArray([["children", "Close Project"], ["onClick", (_arg_2) => {
        dispatch(new Msg(3, []));
    }]]))))]), createElement("div", {
        className: "buttons",
        children: Interop_reactApi.Children.toArray(Array.from(elms_5)),
    }))), createElement("footer", {
        className: "modal-card-foot",
        children: Interop_reactApi.Children.toArray(Array.from(elms_6)),
    }))]);
    return createElement("div", {
        className: "modal-card",
        children: Interop_reactApi.Children.toArray(Array.from(elms_7)),
    });
}

export function PreferenceRow(model, dispatch, _arg1_, _arg1__1) {
    const _arg = [_arg1_, _arg1__1];
    const rank = _arg[1] | 0;
    const projectInfo = _arg[0];
    return createElement("tr", createObj(toList(delay(() => append_1(singleton_1(["className", join(" ", ["table-row"])]), delay(() => append_1(singleton_1(["onClick", (_arg_1) => {
        dispatch(new Msg(6, [rank]));
    }]), delay(() => append_1(singleton_1(["style", {
        cursor: "pointer",
    }]), delay(() => {
        let elems, elems_1, elems_2;
        const matchValue = model.selectedProjectRank === rank;
        return matchValue ? singleton_1((elems = [createElement("td", {
            style: {
                color: "#FF0000",
            },
            children: rank,
        }), createElement("td", {
            style: {
                color: "#FF0000",
            },
            children: model.selectedProject.title,
        }), createElement("td", {
            style: {
                color: "#FF0000",
            },
        })], ["children", Interop_reactApi.Children.toArray(Array.from(elems))])) : ((projectInfo.pid === "-") ? singleton_1((elems_1 = [createElement("td", {
            children: rank,
        }), createElement("td", {}), createElement("td", {})], ["children", Interop_reactApi.Children.toArray(Array.from(elems_1))])) : singleton_1((elems_2 = [createElement("td", {
            children: rank,
        }), createElement("td", {
            children: projectInfo.title,
        }), createElement("td", {})], ["children", Interop_reactApi.Children.toArray(Array.from(elems_2))])));
    }))))))))));
}

export function PreferenceTable(model, dispatch) {
    let children_2, children, children_4;
    const pref = model.preference;
    const prefList = ofArray([[pref.p1, pref.n1], [pref.p2, pref.n2], [pref.p3, pref.n3], [pref.p4, pref.n4], [pref.p5, pref.n5], [pref.p6, pref.n6], [pref.p7, pref.n7], [pref.p8, pref.n8], [pref.p9, pref.n9], [pref.p10, pref.n10]]);
    return Table(ofArray([(children_2 = singleton((children = ofArray([createElement("th", {
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
    })), (children_4 = map_2((tupledArg) => PreferenceRow(model, dispatch, tupledArg[0], tupledArg[1]), prefList), createElement("tbody", {
        children: Interop_reactApi.Children.toArray(Array.from(children_4)),
    }))]));
}

export function modalAddProject(model, dispatch) {
    let elms, elms_2, elms_1, value_13, elms_4, elms_3;
    const sp = model.selectedProject;
    const elms_5 = ofArray([(elms = ofArray([createElement("p", {
        className: "modal-card-title",
        children: (("#" + sp.pid) + " ") + sp.title,
    }), createElement("button", createObj(Helpers_combineClasses("modal-close", ofArray([["className", join(" ", ["is-large"])], ["onClick", (_arg) => {
        dispatch(new Msg(3, []));
    }]]))))]), createElement("header", {
        className: "modal-card-head",
        children: Interop_reactApi.Children.toArray(Array.from(elms)),
    })), (elms_2 = singleton((elms_1 = ofArray([createElement("h2", {
        children: ["Add Project"],
    }), createElement("p", {
        children: ["You are about to add the following project to your preferences:"],
    }), createElement("blockquote", {
        children: [("\'" + sp.title) + "\'"],
    }), (value_13 = "Below in your preferences, please select a preference rank \r\n                        of where you would like to replace or place the project.", createElement("p", {
        children: [value_13],
    })), createElement("h2", {
        children: ["Your Preferences"],
    }), PreferenceTable(model, dispatch)]), createElement("div", {
        className: "content",
        children: Interop_reactApi.Children.toArray(Array.from(elms_1)),
    }))), createElement("section", {
        className: "modal-card-body",
        children: Interop_reactApi.Children.toArray(Array.from(elms_2)),
    })), (elms_4 = singleton((elms_3 = ofArray([createElement("button", createObj(Helpers_combineClasses("button", toList(delay(() => append_1(singleton_1(["children", "Save Changes"]), delay(() => ((model.selectedProjectRank === 0) ? singleton_1(["disabled", true]) : append_1(singleton_1(["onClick", (_arg_1) => {
        dispatch(new Msg(4, []));
    }]), delay(() => singleton_1(["className", "is-success"]))))))))))), createElement("button", createObj(Helpers_combineClasses("button", ofArray([["children", "Go Back"], ["onClick", (_arg_2) => {
        dispatch(new Msg(5, []));
    }]]))))]), createElement("div", {
        className: "buttons",
        children: Interop_reactApi.Children.toArray(Array.from(elms_3)),
    }))), createElement("footer", {
        className: "modal-card-foot",
        children: Interop_reactApi.Children.toArray(Array.from(elms_4)),
    }))]);
    return createElement("div", {
        className: "modal-card",
        children: Interop_reactApi.Children.toArray(Array.from(elms_5)),
    });
}

export function view(model, dispatch) {
    let elems_4, elems_3, elems, elems_1;
    return createElement("body", createObj(ofArray([["style", {
        height: 100 + "vh",
        position: "relative",
    }], (elems_4 = [TurquoiseBackground(0.5), ImageBackground, NavBar, createElement("div", createObj(Helpers_combineClasses("columns", ofArray([["style", {
        height: 85 + "vh",
        margin: 1 + "%",
    }], (elems_3 = [createElement("div", createObj(Helpers_combineClasses("column", ofArray([["style", createObj(append(singleton(["overflowY", "scroll"]), TileCss))], ["className", join(" ", ["is-3", "scrollbar"])], (elems = SearchFilters(dispatch, model), ["children", Interop_reactApi.Children.toArray(Array.from(elems))])])))), createElement("div", createObj(Helpers_combineClasses("column", singleton(["className", join(" ", ["is-0"])])))), createElement("div", createObj(Helpers_combineClasses("column", ofArray([["style", createObj(TileCss)], (elems_1 = [createElement("label", createObj(Helpers_combineClasses("label", singleton(["children", "Projects"])))), ProjectTable(model, dispatch)], ["children", Interop_reactApi.Children.toArray(Array.from(elems_1))])])))), createElement("div", createObj(Helpers_combineClasses("modal", toList(delay(() => append_1(model.modalState ? singleton_1(["className", "is-active"]) : empty_1(), delay(() => append_1(singleton_1(["onKeyUp", (ev_1) => {
        PropHelpers_createOnKey(key_escape, (ev) => {
            dispatch(new Msg(3, []));
        }, ev_1);
    }]), delay(() => append_1(singleton_1(["className", join(" ", ["scrollbar", "is-large"])]), delay(() => {
        let elems_2;
        return singleton_1((elems_2 = toList(delay(() => append_1(singleton_1(createElement("div", createObj(Helpers_combineClasses("modal-background", empty())))), delay(() => (model.addProjectState ? singleton_1(modalAddProject(model, dispatch)) : singleton_1(modalProjectInfo(model, dispatch))))))), ["children", Interop_reactApi.Children.toArray(Array.from(elems_2))]));
    })))))))))))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_3))])]))))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_4))])])));
}

//# sourceMappingURL=Projects.fs.js.map
