import { Union, Record } from "../../fable_modules/fable-library.4.1.4/Types.js";
import { union_type, class_type, record_type, int32_type, string_type, list_type, bool_type } from "../../fable_modules/fable-library.4.1.4/Reflection.js";
import { PreferenceResponse_$reflection, Project_$reflection } from "../../../../Shared/Shared.fs.js";

export class Model extends Record {
    constructor(loading, projects, preference, token, modalState, addProjectState, searchTitle, searchProfessor, selectedCategories, selectedStreams, selectedProject, selectedProjectIndex, topOrBottom5) {
        super();
        this.loading = loading;
        this.projects = projects;
        this.preference = preference;
        this.token = token;
        this.modalState = modalState;
        this.addProjectState = addProjectState;
        this.searchTitle = searchTitle;
        this.searchProfessor = searchProfessor;
        this.selectedCategories = selectedCategories;
        this.selectedStreams = selectedStreams;
        this.selectedProject = selectedProject;
        this.selectedProjectIndex = (selectedProjectIndex | 0);
        this.topOrBottom5 = topOrBottom5;
    }
}

export function Model_$reflection() {
    return record_type("ProjectsTypes.Model", [], Model, () => [["loading", bool_type], ["projects", list_type(Project_$reflection())], ["preference", PreferenceResponse_$reflection()], ["token", string_type], ["modalState", bool_type], ["addProjectState", bool_type], ["searchTitle", string_type], ["searchProfessor", string_type], ["selectedCategories", list_type(string_type)], ["selectedStreams", list_type(string_type)], ["selectedProject", Project_$reflection()], ["selectedProjectIndex", int32_type], ["topOrBottom5", string_type]]);
}

export class InitalLoad extends Record {
    constructor(projects, preference) {
        super();
        this.projects = projects;
        this.preference = preference;
    }
}

export function InitalLoad_$reflection() {
    return record_type("ProjectsTypes.InitalLoad", [], InitalLoad, () => [["projects", list_type(Project_$reflection())], ["preference", PreferenceResponse_$reflection()]]);
}

export class Msg extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["SuccessLoad", "ErrorLoad", "Logout", "OpenModal", "CloseModal", "AddProject", "OpenAddProject", "CloseAddProject", "IndexAddProject", "SearchTitleChanged", "SearchProfessorChanged", "ClickedCategoryTag", "ClickedStreamTag", "TopOrBottom5", "SearchRequest", "FetchedProjectsLoad"];
    }
}

export function Msg_$reflection() {
    return union_type("ProjectsTypes.Msg", [], Msg, () => [[["Item", InitalLoad_$reflection()]], [["Item", class_type("System.Exception")]], [], [["Item", Project_$reflection()]], [], [], [], [], [["Item", int32_type]], [["Item", string_type]], [["Item", string_type]], [["Item", string_type]], [["Item", string_type]], [["Item", class_type("Browser.Types.Event", void 0)]], [], [["Item", list_type(Project_$reflection())]]]);
}

//# sourceMappingURL=ProjectsTypes.fs.js.map
