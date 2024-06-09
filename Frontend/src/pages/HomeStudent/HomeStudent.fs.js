import { Union, Record } from "../../fable_modules/fable-library.4.1.4/Types.js";
import { getFormattedCategory, PreferenceResponse_get_Decoder, Project_get_Decoder, PreferenceResponse_get_Default, PreferenceResponse_$reflection, Project_$reflection } from "../../../../Shared/Shared.fs.js";
import { obj_type, union_type, class_type, record_type, string_type, list_type } from "../../fable_modules/fable-library.4.1.4/Reflection.js";
import { append, map as map_1, cons, ofArray, singleton, empty } from "../../fable_modules/fable-library.4.1.4/List.js";
import { PromiseBuilder__Delay_62FBFDE1, PromiseBuilder__Run_212F1D4B } from "../../fable_modules/Fable.Promise.3.2.0/Promise.fs.js";
import { promise } from "../../fable_modules/Fable.Promise.3.2.0/PromiseImpl.fs.js";
import { list as list_1 } from "../../fable_modules/Thoth.Json.10.2.0/Decode.fs.js";
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
import { toString } from "../../fable_modules/Thoth.Fetch.3.0.1/../Thoth.Json.10.2.0/Encode.fs.js";
import { Auto_generateBoxedDecoderCached_Z6670B51 } from "../../fable_modules/Thoth.Json.10.2.0/./Decode.fs.js";
import { fromString } from "../../fable_modules/Thoth.Fetch.3.0.1/../Thoth.Json.10.2.0/Decode.fs.js";
import { Cmd_none, Cmd_OfPromise_either } from "../../fable_modules/Fable.Elmish.4.1.0/cmd.fs.js";
import { join, split, printf, toConsole } from "../../fable_modules/fable-library.4.1.4/String.js";
import { createElement } from "react";
import { rgba } from "../../fable_modules/Feliz.2.7.0/Colors.fs.js";
import { Helpers_combineClasses } from "../../fable_modules/Feliz.Bulma.3.0.0/./ElementBuilders.fs.js";
import { RouterModule_nav } from "../../fable_modules/Feliz.Router.4.0.0/./Router.fs.js";
import { Interop_reactApi } from "../../fable_modules/Feliz.2.7.0/./Interop.fs.js";
import { toString as toString_1 } from "../../fable_modules/fable-library.4.1.4/Date.js";

export class Model extends Record {
    constructor(projects, preference, token) {
        super();
        this.projects = projects;
        this.preference = preference;
        this.token = token;
    }
}

export function Model_$reflection() {
    return record_type("HomeStudent.Model", [], Model, () => [["projects", list_type(Project_$reflection())], ["preference", PreferenceResponse_$reflection()], ["token", string_type]]);
}

export class InitalLoad extends Record {
    constructor(projects, preference) {
        super();
        this.projects = projects;
        this.preference = preference;
    }
}

export function InitalLoad_$reflection() {
    return record_type("HomeStudent.InitalLoad", [], InitalLoad, () => [["projects", list_type(Project_$reflection())], ["preference", PreferenceResponse_$reflection()]]);
}

export class Msg extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["SuccessfulLoad", "ErrorLoad"];
    }
}

export function Msg_$reflection() {
    return union_type("HomeStudent.Msg", [], Msg, () => [[["Item", InitalLoad_$reflection()]], [["Item", class_type("System.Exception")]]]);
}

export function init(token) {
    const defaultModel = new Model(empty(), PreferenceResponse_get_Default(), token);
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
    if (msg.tag === 1) {
        const res = msg.fields[0];
        toConsole(printf("%A"))(res);
        return [model, Cmd_none()];
    }
    else {
        const initialLoad = msg.fields[0];
        return [new Model(initialLoad.projects, initialLoad.preference, model.token), Cmd_none()];
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

export function Tag(filter) {
    return createElement("span", createObj(Helpers_combineClasses("tag", ofArray([["children", getFormattedCategory(filter)], ["style", {
        marginBottom: 10,
        marginRight: 10,
    }]]))));
}

export function TableCategories(categories) {
    return map_1(Tag, ofArray(split(categories, [","], void 0, 0)));
}

export function ProjectRow(projectInfo) {
    let children;
    const children_2 = ofArray([createElement("td", {
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
    }), (children = TableCategories(projectInfo.categories), createElement("td", {
        children: Interop_reactApi.Children.toArray(Array.from(children)),
    })), createElement("td", {
        children: toString_1(projectInfo.updated, "yyyy/MM/dd"),
    })]);
    return createElement("tr", {
        children: Interop_reactApi.Children.toArray(Array.from(children_2)),
    });
}

export function Table(body) {
    let elems_1;
    return createElement("div", createObj(ofArray([["style", {
        overflowY: "auto",
        height: 90 + "%",
    }], ["className", join(" ", ["scrollbar"])], (elems_1 = [createElement("table", createObj(Helpers_combineClasses("table", ofArray([["style", {
        width: 100 + "%",
    }], ["children", Interop_reactApi.Children.toArray(Array.from(body))]]))))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_1))])])));
}

export function NewTable(model) {
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
        title: "Related Categories",
        children: "Related Categories",
    }), createElement("th", {
        title: "Last Updated",
        children: "Last Updated",
    })]), createElement("tr", {
        children: Interop_reactApi.Children.toArray(Array.from(children)),
    }))), createElement("thead", {
        children: Interop_reactApi.Children.toArray(Array.from(children_2)),
    })), (children_4 = map_1(ProjectRow, model.projects), createElement("tbody", {
        children: Interop_reactApi.Children.toArray(Array.from(children_4)),
    }))]));
}

