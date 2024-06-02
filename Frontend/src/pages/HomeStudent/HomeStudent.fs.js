import { Union, Record } from "../../fable_modules/fable-library.4.1.4/Types.js";
import { ProjectInfo_get_Decoder, ProjectInfo_$reflection } from "../../../../Shared/Shared.fs.js";
import { obj_type, union_type, class_type, record_type, list_type } from "../../fable_modules/fable-library.4.1.4/Reflection.js";
import { map as map_1, singleton, cons, ofArray, empty } from "../../fable_modules/fable-library.4.1.4/List.js";
import { PromiseBuilder__Delay_62FBFDE1, PromiseBuilder__Run_212F1D4B } from "../../fable_modules/Fable.Promise.3.2.0/Promise.fs.js";
import { promise } from "../../fable_modules/Fable.Promise.3.2.0/PromiseImpl.fs.js";
import { list } from "../../fable_modules/Thoth.Json.10.2.0/Decode.fs.js";
import { createObj, uncurry2 } from "../../fable_modules/fable-library.4.1.4/Util.js";
import { PromiseBuilder__Delay_62FBFDE1 as PromiseBuilder__Delay_62FBFDE1_1, PromiseBuilder__Run_212F1D4B as PromiseBuilder__Run_212F1D4B_1 } from "../../fable_modules/Thoth.Fetch.3.0.1/../Fable.Promise.3.2.0/Promise.fs.js";
import { promise as promise_1 } from "../../fable_modules/Thoth.Fetch.3.0.1/../Fable.Promise.3.2.0/PromiseImpl.fs.js";
import { FetchError } from "../../fable_modules/Thoth.Fetch.3.0.1/Fetch.fs.js";
import { FSharpResult$2 } from "../../fable_modules/fable-library.4.1.4/Choice.js";
import { Helper_message, Helper_fetch, Helper_withContentTypeJson, Helper_withProperties } from "../../fable_modules/Thoth.Fetch.3.0.1/./Fetch.fs.js";
import { Types_RequestProperties } from "../../fable_modules/Fable.Fetch.2.7.0/Fetch.fs.js";
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
import { Helpers_combineClasses } from "../../fable_modules/Feliz.Bulma.3.0.0/./ElementBuilders.fs.js";
import { RouterModule_nav } from "../../fable_modules/Feliz.Router.4.0.0/./Router.fs.js";
import { Interop_reactApi } from "../../fable_modules/Feliz.2.7.0/./Interop.fs.js";

export class Model extends Record {
    constructor(projects) {
        super();
        this.projects = projects;
    }
}

export function Model_$reflection() {
    return record_type("HomeStudent.Model", [], Model, () => [["projects", list_type(ProjectInfo_$reflection())]]);
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
    return union_type("HomeStudent.Msg", [], Msg, () => [[["Item", list_type(ProjectInfo_$reflection())]], [["Item", class_type("System.Exception")]]]);
}

