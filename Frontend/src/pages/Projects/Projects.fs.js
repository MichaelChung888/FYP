import { Union, Record } from "../../fable_modules/fable-library.4.1.4/Types.js";
import { obj_type, union_type, class_type, record_type, int32_type, string_type, list_type, bool_type } from "../../fable_modules/fable-library.4.1.4/Reflection.js";
import { streams, categories as categories_1, FilterType, getFormattedCategory, SearchRequest_$reflection, SearchRequest, AddPreferenceRequest_$reflection, AddPreferenceRequest, PreferenceResponse_get_Decoder, Project_get_Decoder, Project_get_Default, PreferenceResponse_get_Default, PreferenceResponse_$reflection, Project_$reflection } from "../../../../Shared/Shared.fs.js";
import { map as map_2, append, filter as filter_1, exists, cons, ofArray, singleton, empty } from "../../fable_modules/fable-library.4.1.4/List.js";
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
import { join, printf, toConsole } from "../../fable_modules/fable-library.4.1.4/String.js";
import { createElement } from "react";
import { rgba } from "../../fable_modules/Feliz.2.7.0/Colors.fs.js";
import { Interop_reactApi } from "../../fable_modules/Feliz.2.7.0/./Interop.fs.js";
import { Helpers_combineClasses } from "../../fable_modules/Feliz.Bulma.3.0.0/./ElementBuilders.fs.js";
import { RouterModule_nav } from "../../fable_modules/Feliz.Router.4.0.0/./Router.fs.js";
import { map as map_1, empty as empty_1, singleton as singleton_1, append as append_1, delay, toList } from "../../fable_modules/fable-library.4.1.4/Seq.js";
import { toString as toString_1 } from "../../fable_modules/fable-library.4.1.4/Date.js";
import { PropHelpers_createOnKey } from "../../fable_modules/Feliz.2.7.0/./Properties.fs.js";
import { key_escape } from "../../fable_modules/Feliz.2.7.0/Key.fs.js";

export class Model extends Record {
    constructor(loading, projects, preference, token, modalState, addProjectState, searchTitle, searchProfessor, selectedCategories, selectedStreams, selectedProject, selectedProjectRank) {
        super();
        this.loading = loading;
        this.projects = projects;
        this.preference = preference;
        this.token = token;
        this.modalState = modalState;
        this.addProjectState = addProjectState;
        this.searchTitle = searchTitle;
        this.searchProfessor = searchProfessor;
        this.selectedCategories = selectedCategories;
        this.selectedStreams = selectedStreams;
        this.selectedProject = selectedProject;
        this.selectedProjectRank = (selectedProjectRank | 0);
    }
}

export function Model_$reflection() {
    return record_type("Projects.Model", [], Model, () => [["loading", bool_type], ["projects", list_type(Project_$reflection())], ["preference", PreferenceResponse_$reflection()], ["token", string_type], ["modalState", bool_type], ["addProjectState", bool_type], ["searchTitle", string_type], ["searchProfessor", string_type], ["selectedCategories", list_type(string_type)], ["selectedStreams", list_type(string_type)], ["selectedProject", Project_$reflection()], ["selectedProjectRank", int32_type]]);
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
        return ["SuccessLoad", "ErrorLoad", "Logout", "OpenModal", "CloseModal", "AddProject", "OpenAddProject", "CloseAddProject", "RankAddProject", "SearchTitleChanged", "SearchProfessorChanged", "ClickedCategoryTag", "ClickedStreamTag", "SearchRequest", "FetchedProjectsLoad"];
    }
}

export function Msg_$reflection() {
    return union_type("Projects.Msg", [], Msg, () => [[["Item", InitalLoad_$reflection()]], [["Item", class_type("System.Exception")]], [], [["Item", Project_$reflection()]], [], [], [], [], [["Item", int32_type]], [["Item", string_type]], [["Item", string_type]], [["Item", string_type]], [["Item", string_type]], [], [["Item", list_type(Project_$reflection())]]]);
}

export function currentSelectedPreference(model) {
    const matchValue = model.selectedProjectRank | 0;
    switch (matchValue) {
        case 1:
            return model.preference.p1.pid | 0;
        case 2:
            return model.preference.p2.pid | 0;
        case 3:
            return model.preference.p3.pid | 0;
        case 4:
            return model.preference.p4.pid | 0;
        case 5:
            return model.preference.p5.pid | 0;
        case 6:
            return model.preference.p6.pid | 0;
        case 7:
            return model.preference.p7.pid | 0;
        case 8:
            return model.preference.p8.pid | 0;
        case 9:
            return model.preference.p9.pid | 0;
        case 10:
            return model.preference.p10.pid | 0;
        default:
            return 0;
    }
}

