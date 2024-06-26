import { append, filter, exists, cons, ofArray, singleton, empty } from "../../fable_modules/fable-library.4.1.4/List.js";
import { SearchRequest_$reflection, SearchRequest, AddPreferenceRequest_$reflection, AddPreferenceRequest, PreferenceResponse_$reflection, PreferenceResponse_get_Decoder, Project_$reflection, Project_get_Decoder, Project_get_Default, PreferenceResponse_get_Default } from "../../../../Shared/Shared.fs.js";
import { Msg, InitalLoad, Model } from "./ProjectsTypes.fs.js";
import { PromiseBuilder__Delay_62FBFDE1, PromiseBuilder__Run_212F1D4B } from "../../fable_modules/Fable.Promise.3.2.0/Promise.fs.js";
import { promise } from "../../fable_modules/Fable.Promise.3.2.0/PromiseImpl.fs.js";
import { list } from "../../fable_modules/Thoth.Json.10.2.0/Decode.fs.js";
import { createObj, uncurry2 } from "../../fable_modules/fable-library.4.1.4/Util.js";
import { PromiseBuilder__Delay_62FBFDE1 as PromiseBuilder__Delay_62FBFDE1_1, PromiseBuilder__Run_212F1D4B as PromiseBuilder__Run_212F1D4B_1 } from "../../fable_modules/Thoth.Fetch.3.0.1/../Fable.Promise.3.2.0/Promise.fs.js";
import { promise as promise_1 } from "../../fable_modules/Thoth.Fetch.3.0.1/../Fable.Promise.3.2.0/PromiseImpl.fs.js";
import { FetchError } from "../../fable_modules/Thoth.Fetch.3.0.1/Fetch.fs.js";
import { FSharpResult$2 } from "../../fable_modules/fable-library.4.1.4/Choice.js";
import { Helper_message, Helper_fetch, Helper_withContentTypeJson, Helper_withProperties } from "../../fable_modules/Thoth.Fetch.3.0.1/./Fetch.fs.js";
import { Types_HttpRequestHeaders, Types_RequestProperties } from "../../fable_modules/Fable.Fetch.2.7.0/Fetch.fs.js";
import { keyValueList } from "../../fable_modules/fable-library.4.1.4/MapUtil.js";
import { unwrap, map, defaultArg } from "../../fable_modules/fable-library.4.1.4/Option.js";
import { Auto_generateBoxedEncoderCached_437914C6 } from "../../fable_modules/Thoth.Json.10.2.0/./Encode.fs.js";
import { list_type, obj_type } from "../../fable_modules/fable-library.4.1.4/Reflection.js";
import { toString } from "../../fable_modules/Thoth.Fetch.3.0.1/../Thoth.Json.10.2.0/Encode.fs.js";
import { Auto_generateBoxedDecoderCached_Z6670B51 } from "../../fable_modules/Thoth.Json.10.2.0/./Decode.fs.js";
import { fromString } from "../../fable_modules/Thoth.Fetch.3.0.1/../Thoth.Json.10.2.0/Decode.fs.js";
import { Cmd_none, Cmd_OfPromise_either } from "../../fable_modules/Fable.Elmish.4.1.0/cmd.fs.js";
import { join, printf, toConsole } from "../../fable_modules/fable-library.4.1.4/String.js";
import { currentSelectedPreference } from "./ProjectsHelpers.fs.js";
import { toString as toString_1 } from "../../fable_modules/fable-library.4.1.4/Types.js";
import { createElement } from "react";
import { empty as empty_1, singleton as singleton_1, append as append_1, delay, toList } from "../../fable_modules/fable-library.4.1.4/Seq.js";
import { ImageBackground, TurquoiseBackground, LoadingScreen } from "../../Common.fs.js";
import { NavBar } from "./ProjectsNavBar.fs.js";
import { Helpers_combineClasses } from "../../fable_modules/Feliz.Bulma.3.0.0/./ElementBuilders.fs.js";
import { SearchFilters, TileCss } from "./ProjectsSearch.fs.js";
import { Interop_reactApi } from "../../fable_modules/Feliz.2.7.0/./Interop.fs.js";
import { ProjectTable } from "./ProjectsTables.fs.js";
import { PropHelpers_createOnKey } from "../../fable_modules/Feliz.2.7.0/./Properties.fs.js";
import { key_escape } from "../../fable_modules/Feliz.2.7.0/Key.fs.js";
import { ModalProjectInfo, ModalAddProject } from "./ProjectsModals.fs.js";

