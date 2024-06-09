import { Record } from "../Frontend/src/fable_modules/fable-library.4.1.4/Types.js";
import { class_type, int32_type, list_type, record_type, string_type } from "../Frontend/src/fable_modules/fable-library.4.1.4/Reflection.js";
import { list as list_2, object } from "../Frontend/src/fable_modules/Thoth.Json.10.2.0/Encode.fs.js";
import { datetimeLocal, int, string, object as object_1 } from "../Frontend/src/fable_modules/Thoth.Json.10.2.0/Decode.fs.js";
import { map } from "../Frontend/src/fable_modules/fable-library.4.1.4/List.js";
import { uncurry2 } from "../Frontend/src/fable_modules/fable-library.4.1.4/Util.js";
import { now } from "../Frontend/src/fable_modules/fable-library.4.1.4/Date.js";

export class LoginRequest extends Record {
    constructor(eeid) {
        super();
        this.eeid = eeid;
    }
}

export function LoginRequest_$reflection() {
    return record_type("Shared.LoginRequest", [], LoginRequest, () => [["eeid", string_type]]);
}

export function LoginRequest_Encoder_5FEF25F0(loginInfo) {
    return object([["eeid", loginInfo.eeid]]);
}

export function LoginRequest_get_Decoder() {
    return (path_1) => ((v) => object_1((json) => {
        let objectArg;
        return new LoginRequest((objectArg = json.Required, objectArg.Field("eeid", string)));
    }, path_1, v));
}

export function encodeStringList(list) {
    return list_2(map((value) => value, list));
}

export class SearchRequest extends Record {
    constructor(title, categories, streams) {
        super();
        this.title = title;
        this.categories = categories;
        this.streams = streams;
    }
}

export function SearchRequest_$reflection() {
    return record_type("Shared.SearchRequest", [], SearchRequest, () => [["title", string_type], ["categories", list_type(string_type)], ["streams", list_type(string_type)]]);
}

export function SearchRequest_Encoder_Z1D255B23(searchRequest) {
    return object([["title", searchRequest.title], ["categories", encodeStringList(searchRequest.categories)], ["streams", encodeStringList(searchRequest.streams)]]);
}

export class Person extends Record {
    constructor(eeid, cid, categ, regWant, forenames) {
        super();
        this.eeid = eeid;
        this.cid = cid;
        this.categ = categ;
        this.regWant = regWant;
        this.forenames = forenames;
    }
}

export function Person_$reflection() {
    return record_type("Shared.Person", [], Person, () => [["eeid", string_type], ["cid", string_type], ["categ", string_type], ["regWant", string_type], ["forenames", string_type]]);
}

export function Person_Encoder_Z53D45349(accountInfo) {
    return object([["eeid", accountInfo.eeid], ["cid", accountInfo.cid], ["categ", accountInfo.categ], ["regWant", accountInfo.regWant], ["forenames", accountInfo.forenames]]);
}

export function Person_get_Decoder() {
    return (path_5) => ((v) => object_1((json) => {
        let objectArg, objectArg_1, objectArg_2, objectArg_3, objectArg_4;
        return new Person((objectArg = json.Required, objectArg.Field("eeid", string)), (objectArg_1 = json.Required, objectArg_1.Field("cid", string)), (objectArg_2 = json.Required, objectArg_2.Field("categ", string)), (objectArg_3 = json.Required, objectArg_3.Field("regWant", string)), (objectArg_4 = json.Required, objectArg_4.Field("forenames", string)));
    }, path_5, v));
}

export class Account extends Record {
    constructor(person, token) {
        super();
        this.person = person;
        this.token = token;
    }
}

export function Account_$reflection() {
    return record_type("Shared.Account", [], Account, () => [["person", Person_$reflection()], ["token", string_type]]);
}

export function Account_Encoder_8C241E3(loginResponse) {
    return object([["person", Person_Encoder_Z53D45349(loginResponse.person)], ["token", loginResponse.token]]);
}

export function Account_get_Decoder() {
    return (path_1) => ((v) => object_1((json) => {
        let arg_1, objectArg, objectArg_1;
        return new Account((arg_1 = Person_get_Decoder(), (objectArg = json.Required, objectArg.Field("person", uncurry2(arg_1)))), (objectArg_1 = json.Required, objectArg_1.Field("token", string)));
    }, path_1, v));
}

