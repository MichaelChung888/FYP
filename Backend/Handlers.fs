module Handlers

open SQL
open Shared
open JWT

open Microsoft.AspNetCore.Http
open Microsoft.Data.SqlClient
open Giraffe
open System.Data
open Newtonsoft.Json
open System.IdentityModel.Tokens.Jwt

open System.Security.Claims

open Thoth.Json

let options = new CookieOptions();
options.SameSite = SameSiteMode.None |> ignore
options.Secure = true |> ignore
options.HttpOnly = true |> ignore

//--------------------------------------------------------------------------------------//
//                                      Main code                                       //
//--------------------------------------------------------------------------------------//

let loginHttpHandler =
    fun (next : HttpFunc) (ctx : HttpContext) ->
        task {
            let! data = ctx.BindJsonAsync<LoginRequest>()
            let query = loginAuthenticateSQL data.eeid
            let res = query |> List.tryFind (fun _ -> true) // Returns 'Some result' if query found a result, else 'None'

            match res with 
            | Some person ->  
                let loginResponse = { person = person
                                      token = generateToken person.eeid }
                ctx.SetStatusCode 200 
                //ctx.Response.Cookies.Append("eeid", tokenResult, options) // res.eeid.ToString()
                return! json loginResponse next ctx
            | None -> 
                ctx.SetStatusCode 400; 
                return! json ("Incorrect eeid") next ctx      
        }

let newProjectHttpHandler =
    fun (next : HttpFunc) (ctx : HttpContext) ->
        task {
            let query = newProjectSQL ()
            return! json query next ctx 
        }

let projectHttpHandler = 
    fun (next : HttpFunc) (ctx : HttpContext) ->
        task {
            let query = projectSQL ()
            return! json query next ctx 
        }

let searchProjectHttpHandler =
    fun (next : HttpFunc) (ctx : HttpContext) ->
        task {
            let! data = ctx.BindJsonAsync<SearchRequest>()
            let query = searchProjectSQL data
            return! json query next ctx 
        }

let addProjectHttpHandler =
    fun (next: HttpFunc) (ctx: HttpContext) ->
        task {
            let token = getTokenFromRequest ctx.Request
            let eeid = getIdFromToken token

            let! data = ctx.BindJsonAsync<AddPreferenceRequest>()
            let p = data.preference
            let np = data.newPreference
            let npri = data.newPreferenceIndex

            updatePreferenceSQL eeid np npri

            for pid in [p; np] do 
                match pid with
                | 0 -> ()
                | _ -> updateProjectPopularitySQL pid

            let query = getPreferenceSQL eeid
            return! json query next ctx 
        }

let preferenceHttpHandler =
    fun (next : HttpFunc) (ctx : HttpContext) ->
        task {
            let token = getTokenFromRequest ctx.Request
            let eeid = getIdFromToken token
            let query = getPreferenceSQL eeid
            return! json query next ctx 
        }

let savePreferencesHttpHandler =
    fun (next : HttpFunc) (ctx : HttpContext) ->
        task {
            let token = getTokenFromRequest ctx.Request
            let eeid = getIdFromToken token

            let! data = ctx.BindJsonAsync<SavePreferenceRequest>()
            let c = data.comments
            let d = data.doc
            let p = data.preference
            let np = data.newPreference
            let npr = data.newPreferenceRanks

            updatePreferencesSQL c d eeid np npr

            for pid in ((np @ p) |> List.distinct) do 
                match pid with
                | 0 -> ()
                | _ -> updateProjectPopularitySQL pid

            let query = getPreferenceSQL eeid
            return! json query next ctx 
        }

let projectProposeHttpHandler =
    fun (next : HttpFunc) (ctx : HttpContext) ->
        task {
            let token = getTokenFromRequest ctx.Request
            let eeid = getIdFromToken token

            let! data = ctx.BindJsonAsync<ProjectProposeRequest>()

            let response = projectProposeSQL data eeid

            match response with
            | Ok res -> 
                ctx.SetStatusCode 200 
                //ctx.Response.Cookies.Append("eeid", tokenResult, options) // res.eeid.ToString()
                return! json "Success" next ctx
            | Error ex -> 
                ctx.SetStatusCode 400; 
                return! json "Failed" next ctx    
        }

// Get all Proposals of user eeid
let proposalsHttpHandler =
    fun (next : HttpFunc) (ctx : HttpContext) ->
        task {
            let token = getTokenFromRequest ctx.Request
            let eeid = getIdFromToken token

            let! isStudent = ctx.BindJsonAsync<bool>()
            let proposals = proposalsSQL eeid isStudent
                            |> List.map (fun p -> { project = p; applicants = applicantsSQL p.pid } )
            return! json proposals next ctx 
        }

// Delete the proposal in DeleteProposalRequest from user eeid
let deleteProposalsHttpHandler =
    fun (next : HttpFunc) (ctx : HttpContext) ->
        task {
            let token = getTokenFromRequest ctx.Request
            let eeid = getIdFromToken token

            let! data = ctx.BindJsonAsync<DeleteProposalRequest>()
            deleteProposalSQL data.pid |> ignore
            let proposals = proposalsSQL eeid data.isStudent
                            |> List.map (fun p -> { project = p; applicants = applicantsSQL p.pid } )
            return! json proposals next ctx 
        }

// Save/Update the proposal in EditProposalRequest from uer eeid
let saveProposalHttpHandler =
    fun (next : HttpFunc) (ctx : HttpContext) ->
        task {
            let token = getTokenFromRequest ctx.Request
            let eeid = getIdFromToken token

            let! data = ctx.BindJsonAsync<EditProposalRequest>()
            deleteProposalSQL data.pid |> ignore
            let proposals = proposalsSQL eeid data.isStudent
                            |> List.map (fun p -> { project = p; applicants = applicantsSQL p.pid } )
            return! json proposals next ctx 
        }
