import { Record, Union } from "./fable_modules/fable-library.4.1.4/Types.js";
import { AccountInfo_$reflection } from "../../Shared/Shared.fs.js";
import { record_type, union_type } from "./fable_modules/fable-library.4.1.4/Reflection.js";
import { view as view_3, update as update_1, init as init_1, Msg_$reflection as Msg_$reflection_1, Model_$reflection as Model_$reflection_1 } from "./pages/Login/Login.fs.js";
import { view as view_1, init as init_2, update as update_2, Msg_$reflection as Msg_$reflection_2, Model_$reflection as Model_$reflection_2 } from "./pages/MainStudent/MainStudent.fs.js";
import { view as view_2, init as init_3, update as update_3, Msg_$reflection as Msg_$reflection_3, Model_$reflection as Model_$reflection_3 } from "./pages/Projects/Projects.fs.js";
import { ofArray, singleton, tail, head, isEmpty } from "./fable_modules/fable-library.4.1.4/List.js";
import { RouterModule_router, RouterModule_nav, RouterModule_urlSegments } from "./fable_modules/Feliz.Router.4.0.0/./Router.fs.js";
import { Cmd_ofEffect } from "./fable_modules/Feliz.Router.4.0.0/../Fable.Elmish.4.1.0/cmd.fs.js";
import { Cmd_map, Cmd_none } from "./fable_modules/Fable.Elmish.4.1.0/cmd.fs.js";
import { printf, toConsole } from "./fable_modules/fable-library.4.1.4/String.js";
import { createObj } from "./fable_modules/fable-library.4.1.4/Util.js";
import { singleton as singleton_1, delay, toList } from "./fable_modules/fable-library.4.1.4/Seq.js";
import { createElement } from "react";
import * as react from "react";
import { ProgramModule_mkProgram, ProgramModule_run } from "./fable_modules/Fable.Elmish.4.1.0/program.fs.js";
import { Program_withReactSynchronous } from "./fable_modules/Fable.Elmish.React.4.0.0/react.fs.js";

export class ApplicationUser extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["Anonymous", "LoggedIn"];
    }
}

export function ApplicationUser_$reflection() {
    return union_type("App.ApplicationUser", [], ApplicationUser, () => [[], [["Item", AccountInfo_$reflection()]]]);
}

export class Url extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["LoginUrl", "MainStudentUrl", "ProjectsUrl", "NotFound", "EmptyUrl"];
    }
}

export function Url_$reflection() {
    return union_type("App.Url", [], Url, () => [[], [], [], [], []]);
}

export class SubModel extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["LoginModel", "MainStudentModel", "ProjectsModel", "NotFound"];
    }
}

export function SubModel_$reflection() {
    return union_type("App.SubModel", [], SubModel, () => [[["Item", Model_$reflection_1()]], [["Item", Model_$reflection_2()]], [["Item", Model_$reflection_3()]], []]);
}

export class Msg extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["LoginMsg", "MainStudentMsg", "ProjectsMsg", "UrlChanged"];
    }
}

export function Msg_$reflection() {
    return union_type("App.Msg", [], Msg, () => [[["Item", Msg_$reflection_1()]], [["Item", Msg_$reflection_2()]], [["Item", Msg_$reflection_3()]], [["Item", Url_$reflection()]]]);
}

export class Model extends Record {
    constructor(User, CurrentUrl, CurrentModel) {
        super();
        this.User = User;
        this.CurrentUrl = CurrentUrl;
        this.CurrentModel = CurrentModel;
    }
}

export function Model_$reflection() {
    return record_type("App.Model", [], Model, () => [["User", ApplicationUser_$reflection()], ["CurrentUrl", Url_$reflection()], ["CurrentModel", SubModel_$reflection()]]);
}

export function test(model, _arg1_, _arg1__1) {
    const _arg = [_arg1_, _arg1__1];
    const subModel = _arg[0];
    const msg = _arg[1];
    return [new Model(model.User, model.CurrentUrl, subModel), msg];
}