export class Project extends Record {
    constructor(pid, title, comments, tstream, student, descr, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, categories, updated, requirements, skills, meetings) {
        super();
        this.pid = pid;
        this.title = title;
        this.comments = comments;
        this.tstream = tstream;
        this.student = student;
        this.descr = descr;
        this.p1 = (p1 | 0);
        this.p2 = (p2 | 0);
        this.p3 = (p3 | 0);
        this.p4 = (p4 | 0);
        this.p5 = (p5 | 0);
        this.p6 = (p6 | 0);
        this.p7 = (p7 | 0);
        this.p8 = (p8 | 0);
        this.p9 = (p9 | 0);
        this.p10 = (p10 | 0);
        this.categories = categories;
        this.updated = updated;
        this.requirements = requirements;
        this.skills = skills;
        this.meetings = meetings;
    }
}

export function Project_$reflection() {
    return record_type("Shared.Project", [], Project, () => [["pid", string_type], ["title", string_type], ["comments", string_type], ["tstream", string_type], ["student", string_type], ["descr", string_type], ["p1", int32_type], ["p2", int32_type], ["p3", int32_type], ["p4", int32_type], ["p5", int32_type], ["p6", int32_type], ["p7", int32_type], ["p8", int32_type], ["p9", int32_type], ["p10", int32_type], ["categories", string_type], ["updated", class_type("System.DateTime")], ["requirements", string_type], ["skills", string_type], ["meetings", string_type]]);
}

export function Project_get_Decoder() {
    return (path_11) => ((v) => object_1((json) => {
        let objectArg, objectArg_1, objectArg_2, objectArg_3, objectArg_4, objectArg_5, objectArg_6, objectArg_7, objectArg_8, objectArg_9, objectArg_10, objectArg_11, objectArg_12, objectArg_13, objectArg_14, objectArg_15, objectArg_16, objectArg_17, objectArg_18, objectArg_19, objectArg_20;
        return new Project((objectArg = json.Required, objectArg.Field("pid", string)), (objectArg_1 = json.Required, objectArg_1.Field("title", string)), (objectArg_2 = json.Required, objectArg_2.Field("comments", string)), (objectArg_3 = json.Required, objectArg_3.Field("tstream", string)), (objectArg_4 = json.Required, objectArg_4.Field("student", string)), (objectArg_5 = json.Required, objectArg_5.Field("descr", string)), (objectArg_6 = json.Required, objectArg_6.Field("p1", uncurry2(int))), (objectArg_7 = json.Required, objectArg_7.Field("p2", uncurry2(int))), (objectArg_8 = json.Required, objectArg_8.Field("p3", uncurry2(int))), (objectArg_9 = json.Required, objectArg_9.Field("p4", uncurry2(int))), (objectArg_10 = json.Required, objectArg_10.Field("p5", uncurry2(int))), (objectArg_11 = json.Required, objectArg_11.Field("p6", uncurry2(int))), (objectArg_12 = json.Required, objectArg_12.Field("p7", uncurry2(int))), (objectArg_13 = json.Required, objectArg_13.Field("p8", uncurry2(int))), (objectArg_14 = json.Required, objectArg_14.Field("p9", uncurry2(int))), (objectArg_15 = json.Required, objectArg_15.Field("p10", uncurry2(int))), (objectArg_16 = json.Required, objectArg_16.Field("categories", string)), (objectArg_17 = json.Required, objectArg_17.Field("updated", datetimeLocal)), (objectArg_18 = json.Required, objectArg_18.Field("requirements", string)), (objectArg_19 = json.Required, objectArg_19.Field("skills", string)), (objectArg_20 = json.Required, objectArg_20.Field("meetings", string)));
    }, path_11, v));
}

export function Project_get_Default() {
    return new Project("-", "", "", "", "", "", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, "", now(), "", "", "");
}

export class Preference extends Record {
    constructor(eeid, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, n1, n2, n3, n4, n5, n6, n7, n8, n9, n10, upddate, comments, feedback) {
        super();
        this.eeid = eeid;
        this.p1 = p1;
        this.p2 = p2;
        this.p3 = p3;
        this.p4 = p4;
        this.p5 = p5;
        this.p6 = p6;
        this.p7 = p7;
        this.p8 = p8;
        this.p9 = p9;
        this.p10 = p10;
        this.n1 = (n1 | 0);
        this.n2 = (n2 | 0);
        this.n3 = (n3 | 0);
        this.n4 = (n4 | 0);
        this.n5 = (n5 | 0);
        this.n6 = (n6 | 0);
        this.n7 = (n7 | 0);
        this.n8 = (n8 | 0);
        this.n9 = (n9 | 0);
        this.n10 = (n10 | 0);
        this.upddate = upddate;
        this.comments = comments;
        this.feedback = feedback;
    }
}

