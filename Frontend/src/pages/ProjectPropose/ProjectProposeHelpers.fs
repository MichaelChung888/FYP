module ProjectProposeHelpers

open Shared
open Common
open ProjectProposeTypes

open Feliz
open Feliz.Bulma

open color

//--------------------------------------------------------------------------------------//
//                                   Form Validation                                    //
//--------------------------------------------------------------------------------------//

let titleValid (model: Model) = (model.projectTitle <> "")
let requirementsValid (model: Model) = (model.requirements <> "")
let skillsValid (model: Model) = (model.skills <> "")
let descriptionValid (model: Model) = (model.description <> "")
let meetingsValid (model: Model) = (model.meetings <> "")
let streamValid (model: Model) = (List.length model.selectedStreams > 0)
let categoryValid (model: Model) = (List.length model.selectedCategories > 0)

let isFormValid (model: Model) =
    if (isStudent model.user) then
        (titleValid model) && (descriptionValid model) && (meetingsValid model) 
        && (categoryValid model) 
    else
        (titleValid model) && (requirementsValid model) && (skillsValid model)
        && (descriptionValid model) && (meetingsValid model) && (categoryValid model) 
        && (streamValid model)