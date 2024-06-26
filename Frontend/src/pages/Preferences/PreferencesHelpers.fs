module PreferencesHelpers

open Shared
open Common
open PreferencesTypes
type Model = PreferencesTypes.Model

open Feliz
open Feliz.Bulma

open color

let checkPreferenceChange (model: Model) : bool =
    let p = model.preference
    let up = model.unsavedPreference
    let pList = [p.p1.pid; p.p2.pid; p.p3.pid; p.p4.pid; p.p5.pid; p.p6.pid; p.p7.pid; p.p8.pid; p.p9.pid; p.p10.pid]
    let upList = [up.p1.pid; up.p2.pid; up.p3.pid; up.p4.pid; up.p5.pid; up.p6.pid; up.p7.pid; up.p8.pid; up.p9.pid; up.p10.pid]
    let nList = [p.n1; p.n2; p.n3; p.n4; p.n5; p.n6; p.n7; p.n8; p.n9; p.n10]
    let unList = [up.n1; up.n2; up.n3; up.n4; up.n5; up.n6; up.n7; up.n8; up.n9; up.n10]
    (pList <> upList) || (nList <> unList) || (p.comments <> up.comments) || (p.doc <> up.doc)

let removePreference (model: Model) : Model =
    let rank = model.selectedProjectRank
    let newModel = { model with selectedProject = Project.Default; selectedProjectRank = 0; confirmRemoveProjectModal = false }

    match rank with
    | 1 -> { newModel with unsavedPreference = { newModel.unsavedPreference with p1 = Project.Default } }
    | 2 -> { newModel with unsavedPreference = { newModel.unsavedPreference with p2 = Project.Default } }
    | 3 -> { newModel with unsavedPreference = { newModel.unsavedPreference with p3 = Project.Default } }
    | 4 -> { newModel with unsavedPreference = { newModel.unsavedPreference with p4 = Project.Default } }
    | 5 -> { newModel with unsavedPreference = { newModel.unsavedPreference with p5 = Project.Default } }
    | 6 -> { newModel with unsavedPreference = { newModel.unsavedPreference with p6 = Project.Default } }
    | 7 -> { newModel with unsavedPreference = { newModel.unsavedPreference with p7 = Project.Default } }
    | 8 -> { newModel with unsavedPreference = { newModel.unsavedPreference with p8 = Project.Default } }
    | 9 -> { newModel with unsavedPreference = { newModel.unsavedPreference with p9 = Project.Default } }
    | 10 -> { newModel with unsavedPreference = { newModel.unsavedPreference with p10 = Project.Default } }
    | _ -> newModel // Shouldn't happen

let swapUp (model: Model) (rank: int) : Model =
    let up = model.unsavedPreference
    let newUp = match rank with
                | 2 -> { up with p1 = up.p2; p2 = up.p1 }
                | 3 -> { up with p2 = up.p3; p3 = up.p2 }
                | 4 -> { up with p3 = up.p4; p4 = up.p3 }
                | 5 -> { up with p4 = up.p5; p5 = up.p4 }
                | 6 -> { up with p5 = up.p6; p6 = up.p5 }
                | 7 -> { up with p6 = up.p7; p7 = up.p6 }
                | 8 -> { up with p7 = up.p8; p8 = up.p7 }
                | 9 -> { up with p8 = up.p9; p9 = up.p8 }
                | 10 -> { up with p9 = up.p10; p10 = up.p9 }
                | _ -> up
    { model with unsavedPreference = newUp }

let swapDown (model: Model) (rank: int) : Model =
    swapUp model (rank + 1)

let getPreferenceEqualList (pref: PreferenceResponse) : List<bool> =
    let prefs = [pref.n2; pref.n3; pref.n4; pref.n5; pref.n6; pref.n7; pref.n8; pref.n9; pref.n10]
    let indexes = [2..10]
    let list = List.zip prefs indexes
    List.map (fun (pref, index) -> (pref <> index)) list // If they aren't equal, then it's a PreferenceEqual

let updatePreferenceRanks ((model, iter, prevRank): Model * int * int) (isPrefEqual: bool) : Model * int * int =
    let rank = if isPrefEqual then prevRank else iter
    match iter with
    | 2 -> { model with unsavedPreference = { model.unsavedPreference with n2 = rank }}, 3, rank
    | 3 -> { model with unsavedPreference = { model.unsavedPreference with n3 = rank }}, 4, rank
    | 4 -> { model with unsavedPreference = { model.unsavedPreference with n4 = rank }}, 5, rank
    | 5 -> { model with unsavedPreference = { model.unsavedPreference with n5 = rank }}, 6, rank
    | 6 -> { model with unsavedPreference = { model.unsavedPreference with n6 = rank }}, 7, rank
    | 7 -> { model with unsavedPreference = { model.unsavedPreference with n7 = rank }}, 8, rank
    | 8 -> { model with unsavedPreference = { model.unsavedPreference with n8 = rank }}, 9, rank
    | 9 -> { model with unsavedPreference = { model.unsavedPreference with n9 = rank }}, 10, rank
    | 10 -> { model with unsavedPreference = { model.unsavedPreference with n10 = rank }}, 10, rank // Last iteration
    | _ -> model, 10, rank // Shouldn't happen