export function parseUrl(_arg) {
    let matchResult;
    if (!isEmpty(_arg)) {
        switch (head(_arg)) {
            case "login": {
                if (isEmpty(tail(_arg))) {
                    matchResult = 1;
                }
                else {
                    matchResult = 4;
                }
                break;
            }
            case "main-student": {
                if (!isEmpty(tail(_arg))) {
                    if (head(tail(_arg)) === "projects") {
                        if (isEmpty(tail(tail(_arg)))) {
                            matchResult = 3;
                        }
                        else {
                            matchResult = 4;
                        }
                    }
                    else {
                        matchResult = 4;
                    }
                }
                else {
                    matchResult = 2;
                }
                break;
            }
            default:
                matchResult = 4;
        }
    }
    else {
        matchResult = 0;
    }
    switch (matchResult) {
        case 0:
            return new Url(4, []);
        case 1:
            return new Url(0, []);
        case 2:
            return new Url(1, []);
        case 3:
            return new Url(2, []);
        default:
            return new Url(3, []);
    }
}

export function init() {
    let fullPath;
    const initialUrl = parseUrl((fullPath = (window.location.pathname + window.location.search), RouterModule_urlSegments(fullPath, 2)));
    const defaultModel = new Model(new ApplicationUser(0, []), initialUrl, new SubModel(3, []));
    switch (initialUrl.tag) {
        case 1:
            return [defaultModel, Cmd_ofEffect((_arg_1) => {
                RouterModule_nav(singleton("login"), 2, 2);
            })];
        case 2:
            return [defaultModel, Cmd_ofEffect((_arg_2) => {
                RouterModule_nav(singleton("login"), 2, 2);
            })];
        case 3:
            return [new Model(defaultModel.User, defaultModel.CurrentUrl, new SubModel(3, [])), Cmd_none()];
        case 4:
            return [defaultModel, Cmd_ofEffect((_arg_3) => {
                RouterModule_nav(singleton("login"), 2, 2);
            })];
        default: {
            const patternInput = init_1();
            const loginMsg = patternInput[1];
            const loginModel = patternInput[0];
            return [new Model(defaultModel.User, defaultModel.CurrentUrl, new SubModel(0, [loginModel])), Cmd_map((arg) => (new Msg(0, [arg])), loginMsg)];
        }
    }
}

