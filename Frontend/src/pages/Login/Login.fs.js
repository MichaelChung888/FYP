import { Union, Record } from "../../fable_modules/fable-library.4.1.4/Types.js";
import { AccountInfo_get_Decoder, LoginInfo, AccountInfo_$reflection, LoginInfo_$reflection } from "../../../../Shared/Shared.fs.js";
import { union_type, class_type, string_type, record_type } from "../../fable_modules/fable-library.4.1.4/Reflection.js";
import { Cmd_OfPromise_either, Cmd_none } from "../../fable_modules/Fable.Elmish.4.1.0/cmd.fs.js";
import { PromiseBuilder__Delay_62FBFDE1, PromiseBuilder__Run_212F1D4B } from "../../fable_modules/Fable.Promise.3.2.0/Promise.fs.js";
import { promise } from "../../fable_modules/Fable.Promise.3.2.0/PromiseImpl.fs.js";
import { PromiseBuilder__Delay_62FBFDE1 as PromiseBuilder__Delay_62FBFDE1_1, PromiseBuilder__Run_212F1D4B as PromiseBuilder__Run_212F1D4B_1 } from "../../fable_modules/Thoth.Fetch.3.0.1/../Fable.Promise.3.2.0/Promise.fs.js";
import { promise as promise_1 } from "../../fable_modules/Thoth.Fetch.3.0.1/../Fable.Promise.3.2.0/PromiseImpl.fs.js";
import { FetchError } from "../../fable_modules/Thoth.Fetch.3.0.1/Fetch.fs.js";
import { FSharpResult$2 } from "../../fable_modules/fable-library.4.1.4/Choice.js";
import { Helper_message, Helper_fetch, Helper_withContentTypeJson, Helper_withProperties } from "../../fable_modules/Thoth.Fetch.3.0.1/./Fetch.fs.js";
import { Types_RequestProperties } from "../../fable_modules/Fable.Fetch.2.6.0/Fetch.fs.js";
import { cons, ofArray, empty, singleton } from "../../fable_modules/fable-library.4.1.4/List.js";
import { keyValueList } from "../../fable_modules/fable-library.4.1.4/MapUtil.js";
import { unwrap, map, defaultArg } from "../../fable_modules/fable-library.4.1.4/Option.js";
import { Auto_generateBoxedEncoderCached_437914C6 } from "../../fable_modules/Thoth.Json.10.1.0/./Encode.fs.js";
import { toString } from "../../fable_modules/Thoth.Fetch.3.0.1/../Thoth.Json.10.1.0/Encode.fs.js";
import { Auto_generateBoxedDecoderCached_Z6670B51 } from "../../fable_modules/Thoth.Json.10.1.0/./Decode.fs.js";
import { fromString } from "../../fable_modules/Thoth.Fetch.3.0.1/../Thoth.Json.10.1.0/Decode.fs.js";
import { createObj, uncurry2 } from "../../fable_modules/fable-library.4.1.4/Util.js";
import { join, printf, toConsole } from "../../fable_modules/fable-library.4.1.4/String.js";
import { createElement } from "react";
import { rgba } from "../../fable_modules/Feliz.2.7.0/Colors.fs.js";
import { Helpers_combineClasses } from "../../fable_modules/Feliz.Bulma.3.0.0/./ElementBuilders.fs.js";
import { Interop_reactApi } from "../../fable_modules/Feliz.2.7.0/./Interop.fs.js";

export class Model extends Record {
    constructor(login) {
        super();
        this.login = login;
    }
}

export function Model_$reflection() {
    return record_type("Login.Model", [], Model, () => [["login", LoginInfo_$reflection()]]);
}

export class Msg extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["InputChanged", "Submit", "Success", "Error"];
    }
}

export function Msg_$reflection() {
    return union_type("Login.Msg", [], Msg, () => [[["Item", string_type]], [["Item", class_type("Browser.Types.Event", void 0)]], [["Item", AccountInfo_$reflection()]], [["Item", class_type("System.Exception")]]]);
}

export function init() {
    return [new Model(new LoginInfo("")), Cmd_none()];
}

