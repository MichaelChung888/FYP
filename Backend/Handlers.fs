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

            match loginAuthenticateSQL data.eeid with
            | Ok jsonQuery -> 
                let query = JsonConvert.DeserializeObject<List<Person>>(jsonQuery);
                let res = query |> List.tryFind (fun _ -> true) // Returns 'Some result' if query found a result, else 'None'

                match res with 
                | Some person ->  

                    let role = match person.categ with
                               | "U" | "M" -> "Student"
                               | "C" -> "Coordinator"
                               | _ -> "Supervisor"

                    let loginResponse = { person = person
                                          token = generateToken person.eeid role }

                    ctx.SetStatusCode 200 
                    //ctx.Response.Cookies.Append("eeid", tokenResult, options) // res.eeid.ToString()
                    return! json loginResponse next ctx
                | None -> 
                    ctx.SetStatusCode 400; 
                    return! json ("Incorrect eeid") next ctx   
            | Error ex -> 
                printfn "%A" ex
                ctx.SetStatusCode 400; 
                return! json ex next ctx    
        }

let newProjectsHttpHandler =
    fun (next : HttpFunc) (ctx : HttpContext) ->
        task {
            match newProjectsSQL () with
            | Error ex -> 
                printfn "%A" ex
                ctx.SetStatusCode 400; 
                return! json ex next ctx 
            | Ok jsonQuery -> 
                let res = JsonConvert.DeserializeObject<List<Project>>(jsonQuery);
                return! json res next ctx 
        }

let projectsHttpHandler = 
    fun (next : HttpFunc) (ctx : HttpContext) ->
        task {
            match projectsSQL () with
            | Error ex -> 
                printfn "%A" ex
                ctx.SetStatusCode 400; 
                return! json ex next ctx 
            | Ok jsonQuery -> 
                let res = JsonConvert.DeserializeObject<List<Project>>(jsonQuery);
                return! json res next ctx 
        }

let searchProjectHttpHandler =
    fun (next : HttpFunc) (ctx : HttpContext) ->
        task {
            let! data = ctx.BindJsonAsync<SearchRequest>()

            match searchProjectSQL data with
            | Error ex -> 
                printfn "%A" ex
                ctx.SetStatusCode 400; 
                return! json ex next ctx 
            | Ok jsonQuery -> 
                let res = JsonConvert.DeserializeObject<List<Project>>(jsonQuery);
                return! json res next ctx 
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

            match updatePreferenceSQL eeid np npri with
            | Error ex -> 
                printfn "%A" ex
                ctx.SetStatusCode 400; 
                return! json ex next ctx  
            | Ok _ ->
                for pid in [p; np] do 
                    match pid with
                    | 0 -> ()
                    | _ -> updateProjectPopularitySQL pid
                        
                match getPreferenceSQL eeid with
                | Error ex -> 
                    printfn "%A" ex
                    ctx.SetStatusCode 400; 
                    return! json ex next ctx  
                | Ok jsonQuery -> 
                    let query = (JsonConvert.DeserializeObject<List<Preference>>(jsonQuery))[0];
                    let response = {
                        eeid = query.eeid
                        p1 = getAProjectSQL query.p1; p2 = getAProjectSQL query.p2; p3 = getAProjectSQL query.p3; p4 = getAProjectSQL query.p4
                        p5 = getAProjectSQL query.p5; p6 = getAProjectSQL query.p6; p7 = getAProjectSQL query.p7; p8 = getAProjectSQL query.p8 
                        p9 = getAProjectSQL query.p9; p10 = getAProjectSQL query.p10
                        n1 = query.n1; n2 = query.n2; n3 = query.n3; n4 = query.n4; n5 = query.n5
                        n6 = query.n6; n7 = query.n7; n8 = query.n8; n9 = query.n9; n10 = query.n10
                        s1 = query.s1; s2 = query.s2; s3 = query.s3; s4 = query.s4; s5 = query.s5
                        s6 = query.s6; s7 = query.s7; s8 = query.s8; s9 = query.s9; s10 = query.s10
                        upddate = query.upddate
                        comments = query.comments
                        feedback = query.feedback
                        doc = query.doc
                    }
                    ctx.SetStatusCode 200 
                    return! json response next ctx 
        }

