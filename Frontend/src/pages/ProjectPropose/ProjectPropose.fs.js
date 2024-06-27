import { cons, ofArray, singleton, append, filter, exists, empty } from "../../fable_modules/fable-library.4.1.4/List.js";
import { Msg, Model, ResponseResult } from "./ProjectProposeTypes.fs.js";
import { Cmd_OfPromise_either, Cmd_none } from "../../fable_modules/Fable.Elmish.4.1.0/cmd.fs.js";
import { join, printf, toConsole } from "../../fable_modules/fable-library.4.1.4/String.js";
import { TileCss, ImageBackground, TurquoiseBackground, LoadingScreen, isStudent } from "../../Common.fs.js";
import { ProjectProposeRequest_$reflection, ProjectProposeRequest } from "../../../../Shared/Shared.fs.js";
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
import { string_type } from "../../fable_modules/fable-library.4.1.4/Reflection.js";
import { fromString } from "../../fable_modules/Thoth.Fetch.3.0.1/../Thoth.Json.10.2.0/Decode.fs.js";
import { createObj, uncurry2 } from "../../fable_modules/fable-library.4.1.4/Util.js";
import { createElement } from "react";
import { empty as empty_1, singleton as singleton_1, append as append_1, delay, toList } from "../../fable_modules/fable-library.4.1.4/Seq.js";
import { NavBar } from "./ProjectProposeNavBar.fs.js";
import { Helpers_combineClasses } from "../../fable_modules/Feliz.Bulma.3.0.0/./ElementBuilders.fs.js";
import { SubmitButton, Meetings, Description, Skills, Requirements, Streams, Categories, ProjectTitle, Name, ValidityCheck, ResponseResultMessage, Tabs } from "./ProjectProposeForm.fs.js";
import { Interop_reactApi } from "../../fable_modules/Feliz.2.7.0/./Interop.fs.js";

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
                return [new Model(model.loading, model.token, model.user, model.projectTitle, filter((c_1) => (c_1 !== tag), sc), model.selectedStreams, model.requirements, model.description, model.skills, model.meetings, model.validationMessage, new ResponseResult(2, [])), Cmd_none()];
            }
            else {
                return [new Model(model.loading, model.token, model.user, model.projectTitle, append(sc, singleton(tag)), model.selectedStreams, model.requirements, model.description, model.skills, model.meetings, model.validationMessage, model.responseResult), Cmd_none()];
            }
        }
        case 5: {
            const tag_1 = msg.fields[0];
            const ss = model.selectedStreams;
            if (exists((c_2) => (c_2 === tag_1), ss)) {
                return [new Model(model.loading, model.token, model.user, model.projectTitle, model.selectedCategories, filter((c_3) => (c_3 !== tag_1), ss), model.requirements, model.description, model.skills, model.meetings, model.validationMessage, new ResponseResult(2, [])), Cmd_none()];
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
                const url = `${"http://localhost:1234"}/project-propose`;
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

export function view(model, dispatch) {
    let elems_4;
    return createElement("body", createObj(ofArray([["style", {
        height: 100 + "vh",
        position: "relative",
    }], (elems_4 = toList(delay(() => append_1(model.loading ? singleton_1(LoadingScreen) : empty_1(), delay(() => append_1(singleton_1(TurquoiseBackground(0.5)), delay(() => append_1(singleton_1(ImageBackground), delay(() => append_1(singleton_1(NavBar(dispatch, model.user)), delay(() => {
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