export function update(msg, model) {
    const matchValue = model.CurrentModel;
    let matchResult, loginModel, loginMsg, mainStudentModel, mainStudentMsg, projectsModel, projectsMsg, nextUrl;
    switch (msg.tag) {
        case 1: {
            if (matchValue.tag === 1) {
                matchResult = 1;
                mainStudentModel = matchValue.fields[0];
                mainStudentMsg = msg.fields[0];
            }
            else {
                matchResult = 4;
            }
            break;
        }
        case 2: {
            if (matchValue.tag === 2) {
                matchResult = 2;
                projectsModel = matchValue.fields[0];
                projectsMsg = msg.fields[0];
            }
            else {
                matchResult = 4;
            }
            break;
        }
        case 3: {
            matchResult = 3;
            nextUrl = msg.fields[0];
            break;
        }
        default:
            if (matchValue.tag === 0) {
                matchResult = 0;
                loginModel = matchValue.fields[0];
                loginMsg = msg.fields[0];
            }
            else {
                matchResult = 4;
            }
    }
    switch (matchResult) {
        case 0:
            if (loginMsg.tag === 3) {
                const accountInfo = loginMsg.fields[0];
                toConsole(printf("%A"))(accountInfo);
                return [new Model(new ApplicationUser(1, [accountInfo]), model.CurrentUrl, model.CurrentModel), Cmd_ofEffect((_arg) => {
                    RouterModule_nav(singleton("main-student"), 1, 2);
                })];
            }
            else {
                const loginMsg_1 = loginMsg;
                const patternInput = update_1(loginMsg_1, loginModel);
                const newLoginMsg = patternInput[1];
                const newLoginModel = patternInput[0];
                return [new Model(model.User, model.CurrentUrl, new SubModel(0, [newLoginModel])), Cmd_map((arg_1) => (new Msg(0, [arg_1])), newLoginMsg)];
            }
        case 1: {
            const patternInput_1 = update_2(mainStudentMsg, mainStudentModel);
            const newMainStudentMsg = patternInput_1[1];
            const newMainStudentModel = patternInput_1[0];
            return [new Model(model.User, model.CurrentUrl, new SubModel(1, [newMainStudentModel])), Cmd_map((arg_2) => (new Msg(1, [arg_2])), newMainStudentMsg)];
        }
        case 2: {
            const patternInput_2 = update_3(projectsMsg, projectsModel);
            const newProjectsMsg = patternInput_2[1];
            const newProjectsModel = patternInput_2[0];
            return [new Model(model.User, model.CurrentUrl, new SubModel(2, [newProjectsModel])), Cmd_map((arg_3) => (new Msg(2, [arg_3])), newProjectsMsg)];
        }
        case 3:
            switch (nextUrl.tag) {
                case 1:
                    if (model.User.tag === 1) {
                        const patternInput_4 = init_2();
                        const mainStudentMsg_1 = patternInput_4[1];
                        const mainStudentModel_1 = patternInput_4[0];
                        return [new Model(model.User, model.CurrentUrl, new SubModel(1, [mainStudentModel_1])), Cmd_map((arg_5) => (new Msg(1, [arg_5])), mainStudentMsg_1)];
                    }
                    else {
                        return [model, Cmd_ofEffect((_arg_1) => {
                            RouterModule_nav(singleton("login"), 2, 2);
                        })];
                    }
                case 2:
                    if (model.User.tag === 1) {
                        const patternInput_5 = init_3();
                        const projectsMsg_1 = patternInput_5[1];
                        const projectsModel_1 = patternInput_5[0];
                        return [new Model(model.User, model.CurrentUrl, new SubModel(2, [projectsModel_1])), Cmd_map((arg_6) => (new Msg(2, [arg_6])), projectsMsg_1)];
                    }
                    else {
                        return [model, Cmd_ofEffect((_arg_2) => {
                            RouterModule_nav(singleton("login"), 2, 2);
                        })];
                    }
                case 3:
                    return [new Model(model.User, model.CurrentUrl, new SubModel(3, [])), Cmd_none()];
                case 4:
                    return [model, Cmd_ofEffect((_arg_3) => {
                        RouterModule_nav(singleton("login"), 2, 2);
                    })];
                default: {
                    const patternInput_3 = init_1();
                    const loginMsg_2 = patternInput_3[1];
                    const loginModel_1 = patternInput_3[0];
                    return [new Model(model.User, model.CurrentUrl, new SubModel(0, [loginModel_1])), Cmd_map((arg_4) => (new Msg(0, [arg_4])), loginMsg_2)];
                }
            }
        default:
            return [model, Cmd_none()];
    }
}

export function view(model, dispatch) {
    let elements;
    return RouterModule_router(createObj(ofArray([["hashMode", 2], ["onUrlChanged", (arg_2) => {
        dispatch(new Msg(3, [parseUrl(arg_2)]));
    }], (elements = toList(delay(() => {
        const matchValue = model.CurrentModel;
        switch (matchValue.tag) {
            case 1: {
                const mainStudentModel = matchValue.fields[0];
                return singleton_1(view_1(mainStudentModel, (arg_6) => {
                    dispatch(new Msg(1, [arg_6]));
                }));
            }
            case 2: {
                const projectsModel = matchValue.fields[0];
                return singleton_1(view_2(projectsModel, (arg_8) => {
                    dispatch(new Msg(2, [arg_8]));
                }));
            }
            case 3:
                return singleton_1(createElement("p", {
                    children: ["Not Found"],
                }));
            default: {
                const loginModel = matchValue.fields[0];
                return singleton_1(view_3(loginModel, (arg_4) => {
                    dispatch(new Msg(0, [arg_4]));
                }));
            }
        }
    })), ["application", react.createElement(react.Fragment, {}, ...elements)])])));
}

ProgramModule_run(Program_withReactSynchronous("elmish-app", ProgramModule_mkProgram(init, update, view)));

//# sourceMappingURL=App.fs.js.map
