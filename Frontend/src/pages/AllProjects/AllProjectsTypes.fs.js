import { Union, Record } from "../../fable_modules/fable-library.4.1.4/Types.js";
import { union_type, class_type, record_type, int32_type, string_type, list_type, bool_type } from "../../fable_modules/fable-library.4.1.4/Reflection.js";
import { PreferenceResponse_$reflection, Project_$reflection } from "../../../../Shared/Shared.fs.js";

export class Model extends Record {
    constructor(loading, projects, preference, token, modalState, searchTitle, searchUser, selectedProject, selectedProjectIndex, topOrBottom5) {
        super();
        this.loading = loading;
        this.projects = projects;
        this.preference = preference;
        this.token = token;
        this.modalState = modalState;
        this.searchTitle = searchTitle;
        this.searchUser = searchUser;
        this.selectedProject = selectedProject;
        this.selectedProjectIndex = (selectedProjectIndex | 0);
        this.topOrBottom5 = topOrBottom5;
    }
}

export function Model_$reflection() {
    return record_type("AllProjectsTypes.Model", [], Model, () => [["loading", bool_type], ["projects", list_type(Project_$reflection())], ["preference", PreferenceResponse_$reflection()], ["token", string_type], ["modalState", bool_type], ["searchTitle", string_type], ["searchUser", string_type], ["selectedProject", Project_$reflection()], ["selectedProjectIndex", int32_type], ["topOrBottom5", string_type]]);
}

export class Msg extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["SuccessLoad", "ErrorLoad", "Logout", "OpenModal", "CloseModal", "SearchTitleChanged", "SearchUserChanged", "SearchRequest"];
    }
}

export function Msg_$reflection() {
    return union_type("AllProjectsTypes.Msg", [], Msg, () => [[["Item", list_type(Project_$reflection())]], [["Item", class_type("System.Exception")]], [], [["Item", Project_$reflection()]], [], [["Item", string_type]], [["Item", string_type]], []]);
}

//# sourceMappingURL=AllProjectsTypes.fs.js.map
