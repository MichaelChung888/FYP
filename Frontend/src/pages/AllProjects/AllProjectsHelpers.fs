module AllProjectsHelpers

open Shared
open Common
open AllProjectsTypes

open Feliz
open Feliz.Bulma

open color

let currentSelectedPreference (model: Model) : int =
    match model.selectedProjectIndex with
    | 1 -> model.preference.p1.pid
    | 2 -> model.preference.p2.pid
    | 3 -> model.preference.p3.pid
    | 4 -> model.preference.p4.pid
    | 5 -> model.preference.p5.pid
    | 6 -> model.preference.p6.pid
    | 7 -> model.preference.p7.pid
    | 8 -> model.preference.p8.pid
    | 9 -> model.preference.p9.pid
    | 10 -> model.preference.p10.pid
    | _ -> 0 // Shouldn't happen

// ---- Table Tags ----------------------------------------------------------------------------

let splitStreams (streams: string) : List<string> =
    streams
    |> Seq.chunkBySize 2
    |> Seq.map (fun chunk -> new string(chunk))
    |> Seq.toList

let Tag (model: Model) (filter: string) =
    Bulma.tag [
        prop.text (getFormattedCategory filter)
        prop.style [style.marginBottom 10; style.marginRight 10]
    ]

let TableCategories (model: Model) (categories: string) =
    (categories.Split ',') |> Array.toList |> List.map (Tag model)

let TableStreams (model: Model) (streams: string) =
    (splitStreams streams) |> List.map (Tag model)

// ---- Check if Selected Project in Preference ------------------------------------------

let checkProjectInPreference (project: Project) (pref: PreferenceResponse) =
    let preferenceList = [pref.p1.pid; pref.p2.pid; pref.p3.pid; pref.p4.pid; pref.p5.pid; 
                          pref.p6.pid; pref.p7.pid; pref.p8.pid; pref.p9.pid; pref.p10.pid]
    List.exists (fun prefPid -> prefPid = project.pid) preferenceList