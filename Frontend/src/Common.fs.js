import { createElement } from "react";
import { createObj } from "./fable_modules/fable-library.4.1.4/Util.js";
import { rgba } from "./fable_modules/Feliz.2.7.0/Colors.fs.js";
import { join } from "./fable_modules/fable-library.4.1.4/String.js";
import { Interop_reactApi } from "./fable_modules/Feliz.2.7.0/./Interop.fs.js";
import { map as map_1, ofArray } from "./fable_modules/fable-library.4.1.4/List.js";
import { Helpers_combineClasses } from "./fable_modules/Feliz.Bulma.3.0.0/./ElementBuilders.fs.js";
import { Union } from "./fable_modules/fable-library.4.1.4/Types.js";
import { union_type } from "./fable_modules/fable-library.4.1.4/Reflection.js";
import { chunkBySize, map, toList } from "./fable_modules/fable-library.4.1.4/Seq.js";

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

export function BulmaTile(classes, styles, props) {
    return createElement("div", createObj(Helpers_combineClasses("tile", ofArray([["className", join(" ", classes)], ["style", createObj(styles)], ["children", Interop_reactApi.Children.toArray(Array.from(props))]]))));
}

export const TileCss = ofArray([TurquoiseBackgroundRGBA(0.7), ["borderStyle", "solid"], ["borderColor", "#48D1CC"]]);

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
    return union_type("Common.FilterType", [], FilterType, () => [[], []]);
}

export const categories = ofArray(["embedded_systems", "control_engineering", "electronics", "renewable_energy", "biomedical_engineering", "system_optimisation_and_modelling", "high_performance_computing", "computer_vision", "digital_signal_processing", "instrumentation_and_measurement", "cybersecurity", "robotics", "signal_processing", "power_systems", "machine_learning", "photonics", "other", "discrete_maths", "mathematics_signals_and_systems", "software_systems", "communications", "control_systems", "information_processing", "instruction_architectures_and_compilers", "circuit_and_systems", "power_electronics_and_power_systems", "electromagnetism"]);

export const streams = ofArray(["3E", "3I", "4T", "4D", "4J"]);

export function getFormattedCategory(_arg) {
    switch (_arg) {
        case "embedded_systems":
            return "Embedded Systems";
        case "control_engineering":
            return "Control Engineering";
        case "electronics":
            return "Electronics";
        case "renewable_energy":
            return "Renewable Energy";
        case "biomedical_engineering":
            return "Biomedical Engineering";
        case "system_optimisation_and_modelling":
            return "System Optimisation and Modelling";
        case "high_performance_computing":
            return "High Performance Computing";
        case "computer_vision":
            return "Computer Vision";
        case "digital_signal_processing":
            return "Digital Signal Processing";
        case "instrumentation_and_measurement":
            return "Instrumentation and Measurement";
        case "cybersecurity":
            return "Cybersecurity";
        case "robotics":
            return "Robotics";
        case "signal_processing":
            return "Signal Processing";
        case "power_systems":
            return "Power Systems";
        case "machine_learning":
            return "Machine Learning";
        case "photonics":
            return "Photonics";
        case "other":
            return "Other";
        case "discrete_maths":
            return "Discrete Maths";
        case "mathematics_signals_and_systems":
            return "Mathematics, Signals and Systems";
        case "software_systems":
            return "Software Systems";
        case "communications":
            return "Communications";
        case "control_systems":
            return "Control Systems";
        case "information_processing":
            return "Information Processing";
        case "instruction_architectures_and_compilers":
            return "Instruction Architectures and Compilers";
        case "circuit_and_systems":
            return "Circuit and Systems";
        case "power_electronics_and_power_systems":
            return "Power Electronics and Power Systems";
        case "electromagnetism":
            return "Electromagnetism";
        case "3E":
            return "EE BEng";
        case "3I":
            return "EIE BEng";
        case "4T":
            return "EE MEng Tech";
        case "4D":
            return "EE MEng Mangement";
        case "4J":
            return "EIE MEng";
        default:
            return "Unknown Category";
    }
}

export function splitStreams(streams_1) {
    return toList(map((chunk) => (chunk.join('')), chunkBySize(2, streams_1.split(""))));
}

export function Tag(filter) {
    return createElement("span", createObj(Helpers_combineClasses("tag", ofArray([["children", getFormattedCategory(filter)], ["style", {
        marginBottom: 10,
        marginRight: 10,
    }]]))));
}

export function TableCategories(categories_1) {
    return map_1(Tag, ofArray(categories_1.split(",")));
}

export function TableStreams(streams_1) {
    return map_1(Tag, splitStreams(streams_1));
}

export function Table(body) {
    let elems_1;
    return createElement("div", createObj(ofArray([["style", {
        overflowY: "auto",
        height: 95 + "%",
        overflowX: "hidden",
    }], ["className", join(" ", ["scrollbar"])], (elems_1 = [createElement("table", createObj(Helpers_combineClasses("table", ofArray([["style", {
        width: 100 + "%",
    }], ["children", Interop_reactApi.Children.toArray(Array.from(body))]]))))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_1))])])));
}

export function isStudent(user) {
    const matchValue = user.categ;
    switch (matchValue) {
        case "U":
        case "M":
            return true;
        default:
            return false;
    }
}

//# sourceMappingURL=Common.fs.js.map