let preferenceHttpHandler =
    fun (next : HttpFunc) (ctx : HttpContext) ->
        task {
            let token = getTokenFromRequest ctx.Request
            let eeid = getIdFromToken token
            match getPreferenceSQL eeid with
            | Error ex -> 
                printfn "%A" ex
                ctx.SetStatusCode 400; 
                return! json ex next ctx  
            | Ok jsonQuery -> 
                let query = (JsonConvert.DeserializeObject<List<Preference>>(jsonQuery))[0];
                let response = {
                    eeid = query.eeid
                    p1 = getAProjectSQL query.p1; p2 = getAProjectSQL query.p2; p3 = getAProjectSQL query.p3; p4 = getAProjectSQL query.p4
                    p5 = getAProjectSQL query.p5; p6 = getAProjectSQL query.p6; p7 = getAProjectSQL query.p7; p8 = getAProjectSQL query.p8 
                    p9 = getAProjectSQL query.p9; p10 = getAProjectSQL query.p10
                    n1 = query.n1; n2 = query.n2; n3 = query.n3; n4 = query.n4; n5 = query.n5
                    n6 = query.n6; n7 = query.n7; n8 = query.n8; n9 = query.n9; n10 = query.n10
                    s1 = query.s1; s2 = query.s2; s3 = query.s3; s4 = query.s4; s5 = query.s5
                    s6 = query.s6; s7 = query.s7; s8 = query.s8; s9 = query.s9; s10 = query.s10
                    upddate = query.upddate
                    comments = query.comments
                    feedback = query.feedback
                    doc = query.doc
                }
                ctx.SetStatusCode 200 
                return! json response next ctx 
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
            
            match updatePreferencesSQL c d eeid np npr with
            | Error ex -> 
                printfn "%A" ex
                ctx.SetStatusCode 400; 
                return! json ex next ctx  
            | Ok _ ->
                for pid in ((np @ p) |> List.distinct) do 
                    match pid with
                    | 0 -> ()
                    | _ -> updateProjectPopularitySQL pid
                        
                match getPreferenceSQL eeid with
                | Error ex -> 
                    printfn "%A" ex
                    ctx.SetStatusCode 400; 
                    return! json ex next ctx  
                | Ok jsonQuery -> 
                    let query = (JsonConvert.DeserializeObject<List<Preference>>(jsonQuery))[0];
                    let response = {
                        eeid = query.eeid
                        p1 = getAProjectSQL query.p1; p2 = getAProjectSQL query.p2; p3 = getAProjectSQL query.p3; p4 = getAProjectSQL query.p4
                        p5 = getAProjectSQL query.p5; p6 = getAProjectSQL query.p6; p7 = getAProjectSQL query.p7; p8 = getAProjectSQL query.p8 
                        p9 = getAProjectSQL query.p9; p10 = getAProjectSQL query.p10
                        n1 = query.n1; n2 = query.n2; n3 = query.n3; n4 = query.n4; n5 = query.n5
                        n6 = query.n6; n7 = query.n7; n8 = query.n8; n9 = query.n9; n10 = query.n10
                        s1 = query.s1; s2 = query.s2; s3 = query.s3; s4 = query.s4; s5 = query.s5
                        s6 = query.s6; s7 = query.s7; s8 = query.s8; s9 = query.s9; s10 = query.s10
                        upddate = query.upddate
                        comments = query.comments
                        feedback = query.feedback
                        doc = query.doc
                    }
                    ctx.SetStatusCode 200 
                    return! json response next ctx 
        }

let projectProposeHttpHandler =
    fun (next : HttpFunc) (ctx : HttpContext) ->
        task {
            let token = getTokenFromRequest ctx.Request
            let eeid = getIdFromToken token

            let! data = ctx.BindJsonAsync<ProjectProposeRequest>()

            let response = projectProposeSQL data eeid

            match response with
            | Error ex -> 
                printfn "%A" ex
                ctx.SetStatusCode 400; 
                return! json ex next ctx  
            | Ok res -> 
                ctx.SetStatusCode 200 
                return! json res next ctx   
        }

