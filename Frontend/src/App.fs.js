import { Record, Union } from "./fable_modules/fable-library.4.1.4/Types.js";
import { Person_$reflection } from "../../Shared/Shared.fs.js";
import { record_type, string_type, union_type } from "./fable_modules/fable-library.4.1.4/Reflection.js";
import { view as view_3, update as update_1, init as init_1, Msg_$reflection as Msg_$reflection_1, Model_$reflection as Model_$reflection_1 } from "./pages/Login/Login.fs.js";
import { view as view_1, init as init_2, update as update_2, Msg_$reflection as Msg_$reflection_2, Model_$reflection as Model_$reflection_2 } from "./pages/HomeStudent/HomeStudent.fs.js";
import { view as view_2, init as init_3, update as update_3, Msg_$reflection as Msg_$reflection_3, Model_$reflection as Model_$reflection_3 } from "./pages/Projects/Projects.fs.js";
import { ofArray, singleton, tail, head, isEmpty } from "./fable_modules/fable-library.4.1.4/List.js";
import { RouterModule_router, RouterModule_nav, RouterModule_urlSegments } from "./fable_modules/Feliz.Router.4.0.0/./Router.fs.js";
import { Cmd_ofEffect } from "./fable_modules/Feliz.Router.4.0.0/../Fable.Elmish.4.1.0/cmd.fs.js";
import { Cmd_map, Cmd_none } from "./fable_modules/Fable.Elmish.4.1.0/cmd.fs.js";
import { createObj } from "./fable_modules/fable-library.4.1.4/Util.js";
import { singleton as singleton_1, delay, toList } from "./fable_modules/fable-library.4.1.4/Seq.js";
import { createElement } from "react";
import * as react from "react";
import { ProgramModule_mkProgram, ProgramModule_run } from "./fable_modules/Fable.Elmish.4.1.0/program.fs.js";
import { Program_withReactSynchronous } from "./fable_modules/Fable.Elmish.React.4.0.0/react.fs.js";
import "./styles.css";


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
    return union_type("App.ApplicationUser", [], ApplicationUser, () => [[], [["Item", Person_$reflection()]]]);
}

export class Url extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["LoginUrl", "HomeStudentUrl", "ProjectsUrl", "NotFoundUrl", "EmptyUrl"];
    }
}

export function Url_$reflection() {
    return union_type("App.Url", [], Url, () => [[], [], [], [], []]);
}

export class Page extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["LoginPage", "HomeStudentPage", "ProjectsPage", "NotFoundPage"];
    }
}

export function Page_$reflection() {
    return union_type("App.Page", [], Page, () => [[["Item", Model_$reflection_1()]], [["Item", Model_$reflection_2()]], [["Item", Model_$reflection_3()]], []]);
}

export class Msg extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["LoginMsg", "HomeStudentMsg", "ProjectsMsg", "UrlChanged"];
    }
}

export function Msg_$reflection() {
    return union_type("App.Msg", [], Msg, () => [[["Item", Msg_$reflection_1()]], [["Item", Msg_$reflection_2()]], [["Item", Msg_$reflection_3()]], [["Item", Url_$reflection()]]]);
}

export class Model extends Record {
    constructor(user, currentUrl, currentPage, token) {
        super();
        this.user = user;
        this.currentUrl = currentUrl;
        this.currentPage = currentPage;
        this.token = token;
    }
}

export function Model_$reflection() {
    return record_type("App.Model", [], Model, () => [["user", ApplicationUser_$reflection()], ["currentUrl", Url_$reflection()], ["currentPage", Page_$reflection()], ["token", string_type]]);
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
            case "home-student": {
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
    const defaultModel = new Model(new ApplicationUser(0, []), initialUrl, new Page(3, []), "");
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
            return [new Model(defaultModel.user, defaultModel.currentUrl, new Page(3, []), defaultModel.token), Cmd_none()];
        case 4:
            return [defaultModel, Cmd_ofEffect((_arg_3) => {
                RouterModule_nav(singleton("login"), 2, 2);
            })];
        default: {
            const patternInput = init_1();
            const page = patternInput[0];
            const msg = patternInput[1];
            return [new Model(defaultModel.user, defaultModel.currentUrl, new Page(0, [page]), defaultModel.token), Cmd_map((arg) => (new Msg(0, [arg])), msg)];
        }
    }
}

