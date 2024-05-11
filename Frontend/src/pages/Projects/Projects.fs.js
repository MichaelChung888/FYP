import { Union, Record } from "../../fable_modules/fable-library.4.1.4/Types.js";
import { union_type, record_type, int32_type } from "../../fable_modules/fable-library.4.1.4/Reflection.js";
import { Cmd_none } from "../../fable_modules/Fable.Elmish.4.1.0/cmd.fs.js";
import { createElement } from "react";
import { rgba } from "../../fable_modules/Feliz.2.7.0/Colors.fs.js";
import { createObj } from "../../fable_modules/fable-library.4.1.4/Util.js";
import { Helpers_combineClasses } from "../../fable_modules/Feliz.Bulma.3.0.0/./ElementBuilders.fs.js";
import { RouterModule_nav } from "../../fable_modules/Feliz.Router.4.0.0/./Router.fs.js";
import { empty, append, cons, ofArray, singleton } from "../../fable_modules/fable-library.4.1.4/List.js";
import { Interop_reactApi } from "../../fable_modules/Feliz.2.7.0/./Interop.fs.js";
import { join } from "../../fable_modules/fable-library.4.1.4/String.js";

export class Model extends Record {
    constructor(test) {
        super();
        this.test = (test | 0);
    }
}

export function Model_$reflection() {
    return record_type("Projects.Model", [], Model, () => [["test", int32_type]]);
}

export class Msg extends Union {
    constructor(Item) {
        super();
        this.tag = 0;
        this.fields = [Item];
    }
    cases() {
        return ["Nothing"];
    }
}

export function Msg_$reflection() {
    return union_type("Projects.Msg", [], Msg, () => [[["Item", int32_type]]]);
}

export function init() {
    return [new Model(5), Cmd_none()];
}

export function update(msg, model) {
    const test = msg;
    return [model, Cmd_none()];
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

export const ProjectInput = createElement("div", createObj(Helpers_combineClasses("field", singleton((() => {
    let elems_1, elems;
    const elems_2 = [createElement("label", createObj(Helpers_combineClasses("label", singleton(["children", "Project Title"])))), createElement("div", createObj(ofArray([["className", join(" ", ["control", "has-icons-left"])], (elems_1 = [createElement("input", createObj(cons(["type", "text"], Helpers_combineClasses("input", ofArray([["required", true], ["placeholder", "Enter your Query"]]))))), createElement("span", createObj(Helpers_combineClasses("icon", ofArray([["className", "is-small"], ["className", "is-left"], (elems = [createElement("i", {
        className: "fas fa-lock",
    })], ["children", Interop_reactApi.Children.toArray(Array.from(elems))])]))))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_1))])])))];
    return ["children", Interop_reactApi.Children.toArray(Array.from(elems_2))];
})()))));

export const ProfessorInput = createElement("div", createObj(Helpers_combineClasses("field", singleton((() => {
    let elems_1, elems;
    const elems_2 = [createElement("label", createObj(Helpers_combineClasses("label", singleton(["children", "Professor Title"])))), createElement("div", createObj(ofArray([["className", join(" ", ["control", "has-icons-left"])], (elems_1 = [createElement("input", createObj(cons(["type", "text"], Helpers_combineClasses("input", ofArray([["required", true], ["placeholder", "Enter your Query"]]))))), createElement("span", createObj(Helpers_combineClasses("icon", ofArray([["className", "is-small"], ["className", "is-left"], (elems = [createElement("i", {
        className: "fas fa-lock",
    })], ["children", Interop_reactApi.Children.toArray(Array.from(elems))])]))))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_1))])])))];
    return ["children", Interop_reactApi.Children.toArray(Array.from(elems_2))];
})()))));

export const TileCss = ofArray([TurquoiseBackgroundRGBA(0.7), ["borderStyle", "solid"], ["borderColor", "#48D1CC"]]);

export const SearchButton = createElement("button", createObj(Helpers_combineClasses("button", ofArray([["className", "is-info"], ["children", "Search"]]))));

export function BulmaTag(styles, text) {
    return createElement("span", createObj(Helpers_combineClasses("tag", ofArray([["children", text], ["style", createObj(append(ofArray([["marginBottom", 10], ["marginRight", 10]]), styles))]]))));
}

export function BulmaTile(classes, styles, props) {
    return createElement("div", createObj(Helpers_combineClasses("tile", ofArray([["className", join(" ", classes)], ["style", createObj(styles)], ["children", Interop_reactApi.Children.toArray(Array.from(props))]]))));
}

