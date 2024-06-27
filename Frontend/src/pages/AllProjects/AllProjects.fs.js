import { append as append_1, cons, ofArray, singleton, empty } from "../../fable_modules/fable-library.4.1.4/List.js";
import { SearchRequest_$reflection, SearchRequest, Project_$reflection, Project_get_Decoder, Project_get_Default, PreferenceResponse_get_Default } from "../../../../Shared/Shared.fs.js";
import { Msg, Model } from "./AllProjectsTypes.fs.js";
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
import { createElement } from "react";
import { empty as empty_1, singleton as singleton_1, append, delay, toList } from "../../fable_modules/fable-library.4.1.4/Seq.js";
import { TileCss, ImageBackground, TurquoiseBackground, LoadingScreen } from "../../Common.fs.js";
import { NavBar } from "./AllProjectsNavBar.fs.js";
import { Helpers_combineClasses } from "../../fable_modules/Feliz.Bulma.3.0.0/./ElementBuilders.fs.js";
import { SearchFilters } from "./AllProjectsSearch.fs.js";
import { Interop_reactApi } from "../../fable_modules/Feliz.2.7.0/./Interop.fs.js";
import { ProjectTable } from "./AllProjectsTables.fs.js";
import { PropHelpers_createOnKey } from "../../fable_modules/Feliz.2.7.0/./Properties.fs.js";
import { key_escape } from "../../fable_modules/Feliz.2.7.0/Key.fs.js";
import { ModalProjectInfo } from "./AllProjectsModals.fs.js";

export function init(token) {
    const defaultModel = new Model(true, empty(), PreferenceResponse_get_Default(), token, false, "", "", Project_get_Default(), 0, "top");
    const initialLoad = () => PromiseBuilder__Run_212F1D4B(promise, PromiseBuilder__Delay_62FBFDE1(promise, () => {
        let decoder_1, decoder;
        const projectsUrl = `${"http://localhost:1234"}/all-projects`;
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
        }))));
    }));
    return [defaultModel, Cmd_OfPromise_either(initialLoad, void 0, (arg_4) => (new Msg(0, [arg_4])), (arg_5) => (new Msg(1, [arg_5])))];
}

export function update(msg, model) {
    switch (msg.tag) {
        case 1: {
            const res = msg.fields[0];
            toConsole(printf("%A"))(res);
            return [new Model(false, model.projects, model.preference, model.token, model.modalState, model.searchTitle, model.searchUser, model.selectedProject, model.selectedProjectIndex, model.topOrBottom5), Cmd_none()];
        }
        case 2:
            return [model, Cmd_none()];
        case 3: {
            const project = msg.fields[0];
            return [new Model(model.loading, model.projects, model.preference, model.token, true, model.searchTitle, model.searchUser, project, model.selectedProjectIndex, model.topOrBottom5), Cmd_none()];
        }
        case 4:
            return [new Model(model.loading, model.projects, model.preference, model.token, false, model.searchTitle, model.searchUser, model.selectedProject, 0, model.topOrBottom5), Cmd_none()];
        case 5: {
            const title = msg.fields[0];
            return [new Model(model.loading, model.projects, model.preference, model.token, model.modalState, title, model.searchUser, model.selectedProject, model.selectedProjectIndex, model.topOrBottom5), singleton((dispatch) => {
                dispatch(new Msg(7, []));
            })];
        }
        case 6: {
            const title_1 = msg.fields[0];
            return [new Model(model.loading, model.projects, model.preference, model.token, model.modalState, model.searchTitle, title_1, model.selectedProject, model.selectedProjectIndex, model.topOrBottom5), singleton((dispatch_1) => {
                dispatch_1(new Msg(7, []));
            })];
        }
        case 7: {
            const data = new SearchRequest(model.searchTitle, model.searchUser, empty(), empty());
            const searchRequest = () => PromiseBuilder__Run_212F1D4B(promise, PromiseBuilder__Delay_62FBFDE1(promise, () => {
                let decoder_1, decoder;
                const url = `${"http://localhost:1234"}/search-projects`;
                return ((decoder_1 = ((decoder = Project_get_Decoder(), (path) => ((value) => list(uncurry2(decoder), path, value)))), PromiseBuilder__Run_212F1D4B_1(promise_1, PromiseBuilder__Delay_62FBFDE1_1(promise_1, () => {
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
                                    let matchValue, msg_3, value_1_1;
                                    const body_1_1 = _arg_1;
                                    return Promise.resolve((matchValue = decode(body_1_1), (matchValue.tag === 1) ? ((msg_3 = matchValue.fields[0], new FSharpResult$2(1, [new FetchError(1, [msg_3])]))) : ((value_1_1 = matchValue.fields[0], new FSharpResult$2(0, [value_1_1])))));
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
            return [model, Cmd_OfPromise_either(searchRequest, void 0, (arg_5) => (new Msg(0, [arg_5])), (arg_6) => (new Msg(1, [arg_6])))];
        }
        default: {
            const projects = msg.fields[0];
            return [new Model(false, projects, model.preference, model.token, model.modalState, model.searchTitle, model.searchUser, model.selectedProject, model.selectedProjectIndex, model.topOrBottom5), Cmd_none()];
        }
    }
}

export function view(model, dispatch) {
    let elems_4;
    return createElement("body", createObj(ofArray([["style", {
        height: 100 + "vh",
        position: "relative",
    }], (elems_4 = toList(delay(() => append(model.loading ? singleton_1(LoadingScreen) : empty_1(), delay(() => append(singleton_1(TurquoiseBackground(0.5)), delay(() => append(singleton_1(ImageBackground), delay(() => append(singleton_1(NavBar(dispatch)), delay(() => {
        let elems_3, elems, elems_1;
        return singleton_1(createElement("div", createObj(Helpers_combineClasses("columns", ofArray([["style", {
            height: 90 + "vh",
            margin: 1 + "%",
        }], (elems_3 = [createElement("div", createObj(Helpers_combineClasses("column", ofArray([["style", createObj(append_1(singleton(["overflowY", "scroll"]), TileCss))], ["className", join(" ", ["is-3", "scrollbar"])], (elems = SearchFilters(dispatch, model), ["children", Interop_reactApi.Children.toArray(Array.from(elems))])])))), createElement("div", createObj(Helpers_combineClasses("column", singleton(["className", join(" ", ["is-0"])])))), createElement("div", createObj(Helpers_combineClasses("column", ofArray([["style", createObj(TileCss)], (elems_1 = [createElement("label", createObj(Helpers_combineClasses("label", singleton(["children", "Projects"])))), ProjectTable(model, dispatch)], ["children", Interop_reactApi.Children.toArray(Array.from(elems_1))])])))), createElement("div", createObj(Helpers_combineClasses("modal", toList(delay(() => append(model.modalState ? singleton_1(["className", "is-active"]) : empty_1(), delay(() => append(singleton_1(["onKeyUp", (ev_1) => {
            PropHelpers_createOnKey(key_escape, (ev) => {
                dispatch(new Msg(4, []));
            }, ev_1);
        }]), delay(() => append(singleton_1(["className", join(" ", ["scrollbar", "is-large"])]), delay(() => {
            let elems_2;
            return singleton_1((elems_2 = [createElement("div", createObj(Helpers_combineClasses("modal-background", empty()))), ModalProjectInfo(model, dispatch)], ["children", Interop_reactApi.Children.toArray(Array.from(elems_2))]));
        })))))))))))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_3))])])))));
    })))))))))), ["children", Interop_reactApi.Children.toArray(Array.from(elems_4))])])));
}

//# sourceMappingURL=AllProjects.fs.js.map