export function PreferenceRow(_arg1_, _arg1__1) {
    const _arg = [_arg1_, _arg1__1];
    const rank = _arg[1] | 0;
    const projectInfo = _arg[0];
    if (projectInfo.pid === "-") {
        const children = ofArray([createElement("td", {
            children: rank,
        }), createElement("td", {}), createElement("td", {})]);
        return createElement("tr", {
            children: Interop_reactApi.Children.toArray(Array.from(children)),
        });
    }
    else {
        const children_2 = ofArray([createElement("td", {
            children: rank,
        }), createElement("td", {
            children: projectInfo.title,
        }), createElement("td", {})]);
        return createElement("tr", {
            children: Interop_reactApi.Children.toArray(Array.from(children_2)),
        });
    }
}

export function PreferenceTable(model) {
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
    })), (children_4 = map_1((tupledArg) => PreferenceRow(tupledArg[0], tupledArg[1]), prefList), createElement("tbody", {
        children: Interop_reactApi.Children.toArray(Array.from(children_4)),
    }))]));
}

export const Media = createElement("article", createObj(Helpers_combineClasses("media", ofArray([["style", {}], (() => {
    let elms, elems, elms_6, elms_1, children_1, elm, elms_5, elms_2, elems_3, elms_3, elems_5, elms_4, elems_7;
    const elems_12 = [(elms = singleton(createElement("figure", createObj(Helpers_combineClasses("image", ofArray([["className", "is-64x64"], (elems = [createElement("img", {
        src: "https://bulma.io/assets/images/placeholders/128x128.png",
    })], ["children", Interop_reactApi.Children.toArray(Array.from(elems))])]))))), createElement("div", {
        className: "media-left",
        children: Interop_reactApi.Children.toArray(Array.from(elms)),
    })), (elms_6 = ofArray([(elms_1 = singleton((children_1 = ofArray([createElement("strong", {
        children: ["John Smith"],
    }), createElement("small", {
        children: ["@johnsmith"],
    }), createElement("br", {}), createElement("span", {
        children: ["Lorem ipsum ... vestibulum ut."],
    })]), createElement("p", {
        children: Interop_reactApi.Children.toArray(Array.from(children_1)),
    }))), createElement("div", {
        className: "content",
        children: Interop_reactApi.Children.toArray(Array.from(elms_1)),
    })), (elm = [(elms_5 = ofArray([(elms_2 = singleton(createElement("span", createObj(Helpers_combineClasses("icon", ofArray([["className", "is-small"], (elems_3 = [createElement("i", {
        className: "fas fa-reply",
    })], ["children", Interop_reactApi.Children.toArray(Array.from(elems_3))])]))))), createElement("div", {
        className: "level-item",
        children: Interop_reactApi.Children.toArray(Array.from(elms_2)),
    })), (elms_3 = singleton(createElement("span", createObj(Helpers_combineClasses("icon", ofArray([["className", "is-small"], (elems_5 = [createElement("i", {
        className: "fas fa-retweet",
    })], ["children", Interop_reactApi.Children.toArray(Array.from(elems_5))])]))))), createElement("div", {
        className: "level-item",
        children: Interop_reactApi.Children.toArray(Array.from(elms_3)),
    })), (elms_4 = singleton(createElement("span", createObj(Helpers_combineClasses("icon", ofArray([["className", "is-small"], (elems_7 = [createElement("i", {
        className: "fas fa-heart",
    })], ["children", Interop_reactApi.Children.toArray(Array.from(elems_7))])]))))), createElement("div", {
        className: "level-item",
        children: Interop_reactApi.Children.toArray(Array.from(elms_4)),
    }))]), createElement("div", {
        className: "level-left",
        children: Interop_reactApi.Children.toArray(Array.from(elms_5)),
    }))], createElement("nav", {
        className: "level",
        children: Interop_reactApi.Children.toArray(Array.from(elm)),
    }))]), createElement("div", {
        className: "media-content",
        children: Interop_reactApi.Children.toArray(Array.from(elms_6)),
    }))];
    return ["children", Interop_reactApi.Children.toArray(Array.from(elems_12))];
})()]))));

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

export function Tiles(model) {
    return BulmaTile(singleton("is-ancestor"), ofArray([["padding", 50 + "px"], ["height", 95 + "vh"]]), ofArray([BulmaTile(ofArray(["is-8", "is-parent"]), empty(), singleton(BulmaTile(ofArray(["tile", "is-child", "box"]), TileCss, ofArray([createElement("h1", createObj(Helpers_combineClasses("title", singleton(["children", "New Projects"])))), NewTable(model)])))), BulmaTile(ofArray(["is-parent", "is-vertical"]), empty(), singleton(BulmaTile(ofArray(["is-child", "box"]), append(TileCss, singleton(["height", 8000 + "px"])), ofArray([createElement("h1", createObj(Helpers_combineClasses("title", singleton(["children", "Preferences"])))), PreferenceTable(model)]))))]));
}

export function view(model, dispatch) {
    let elems;
    return createElement("body", createObj(ofArray([["style", {
        height: 100 + "vh",
        position: "relative",
    }], (elems = [TurquoiseBackground(0.5), ImageBackground, NavBar, Tiles(model)], ["children", Interop_reactApi.Children.toArray(Array.from(elems))])])));
}

//# sourceMappingURL=HomeStudent.fs.js.map