export function update(msg, model) {
    switch (msg.tag) {
        case 1: {
            const ev = msg.fields[0];
            ev.preventDefault();
            const handleSubmit = () => PromiseBuilder__Run_212F1D4B(promise, PromiseBuilder__Delay_62FBFDE1(promise, () => {
                let decoder;
                const url = "http://localhost:1234/login";
                return ((decoder = AccountInfo_get_Decoder(), PromiseBuilder__Run_212F1D4B_1(promise_1, PromiseBuilder__Delay_62FBFDE1_1(promise_1, () => {
                    let data_2, caseStrategy_2, extra_2;
                    return ((data_2 = model.login, (caseStrategy_2 = void 0, (extra_2 = void 0, (() => {
                        let properties_4;
                        try {
                            const properties_3 = Helper_withProperties(singleton(new Types_RequestProperties(4, ["include"])), (properties_4 = ofArray([new Types_RequestProperties(0, ["POST"]), new Types_RequestProperties(1, [keyValueList(Helper_withContentTypeJson(data_2, empty()), 0)])]), defaultArg(map((data_1_1) => {
                                let encoder;
                                return cons(new Types_RequestProperties(2, [(encoder = Auto_generateBoxedEncoderCached_437914C6(LoginInfo_$reflection(), caseStrategy_2, extra_2), toString(0, encoder(data_1_1)))]), properties_4);
                            }, data_2), properties_4)));
                            const pr = PromiseBuilder__Run_212F1D4B_1(promise_1, PromiseBuilder__Delay_62FBFDE1_1(promise_1, () => (Helper_fetch(url, properties_3).then((_arg) => {
                                let response_1, decoder_1_1, decode;
                                const response = _arg;
                                return ((response_1 = response, (decoder_1_1 = defaultArg(decoder, Auto_generateBoxedDecoderCached_Z6670B51(AccountInfo_$reflection(), unwrap(caseStrategy_2), unwrap(extra_2))), (decode = ((body_1) => fromString(uncurry2(decoder_1_1), body_1)), PromiseBuilder__Run_212F1D4B_1(promise_1, PromiseBuilder__Delay_62FBFDE1_1(promise_1, () => (((response_1.ok) ? PromiseBuilder__Run_212F1D4B_1(promise_1, PromiseBuilder__Delay_62FBFDE1_1(promise_1, () => (response_1.text().then((_arg_1) => {
                                    let matchValue, msg_1, value_1_1;
                                    const body_1_1 = _arg_1;
                                    return Promise.resolve((matchValue = decode(body_1_1), (matchValue.tag === 1) ? ((msg_1 = matchValue.fields[0], new FSharpResult$2(1, [new FetchError(1, [msg_1])]))) : ((value_1_1 = matchValue.fields[0], new FSharpResult$2(0, [value_1_1])))));
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
            return [model, Cmd_OfPromise_either(handleSubmit, void 0, (arg_4) => (new Msg(2, [arg_4])), (arg_5) => (new Msg(3, [arg_5])))];
        }
        case 2: {
            const res = msg.fields[0];
            toConsole(printf("%A"))(res);
            return [model, Cmd_none()];
        }
        case 3: {
            const res_1 = msg.fields[0];
            toConsole(printf("%A"))(res_1);
            return [model, Cmd_none()];
        }
        default: {
            const newInput = msg.fields[0];
            return [new Model(new LoginInfo(newInput)), Cmd_none()];
        }
    }
}

export function TurquoiseBackground(opacity) {
    return createElement("div", {
        style: {
            position: "absolute",
            height: 100 + "%",
            width: 100 + "%",
            opacity: opacity,
            zIndex: -1,
            backgroundColor: "#AFEEEE",
        },
    });
}

export function TurquoiseBackgroundStyle(opacity) {
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

export function UsernameInput(dispatch) {
    let elems_2, elems_1, elems;
    return createElement("div", createObj(Helpers_combineClasses("field", singleton((elems_2 = [createElement("label", createObj(Helpers_combineClasses("label", singleton(["children", "EE ID"])))), createElement("div", createObj(ofArray([["className", join(" ", ["control", "has-icons-left"])], (elems_1 = [createElement("input", createObj(cons(["type", "text"], Helpers_combineClasses("input", ofArray([["required", true], ["placeholder", "Enter your EEID"], ["onChange", (ev) => {
        dispatch(new Msg(0, [ev.target.value]));
    }]]))))), createElement("span", createObj(Helpers_combineClasses("icon", ofArray([["className", "is-small"], ["className", "is-left"], (elems = [createElement("i", {
        className: join(" ", ["fas fa-user"]),
    })], ["children", Interop_reactApi.Children.toArray(Array.from(elems))])]))))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_1))])])))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_2))])))));
}

export function view(model, dispatch) {
    let elems_4, elems_3, elems_2, elems_1, elms;
    return createElement("body", createObj(ofArray([["style", {
        height: 100 + "vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    }], (elems_4 = [TurquoiseBackground(0.5), ImageBackground, createElement("div", createObj(ofArray([["style", createObj(ofArray([TurquoiseBackgroundStyle(0.7), ["position", "relative"], ["borderStyle", "solid"], ["borderColor", "#48D1CC"], ["width", 400 + "px"], ["height", 550 + "px"], ["padding", 10 + "px"], ["display", "flex"], ["flexDirection", "column"], ["alignItems", "center"], ["justifyContent", "center"], ["borderRadius", 3 + "%"]]))], (elems_3 = [createElement("section", {
        className: join(" ", ["title", "is-2", "field"]),
        children: "EEFYP",
    }), createElement("section", {
        style: {
            textAlign: "center",
            color: "#808080",
        },
        className: join(" ", ["section", "subtitle", "is-5", "field"]),
        children: "Electrical and Electronic final year project selection page",
    }), createElement("form", createObj(ofArray([["onSubmit", (arg_1) => {
        dispatch(new Msg(1, [arg_1]));
    }], ["style", {
        width: 80 + "%",
    }], (elems_2 = [UsernameInput(dispatch), createElement("div", createObj(ofArray([["style", {
        marginTop: 35 + "px",
    }], ["className", join(" ", ["field", "is-grouped", "is-grouped-centered"])], (elems_1 = [(elms = singleton(createElement("button", createObj(Helpers_combineClasses("button", ofArray([["className", "is-info"], ["children", "Login"]]))))), createElement("div", {
        className: "control",
        children: Interop_reactApi.Children.toArray(Array.from(elms)),
    }))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_1))])])))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_2))])])))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_3))])])))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_4))])])));
}

//# sourceMappingURL=Login.fs.js.map
