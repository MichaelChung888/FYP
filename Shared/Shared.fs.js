import { Record } from "../Frontend/src/fable_modules/fable-library.4.1.4/Types.js";
import { int32_type, record_type, string_type } from "../Frontend/src/fable_modules/fable-library.4.1.4/Reflection.js";
import { object } from "../Frontend/src/fable_modules/Thoth.Json.10.1.0/Encode.fs.js";
import { string, int, object as object_1 } from "../Frontend/src/fable_modules/Thoth.Json.10.1.0/Decode.fs.js";
import { uncurry2 } from "../Frontend/src/fable_modules/fable-library.4.1.4/Util.js";

export class LoginInfo extends Record {
    constructor(Username, Password) {
        super();
        this.Username = Username;
        this.Password = Password;
    }
}

export function LoginInfo_$reflection() {
    return record_type("Shared.LoginInfo", [], LoginInfo, () => [["Username", string_type], ["Password", string_type]]);
}

/**
 * Transform LoginInfo -> JSON
 */
export function LoginInfo_Encoder_Z5782A811(login) {
    return object([["username", login.Username], ["password", login.Password]]);
}

export class AccountInfo extends Record {
    constructor(PersonId, Username, Password) {
        super();
        this.PersonId = (PersonId | 0);
        this.Username = Username;
        this.Password = Password;
    }
}

export function AccountInfo_$reflection() {
    return record_type("Shared.AccountInfo", [], AccountInfo, () => [["PersonId", int32_type], ["Username", string_type], ["Password", string_type]]);
}

export function AccountInfo_get_Decoder() {
    return (path_2) => ((v) => object_1((data) => {
        let objectArg, objectArg_1, objectArg_2;
        return new AccountInfo((objectArg = data.Required, objectArg.Field("personId", uncurry2(int))), (objectArg_1 = data.Required, objectArg_1.Field("username", string)), (objectArg_2 = data.Required, objectArg_2.Field("password", string)));
    }, path_2, v));
}

export class ProjectInfo extends Record {
    constructor(Title, Professor, Description) {
        super();
        this.Title = Title;
        this.Professor = Professor;
        this.Description = Description;
    }
}

export function ProjectInfo_$reflection() {
    return record_type("Shared.ProjectInfo", [], ProjectInfo, () => [["Title", string_type], ["Professor", string_type], ["Description", string_type]]);
}

//# sourceMappingURL=Shared.fs.js.map
