module ProposalsHelpers

open Shared
open Common
open ProposalsTypes

open Feliz
open Feliz.Bulma

open color

let checkProposalChange (model: Model) : bool =
    model.proposals <> model.unsavedProposals