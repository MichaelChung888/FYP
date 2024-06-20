import { Union, Record } from "../Frontend/src/fable_modules/fable-library.4.1.4/Types.js";
import { union_type, class_type, int32_type, bool_type, list_type, record_type, string_type } from "../Frontend/src/fable_modules/fable-library.4.1.4/Reflection.js";
import { list as list_2, object } from "../Frontend/src/fable_modules/Thoth.Json.10.2.0/Encode.fs.js";
import { bool, datetimeLocal, int, string, object as object_1 } from "../Frontend/src/fable_modules/Thoth.Json.10.2.0/Decode.fs.js";
import { ofArray, map } from "../Frontend/src/fable_modules/fable-library.4.1.4/List.js";
import { uncurry2, int32ToString } from "../Frontend/src/fable_modules/fable-library.4.1.4/Util.js";
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
    constructor(title, professor, categories, streams) {
        super();
        this.title = title;
        this.professor = professor;
        this.categories = categories;
        this.streams = streams;
    }
}

export function SearchRequest_$reflection() {
    return record_type("Shared.SearchRequest", [], SearchRequest, () => [["title", string_type], ["professor", string_type], ["categories", list_type(string_type)], ["streams", list_type(string_type)]]);
}

export function SearchRequest_Encoder_Z1D255B23(searchRequest) {
    return object([["title", searchRequest.title], ["professor", searchRequest.professor], ["categories", encodeStringList(searchRequest.categories)], ["streams", encodeStringList(searchRequest.streams)]]);
}

export function encodeIntList(list) {
    return list_2(map((value) => value, list));
}

export class SavePreferenceRequest extends Record {
    constructor(comments, doc, preference, newPreference, newPreferenceRanks) {
        super();
        this.comments = comments;
        this.doc = doc;
        this.preference = preference;
        this.newPreference = newPreference;
        this.newPreferenceRanks = newPreferenceRanks;
    }
}

export function SavePreferenceRequest_$reflection() {
    return record_type("Shared.SavePreferenceRequest", [], SavePreferenceRequest, () => [["comments", string_type], ["doc", bool_type], ["preference", list_type(int32_type)], ["newPreference", list_type(int32_type)], ["newPreferenceRanks", list_type(int32_type)]]);
}

export function SavePreferenceRequest_Encoder_6A67AF29(savePreferenceRequest) {
    return object([["comments", savePreferenceRequest.comments], ["doc", savePreferenceRequest.doc], ["preference", encodeIntList(savePreferenceRequest.preference)], ["newPreference", encodeIntList(savePreferenceRequest.newPreference)], ["newPreferenceRanks", encodeIntList(savePreferenceRequest.newPreferenceRanks)]]);
}

export class AddPreferenceRequest extends Record {
    constructor(preference, newPreference, newPreferenceRankWhere) {
        super();
        this.preference = (preference | 0);
        this.newPreference = (newPreference | 0);
        this.newPreferenceRankWhere = (newPreferenceRankWhere | 0);
    }
}

export function AddPreferenceRequest_$reflection() {
    return record_type("Shared.AddPreferenceRequest", [], AddPreferenceRequest, () => [["preference", int32_type], ["newPreference", int32_type], ["newPreferenceRankWhere", int32_type]]);
}

export function AddPreferenceRequest_Encoder_5C6A6B69(addPreferenceRequest) {
    return object([["preference", int32ToString(addPreferenceRequest.preference)], ["newPreference", int32ToString(addPreferenceRequest.newPreference)], ["newPreferenceRank", addPreferenceRequest.newPreferenceRankWhere]]);
}

export class ProjectProposeRequest extends Record {
    constructor(isStudent, title, categories, streams, requirements, description, skills, meetings) {
        super();
        this.isStudent = isStudent;
        this.title = title;
        this.categories = categories;
        this.streams = streams;
        this.requirements = requirements;
        this.description = description;
        this.skills = skills;
        this.meetings = meetings;
    }
}

export function ProjectProposeRequest_$reflection() {
    return record_type("Shared.ProjectProposeRequest", [], ProjectProposeRequest, () => [["isStudent", bool_type], ["title", string_type], ["categories", list_type(string_type)], ["streams", list_type(string_type)], ["requirements", string_type], ["description", string_type], ["skills", string_type], ["meetings", string_type]]);
}