export const Search = BulmaTile(singleton("is-ancestor"), empty(), singleton(BulmaTile(ofArray(["is-parent", "is-vertical"]), empty(), ofArray([BulmaTile(ofArray(["is-child", "box"]), TileCss, ofArray([ProjectInput, ProfessorInput])), BulmaTile(ofArray(["is-child", "box"]), TileCss, ofArray([createElement("label", createObj(Helpers_combineClasses("label", singleton(["children", "Relevant Modules and Skills"])))), BulmaTag(empty(), "Communications"), BulmaTag(empty(), "Information Processing"), BulmaTag(empty(), "Control Systems"), BulmaTag(empty(), "IAC"), BulmaTag(empty(), "Software Systems"), BulmaTag(empty(), "Discrete Maths"), BulmaTag(empty(), "Maths"), BulmaTag(empty(), "Software"), BulmaTag(empty(), "Hardware")])), BulmaTile(ofArray(["is-child", "box"]), TileCss, ofArray([createElement("label", createObj(Helpers_combineClasses("label", singleton(["children", "Degree"])))), BulmaTag(empty(), "MEng"), BulmaTag(empty(), "BEng")])), BulmaTile(singleton("is-child"), empty(), singleton(SearchButton))]))));

export function Table(body) {
    let elems_1;
    return createElement("div", createObj(ofArray([["style", {
        overflowY: "auto",
        height: 95 + "%",
    }], (elems_1 = [createElement("table", createObj(Helpers_combineClasses("table", ofArray([["style", {
        width: 100 + "%",
    }], ["children", Interop_reactApi.Children.toArray(Array.from(body))]]))))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_1))])])));
}

