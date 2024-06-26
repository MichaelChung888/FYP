import { Union, Record } from "../../fable_modules/fable-library.4.1.4/Types.js";
import { union_type, class_type, record_type, string_type, list_type, bool_type } from "../../fable_modules/fable-library.4.1.4/Reflection.js";
import { PreferenceResponse_$reflection, Project_$reflection } from "../../../../Shared/Shared.fs.js";

export class Model extends Record {
    constructor(loading, projects, preference, token) {
        super();
        this.loading = loading;
        this.projects = projects;
        this.preference = preference;
        this.token = token;
    }
}

export function Model_$reflection() {
    return record_type("HomeStudentTypes.Model", [], Model, () => [["loading", bool_type], ["projects", list_type(Project_$reflection())], ["preference", PreferenceResponse_$reflection()], ["token", string_type]]);
}

export class InitalLoad extends Record {
    constructor(projects, preference) {
        super();
        this.projects = projects;
        this.preference = preference;
    }
}

export function InitalLoad_$reflection() {
    return record_type("HomeStudentTypes.InitalLoad", [], InitalLoad, () => [["projects", list_type(Project_$reflection())], ["preference", PreferenceResponse_$reflection()]]);
}

export class Msg extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["SuccessLoad", "Error", "Logout"];
    }
}

export function Msg_$reflection() {
    return union_type("HomeStudentTypes.Msg", [], Msg, () => [[["Item", InitalLoad_$reflection()]], [["Item", class_type("System.Exception")]], []]);
}

//# sourceMappingURL=HomeStudentTypes.fs.js.map
