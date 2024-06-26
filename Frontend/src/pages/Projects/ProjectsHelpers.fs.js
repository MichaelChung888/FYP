import { empty, singleton, append, delay, chunkBySize, map, toList } from "../../fable_modules/fable-library.4.1.4/Seq.js";
import { createElement } from "react";
import { createObj } from "../../fable_modules/fable-library.4.1.4/Util.js";
import { Helpers_combineClasses } from "../../fable_modules/Feliz.Bulma.3.0.0/./ElementBuilders.fs.js";
import { getFormattedCategory } from "../../Common.fs.js";
import { ofArray, map as map_1, append as append_1, exists } from "../../fable_modules/fable-library.4.1.4/List.js";

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

export function splitStreams(streams) {
    return toList(map((chunk) => (chunk.join('')), chunkBySize(2, streams.split(""))));
}

export function Tag(model, filter) {
    return createElement("span", createObj(Helpers_combineClasses("tag", toList(delay(() => append(singleton(["children", getFormattedCategory(filter)]), delay(() => append(singleton(["style", {
        marginBottom: 10,
        marginRight: 10,
    }]), delay(() => (exists((c) => (c === filter), append_1(model.selectedCategories, model.selectedStreams)) ? singleton(["className", "is-info"]) : empty()))))))))));
}

export function TableCategories(model, categories) {
    return map_1((filter) => Tag(model, filter), ofArray(categories.split(",")));
}

export function TableStreams(model, streams) {
    return map_1((filter) => Tag(model, filter), splitStreams(streams));
}

//# sourceMappingURL=ProjectsHelpers.fs.js.map