export function init(token) {
    const defaultModel = new Model(true, empty(), PreferenceResponse_get_Default(), token, false, false, "", "", empty(), empty(), Project_get_Default(), 0);
    const initialLoad = () => PromiseBuilder__Run_212F1D4B(promise, PromiseBuilder__Delay_62FBFDE1(promise, () => {
        let decoder_1, decoder;
        const projectsUrl = "http://localhost:1234/projects";
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
                    const pr = PromiseBuilder__Run_212F1D4B_1(promise_1, PromiseBuilder__Delay_62FBFDE1_1(promise_1, () => (Helper_fetch(projectsUrl, properties_3).then((_arg) => {
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
            return [new Model(false, model.projects, model.preference, model.token, model.modalState, model.addProjectState, model.searchTitle, model.searchProfessor, model.selectedCategories, model.selectedStreams, model.selectedProject, model.selectedProjectRank), Cmd_none()];
        }
        case 2:
            return [model, Cmd_none()];
        case 3: {
            const project = msg.fields[0];
            return [new Model(model.loading, model.projects, model.preference, model.token, true, model.addProjectState, model.searchTitle, model.searchProfessor, model.selectedCategories, model.selectedStreams, project, model.selectedProjectRank), Cmd_none()];
        }
        case 4:
            return [new Model(model.loading, model.projects, model.preference, model.token, false, false, model.searchTitle, model.searchProfessor, model.selectedCategories, model.selectedStreams, model.selectedProject, 0), Cmd_none()];
        case 5: {
            const data = new AddPreferenceRequest(currentSelectedPreference(model), model.selectedProject.pid, model.selectedProjectRank);
            const addPreference = () => PromiseBuilder__Run_212F1D4B(promise, PromiseBuilder__Delay_62FBFDE1(promise, () => {
                let decoder;
                const addProjectUrl = "http://localhost:1234/add-project";
                const projectsUrl = "http://localhost:1234/projects";
                return ((decoder = PreferenceResponse_get_Decoder(), PromiseBuilder__Run_212F1D4B_1(promise_1, PromiseBuilder__Delay_62FBFDE1_1(promise_1, () => {
                    let data_3, caseStrategy_2, extra_2;
                    return ((data_3 = data, (caseStrategy_2 = void 0, (extra_2 = void 0, (() => {
                        let properties_4;
                        try {
                            const properties_3 = Helper_withProperties(void 0, (properties_4 = ofArray([new Types_RequestProperties(0, ["PUT"]), new Types_RequestProperties(1, [keyValueList(Helper_withContentTypeJson(data_3, singleton(new Types_HttpRequestHeaders(5, [`Bearer ${model.token}`]))), 0)])]), defaultArg(map((data_1_1) => {
                                let encoder;
                                return cons(new Types_RequestProperties(2, [(encoder = Auto_generateBoxedEncoderCached_437914C6(AddPreferenceRequest_$reflection(), caseStrategy_2, extra_2), toString(0, encoder(data_1_1)))]), properties_4);
                            }, data_3), properties_4)));
                            const pr = PromiseBuilder__Run_212F1D4B_1(promise_1, PromiseBuilder__Delay_62FBFDE1_1(promise_1, () => (Helper_fetch(addProjectUrl, properties_3).then((_arg) => {
                                let response_1, decoder_1_1, decode;
                                const response = _arg;
                                return ((response_1 = response, (decoder_1_1 = defaultArg(decoder, Auto_generateBoxedDecoderCached_Z6670B51(PreferenceResponse_$reflection(), unwrap(caseStrategy_2), unwrap(extra_2))), (decode = ((body_1) => fromString(uncurry2(decoder_1_1), body_1)), PromiseBuilder__Run_212F1D4B_1(promise_1, PromiseBuilder__Delay_62FBFDE1_1(promise_1, () => (((response_1.ok) ? PromiseBuilder__Run_212F1D4B_1(promise_1, PromiseBuilder__Delay_62FBFDE1_1(promise_1, () => (response_1.text().then((_arg_1) => {
                                    let matchValue, msg_1, value_1_1;
                                    const body_1_1 = _arg_1;
                                    return Promise.resolve((matchValue = decode(body_1_1), (matchValue.tag === 1) ? ((msg_1 = matchValue.fields[0], new FSharpResult$2(1, [new FetchError(1, [msg_1])]))) : ((value_1_1 = matchValue.fields[0], new FSharpResult$2(0, [value_1_1])))));
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
                })))).then((_arg_3) => {
                    let decoder_5, decoder_4;
                    const newPreference = _arg_3;
                    return ((decoder_5 = ((decoder_4 = Project_get_Decoder(), (path) => ((value_2) => list_1(uncurry2(decoder_4), path, value_2)))), PromiseBuilder__Run_212F1D4B_1(promise_1, PromiseBuilder__Delay_62FBFDE1_1(promise_1, () => {
                        let data_8, caseStrategy_10, extra_10;
                        return ((data_8 = void 0, (caseStrategy_10 = void 0, (extra_10 = void 0, (() => {
                            let properties_8;
                            try {
                                const properties_3_1 = Helper_withProperties(void 0, (properties_8 = ofArray([new Types_RequestProperties(0, ["GET"]), new Types_RequestProperties(1, [keyValueList(Helper_withContentTypeJson(data_8, singleton(new Types_HttpRequestHeaders(5, [`Bearer ${model.token}`]))), 0)])]), defaultArg(map((data_1_2) => {
                                    let encoder_1;
                                    return cons(new Types_RequestProperties(2, [(encoder_1 = Auto_generateBoxedEncoderCached_437914C6(obj_type, caseStrategy_10, extra_10), toString(0, encoder_1(data_1_2)))]), properties_8);
                                }, data_8), properties_8)));
                                const pr_1 = PromiseBuilder__Run_212F1D4B_1(promise_1, PromiseBuilder__Delay_62FBFDE1_1(promise_1, () => (Helper_fetch(projectsUrl, properties_3_1).then((_arg_4) => {
                                    let response_4, decoder_1_2, decode_1;
                                    const response_3 = _arg_4;
                                    return ((response_4 = response_3, (decoder_1_2 = defaultArg(decoder_5, Auto_generateBoxedDecoderCached_Z6670B51(list_type(Project_$reflection()), unwrap(caseStrategy_10), unwrap(extra_10))), (decode_1 = ((body_3) => fromString(uncurry2(decoder_1_2), body_3)), PromiseBuilder__Run_212F1D4B_1(promise_1, PromiseBuilder__Delay_62FBFDE1_1(promise_1, () => (((response_4.ok) ? PromiseBuilder__Run_212F1D4B_1(promise_1, PromiseBuilder__Delay_62FBFDE1_1(promise_1, () => (response_4.text().then((_arg_5) => {
                                        let matchValue_1, msg_2, value_1_2;
                                        const body_1_2 = _arg_5;
                                        return Promise.resolve((matchValue_1 = decode_1(body_1_2), (matchValue_1.tag === 1) ? ((msg_2 = matchValue_1.fields[0], new FSharpResult$2(1, [new FetchError(1, [msg_2])]))) : ((value_1_2 = matchValue_1.fields[0], new FSharpResult$2(0, [value_1_2])))));
                                    })))) : (Promise.resolve(new FSharpResult$2(1, [new FetchError(2, [response_4])])))).then((_arg_1_2) => {
                                        const result_2 = _arg_1_2;
                                        return Promise.resolve(result_2);
                                    }))))))));
                                }))));
                                return pr_1.catch((arg_8) => (new FSharpResult$2(1, [new FetchError(3, [arg_8])])));
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
                        const projects_1 = _arg_7;
                        return Promise.resolve(new InitalLoad(projects_1, newPreference));
                    });
                });
            }));
            return [new Model(true, model.projects, model.preference, model.token, false, false, model.searchTitle, model.searchProfessor, model.selectedCategories, model.selectedStreams, model.selectedProject, 0), Cmd_OfPromise_either(addPreference, void 0, (arg_9) => (new Msg(0, [arg_9])), (arg_10) => (new Msg(1, [arg_10])))];
        }
        case 6:
            return [new Model(model.loading, model.projects, model.preference, model.token, model.modalState, true, model.searchTitle, model.searchProfessor, model.selectedCategories, model.selectedStreams, model.selectedProject, model.selectedProjectRank), Cmd_none()];
        case 7:
            return [new Model(model.loading, model.projects, model.preference, model.token, model.modalState, false, model.searchTitle, model.searchProfessor, model.selectedCategories, model.selectedStreams, model.selectedProject, 0), Cmd_none()];
        case 8: {
            const rank = msg.fields[0] | 0;
            return [new Model(model.loading, model.projects, model.preference, model.token, model.modalState, model.addProjectState, model.searchTitle, model.searchProfessor, model.selectedCategories, model.selectedStreams, model.selectedProject, rank), Cmd_none()];
        }
        case 9: {
            const title = msg.fields[0];
            return [new Model(model.loading, model.projects, model.preference, model.token, model.modalState, model.addProjectState, title, model.searchProfessor, model.selectedCategories, model.selectedStreams, model.selectedProject, model.selectedProjectRank), singleton((dispatch) => {
                dispatch(new Msg(13, []));
            })];
        }
        case 10: {
            const title_1 = msg.fields[0];
            return [new Model(model.loading, model.projects, model.preference, model.token, model.modalState, model.addProjectState, model.searchTitle, title_1, model.selectedCategories, model.selectedStreams, model.selectedProject, model.selectedProjectRank), singleton((dispatch_1) => {
                dispatch_1(new Msg(13, []));
            })];
        }
        case 11: {
            const tag = msg.fields[0];
            const sc = model.selectedCategories;
            if (exists((c) => (c === tag), sc)) {
                return [new Model(model.loading, model.projects, model.preference, model.token, model.modalState, model.addProjectState, model.searchTitle, model.searchProfessor, filter_1((c_1) => (c_1 !== tag), sc), model.selectedStreams, model.selectedProject, model.selectedProjectRank), singleton((dispatch_2) => {
                    dispatch_2(new Msg(13, []));
                })];
            }
            else {
                return [new Model(model.loading, model.projects, model.preference, model.token, model.modalState, model.addProjectState, model.searchTitle, model.searchProfessor, append(sc, singleton(tag)), model.selectedStreams, model.selectedProject, model.selectedProjectRank), singleton((dispatch_3) => {
                    dispatch_3(new Msg(13, []));
                })];
            }
        }
        case 12: {
            const tag_1 = msg.fields[0];
            const ss = model.selectedStreams;
            if (exists((c_2) => (c_2 === tag_1), ss)) {
                return [new Model(model.loading, model.projects, model.preference, model.token, model.modalState, model.addProjectState, model.searchTitle, model.searchProfessor, model.selectedCategories, filter_1((c_3) => (c_3 !== tag_1), ss), model.selectedProject, model.selectedProjectRank), singleton((dispatch_4) => {
                    dispatch_4(new Msg(13, []));
                })];
            }
            else {
                return [new Model(model.loading, model.projects, model.preference, model.token, model.modalState, model.addProjectState, model.searchTitle, model.searchProfessor, model.selectedCategories, append(ss, singleton(tag_1)), model.selectedProject, model.selectedProjectRank), singleton((dispatch_5) => {
                    dispatch_5(new Msg(13, []));
                })];
            }
        }
        case 13: {
            const data_11 = new SearchRequest(model.searchTitle, model.searchProfessor, model.selectedCategories, model.selectedStreams);
            const searchRequest = () => PromiseBuilder__Run_212F1D4B(promise, PromiseBuilder__Delay_62FBFDE1(promise, () => {
                let decoder_10, decoder_9;
                const url_6 = "http://localhost:1234/search-projects";
                return ((decoder_10 = ((decoder_9 = Project_get_Decoder(), (path_1) => ((value_5) => list_1(uncurry2(decoder_9), path_1, value_5)))), PromiseBuilder__Run_212F1D4B_1(promise_1, PromiseBuilder__Delay_62FBFDE1_1(promise_1, () => {
                    let data_14, caseStrategy_18, extra_18;
                    return ((data_14 = data_11, (caseStrategy_18 = void 0, (extra_18 = void 0, (() => {
                        let properties_12;
                        try {
                            const properties_3_2 = Helper_withProperties(void 0, (properties_12 = ofArray([new Types_RequestProperties(0, ["POST"]), new Types_RequestProperties(1, [keyValueList(Helper_withContentTypeJson(data_14, singleton(new Types_HttpRequestHeaders(5, [`Bearer ${model.token}`]))), 0)])]), defaultArg(map((data_1_3) => {
                                let encoder_2;
                                return cons(new Types_RequestProperties(2, [(encoder_2 = Auto_generateBoxedEncoderCached_437914C6(SearchRequest_$reflection(), caseStrategy_18, extra_18), toString(0, encoder_2(data_1_3)))]), properties_12);
                            }, data_14), properties_12)));
                            const pr_2 = PromiseBuilder__Run_212F1D4B_1(promise_1, PromiseBuilder__Delay_62FBFDE1_1(promise_1, () => (Helper_fetch(url_6, properties_3_2).then((_arg_8) => {
                                let response_7, decoder_1_3, decode_2;
                                const response_6 = _arg_8;
                                return ((response_7 = response_6, (decoder_1_3 = defaultArg(decoder_10, Auto_generateBoxedDecoderCached_Z6670B51(list_type(Project_$reflection()), unwrap(caseStrategy_18), unwrap(extra_18))), (decode_2 = ((body_5) => fromString(uncurry2(decoder_1_3), body_5)), PromiseBuilder__Run_212F1D4B_1(promise_1, PromiseBuilder__Delay_62FBFDE1_1(promise_1, () => (((response_7.ok) ? PromiseBuilder__Run_212F1D4B_1(promise_1, PromiseBuilder__Delay_62FBFDE1_1(promise_1, () => (response_7.text().then((_arg_9) => {
                                    let matchValue_4, msg_9, value_1_3;
                                    const body_1_3 = _arg_9;
                                    return Promise.resolve((matchValue_4 = decode_2(body_1_3), (matchValue_4.tag === 1) ? ((msg_9 = matchValue_4.fields[0], new FSharpResult$2(1, [new FetchError(1, [msg_9])]))) : ((value_1_3 = matchValue_4.fields[0], new FSharpResult$2(0, [value_1_3])))));
                                })))) : (Promise.resolve(new FSharpResult$2(1, [new FetchError(2, [response_7])])))).then((_arg_1_3) => {
                                    const result_4 = _arg_1_3;
                                    return Promise.resolve(result_4);
                                }))))))));
                            }))));
                            return pr_2.catch((arg_14) => (new FSharpResult$2(1, [new FetchError(3, [arg_14])])));
                        }
                        catch (exn_2) {
                            return PromiseBuilder__Run_212F1D4B_1(promise_1, PromiseBuilder__Delay_62FBFDE1_1(promise_1, () => (Promise.resolve(new FSharpResult$2(1, [new FetchError(0, [exn_2])])))));
                        }
                    })())))).then((_arg_10) => {
                        const result_5 = _arg_10;
                        let response_1_3;
                        if (result_5.tag === 1) {
                            const error_2 = result_5.fields[0];
                            throw new Error(Helper_message(error_2));
                        }
                        else {
                            const response_8 = result_5.fields[0];
                            response_1_3 = response_8;
                        }
                        return Promise.resolve(response_1_3);
                    });
                }))));
            }));
            return [model, Cmd_OfPromise_either(searchRequest, void 0, (arg_15) => (new Msg(14, [arg_15])), (arg_16) => (new Msg(1, [arg_16])))];
        }
        case 14: {
            const projects_2 = msg.fields[0];
            return [new Model(model.loading, projects_2, model.preference, model.token, model.modalState, model.addProjectState, model.searchTitle, model.searchProfessor, model.selectedCategories, model.selectedStreams, model.selectedProject, model.selectedProjectRank), Cmd_none()];
        }
        default: {
            const initialLoad = msg.fields[0];
            return [new Model(false, initialLoad.projects, initialLoad.preference, model.token, model.modalState, model.addProjectState, model.searchTitle, model.searchProfessor, model.selectedCategories, model.selectedStreams, model.selectedProject, model.selectedProjectRank), Cmd_none()];
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

export const TileCss = ofArray([TurquoiseBackgroundRGBA(0.7), ["borderStyle", "solid"], ["borderColor", "#48D1CC"], ["padding", 1.5 + "%"]]);

export function TagFilter(dispatch, model, filterType, filter) {
    return createElement("span", createObj(Helpers_combineClasses("tag", toList(delay(() => append_1(singleton_1(["className", join(" ", ["filter-tag"])]), delay(() => append_1(singleton_1(["children", getFormattedCategory(filter)]), delay(() => append_1(singleton_1(["style", {
        marginBottom: 10,
        marginRight: 10,
        cursor: "pointer",
    }]), delay(() => ((filterType.tag === 1) ? append_1(singleton_1(["onClick", (_arg_1) => {
        dispatch(new Msg(12, [filter]));
    }]), delay(() => (exists((c_1) => (c_1 === filter), model.selectedStreams) ? singleton_1(["className", "is-info"]) : empty_1()))) : append_1(singleton_1(["onClick", (_arg) => {
        dispatch(new Msg(11, [filter]));
    }]), delay(() => (exists((c) => (c === filter), model.selectedCategories) ? singleton_1(["className", "is-info"]) : empty_1())))))))))))))));
}

export function SearchFilters(dispatch, model) {
    return toList(delay(() => append_1(singleton_1(ProjectInput(dispatch)), delay(() => append_1(singleton_1(ProfessorInput(dispatch)), delay(() => append_1(singleton_1(createElement("label", createObj(Helpers_combineClasses("label", singleton(["children", "Relevant Project Categories"]))))), delay(() => append_1(map_1((c) => TagFilter(dispatch, model, new FilterType(0, []), c), categories_1), delay(() => append_1(singleton_1(createElement("label", createObj(Helpers_combineClasses("label", singleton(["children", "Stream"]))))), delay(() => map_1((s) => TagFilter(dispatch, model, new FilterType(1, []), s), streams)))))))))))));
}

export function Tag(model, filter) {
    return createElement("span", createObj(Helpers_combineClasses("tag", toList(delay(() => append_1(singleton_1(["children", getFormattedCategory(filter)]), delay(() => append_1(singleton_1(["style", {
        marginBottom: 10,
        marginRight: 10,
    }]), delay(() => (exists((c) => (c === filter), model.selectedCategories) ? singleton_1(["className", "is-info"]) : empty_1()))))))))));
}

export function TableCategories(model, categories) {
    return map_2((filter) => Tag(model, filter), ofArray(categories.split(",")));
}

export function TableRow(dispatch, model, projectInfo) {
    let elems, children;
    return createElement("tr", createObj(ofArray([["className", join(" ", ["table-row"])], ["onClick", (_arg) => {
        dispatch(new Msg(3, [projectInfo]));
    }], ["style", {
        cursor: "pointer",
    }], (elems = [createElement("td", {
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
    }), createElement("td", {
        children: projectInfo.r6,
    }), createElement("td", {
        children: projectInfo.r7,
    }), createElement("td", {
        children: projectInfo.r8,
    }), createElement("td", {
        children: projectInfo.r9,
    }), createElement("td", {
        children: projectInfo.r10,
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

export function modalProjectInfoMedia(sp) {
    let elems_3, elms, elems, elms_1;
    return createElement("article", createObj(Helpers_combineClasses("media", ofArray([["style", {
        marginBottom: 40,
    }], (elems_3 = [(elms = singleton(createElement("figure", createObj(Helpers_combineClasses("image", ofArray([["className", "is-48x48"], (elems = [createElement("img", {
        src: "https://bulma.io/assets/images/placeholders/96x96.png",
    })], ["children", Interop_reactApi.Children.toArray(Array.from(elems))])]))))), createElement("div", {
        className: "media-left",
        children: Interop_reactApi.Children.toArray(Array.from(elms)),
    })), (elms_1 = ofArray([createElement("h1", createObj(Helpers_combineClasses("title", ofArray([["className", join(" ", ["is-4"])], ["children", sp.supName]])))), createElement("h2", createObj(Helpers_combineClasses("subtitle", ofArray([["className", join(" ", ["is-6"])], ["children", "example123@ic.ac.uk"]]))))]), createElement("div", {
        className: "media-content",
        children: Interop_reactApi.Children.toArray(Array.from(elms_1)),
    }))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_3))])]))));
}

export function modalProjectInfoBody(model, sp) {
    let elms_1, elems_1, elems, elms;
    const elms_2 = ofArray([(elms_1 = ofArray([createElement("div", createObj(Helpers_combineClasses("column", ofArray([["className", join(" ", ["is-4"])], (elems_1 = [createElement("h3", {
        children: ["Project Rankings"],
    }), createElement("ol", createObj(ofArray([["style", {
        fontWeight: 700,
    }], (elems = [createElement("li", {
        key: "1",
        children: int32ToString(sp.r1),
    }), createElement("li", {
        key: "2",
        children: int32ToString(sp.r2),
    }), createElement("li", {
        key: "3",
        children: int32ToString(sp.r3),
    }), createElement("li", {
        key: "4",
        children: int32ToString(sp.r4),
    }), createElement("li", {
        key: "5",
        children: int32ToString(sp.r5),
    }), createElement("li", {
        key: "6",
        children: int32ToString(sp.r6),
    }), createElement("li", {
        key: "7",
        children: int32ToString(sp.r7),
    }), createElement("li", {
        key: "8",
        children: int32ToString(sp.r8),
    }), createElement("li", {
        key: "9",
        children: int32ToString(sp.r9),
    }), createElement("li", {
        key: "10",
        children: int32ToString(sp.r10),
    })], ["children", Interop_reactApi.Children.toArray(Array.from(elems))])])))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_1))])])))), (elms = toList(delay(() => append_1(singleton_1(createElement("h3", {
        children: ["Project Categories"],
    })), delay(() => append_1(map_1((c) => c, TableCategories(model, sp.categories)), delay(() => append_1(singleton_1(createElement("h3", {
        children: ["Student Requirements"],
    })), delay(() => singleton_1(createElement("p", {
        children: [sp.requirements],
    })))))))))), createElement("div", {
        className: "column",
        children: Interop_reactApi.Children.toArray(Array.from(elms)),
    }))]), createElement("div", {
        className: "columns",
        children: Interop_reactApi.Children.toArray(Array.from(elms_1)),
    })), createElement("h3", {
        children: ["Desired Skills"],
    }), createElement("p", {
        children: [sp.skills],
    }), createElement("h3", {
        children: ["Project Description"],
    }), createElement("p", {
        children: [sp.descr],
    }), createElement("h3", {
        children: ["Meeting Dates"],
    }), createElement("p", {
        children: [sp.meetings],
    })]);
    return createElement("div", {
        className: "content",
        children: Interop_reactApi.Children.toArray(Array.from(elms_2)),
    });
}

export function modalProjectInfo(model, dispatch) {
    let elms, elems_1, elms_2, elms_1;
    const sp = model.selectedProject;
    const elms_3 = ofArray([(elms = ofArray([createElement("p", {
        className: "modal-card-title",
        children: (("#" + int32ToString(sp.pid)) + " ") + sp.title,
    }), createElement("button", createObj(Helpers_combineClasses("modal-close", ofArray([["className", join(" ", ["is-large"])], ["onClick", (_arg) => {
        dispatch(new Msg(4, []));
    }]]))))]), createElement("header", {
        className: "modal-card-head",
        children: Interop_reactApi.Children.toArray(Array.from(elms)),
    })), createElement("section", createObj(Helpers_combineClasses("modal-card-body", ofArray([["className", join(" ", ["scrollbar"])], (elems_1 = [modalProjectInfoMedia(sp), modalProjectInfoBody(model, sp)], ["children", Interop_reactApi.Children.toArray(Array.from(elems_1))])])))), (elms_2 = singleton((elms_1 = ofArray([createElement("button", createObj(Helpers_combineClasses("button", toList(delay(() => (model.preference.doc ? append_1(singleton_1(["children", "You\'ve entered DOC allocation"]), delay(() => append_1(singleton_1(["disabled", true]), delay(() => singleton_1(["className", "is-warning"]))))) : append_1(singleton_1(["className", "is-success"]), delay(() => append_1(singleton_1(["children", "Add Project"]), delay(() => singleton_1(["onClick", (_arg_1) => {
        dispatch(new Msg(6, []));
    }]))))))))))), createElement("button", createObj(Helpers_combineClasses("button", ofArray([["children", "Close Project"], ["onClick", (_arg_2) => {
        dispatch(new Msg(4, []));
    }]]))))]), createElement("div", {
        className: "buttons",
        children: Interop_reactApi.Children.toArray(Array.from(elms_1)),
    }))), createElement("footer", {
        className: "modal-card-foot",
        children: Interop_reactApi.Children.toArray(Array.from(elms_2)),
    }))]);
    return createElement("div", {
        className: "modal-card",
        children: Interop_reactApi.Children.toArray(Array.from(elms_3)),
    });
}

export function PreferenceRow(model, dispatch, _arg1_, _arg1__1) {
    const _arg = [_arg1_, _arg1__1];
    const rank = _arg[1] | 0;
    const projectInfo = _arg[0];
    return createElement("tr", createObj(toList(delay(() => append_1(singleton_1(["className", join(" ", ["table-row"])]), delay(() => append_1(singleton_1(["onClick", (_arg_1) => {
        dispatch(new Msg(8, [rank]));
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
            children: model.selectedProject.supName,
        })], ["children", Interop_reactApi.Children.toArray(Array.from(elems))])) : ((projectInfo.pid === 0) ? singleton_1((elems_1 = [createElement("td", {
            children: rank,
        }), createElement("td", {}), createElement("td", {})], ["children", Interop_reactApi.Children.toArray(Array.from(elems_1))])) : singleton_1((elems_2 = [createElement("td", {
            children: rank,
        }), createElement("td", {
            children: projectInfo.title,
        }), createElement("td", {
            children: projectInfo.supName,
        })], ["children", Interop_reactApi.Children.toArray(Array.from(elems_2))])));
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
    let elms, elems_2, elms_1, value_14, elms_3, elms_2;
    const sp = model.selectedProject;
    const elms_4 = ofArray([(elms = ofArray([createElement("p", {
        className: "modal-card-title",
        children: (("#" + int32ToString(sp.pid)) + " ") + sp.title,
    }), createElement("button", createObj(Helpers_combineClasses("modal-close", ofArray([["className", join(" ", ["is-large"])], ["onClick", (_arg) => {
        dispatch(new Msg(4, []));
    }]]))))]), createElement("header", {
        className: "modal-card-head",
        children: Interop_reactApi.Children.toArray(Array.from(elms)),
    })), createElement("section", createObj(Helpers_combineClasses("modal-card-body", ofArray([["className", join(" ", ["scrollbar"])], (elems_2 = [(elms_1 = ofArray([createElement("h3", {
        children: ["Add Project"],
    }), createElement("p", {
        children: ["You are about to add the following project to your preferences:"],
    }), createElement("blockquote", {
        children: [("\'" + sp.title) + "\'"],
    }), (value_14 = "Below in your preferences, please select a preference rank \r\n                            of where you would like to replace or place the project.", createElement("p", {
        children: [value_14],
    })), createElement("h3", {
        children: ["Your Preferences"],
    }), PreferenceTable(model, dispatch)]), createElement("div", {
        className: "content",
        children: Interop_reactApi.Children.toArray(Array.from(elms_1)),
    }))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_2))])])))), (elms_3 = singleton((elms_2 = ofArray([createElement("button", createObj(Helpers_combineClasses("button", toList(delay(() => append_1(singleton_1(["children", "Save Changes"]), delay(() => ((model.selectedProjectRank === 0) ? singleton_1(["disabled", true]) : append_1(singleton_1(["onClick", (_arg_1) => {
        dispatch(new Msg(5, []));
    }]), delay(() => singleton_1(["className", "is-success"]))))))))))), createElement("button", createObj(Helpers_combineClasses("button", ofArray([["children", "Go Back"], ["onClick", (_arg_2) => {
        dispatch(new Msg(7, []));
    }]]))))]), createElement("div", {
        className: "buttons",
        children: Interop_reactApi.Children.toArray(Array.from(elms_2)),
    }))), createElement("footer", {
        className: "modal-card-foot",
        children: Interop_reactApi.Children.toArray(Array.from(elms_3)),
    }))]);
    return createElement("div", {
        className: "modal-card",
        children: Interop_reactApi.Children.toArray(Array.from(elms_4)),
    });
}

export function view(model, dispatch) {
    let elems_4;
    return createElement("body", createObj(ofArray([["style", {
        height: 100 + "vh",
        position: "relative",
    }], (elems_4 = toList(delay(() => append_1(model.loading ? singleton_1(LoadingScreen) : empty_1(), delay(() => append_1(singleton_1(TurquoiseBackground(0.5)), delay(() => append_1(singleton_1(ImageBackground), delay(() => append_1(singleton_1(NavBar(dispatch)), delay(() => {
        let elems_3, elems, elems_1;
        return singleton_1(createElement("div", createObj(Helpers_combineClasses("columns", ofArray([["style", {
            height: 90 + "vh",
            margin: 1 + "%",
        }], (elems_3 = [createElement("div", createObj(Helpers_combineClasses("column", ofArray([["style", createObj(append(singleton(["overflowY", "scroll"]), TileCss))], ["className", join(" ", ["is-3", "scrollbar"])], (elems = SearchFilters(dispatch, model), ["children", Interop_reactApi.Children.toArray(Array.from(elems))])])))), createElement("div", createObj(Helpers_combineClasses("column", singleton(["className", join(" ", ["is-0"])])))), createElement("div", createObj(Helpers_combineClasses("column", ofArray([["style", createObj(TileCss)], (elems_1 = [createElement("label", createObj(Helpers_combineClasses("label", singleton(["children", "Projects"])))), ProjectTable(model, dispatch)], ["children", Interop_reactApi.Children.toArray(Array.from(elems_1))])])))), createElement("div", createObj(Helpers_combineClasses("modal", toList(delay(() => append_1(model.modalState ? singleton_1(["className", "is-active"]) : empty_1(), delay(() => append_1(singleton_1(["onKeyUp", (ev_1) => {
            PropHelpers_createOnKey(key_escape, (ev) => {
                dispatch(new Msg(4, []));
            }, ev_1);
        }]), delay(() => append_1(singleton_1(["className", join(" ", ["scrollbar", "is-large"])]), delay(() => {
            let elems_2;
            return singleton_1((elems_2 = toList(delay(() => append_1(singleton_1(createElement("div", createObj(Helpers_combineClasses("modal-background", empty())))), delay(() => (model.addProjectState ? singleton_1(modalAddProject(model, dispatch)) : singleton_1(modalProjectInfo(model, dispatch))))))), ["children", Interop_reactApi.Children.toArray(Array.from(elems_2))]));
        })))))))))))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_3))])])))));
    })))))))))), ["children", Interop_reactApi.Children.toArray(Array.from(elems_4))])])));
}

//# sourceMappingURL=Projects.fs.js.map