export function Preference_$reflection() {
    return record_type("Shared.Preference", [], Preference, () => [["eeid", string_type], ["p1", string_type], ["p2", string_type], ["p3", string_type], ["p4", string_type], ["p5", string_type], ["p6", string_type], ["p7", string_type], ["p8", string_type], ["p9", string_type], ["p10", string_type], ["n1", int32_type], ["n2", int32_type], ["n3", int32_type], ["n4", int32_type], ["n5", int32_type], ["n6", int32_type], ["n7", int32_type], ["n8", int32_type], ["n9", int32_type], ["n10", int32_type], ["upddate", class_type("System.DateTime")], ["comments", string_type], ["feedback", string_type]]);
}

export function Preference_get_Decoder() {
    return (path_14) => ((v) => object_1((json) => {
        let objectArg, objectArg_1, objectArg_2, objectArg_3, objectArg_4, objectArg_5, objectArg_6, objectArg_7, objectArg_8, objectArg_9, objectArg_10, objectArg_11, objectArg_12, objectArg_13, objectArg_14, objectArg_15, objectArg_16, objectArg_17, objectArg_18, objectArg_19, objectArg_20, objectArg_21, objectArg_22, objectArg_23;
        return new Preference((objectArg = json.Required, objectArg.Field("eeid", string)), (objectArg_1 = json.Required, objectArg_1.Field("p1", string)), (objectArg_2 = json.Required, objectArg_2.Field("p2", string)), (objectArg_3 = json.Required, objectArg_3.Field("p3", string)), (objectArg_4 = json.Required, objectArg_4.Field("p4", string)), (objectArg_5 = json.Required, objectArg_5.Field("p5", string)), (objectArg_6 = json.Required, objectArg_6.Field("p6", string)), (objectArg_7 = json.Required, objectArg_7.Field("p7", string)), (objectArg_8 = json.Required, objectArg_8.Field("p8", string)), (objectArg_9 = json.Required, objectArg_9.Field("p9", string)), (objectArg_10 = json.Required, objectArg_10.Field("p10", string)), (objectArg_11 = json.Required, objectArg_11.Field("n1", uncurry2(int))), (objectArg_12 = json.Required, objectArg_12.Field("n2", uncurry2(int))), (objectArg_13 = json.Required, objectArg_13.Field("n3", uncurry2(int))), (objectArg_14 = json.Required, objectArg_14.Field("n4", uncurry2(int))), (objectArg_15 = json.Required, objectArg_15.Field("n5", uncurry2(int))), (objectArg_16 = json.Required, objectArg_16.Field("n6", uncurry2(int))), (objectArg_17 = json.Required, objectArg_17.Field("n7", uncurry2(int))), (objectArg_18 = json.Required, objectArg_18.Field("n8", uncurry2(int))), (objectArg_19 = json.Required, objectArg_19.Field("n9", uncurry2(int))), (objectArg_20 = json.Required, objectArg_20.Field("n10", uncurry2(int))), (objectArg_21 = json.Required, objectArg_21.Field("upddate", datetimeLocal)), (objectArg_22 = json.Required, objectArg_22.Field("comments", string)), (objectArg_23 = json.Required, objectArg_23.Field("feedback", string)));
    }, path_14, v));
}

export class PreferenceResponse extends Record {
    constructor(eeid, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, n1, n2, n3, n4, n5, n6, n7, n8, n9, n10, upddate, comments, feedback) {
        super();
        this.eeid = eeid;
        this.p1 = p1;
        this.p2 = p2;
        this.p3 = p3;
        this.p4 = p4;
        this.p5 = p5;
        this.p6 = p6;
        this.p7 = p7;
        this.p8 = p8;
        this.p9 = p9;
        this.p10 = p10;
        this.n1 = (n1 | 0);
        this.n2 = (n2 | 0);
        this.n3 = (n3 | 0);
        this.n4 = (n4 | 0);
        this.n5 = (n5 | 0);
        this.n6 = (n6 | 0);
        this.n7 = (n7 | 0);
        this.n8 = (n8 | 0);
        this.n9 = (n9 | 0);
        this.n10 = (n10 | 0);
        this.upddate = upddate;
        this.comments = comments;
        this.feedback = feedback;
    }
}