// Get all Proposals of user eeid
let proposalsHttpHandler =
    fun (next : HttpFunc) (ctx : HttpContext) ->
        task {
            let token = getTokenFromRequest ctx.Request
            let eeid = getIdFromToken token

            let! isStudent = ctx.BindJsonAsync<bool>()
            let response = proposalsSQL eeid isStudent

            match response with
            | Error ex -> 
                printfn "%A" ex
                ctx.SetStatusCode 400; 
                return! json ex next ctx  
            | Ok res -> 
                let proposals = JsonConvert.DeserializeObject<List<Project>>(res)
                                |> List.map (fun p -> { project = p; applicants = applicantsSQL p.pid } )
                ctx.SetStatusCode 200 
                return! json proposals next ctx 
  
        }

// Delete the proposal in DeleteProposalRequest from user eeid
let deleteProposalsHttpHandler =
    fun (next : HttpFunc) (ctx : HttpContext) ->
        task {
            let token = getTokenFromRequest ctx.Request
            let eeid = getIdFromToken token

            let! data = ctx.BindJsonAsync<DeleteProposalRequest>()
            match deleteProposalSQL data.pid with
            | Error ex -> 
                printfn "%A" ex
                ctx.SetStatusCode 400; 
                return! json ex next ctx  
            | Ok _ ->
                match proposalsSQL eeid data.isStudent with
                | Error ex -> 
                    printfn "%A" ex
                    ctx.SetStatusCode 400; 
                    return! json ex next ctx  
                | Ok res -> 
                    let proposals = JsonConvert.DeserializeObject<List<Project>>(res)
                                    |> List.map (fun p -> { project = p; applicants = applicantsSQL p.pid } )
                    ctx.SetStatusCode 200 
                    return! json proposals next ctx 
        }

// Save/Update the proposal in EditProposalRequest from uer eeid
let editProposalHttpHandler =
    fun (next : HttpFunc) (ctx : HttpContext) ->
        task {
            let token = getTokenFromRequest ctx.Request
            let eeid = getIdFromToken token

            let! data = ctx.BindJsonAsync<EditProposalRequest>()
            match editProposalSQL data with
            | Error ex -> 
                printfn "%A" ex
                ctx.SetStatusCode 400; 
                return! json ex next ctx  
            | Ok _ ->
                match proposalsSQL eeid data.isStudent with
                | Error ex -> 
                    printfn "%A" ex
                    ctx.SetStatusCode 400; 
                    return! json ex next ctx  
                | Ok res -> 
                    let proposals = JsonConvert.DeserializeObject<List<Project>>(res)
                                    |> List.map (fun p -> { project = p; applicants = applicantsSQL p.pid } )
                    ctx.SetStatusCode 200 
                    return! json proposals next ctx 
        }

// Save/Update the proposal in EditProposalRequest from uer eeid
let editSuitabilityHttpHandler =
    fun (next : HttpFunc) (ctx : HttpContext) ->
        task {
            let token = getTokenFromRequest ctx.Request
            let eeid = getIdFromToken token

            let! data = ctx.BindJsonAsync<EditSuitabilityRequest>()
            match editSuitabilitySQL data with
            | Error ex -> 
                printfn "%A" ex
                ctx.SetStatusCode 400; 
                return! json ex next ctx  
            | Ok _ ->
                match proposalsSQL eeid data.isStudent with
                | Error ex -> 
                    printfn "%A" ex
                    ctx.SetStatusCode 400; 
                    return! json ex next ctx  
                | Ok res -> 
                    let proposals = JsonConvert.DeserializeObject<List<Project>>(res)
                                    |> List.map (fun p -> { project = p; applicants = applicantsSQL p.pid } )
                    ctx.SetStatusCode 200 
                    return! json proposals next ctx 
        }



let allProjectsHttpHandler =
    fun (next : HttpFunc) (ctx : HttpContext) ->
        task {
            match allProjectsSQL () with
            | Error ex -> 
                printfn "%A" ex
                ctx.SetStatusCode 400; 
                return! json ex next ctx 
            | Ok jsonQuery -> 
                let res = JsonConvert.DeserializeObject<List<Project>>(jsonQuery);
                return! json res next ctx 
        }