export function update(msg, model) {
    const updatePage = (page) => (new Model(model.user, model.currentUrl, page, model.token));
    const showPage = (page_1, url) => (new Model(model.user, url, page_1, model.token));
    const matchValue = model.currentPage;
    let matchResult, msg_1, page_2, msg_3, page_3, msg_4, page_4, nextUrl;
    switch (msg.tag) {
        case 1: {
            if (matchValue.tag === 1) {
                matchResult = 1;
                msg_3 = msg.fields[0];
                page_3 = matchValue.fields[0];
            }
            else {
                matchResult = 4;
            }
            break;
        }
        case 2: {
            if (matchValue.tag === 2) {
                matchResult = 2;
                msg_4 = msg.fields[0];
                page_4 = matchValue.fields[0];
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
                msg_1 = msg.fields[0];
                page_2 = matchValue.fields[0];
            }
            else {
                matchResult = 4;
            }
    }
    switch (matchResult) {
        case 0:
            if (msg_1.tag === 2) {
                const res = msg_1.fields[0];
                return [new Model(new ApplicationUser(1, [res.person]), model.currentUrl, model.currentPage, res.token), Cmd_ofEffect((_arg) => {
                    RouterModule_nav(singleton("home-student"), 1, 2);
                })];
            }
            else {
                const msg_2 = msg_1;
                const patternInput = update_1(msg_2, page_2);
                const newPage = patternInput[0];
                const newMsg = patternInput[1];
                return [updatePage(new Page(0, [newPage])), Cmd_map((arg) => (new Msg(0, [arg])), newMsg)];
            }
        case 1: {
            const patternInput_1 = update_2(msg_3, page_3);
            const newPage_1 = patternInput_1[0];
            const newMsg_1 = patternInput_1[1];
            return [updatePage(new Page(1, [newPage_1])), Cmd_map((arg_1) => (new Msg(1, [arg_1])), newMsg_1)];
        }
        case 2: {
            const patternInput_2 = update_3(msg_4, page_4);
            const newPage_2 = patternInput_2[0];
            const newMsg_2 = patternInput_2[1];
            return [updatePage(new Page(2, [newPage_2])), Cmd_map((arg_2) => (new Msg(2, [arg_2])), newMsg_2)];
        }
        case 3:
            switch (nextUrl.tag) {
                case 1:
                    if (model.user.tag === 1) {
                        const patternInput_4 = init_2(model.token);
                        const newPage_4 = patternInput_4[0];
                        const newMsg_4 = patternInput_4[1];
                        return [showPage(new Page(1, [newPage_4]), new Url(1, [])), Cmd_map((arg_4) => (new Msg(1, [arg_4])), newMsg_4)];
                    }
                    else {
                        return [model, Cmd_ofEffect((_arg_1) => {
                            RouterModule_nav(singleton("login"), 2, 2);
                        })];
                    }
                case 2:
                    if (model.user.tag === 1) {
                        const patternInput_5 = init_3(model.token);
                        const newPage_5 = patternInput_5[0];
                        const newMsg_5 = patternInput_5[1];
                        return [showPage(new Page(2, [newPage_5]), new Url(2, [])), Cmd_map((arg_5) => (new Msg(2, [arg_5])), newMsg_5)];
                    }
                    else {
                        return [model, Cmd_ofEffect((_arg_2) => {
                            RouterModule_nav(singleton("login"), 2, 2);
                        })];
                    }
                case 3:
                    return [showPage(new Page(3, []), new Url(3, [])), Cmd_none()];
                case 4:
                    return [model, Cmd_ofEffect((_arg_3) => {
                        RouterModule_nav(singleton("login"), 2, 2);
                    })];
                default: {
                    const patternInput_3 = init_1();
                    const newPage_3 = patternInput_3[0];
                    const newMsg_3 = patternInput_3[1];
                    return [showPage(new Page(0, [newPage_3]), new Url(0, [])), Cmd_map((arg_3) => (new Msg(0, [arg_3])), newMsg_3)];
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
        const matchValue = model.currentPage;
        switch (matchValue.tag) {
            case 1: {
                const page_1 = matchValue.fields[0];
                return singleton_1(view_1(page_1, (arg_6) => {
                    dispatch(new Msg(1, [arg_6]));
                }));
            }
            case 2: {
                const page_2 = matchValue.fields[0];
                return singleton_1(view_2(page_2, (arg_8) => {
                    dispatch(new Msg(2, [arg_8]));
                }));
            }
            case 3:
                return singleton_1(createElement("p", {
                    children: ["Not Found"],
                }));
            default: {
                const page = matchValue.fields[0];
                return singleton_1(view_3(page, (arg_4) => {
                    dispatch(new Msg(0, [arg_4]));
                }));
            }
        }
    })), ["application", react.createElement(react.Fragment, {}, ...elements)])])));
}

ProgramModule_run(Program_withReactSynchronous("elmish-app", ProgramModule_mkProgram(init, update, view)));

//# sourceMappingURL=App.fs.js.map
