import { append as append_1, cons, ofArray, singleton, empty } from "../../fable_modules/fable-library.4.1.4/List.js";
import { PreferenceResponse_$reflection, PreferenceResponse_get_Decoder, Project_$reflection, Project_get_Decoder, PreferenceResponse_get_Default } from "../../../../Shared/Shared.fs.js";
import { Msg, InitalLoad, Model } from "./HomeStudentTypes.fs.js";
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
import { printf, toConsole } from "../../fable_modules/fable-library.4.1.4/String.js";
import { createElement } from "react";
import { empty as empty_1, singleton as singleton_1, append, delay, toList } from "../../fable_modules/fable-library.4.1.4/Seq.js";
import { TileCss, BulmaTile, ImageBackground, TurquoiseBackground, LoadingScreen } from "../../Common.fs.js";
import { NavBar } from "./HomeStudentNavBar.fs.js";
import { Helpers_combineClasses } from "../../fable_modules/Feliz.Bulma.3.0.0/./ElementBuilders.fs.js";
import { PreferenceTable, NewTable } from "./HomeStudentTables.fs.js";
import { Interop_reactApi } from "../../fable_modules/Feliz.2.7.0/./Interop.fs.js";

export function init(token) {
    const defaultModel = new Model(true, empty(), PreferenceResponse_get_Default(), token);
    const initialLoad = () => PromiseBuilder__Run_212F1D4B(promise, PromiseBuilder__Delay_62FBFDE1(promise, () => {
        let decoder_1, decoder;
        const newProjectsUrl = `${"http://localhost:1234"}/new-projects`;
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
            return [new Model(false, model.projects, model.preference, model.token), Cmd_none()];
        }
        case 2:
            return [model, Cmd_none()];
        default: {
            const initialLoad = msg.fields[0];
            return [new Model(false, initialLoad.projects, initialLoad.preference, model.token), Cmd_none()];
        }
    }
}

export function view(model, dispatch) {
    let elems;
    return createElement("body", createObj(ofArray([["style", {
        height: 100 + "vh",
        position: "relative",
    }], (elems = toList(delay(() => append(model.loading ? singleton_1(LoadingScreen) : empty_1(), delay(() => append(singleton_1(TurquoiseBackground(0.5)), delay(() => append(singleton_1(ImageBackground), delay(() => append(singleton_1(NavBar(dispatch)), delay(() => singleton_1(BulmaTile(singleton("is-ancestor"), ofArray([["padding", 50 + "px"], ["height", 95 + "vh"]]), ofArray([BulmaTile(ofArray(["is-8", "is-parent"]), empty(), singleton(BulmaTile(ofArray(["tile", "is-child", "box"]), TileCss, ofArray([createElement("h1", createObj(Helpers_combineClasses("title", singleton(["children", "New Projects"])))), NewTable(model)])))), BulmaTile(ofArray(["is-parent", "is-vertical"]), empty(), singleton(BulmaTile(ofArray(["is-child", "box"]), append_1(TileCss, singleton(["height", 8000 + "px"])), ofArray([createElement("h1", createObj(Helpers_combineClasses("title", singleton(["children", "Preferences"])))), PreferenceTable(model)]))))]))))))))))))), ["children", Interop_reactApi.Children.toArray(Array.from(elems))])])));
}

//# sourceMappingURL=HomeStudent.fs.js.map