export const ProjectTable = Table(ofArray([(() => {
    let children;
    const children_2 = singleton((children = ofArray([createElement("th", {
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
    })));
    return createElement("thead", {
        children: Interop_reactApi.Children.toArray(Array.from(children_2)),
    });
})(), (() => {
    let children_4, value_20, children_6, value_26, children_8, value_32, children_10, value_38;
    const children_12 = ofArray([(children_4 = ofArray([createElement("td", {
        children: "A framework for the simulation and evaluation of dynamic bus routing",
    }), createElement("td", {
        children: "Cattafi,M.",
    }), createElement("td", {}), createElement("td", createObj(singleton((value_20 = "«Mobility-on-demand ridesharing services have transformed the transportation landscape by offering commuters the\r\n                                    convenience of point-to-point transportation, while at the same time being more efficient than private vehicles. However, the\r\n                                    benefits these services have to offer are fundamentally limited by their capacities, and are often seen as taxi equivalents.» [1]\r\n                                    In this project we consider «the concept of “dynamic bus routing” (DBR). Like ridesharing services, such buses would not follow\r\n                                    predefined routes nor schedules, but rather constantly generate their routes in real time to most efficiently serve commuters\'\r\n                                    travel patterns.» [1]\r\n                                    Attempts along similar lines were also made in London, for example the Citymapper Smartbus [2] which was discontinued for a\r\n                                    variety of reasons [3].\r\n                                    The main deliverable will be a simulation (including visualisation) and evaluation framework. Routing algorithms will also be\r\n                                    implemented and tested.\r\n                                    [1]: Koh et al., Dynamic Bus Routing: A study on the viability of on-demand high-capacity ridesharing as an alternative to fixedroute buses in Singapore\r\n                                    2018 21st International Conference on Intelligent Transportation Systems\r\n                                    https://ieeexplore.ieee.org/document/8569834\r\n                                    [2]: Introducing the Citymapper Smartbus, 2017\r\n                                    https://medium.com/citymapper/smartbus-7b6848241526\r\n                                    [3]: Ending Ride to focus on Pass, 2019\r\n                                    https://medium.com/@Citymapper/ending-ride-to-focus-on-pass-d9ada3021831", ["children", value_20]))))]), createElement("tr", {
        children: Interop_reactApi.Children.toArray(Array.from(children_4)),
    })), (children_6 = ofArray([createElement("td", {
        children: "Learning to control a pendulum with data-driven Model Predictive Control ",
    }), createElement("td", {
        children: "Angeli,D.",
    }), createElement("td", {}), createElement("td", createObj(singleton((value_26 = "Pendulums are examples of very non-linear and unstable processes and serve as a toy model of more complicated devices in\r\n                                    real-world applications. The goal of the project is to device a Predictive Control algorithm that gradually adapts and learns the\r\n                                    dynamics of the pendulum (nonlinear and hence \'new\' each time a different region in state-space is explored) in order to\r\n                                    balance it in the upwards position, viz. around an unstable equilibrium, or dampen it around the downwards position. This can\r\n                                    be challenging even in the presence of a model due to potential uncertainties and disturbances and we would like to compare\r\n                                    the traditional approach with one where the model is not assumed to be known, while the pendulum is treated as a black-box,\r\n                                    with as little prior information as possible.\r\n                                    Desirable Background: Control Engineering, Model predictive Control, Optimisation, MATLAB", ["children", value_26]))))]), createElement("tr", {
        children: Interop_reactApi.Children.toArray(Array.from(children_6)),
    })), (children_8 = ofArray([createElement("td", {
        children: "Learning to control a pendulum with data-driven Model Predictive Control ",
    }), createElement("td", {
        children: "Angeli,D.",
    }), createElement("td", {}), createElement("td", createObj(singleton((value_32 = "Pendulums are examples of very non-linear and unstable processes and serve as a toy model of more complicated devices in\r\n                                    real-world applications. The goal of the project is to device a Predictive Control algorithm that gradually adapts and learns the\r\n                                    dynamics of the pendulum (nonlinear and hence \'new\' each time a different region in state-space is explored) in order to\r\n                                    balance it in the upwards position, viz. around an unstable equilibrium, or dampen it around the downwards position. This can\r\n                                    be challenging even in the presence of a model due to potential uncertainties and disturbances and we would like to compare\r\n                                    the traditional approach with one where the model is not assumed to be known, while the pendulum is treated as a black-box,\r\n                                    with as little prior information as possible.\r\n                                    Desirable Background: Control Engineering, Model predictive Control, Optimisation, MATLAB", ["children", value_32]))))]), createElement("tr", {
        children: Interop_reactApi.Children.toArray(Array.from(children_8)),
    })), (children_10 = ofArray([createElement("td", {
        children: "Learning to control a pendulum with data-driven Model Predictive Control ",
    }), createElement("td", {
        children: "Angeli,D.",
    }), createElement("td", {}), createElement("td", createObj(singleton((value_38 = "Pendulums are examples of very non-linear and unstable processes and serve as a toy model of more complicated devices in\r\n                                    real-world applications. The goal of the project is to device a Predictive Control algorithm that gradually adapts and learns the\r\n                                    dynamics of the pendulum (nonlinear and hence \'new\' each time a different region in state-space is explored) in order to\r\n                                    balance it in the upwards position, viz. around an unstable equilibrium, or dampen it around the downwards position. This can\r\n                                    be challenging even in the presence of a model due to potential uncertainties and disturbances and we would like to compare\r\n                                    the traditional approach with one where the model is not assumed to be known, while the pendulum is treated as a black-box,\r\n                                    with as little prior information as possible.\r\n                                    Desirable Background: Control Engineering, Model predictive Control, Optimisation, MATLAB", ["children", value_38]))))]), createElement("tr", {
        children: Interop_reactApi.Children.toArray(Array.from(children_10)),
    }))]);
    return createElement("tbody", {
        children: Interop_reactApi.Children.toArray(Array.from(children_12)),
    });
})()]));

export function view(model, dispatch) {
    let elems_3, elems_2, elms;
    return createElement("body", createObj(ofArray([["style", {
        height: 100 + "vh",
        position: "relative",
    }], (elems_3 = [TurquoiseBackground(0.5), ImageBackground, NavBar, createElement("div", createObj(Helpers_combineClasses("columns", ofArray([["style", {
        height: 100 + "vh",
        padding: 1 + "%",
    }], (elems_2 = [createElement("div", createObj(Helpers_combineClasses("column", ofArray([["className", join(" ", ["is-3"])], ["children", Interop_reactApi.Children.toArray([Search])]])))), (elms = singleton(BulmaTile(singleton("is-ancestor"), singleton(["height", 100 + "%"]), singleton(BulmaTile(singleton("is-parent"), empty(), singleton(BulmaTile(ofArray(["is-child", "box"]), TileCss, ofArray([createElement("label", createObj(Helpers_combineClasses("label", singleton(["children", "Projects"])))), ProjectTable]))))))), createElement("div", {
        className: "column",
        children: Interop_reactApi.Children.toArray(Array.from(elms)),
    }))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_2))])]))))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_3))])])));
}

//# sourceMappingURL=Projects.fs.js.map
