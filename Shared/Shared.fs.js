import { Record } from "../Frontend/src/fable_modules/fable-library.4.1.4/Types.js";
import { record_type, string_type } from "../Frontend/src/fable_modules/fable-library.4.1.4/Reflection.js";
import { object } from "../Frontend/src/fable_modules/Thoth.Json.10.1.0/Encode.fs.js";
import { string, object as object_1 } from "../Frontend/src/fable_modules/Thoth.Json.10.1.0/Decode.fs.js";

export class LoginInfo extends Record {
    constructor(eeid) {
        super();
        this.eeid = eeid;
    }
}

export function LoginInfo_$reflection() {
    return record_type("Shared.LoginInfo", [], LoginInfo, () => [["eeid", string_type]]);
}

export function LoginInfo_Encoder_Z5782A811(loginInfo) {
    return object([["eeid", loginInfo.eeid]]);
}

export function LoginInfo_get_Decoder() {
    return (path_1) => ((v) => object_1((json) => {
        let objectArg;
        return new LoginInfo((objectArg = json.Required, objectArg.Field("eeid", string)));
    }, path_1, v));
}

export class AccountInfo extends Record {
    constructor(eeid, CID, Categ, RegWant, Forenames) {
        super();
        this.eeid = eeid;
        this.CID = CID;
        this.Categ = Categ;
        this.RegWant = RegWant;
        this.Forenames = Forenames;
    }
}

export function AccountInfo_$reflection() {
    return record_type("Shared.AccountInfo", [], AccountInfo, () => [["eeid", string_type], ["CID", string_type], ["Categ", string_type], ["RegWant", string_type], ["Forenames", string_type]]);
}

export function AccountInfo_Encoder_41E69C6D(accountInfo) {
    return object([["eeid", accountInfo.eeid], ["cid", accountInfo.CID], ["categ", accountInfo.Categ], ["regWant", accountInfo.RegWant], ["forenames", accountInfo.Forenames]]);
}

export function AccountInfo_get_Decoder() {
    return (path_5) => ((v) => object_1((json) => {
        let objectArg, objectArg_1, objectArg_2, objectArg_3, objectArg_4;
        return new AccountInfo((objectArg = json.Required, objectArg.Field("eeid", string)), (objectArg_1 = json.Required, objectArg_1.Field("cid", string)), (objectArg_2 = json.Required, objectArg_2.Field("categ", string)), (objectArg_3 = json.Required, objectArg_3.Field("regWant", string)), (objectArg_4 = json.Required, objectArg_4.Field("forenames", string)));
    }, path_5, v));
}

export class ProjectInfo extends Record {
    constructor(ProjectId, Title, Professor, Description) {
        super();
        this.ProjectId = ProjectId;
        this.Title = Title;
        this.Professor = Professor;
        this.Description = Description;
    }
}

export function ProjectInfo_$reflection() {
    return record_type("Shared.ProjectInfo", [], ProjectInfo, () => [["ProjectId", string_type], ["Title", string_type], ["Professor", string_type], ["Description", string_type]]);
}

export function ProjectInfo_Encoder_35CC81D9(projectInfo) {
    return object([["projectId", projectInfo.ProjectId], ["title", projectInfo.Title], ["professor", projectInfo.Professor], ["description", projectInfo.Description]]);
}

export function ProjectInfo_get_Decoder() {
    return (path_4) => ((v) => object_1((json) => {
        let objectArg, objectArg_1, objectArg_2, objectArg_3;
        return new ProjectInfo((objectArg = json.Required, objectArg.Field("projectId", string)), (objectArg_1 = json.Required, objectArg_1.Field("title", string)), (objectArg_2 = json.Required, objectArg_2.Field("professor", string)), (objectArg_3 = json.Required, objectArg_3.Field("description", string)));
    }, path_4, v));
}

//# sourceMappingURL=Shared.fs.js.map