export function init(token) {
    const defaultModel = new Model(true, empty(), PreferenceResponse_get_Default(), token, false, false, "", "", empty(), empty(), Project_get_Default(), 0, "top");
    const initialLoad = () => PromiseBuilder__Run_212F1D4B(promise, PromiseBuilder__Delay_62FBFDE1(promise, () => {
        let decoder_1, decoder;
        const projectsUrl = `${"http://localhost:1234"}/projects`;
        const preferenceUrl = `${"http://localhost:1234"}/preferences`;
        return ((decoder_1 = ((decoder = Project_get_Decoder(), (path) => ((value) => list(uncurry2(decoder), path, value)))), PromiseBuilder__Run_212F1D4B_1(promise_1, PromiseBuilder__Delay_62FBFDE1_1(promise_1, () => {
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
            return [new Model(false, model.projects, model.preference, model.token, model.modalState, model.addProjectState, model.searchTitle, model.searchProfessor, model.selectedCategories, model.selectedStreams, model.selectedProject, model.selectedProjectIndex, model.topOrBottom5), Cmd_none()];
        }
        case 2:
            return [model, Cmd_none()];
        case 3: {
            const project = msg.fields[0];
            return [new Model(model.loading, model.projects, model.preference, model.token, true, model.addProjectState, model.searchTitle, model.searchProfessor, model.selectedCategories, model.selectedStreams, project, model.selectedProjectIndex, model.topOrBottom5), Cmd_none()];
        }
        case 4:
            return [new Model(model.loading, model.projects, model.preference, model.token, false, false, model.searchTitle, model.searchProfessor, model.selectedCategories, model.selectedStreams, model.selectedProject, 0, model.topOrBottom5), Cmd_none()];
        case 5: {
            const data = new AddPreferenceRequest(currentSelectedPreference(model), model.selectedProject.pid, model.selectedProjectIndex);
            const addPreference = () => PromiseBuilder__Run_212F1D4B(promise, PromiseBuilder__Delay_62FBFDE1(promise, () => {
                let decoder;
                const addProjectUrl = `${"http://localhost:1234"}/add-project`;
                const projectsUrl = `${"http://localhost:1234"}/projects`;
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
                    return ((decoder_5 = ((decoder_4 = Project_get_Decoder(), (path) => ((value_2) => list(uncurry2(decoder_4), path, value_2)))), PromiseBuilder__Run_212F1D4B_1(promise_1, PromiseBuilder__Delay_62FBFDE1_1(promise_1, () => {
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
            return [new Model(true, model.projects, model.preference, model.token, false, false, model.searchTitle, model.searchProfessor, model.selectedCategories, model.selectedStreams, model.selectedProject, 0, model.topOrBottom5), Cmd_OfPromise_either(addPreference, void 0, (arg_9) => (new Msg(0, [arg_9])), (arg_10) => (new Msg(1, [arg_10])))];
        }
        case 6:
            return [new Model(model.loading, model.projects, model.preference, model.token, model.modalState, true, model.searchTitle, model.searchProfessor, model.selectedCategories, model.selectedStreams, model.selectedProject, model.selectedProjectIndex, model.topOrBottom5), Cmd_none()];
        case 7:
            return [new Model(model.loading, model.projects, model.preference, model.token, model.modalState, false, model.searchTitle, model.searchProfessor, model.selectedCategories, model.selectedStreams, model.selectedProject, 0, model.topOrBottom5), Cmd_none()];
        case 8: {
            const index = msg.fields[0] | 0;
            return [new Model(model.loading, model.projects, model.preference, model.token, model.modalState, model.addProjectState, model.searchTitle, model.searchProfessor, model.selectedCategories, model.selectedStreams, model.selectedProject, index, model.topOrBottom5), Cmd_none()];
        }
        case 9: {
            const title = msg.fields[0];
            return [new Model(model.loading, model.projects, model.preference, model.token, model.modalState, model.addProjectState, title, model.searchProfessor, model.selectedCategories, model.selectedStreams, model.selectedProject, model.selectedProjectIndex, model.topOrBottom5), singleton((dispatch) => {
                dispatch(new Msg(14, []));
            })];
        }
        case 10: {
            const title_1 = msg.fields[0];
            return [new Model(model.loading, model.projects, model.preference, model.token, model.modalState, model.addProjectState, model.searchTitle, title_1, model.selectedCategories, model.selectedStreams, model.selectedProject, model.selectedProjectIndex, model.topOrBottom5), singleton((dispatch_1) => {
                dispatch_1(new Msg(14, []));
            })];
        }
        case 11: {
            const tag = msg.fields[0];
            const sc = model.selectedCategories;
            if (exists((c) => (c === tag), sc)) {
                return [new Model(model.loading, model.projects, model.preference, model.token, model.modalState, model.addProjectState, model.searchTitle, model.searchProfessor, filter((c_1) => (c_1 !== tag), sc), model.selectedStreams, model.selectedProject, model.selectedProjectIndex, model.topOrBottom5), singleton((dispatch_2) => {
                    dispatch_2(new Msg(14, []));
                })];
            }
            else {
                return [new Model(model.loading, model.projects, model.preference, model.token, model.modalState, model.addProjectState, model.searchTitle, model.searchProfessor, append(sc, singleton(tag)), model.selectedStreams, model.selectedProject, model.selectedProjectIndex, model.topOrBottom5), singleton((dispatch_3) => {
                    dispatch_3(new Msg(14, []));
                })];
            }
        }
        case 12: {
            const tag_1 = msg.fields[0];
            const ss = model.selectedStreams;
            if (exists((c_2) => (c_2 === tag_1), ss)) {
                return [new Model(model.loading, model.projects, model.preference, model.token, model.modalState, model.addProjectState, model.searchTitle, model.searchProfessor, model.selectedCategories, filter((c_3) => (c_3 !== tag_1), ss), model.selectedProject, model.selectedProjectIndex, model.topOrBottom5), singleton((dispatch_4) => {
                    dispatch_4(new Msg(14, []));
                })];
            }
            else {
                return [new Model(model.loading, model.projects, model.preference, model.token, model.modalState, model.addProjectState, model.searchTitle, model.searchProfessor, model.selectedCategories, append(ss, singleton(tag_1)), model.selectedProject, model.selectedProjectIndex, model.topOrBottom5), singleton((dispatch_5) => {
                    dispatch_5(new Msg(14, []));
                })];
            }
        }
        case 13: {
            const ev = msg.fields[0];
            return [new Model(model.loading, model.projects, model.preference, model.token, model.modalState, model.addProjectState, model.searchTitle, model.searchProfessor, model.selectedCategories, model.selectedStreams, model.selectedProject, model.selectedProjectIndex, toString_1(ev.target.value)), Cmd_none()];
        }
        case 14: {
            const data_11 = new SearchRequest(model.searchTitle, model.searchProfessor, model.selectedCategories, model.selectedStreams);
            const searchRequest = () => PromiseBuilder__Run_212F1D4B(promise, PromiseBuilder__Delay_62FBFDE1(promise, () => {
                let decoder_10, decoder_9;
                const url_6 = `${"http://localhost:1234"}/search-projects`;
                return ((decoder_10 = ((decoder_9 = Project_get_Decoder(), (path_1) => ((value_6) => list(uncurry2(decoder_9), path_1, value_6)))), PromiseBuilder__Run_212F1D4B_1(promise_1, PromiseBuilder__Delay_62FBFDE1_1(promise_1, () => {
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
            return [model, Cmd_OfPromise_either(searchRequest, void 0, (arg_15) => (new Msg(15, [arg_15])), (arg_16) => (new Msg(1, [arg_16])))];
        }
        case 15: {
            const projects_2 = msg.fields[0];
            return [new Model(model.loading, projects_2, model.preference, model.token, model.modalState, model.addProjectState, model.searchTitle, model.searchProfessor, model.selectedCategories, model.selectedStreams, model.selectedProject, model.selectedProjectIndex, model.topOrBottom5), Cmd_none()];
        }
        default: {
            const initialLoad = msg.fields[0];
            return [new Model(false, initialLoad.projects, initialLoad.preference, model.token, model.modalState, model.addProjectState, model.searchTitle, model.searchProfessor, model.selectedCategories, model.selectedStreams, model.selectedProject, model.selectedProjectIndex, model.topOrBottom5), Cmd_none()];
        }
    }
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
            return singleton_1((elems_2 = toList(delay(() => append_1(singleton_1(createElement("div", createObj(Helpers_combineClasses("modal-background", empty())))), delay(() => (model.addProjectState ? singleton_1(ModalAddProject(model, dispatch)) : singleton_1(ModalProjectInfo(model, dispatch))))))), ["children", Interop_reactApi.Children.toArray(Array.from(elems_2))]));
        })))))))))))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_3))])])))));
    })))))))))), ["children", Interop_reactApi.Children.toArray(Array.from(elems_4))])])));
}

//# sourceMappingURL=Projects.fs.js.map