export function init() {
    const defaultModel = new Model(empty());
    const initialLoad = () => PromiseBuilder__Run_212F1D4B(promise, PromiseBuilder__Delay_62FBFDE1(promise, () => {
        let decoder_1, decoder;
        const url = "http://localhost:1234/projects";
        return ((decoder_1 = ((decoder = ProjectInfo_get_Decoder(), (path) => ((value) => list(uncurry2(decoder), path, value)))), PromiseBuilder__Run_212F1D4B_1(promise_1, PromiseBuilder__Delay_62FBFDE1_1(promise_1, () => {
            let data_2, caseStrategy_2, extra_2;
            return ((data_2 = void 0, (caseStrategy_2 = void 0, (extra_2 = void 0, (() => {
                let properties_4;
                try {
                    const properties_3 = Helper_withProperties(void 0, (properties_4 = ofArray([new Types_RequestProperties(0, ["GET"]), new Types_RequestProperties(1, [keyValueList(Helper_withContentTypeJson(data_2, empty()), 0)])]), defaultArg(map((data_1_1) => {
                        let encoder;
                        return cons(new Types_RequestProperties(2, [(encoder = Auto_generateBoxedEncoderCached_437914C6(obj_type, caseStrategy_2, extra_2), toString(0, encoder(data_1_1)))]), properties_4);
                    }, data_2), properties_4)));
                    const pr = PromiseBuilder__Run_212F1D4B_1(promise_1, PromiseBuilder__Delay_62FBFDE1_1(promise_1, () => (Helper_fetch(url, properties_3).then((_arg) => {
                        let response_1, decoder_1_1, decode;
                        const response = _arg;
                        return ((response_1 = response, (decoder_1_1 = defaultArg(decoder_1, Auto_generateBoxedDecoderCached_Z6670B51(list_type(ProjectInfo_$reflection()), unwrap(caseStrategy_2), unwrap(extra_2))), (decode = ((body_1) => fromString(uncurry2(decoder_1_1), body_1)), PromiseBuilder__Run_212F1D4B_1(promise_1, PromiseBuilder__Delay_62FBFDE1_1(promise_1, () => (((response_1.ok) ? PromiseBuilder__Run_212F1D4B_1(promise_1, PromiseBuilder__Delay_62FBFDE1_1(promise_1, () => (response_1.text().then((_arg_1) => {
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
    if (msg.tag === 1) {
        const res = msg.fields[0];
        toConsole(printf("%A"))(res);
        return [model, Cmd_none()];
    }
    else {
        const projectList = msg.fields[0];
        toConsole(printf("%A"))(projectList);
        return [new Model(projectList), Cmd_none()];
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
}], (() => {
    let elems_1, elms, elms_6, elms_1, elms_5, elms_4, elms_3, elms_2;
    const elems_8 = [createElement("div", createObj(Helpers_combineClasses("navbar-brand", ofArray([["onClick", (e) => {
        RouterModule_nav(singleton("main-student"), 1, 2);
    }], (elems_1 = [(elms = singleton(createElement("img", {
        src: "https://bulma.io/images/bulma-logo-white.png",
        height: 28,
        width: 112,
    })), createElement("a", {
        className: "navbar-item",
        children: Interop_reactApi.Children.toArray(Array.from(elms)),
    }))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_1))])])))), (elms_6 = ofArray([(elms_1 = ofArray([createElement("a", createObj(Helpers_combineClasses("navbar-item", ofArray([["children", "Projects"], ["onClick", (e_1) => {
        RouterModule_nav(ofArray(["main-student", "projects"]), 1, 2);
    }]])))), createElement("a", createObj(Helpers_combineClasses("navbar-item", singleton(["children", "Preferences"])))), createElement("a", createObj(Helpers_combineClasses("navbar-item", singleton(["children", "Jobs"]))))]), createElement("div", {
        className: "navbar-start",
        children: Interop_reactApi.Children.toArray(Array.from(elms_1)),
    })), (elms_5 = singleton((elms_4 = singleton((elms_3 = ofArray([(elms_2 = singleton(createElement("strong", {
        children: ["Sign up"],
    })), createElement("a", {
        className: "button",
        children: Interop_reactApi.Children.toArray(Array.from(elms_2)),
    })), createElement("a", createObj(Helpers_combineClasses("button", singleton(["children", "Log In"]))))]), createElement("div", {
        className: "buttons",
        children: Interop_reactApi.Children.toArray(Array.from(elms_3)),
    }))), createElement("div", {
        className: "navbar-item",
        children: Interop_reactApi.Children.toArray(Array.from(elms_4)),
    }))), createElement("div", {
        className: "navbar-end",
        children: Interop_reactApi.Children.toArray(Array.from(elms_5)),
    }))]), createElement("div", {
        className: "navbar-menu",
        children: Interop_reactApi.Children.toArray(Array.from(elms_6)),
    }))];
    return ["children", Interop_reactApi.Children.toArray(Array.from(elems_8))];
})()]))));

export function Table(body) {
    let elems_1;
    return createElement("div", createObj(ofArray([["style", {
        overflowY: "auto",
        height: 80 + "%",
    }], (elems_1 = [createElement("table", createObj(Helpers_combineClasses("table", ofArray([["style", {
        width: 100 + "%",
    }], ["children", Interop_reactApi.Children.toArray(Array.from(body))]]))))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_1))])])));
}

export function Row(projectInfo) {
    const children = ofArray([createElement("td", {
        children: projectInfo.Title,
    }), createElement("td", {
        children: projectInfo.Professor,
    }), createElement("td", {}), createElement("td", {
        children: projectInfo.Description,
    })]);
    return createElement("tr", {
        children: Interop_reactApi.Children.toArray(Array.from(children)),
    });
}

export function NewTable(model) {
    let children_2, children, children_4;
    return Table(ofArray([(children_2 = singleton((children = ofArray([createElement("th", {
        title: "Title",
        children: "Title",
    }), createElement("th", {
        title: "Professor",
        children: "Professor",
    }), createElement("th", {
        title: "Tags",
        children: "Tags",
    }), createElement("th", {
        title: "Description",
        children: "Description",
    })]), createElement("tr", {
        children: Interop_reactApi.Children.toArray(Array.from(children)),
    }))), createElement("thead", {
        children: Interop_reactApi.Children.toArray(Array.from(children_2)),
    })), (children_4 = map_1(Row, model.projects), createElement("tbody", {
        children: Interop_reactApi.Children.toArray(Array.from(children_4)),
    }))]));
}

export const PreferenceTable = Table(ofArray([(() => {
    let children;
    const children_2 = singleton((children = ofArray([createElement("th", {
        title: "Rank",
        children: "Rank",
    }), createElement("th", {
        title: "Title",
        children: "Title",
    }), createElement("th", {
        title: "Professor",
        children: "Professor",
    }), createElement("th", {
        title: "Tags",
        children: "Tags",
    })]), createElement("tr", {
        children: Interop_reactApi.Children.toArray(Array.from(children)),
    })));
    return createElement("thead", {
        children: Interop_reactApi.Children.toArray(Array.from(children_2)),
    });
})(), (() => {
    let children_4, children_6, children_8, children_10, children_12, children_14;
    const children_16 = ofArray([(children_4 = ofArray([createElement("td", {
        children: "1",
    }), createElement("td", {
        children: "A framework for the simulation and evaluation of dynamic bus routing",
    }), createElement("td", {
        children: "Cattafi,M.",
    }), createElement("td", {})]), createElement("tr", {
        children: Interop_reactApi.Children.toArray(Array.from(children_4)),
    })), (children_6 = ofArray([createElement("td", {
        children: "2",
    }), createElement("td", {
        children: "Learning to control a pendulum with data-driven Model Predictive Control ",
    }), createElement("td", {
        children: "Angeli,D.",
    }), createElement("td", {})]), createElement("tr", {
        children: Interop_reactApi.Children.toArray(Array.from(children_6)),
    })), (children_8 = ofArray([createElement("td", {
        children: "3",
    }), createElement("td", {
        children: "Learning to control a pendulum with data-driven Model Predictive Control ",
    }), createElement("td", {
        children: "Angeli,D.",
    }), createElement("td", {})]), createElement("tr", {
        children: Interop_reactApi.Children.toArray(Array.from(children_8)),
    })), (children_10 = ofArray([createElement("td", {
        children: "4",
    }), createElement("td", {
        children: "Learning to control a pendulum with data-driven Model Predictive Control ",
    }), createElement("td", {
        children: "Angeli,D.",
    }), createElement("td", {})]), createElement("tr", {
        children: Interop_reactApi.Children.toArray(Array.from(children_10)),
    })), (children_12 = ofArray([createElement("td", {
        children: "5",
    }), createElement("td", {
        children: "Learning to control a pendulum with data-driven Model Predictive Control ",
    }), createElement("td", {
        children: "Angeli,D.",
    }), createElement("td", {})]), createElement("tr", {
        children: Interop_reactApi.Children.toArray(Array.from(children_12)),
    })), (children_14 = ofArray([createElement("td", {
        children: "6",
    }), createElement("td", {
        children: "Learning to control a pendulum with data-driven Model Predictive Control ",
    }), createElement("td", {
        children: "Angeli,D.",
    }), createElement("td", {})]), createElement("tr", {
        children: Interop_reactApi.Children.toArray(Array.from(children_14)),
    }))]);
    return createElement("tbody", {
        children: Interop_reactApi.Children.toArray(Array.from(children_16)),
    });
})()]));

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

export const TileCss = ofArray([TurquoiseBackgroundRGBA(0.7), ["borderStyle", "solid"], ["borderColor", "#48D1CC"], ["overflow", "hidden"]]);

export function Tiles(model) {
    return BulmaTile(singleton("is-ancestor"), ofArray([["padding", 50 + "px"], ["height", 95 + "vh"]]), ofArray([BulmaTile(ofArray(["is-8", "is-vertical", "is-parent"]), empty(), ofArray([BulmaTile(ofArray(["tile", "is-child", "box", "test"]), TileCss, ofArray([createElement("h1", createObj(Helpers_combineClasses("title", singleton(["children", "New Projects"])))), NewTable(model)])), BulmaTile(ofArray(["is-child", "box", "test"]), TileCss, ofArray([createElement("h1", createObj(Helpers_combineClasses("title", singleton(["children", "Preferences"])))), PreferenceTable]))])), BulmaTile(singleton("is-parent"), empty(), singleton(BulmaTile(ofArray(["is-child", "box"]), TileCss, ofArray([createElement("h1", createObj(Helpers_combineClasses("title", singleton(["children", "Notifications"])))), Media, Media, Media, Media, Media]))))]));
}

export function view(model, dispatch) {
    let elems;
    return createElement("body", createObj(ofArray([["style", {
        height: 100 + "vh",
        position: "relative",
    }], (elems = [TurquoiseBackground(0.5), ImageBackground, NavBar, Tiles(model)], ["children", Interop_reactApi.Children.toArray(Array.from(elems))])])));
}

//# sourceMappingURL=HomeStudent.fs.js.map
