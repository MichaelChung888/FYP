import { Union, Record } from "../../fable_modules/fable-library.4.1.4/Types.js";
import { union_type, class_type, record_type, string_type, list_type, bool_type } from "../../fable_modules/fable-library.4.1.4/Reflection.js";
import { Proposal_$reflection } from "../../../../Shared/Shared.fs.js";

export class Model extends Record {
    constructor(loading, proposals, token) {
        super();
        this.loading = loading;
        this.proposals = proposals;
        this.token = token;
    }
}

export function Model_$reflection() {
    return record_type("HomeSupervisorTypes.Model", [], Model, () => [["loading", bool_type], ["proposals", list_type(Proposal_$reflection())], ["token", string_type]]);
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
    return union_type("HomeSupervisorTypes.Msg", [], Msg, () => [[["Item", list_type(Proposal_$reflection())]], [["Item", class_type("System.Exception")]], []]);
}

//# sourceMappingURL=HomeSupervisorTypes.fs.js.map