export function ProjectProposeRequest_Encoder_Z37BC34FE(studentPreferenceRequest) {
    return object([["title", studentPreferenceRequest.title], ["isStudent", studentPreferenceRequest.isStudent], ["categories", encodeStringList(studentPreferenceRequest.categories)], ["streams", encodeStringList(studentPreferenceRequest.streams)], ["requirements", studentPreferenceRequest.requirements], ["description", studentPreferenceRequest.description], ["skills", studentPreferenceRequest.skills], ["meetings", studentPreferenceRequest.meetings]]);
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

export function Account_get_Decoder() {
    return (path_1) => ((v) => object_1((json) => {
        let arg_1, objectArg, objectArg_1;
        return new Account((arg_1 = Person_get_Decoder(), (objectArg = json.Required, objectArg.Field("person", uncurry2(arg_1)))), (objectArg_1 = json.Required, objectArg_1.Field("token", string)));
    }, path_1, v));
}

export class Project extends Record {
    constructor(pid, sup, supName, title, comments, tstream, student, descr, r1, r2, r3, r4, r5, r6, r7, r8, r9, r10, categories, updated, requirements, skills, meetings) {
        super();
        this.pid = (pid | 0);
        this.sup = sup;
        this.supName = supName;
        this.title = title;
        this.comments = comments;
        this.tstream = tstream;
        this.student = student;
        this.descr = descr;
        this.r1 = (r1 | 0);
        this.r2 = (r2 | 0);
        this.r3 = (r3 | 0);
        this.r4 = (r4 | 0);
        this.r5 = (r5 | 0);
        this.r6 = (r6 | 0);
        this.r7 = (r7 | 0);
        this.r8 = (r8 | 0);
        this.r9 = (r9 | 0);
        this.r10 = (r10 | 0);
        this.categories = categories;
        this.updated = updated;
        this.requirements = requirements;
        this.skills = skills;
        this.meetings = meetings;
    }
}

export function Project_$reflection() {
    return record_type("Shared.Project", [], Project, () => [["pid", int32_type], ["sup", string_type], ["supName", string_type], ["title", string_type], ["comments", string_type], ["tstream", string_type], ["student", string_type], ["descr", string_type], ["r1", int32_type], ["r2", int32_type], ["r3", int32_type], ["r4", int32_type], ["r5", int32_type], ["r6", int32_type], ["r7", int32_type], ["r8", int32_type], ["r9", int32_type], ["r10", int32_type], ["categories", string_type], ["updated", class_type("System.DateTime")], ["requirements", string_type], ["skills", string_type], ["meetings", string_type]]);
}

export function Project_get_Decoder() {
    return (path_12) => ((v) => object_1((json) => {
        let objectArg, objectArg_1, objectArg_2, objectArg_3, objectArg_4, objectArg_5, objectArg_6, objectArg_7, objectArg_8, objectArg_9, objectArg_10, objectArg_11, objectArg_12, objectArg_13, objectArg_14, objectArg_15, objectArg_16, objectArg_17, objectArg_18, objectArg_19, objectArg_20, objectArg_21, objectArg_22;
        return new Project((objectArg = json.Required, objectArg.Field("pid", uncurry2(int))), (objectArg_1 = json.Required, objectArg_1.Field("sup", string)), (objectArg_2 = json.Required, objectArg_2.Field("supName", string)), (objectArg_3 = json.Required, objectArg_3.Field("title", string)), (objectArg_4 = json.Required, objectArg_4.Field("comments", string)), (objectArg_5 = json.Required, objectArg_5.Field("tstream", string)), (objectArg_6 = json.Required, objectArg_6.Field("student", string)), (objectArg_7 = json.Required, objectArg_7.Field("descr", string)), (objectArg_8 = json.Required, objectArg_8.Field("r1", uncurry2(int))), (objectArg_9 = json.Required, objectArg_9.Field("r2", uncurry2(int))), (objectArg_10 = json.Required, objectArg_10.Field("r3", uncurry2(int))), (objectArg_11 = json.Required, objectArg_11.Field("r4", uncurry2(int))), (objectArg_12 = json.Required, objectArg_12.Field("r5", uncurry2(int))), (objectArg_13 = json.Required, objectArg_13.Field("r6", uncurry2(int))), (objectArg_14 = json.Required, objectArg_14.Field("r7", uncurry2(int))), (objectArg_15 = json.Required, objectArg_15.Field("r8", uncurry2(int))), (objectArg_16 = json.Required, objectArg_16.Field("r9", uncurry2(int))), (objectArg_17 = json.Required, objectArg_17.Field("r10", uncurry2(int))), (objectArg_18 = json.Required, objectArg_18.Field("categories", string)), (objectArg_19 = json.Required, objectArg_19.Field("updated", datetimeLocal)), (objectArg_20 = json.Required, objectArg_20.Field("requirements", string)), (objectArg_21 = json.Required, objectArg_21.Field("skills", string)), (objectArg_22 = json.Required, objectArg_22.Field("meetings", string)));
    }, path_12, v));
}

export function Project_get_Default() {
    return new Project(0, "", "", "", "", "", "", "", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, "", now(), "", "", "");
}

export class Preference extends Record {
    constructor(eeid, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, n1, n2, n3, n4, n5, n6, n7, n8, n9, n10, upddate, comments, feedback, doc) {
        super();
        this.eeid = eeid;
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
        this.doc = doc;
    }
}

export function Preference_$reflection() {
    return record_type("Shared.Preference", [], Preference, () => [["eeid", string_type], ["p1", int32_type], ["p2", int32_type], ["p3", int32_type], ["p4", int32_type], ["p5", int32_type], ["p6", int32_type], ["p7", int32_type], ["p8", int32_type], ["p9", int32_type], ["p10", int32_type], ["n1", int32_type], ["n2", int32_type], ["n3", int32_type], ["n4", int32_type], ["n5", int32_type], ["n6", int32_type], ["n7", int32_type], ["n8", int32_type], ["n9", int32_type], ["n10", int32_type], ["upddate", class_type("System.DateTime")], ["comments", string_type], ["feedback", string_type], ["doc", bool_type]]);
}

export function Preference_get_Decoder() {
    return (path_5) => ((v) => object_1((json) => {
        let objectArg, objectArg_1, objectArg_2, objectArg_3, objectArg_4, objectArg_5, objectArg_6, objectArg_7, objectArg_8, objectArg_9, objectArg_10, objectArg_11, objectArg_12, objectArg_13, objectArg_14, objectArg_15, objectArg_16, objectArg_17, objectArg_18, objectArg_19, objectArg_20, objectArg_21, objectArg_22, objectArg_23, objectArg_24;
        return new Preference((objectArg = json.Required, objectArg.Field("eeid", string)), (objectArg_1 = json.Required, objectArg_1.Field("p1", uncurry2(int))), (objectArg_2 = json.Required, objectArg_2.Field("p2", uncurry2(int))), (objectArg_3 = json.Required, objectArg_3.Field("p3", uncurry2(int))), (objectArg_4 = json.Required, objectArg_4.Field("p4", uncurry2(int))), (objectArg_5 = json.Required, objectArg_5.Field("p5", uncurry2(int))), (objectArg_6 = json.Required, objectArg_6.Field("p6", uncurry2(int))), (objectArg_7 = json.Required, objectArg_7.Field("p7", uncurry2(int))), (objectArg_8 = json.Required, objectArg_8.Field("p8", uncurry2(int))), (objectArg_9 = json.Required, objectArg_9.Field("p9", uncurry2(int))), (objectArg_10 = json.Required, objectArg_10.Field("p10", uncurry2(int))), (objectArg_11 = json.Required, objectArg_11.Field("n1", uncurry2(int))), (objectArg_12 = json.Required, objectArg_12.Field("n2", uncurry2(int))), (objectArg_13 = json.Required, objectArg_13.Field("n3", uncurry2(int))), (objectArg_14 = json.Required, objectArg_14.Field("n4", uncurry2(int))), (objectArg_15 = json.Required, objectArg_15.Field("n5", uncurry2(int))), (objectArg_16 = json.Required, objectArg_16.Field("n6", uncurry2(int))), (objectArg_17 = json.Required, objectArg_17.Field("n7", uncurry2(int))), (objectArg_18 = json.Required, objectArg_18.Field("n8", uncurry2(int))), (objectArg_19 = json.Required, objectArg_19.Field("n9", uncurry2(int))), (objectArg_20 = json.Required, objectArg_20.Field("n10", uncurry2(int))), (objectArg_21 = json.Required, objectArg_21.Field("upddate", datetimeLocal)), (objectArg_22 = json.Required, objectArg_22.Field("comments", string)), (objectArg_23 = json.Required, objectArg_23.Field("feedback", string)), (objectArg_24 = json.Required, objectArg_24.Field("doc", bool)));
    }, path_5, v));
}

export class PreferenceResponse extends Record {
    constructor(eeid, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, n1, n2, n3, n4, n5, n6, n7, n8, n9, n10, upddate, comments, feedback, doc) {
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
        this.doc = doc;
    }
}

export function PreferenceResponse_$reflection() {
    return record_type("Shared.PreferenceResponse", [], PreferenceResponse, () => [["eeid", string_type], ["p1", Project_$reflection()], ["p2", Project_$reflection()], ["p3", Project_$reflection()], ["p4", Project_$reflection()], ["p5", Project_$reflection()], ["p6", Project_$reflection()], ["p7", Project_$reflection()], ["p8", Project_$reflection()], ["p9", Project_$reflection()], ["p10", Project_$reflection()], ["n1", int32_type], ["n2", int32_type], ["n3", int32_type], ["n4", int32_type], ["n5", int32_type], ["n6", int32_type], ["n7", int32_type], ["n8", int32_type], ["n9", int32_type], ["n10", int32_type], ["upddate", class_type("System.DateTime")], ["comments", string_type], ["feedback", string_type], ["doc", bool_type]]);
}

export function PreferenceResponse_get_Decoder() {
    return (path_5) => ((v) => object_1((json) => {
        let objectArg, arg_3, objectArg_1, arg_5, objectArg_2, arg_7, objectArg_3, arg_9, objectArg_4, arg_11, objectArg_5, arg_13, objectArg_6, arg_15, objectArg_7, arg_17, objectArg_8, arg_19, objectArg_9, arg_21, objectArg_10, objectArg_11, objectArg_12, objectArg_13, objectArg_14, objectArg_15, objectArg_16, objectArg_17, objectArg_18, objectArg_19, objectArg_20, objectArg_21, objectArg_22, objectArg_23, objectArg_24;
        return new PreferenceResponse((objectArg = json.Required, objectArg.Field("eeid", string)), (arg_3 = Project_get_Decoder(), (objectArg_1 = json.Required, objectArg_1.Field("p1", uncurry2(arg_3)))), (arg_5 = Project_get_Decoder(), (objectArg_2 = json.Required, objectArg_2.Field("p2", uncurry2(arg_5)))), (arg_7 = Project_get_Decoder(), (objectArg_3 = json.Required, objectArg_3.Field("p3", uncurry2(arg_7)))), (arg_9 = Project_get_Decoder(), (objectArg_4 = json.Required, objectArg_4.Field("p4", uncurry2(arg_9)))), (arg_11 = Project_get_Decoder(), (objectArg_5 = json.Required, objectArg_5.Field("p5", uncurry2(arg_11)))), (arg_13 = Project_get_Decoder(), (objectArg_6 = json.Required, objectArg_6.Field("p6", uncurry2(arg_13)))), (arg_15 = Project_get_Decoder(), (objectArg_7 = json.Required, objectArg_7.Field("p7", uncurry2(arg_15)))), (arg_17 = Project_get_Decoder(), (objectArg_8 = json.Required, objectArg_8.Field("p8", uncurry2(arg_17)))), (arg_19 = Project_get_Decoder(), (objectArg_9 = json.Required, objectArg_9.Field("p9", uncurry2(arg_19)))), (arg_21 = Project_get_Decoder(), (objectArg_10 = json.Required, objectArg_10.Field("p10", uncurry2(arg_21)))), (objectArg_11 = json.Required, objectArg_11.Field("n1", uncurry2(int))), (objectArg_12 = json.Required, objectArg_12.Field("n2", uncurry2(int))), (objectArg_13 = json.Required, objectArg_13.Field("n3", uncurry2(int))), (objectArg_14 = json.Required, objectArg_14.Field("n4", uncurry2(int))), (objectArg_15 = json.Required, objectArg_15.Field("n5", uncurry2(int))), (objectArg_16 = json.Required, objectArg_16.Field("n6", uncurry2(int))), (objectArg_17 = json.Required, objectArg_17.Field("n7", uncurry2(int))), (objectArg_18 = json.Required, objectArg_18.Field("n8", uncurry2(int))), (objectArg_19 = json.Required, objectArg_19.Field("n9", uncurry2(int))), (objectArg_20 = json.Required, objectArg_20.Field("n10", uncurry2(int))), (objectArg_21 = json.Required, objectArg_21.Field("upddate", datetimeLocal)), (objectArg_22 = json.Required, objectArg_22.Field("comments", string)), (objectArg_23 = json.Required, objectArg_23.Field("feedback", string)), (objectArg_24 = json.Required, objectArg_24.Field("doc", bool)));
    }, path_5, v));
}

export function PreferenceResponse_get_Default() {
    return new PreferenceResponse("", Project_get_Default(), Project_get_Default(), Project_get_Default(), Project_get_Default(), Project_get_Default(), Project_get_Default(), Project_get_Default(), Project_get_Default(), Project_get_Default(), Project_get_Default(), 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, now(), "", "", false);
}

export class ProjectPopularity extends Record {
    constructor(pid, p1Count, p2Count, p3Count, p4Count, p5Count, p6Count, p7Count, p8Count, p9Count, p10Count) {
        super();
        this.pid = pid;
        this.p1Count = (p1Count | 0);
        this.p2Count = (p2Count | 0);
        this.p3Count = (p3Count | 0);
        this.p4Count = (p4Count | 0);
        this.p5Count = (p5Count | 0);
        this.p6Count = (p6Count | 0);
        this.p7Count = (p7Count | 0);
        this.p8Count = (p8Count | 0);
        this.p9Count = (p9Count | 0);
        this.p10Count = (p10Count | 0);
    }
}

export function ProjectPopularity_$reflection() {
    return record_type("Shared.ProjectPopularity", [], ProjectPopularity, () => [["pid", string_type], ["p1Count", int32_type], ["p2Count", int32_type], ["p3Count", int32_type], ["p4Count", int32_type], ["p5Count", int32_type], ["p6Count", int32_type], ["p7Count", int32_type], ["p8Count", int32_type], ["p9Count", int32_type], ["p10Count", int32_type]]);
}

export function ProjectPopularity_get_Decoder() {
    return (path_1) => ((v) => object_1((json) => {
        let objectArg, objectArg_1, objectArg_2, objectArg_3, objectArg_4, objectArg_5, objectArg_6, objectArg_7, objectArg_8, objectArg_9, objectArg_10;
        return new ProjectPopularity((objectArg = json.Required, objectArg.Field("pid", string)), (objectArg_1 = json.Required, objectArg_1.Field("p1Count", uncurry2(int))), (objectArg_2 = json.Required, objectArg_2.Field("p2Count", uncurry2(int))), (objectArg_3 = json.Required, objectArg_3.Field("p3Count", uncurry2(int))), (objectArg_4 = json.Required, objectArg_4.Field("p4Count", uncurry2(int))), (objectArg_5 = json.Required, objectArg_5.Field("p5Count", uncurry2(int))), (objectArg_6 = json.Required, objectArg_6.Field("p6Count", uncurry2(int))), (objectArg_7 = json.Required, objectArg_7.Field("p7Count", uncurry2(int))), (objectArg_8 = json.Required, objectArg_8.Field("p8Count", uncurry2(int))), (objectArg_9 = json.Required, objectArg_9.Field("p9Count", uncurry2(int))), (objectArg_10 = json.Required, objectArg_10.Field("p10Count", uncurry2(int))));
    }, path_1, v));
}

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
    return union_type("Shared.FilterType", [], FilterType, () => [[], []]);
}

export const categories = ofArray(["embedded_systems", "control_engineering", "electronics", "renewable_energy", "biomedical_engineering", "system_optimisation_and_modelling", "high_performance_computing", "computer_vision", "digital_signal_processing", "instrumentation_and_measurement", "cybersecurity", "robotics", "signal_processing", "power_systems", "machine_learning", "photonics", "other", "discrete_maths", "mathematics_signals_and_systems", "software_systems", "communications", "control_systems", "information_processing", "instruction_architectures_and_compilers", "circuit_and_systems", "power_electronics_and_power_systems", "electromagnetism"]);

export const streams = ofArray(["E", "I", "T", "D", "J"]);

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