export function PreferenceResponse_$reflection() {
    return record_type("Shared.PreferenceResponse", [], PreferenceResponse, () => [["eeid", string_type], ["p1", Project_$reflection()], ["p2", Project_$reflection()], ["p3", Project_$reflection()], ["p4", Project_$reflection()], ["p5", Project_$reflection()], ["p6", Project_$reflection()], ["p7", Project_$reflection()], ["p8", Project_$reflection()], ["p9", Project_$reflection()], ["p10", Project_$reflection()], ["n1", int32_type], ["n2", int32_type], ["n3", int32_type], ["n4", int32_type], ["n5", int32_type], ["n6", int32_type], ["n7", int32_type], ["n8", int32_type], ["n9", int32_type], ["n10", int32_type], ["upddate", class_type("System.DateTime")], ["comments", string_type], ["feedback", string_type]]);
}

export function PreferenceResponse_get_Decoder() {
    return (path_4) => ((v) => object_1((json) => {
        let objectArg, arg_3, objectArg_1, arg_5, objectArg_2, arg_7, objectArg_3, arg_9, objectArg_4, arg_11, objectArg_5, arg_13, objectArg_6, arg_15, objectArg_7, arg_17, objectArg_8, arg_19, objectArg_9, arg_21, objectArg_10, objectArg_11, objectArg_12, objectArg_13, objectArg_14, objectArg_15, objectArg_16, objectArg_17, objectArg_18, objectArg_19, objectArg_20, objectArg_21, objectArg_22, objectArg_23;
        return new PreferenceResponse((objectArg = json.Required, objectArg.Field("eeid", string)), (arg_3 = Project_get_Decoder(), (objectArg_1 = json.Required, objectArg_1.Field("p1", uncurry2(arg_3)))), (arg_5 = Project_get_Decoder(), (objectArg_2 = json.Required, objectArg_2.Field("p2", uncurry2(arg_5)))), (arg_7 = Project_get_Decoder(), (objectArg_3 = json.Required, objectArg_3.Field("p3", uncurry2(arg_7)))), (arg_9 = Project_get_Decoder(), (objectArg_4 = json.Required, objectArg_4.Field("p4", uncurry2(arg_9)))), (arg_11 = Project_get_Decoder(), (objectArg_5 = json.Required, objectArg_5.Field("p5", uncurry2(arg_11)))), (arg_13 = Project_get_Decoder(), (objectArg_6 = json.Required, objectArg_6.Field("p6", uncurry2(arg_13)))), (arg_15 = Project_get_Decoder(), (objectArg_7 = json.Required, objectArg_7.Field("p7", uncurry2(arg_15)))), (arg_17 = Project_get_Decoder(), (objectArg_8 = json.Required, objectArg_8.Field("p8", uncurry2(arg_17)))), (arg_19 = Project_get_Decoder(), (objectArg_9 = json.Required, objectArg_9.Field("p9", uncurry2(arg_19)))), (arg_21 = Project_get_Decoder(), (objectArg_10 = json.Required, objectArg_10.Field("p10", uncurry2(arg_21)))), (objectArg_11 = json.Required, objectArg_11.Field("n1", uncurry2(int))), (objectArg_12 = json.Required, objectArg_12.Field("n2", uncurry2(int))), (objectArg_13 = json.Required, objectArg_13.Field("n3", uncurry2(int))), (objectArg_14 = json.Required, objectArg_14.Field("n4", uncurry2(int))), (objectArg_15 = json.Required, objectArg_15.Field("n5", uncurry2(int))), (objectArg_16 = json.Required, objectArg_16.Field("n6", uncurry2(int))), (objectArg_17 = json.Required, objectArg_17.Field("n7", uncurry2(int))), (objectArg_18 = json.Required, objectArg_18.Field("n8", uncurry2(int))), (objectArg_19 = json.Required, objectArg_19.Field("n9", uncurry2(int))), (objectArg_20 = json.Required, objectArg_20.Field("n10", uncurry2(int))), (objectArg_21 = json.Required, objectArg_21.Field("upddate", datetimeLocal)), (objectArg_22 = json.Required, objectArg_22.Field("comments", string)), (objectArg_23 = json.Required, objectArg_23.Field("feedback", string)));
    }, path_4, v));
}

export function PreferenceResponse_get_Default() {
    return new PreferenceResponse("", Project_get_Default(), Project_get_Default(), Project_get_Default(), Project_get_Default(), Project_get_Default(), Project_get_Default(), Project_get_Default(), Project_get_Default(), Project_get_Default(), Project_get_Default(), 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, now(), "", "");
}

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
        case "E":
            return "EEE3";
        case "I":
            return "EIE3";
        case "T":
            return "TECH4";
        case "D":
            return "MANGEMENT4";
        case "J":
            return "EIE4";
        default:
            return "Unknown Category";
    }
}

//# sourceMappingURL=Shared.fs.js.map
