module Handlers

open Shared
open JWT

open Microsoft.AspNetCore.Http
open Microsoft.Data.SqlClient
open Giraffe
open System.Data
open Newtonsoft.Json
open System.IdentityModel.Tokens.Jwt

open System.Security.Claims

let options = new CookieOptions();
options.SameSite = SameSiteMode.None |> ignore
options.Secure = true |> ignore
options.HttpOnly = true |> ignore

//--------------------------------------------------------------------------------------//
//                            Opening Connection to Database                            //
//--------------------------------------------------------------------------------------//

let [<Literal>] connString = "Server=tcp:myfypserver.database.windows.net,1433;Initial Catalog=myDatabase;Persist Security Info=False;User ID=azureuser;Password=michaelchung@123;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;" //Connection Timeout=30; "Server=localhost;Database=test;User Id=test;Password=test"
let conn = new SqlConnection (connString)
conn.Open()

//cmd.Parameters.AddWithValue("@shippedLaterThan", DateTime(2008, 1, 1)) |> ignore
//cmd.Parameters.AddWithValue("@shipMethodId", 4) |> ignore

//--------------------------------------------------------------------------------------//
//                         Execute SQL Command and return JSON                          //
//--------------------------------------------------------------------------------------//

let ExecuteQuery (command: SqlCommand) : string = 
    let reader = command.ExecuteReader()
    let dataTable = new DataTable();
    dataTable.Load(reader)
    JsonConvert.SerializeObject(dataTable, Formatting.Indented);

//--------------------------------------------------------------------------------------//
//                         All Required Fields from all Tables                          //
//--------------------------------------------------------------------------------------//

let allPersonFields = "eeid, CID, Categ, RegWant, Forenames"
let allProjectFields = "ps.TITLE, ps.TSTREAM, ps.COMMENTS, ps.STUDENT, ps.DESCR, pe.*"
let allPreferenceFields = "EEID, P1, P2, P3, P4, P5, P6, P7, P8, P9, P10, N1, N2, N3, N4, N5, N6, N7, N8, N9, N10, UPDDATE, COMMENTS, FEEDBACK"

//--------------------------------------------------------------------------------------//
//                                      Main code                                       //
//--------------------------------------------------------------------------------------//

let loginHttpHandler =
    fun (next : HttpFunc) (ctx : HttpContext) ->
        task {
            let! data = ctx.BindJsonAsync<LoginRequest>()

            let loginAuthenticateCmd = new SqlCommand (
                $"SELECT {allPersonFields} 
                FROM eedbo_eepx 
                WHERE eeid = @eeid;", conn)
            loginAuthenticateCmd.Parameters.AddWithValue("@eeid", data.eeid) |> ignore
            let jsonQuery = ExecuteQuery(loginAuthenticateCmd)
            
            let query = JsonConvert.DeserializeObject<List<Person>>(jsonQuery);
            let res = query |> List.tryFind (fun _ -> true) // Returns 'Some result' if query found a result, else 'None'

            match res with 
            | Some person ->  
                let loginResponse = { person = person
                                      token = generateToken person.eeid }
                ctx.SetStatusCode 200 
                //ctx.Response.Cookies.Append("eeid", tokenResult, options) // res.eeid.ToString()
                return! json loginResponse next ctx
            | None -> ctx.SetStatusCode 400; return! json ("Incorrect eeid") next ctx      
        }

let newProjectHttpHandler =
    fun (next : HttpFunc) (ctx : HttpContext) ->
        task {
            let projectCmd = new SqlCommand (
                $"SELECT TOP 8 {allProjectFields} 
                FROM eedbo_projects_sqlserver ps 
                JOIN eedbo_projects_extra pe ON ps.PID = pe.PID 
                ORDER BY pe.updated DESC", conn)
            let jsonQuery = ExecuteQuery(projectCmd)
            let query = JsonConvert.DeserializeObject<List<Project>>(jsonQuery);
            return! json query next ctx 
        }

let projectHttpHandler = 
    fun (next : HttpFunc) (ctx : HttpContext) ->
        task {
            let projectCmd = new SqlCommand (
                $"SELECT {allProjectFields} 
                FROM eedbo_projects_sqlserver ps 
                JOIN eedbo_projects_extra pe ON ps.PID = pe.PID 
                ORDER BY pe.updated DESC", conn)
            let jsonQuery = ExecuteQuery(projectCmd)
            let query = JsonConvert.DeserializeObject<List<Project>>(jsonQuery);
            return! json query next ctx 
        }

let searchProjectHttpHandler =
    fun (next : HttpFunc) (ctx : HttpContext) ->
        task {

            let! data = ctx.BindJsonAsync<SearchRequest>()

            let categories = data.categories 
                             |> List.map (fun c -> "pe.categories LIKE '%" + c + "%' AND") 
                             |> String.concat " "
            
            let streams = data.streams
                          |> List.map (fun s -> "ps.TSTREAM LIKE '%" + s + "%' AND") 
                          |> String.concat " "
            
            let searchInput text =
                "(CASE WHEN ps.TITLE LIKE '%" + text + "' THEN 1 ELSE 0 END +
                 CASE WHEN ps.TITLE LIKE '%" + text + "%' THEN 1 ELSE 0 END)"

            let projectCmd = 
                new SqlCommand (
                    $"SELECT {allProjectFields}
                    FROM eedbo_projects_sqlserver ps 
                    JOIN eedbo_projects_extra pe ON ps.PID = pe.PID
                    WHERE {categories} {streams} {searchInput data.title} > 0
                    ORDER BY pe.updated DESC, {searchInput data.title} DESC", conn)
            let jsonQuery = ExecuteQuery(projectCmd)
            let query = JsonConvert.DeserializeObject<List<Project>>(jsonQuery);
            return! json query next ctx 
        }

let preferenceHttpHandler =
    fun (next : HttpFunc) (ctx : HttpContext) ->
        task {
            let token = getTokenFromRequest ctx.Request
            let eeid = getIdFromToken token

            let preferenceCmd = new SqlCommand (
                $"SELECT {allPreferenceFields} 
                FROM eedbo_projprefs 
                WHERE EEID = {eeid}", conn)
            let jsonQuery = ExecuteQuery(preferenceCmd)
            let query = (JsonConvert.DeserializeObject<List<Preference>>(jsonQuery))[0];

            let getProject (pid: string) : Project =
                match pid with
                | "-" -> Project.Default // Preference has not been selected for that Rank
                | _ ->
                    let projectCmd = new SqlCommand (
                        $"SELECT {allProjectFields}
                        FROM eedbo_projects_sqlserver ps 
                        JOIN eedbo_projects_extra pe ON ps.PID = pe.PID 
                        WHERE ps.PID = {pid}", conn)
                    let jsonQuery = ExecuteQuery(projectCmd)
                    (JsonConvert.DeserializeObject<List<Project>>(jsonQuery))[0];

            let response = {
                eeid = query.eeid
                p1 = getProject query.p1; p2 = getProject query.p2; p3 = getProject query.p3; p4 = getProject query.p4
                p5 = getProject query.p5; p6 = getProject query.p6; p7 = getProject query.p7; p8 = getProject query.p8 
                p9 = getProject query.p9; p10 = getProject query.p10
                n1 = query.n1; n2 = query.n2; n3 = query.n3; n4 = query.n4; n5 = query.n5
                n6 = query.n6; n7 = query.n7; n8 = query.n8; n9 = query.n9; n10 = query.n10
                upddate = query.upddate
                comments = query.comments
                feedback = query.feedback
            }

            printfn "%A" response
            return! json response next ctx 
        }

//--------------------------------------------------------------------------------------//
//                            Boilerplate code (IREELEVANT)                             //
//--------------------------------------------------------------------------------------//

(*

type BlogPost = {
    title: string
    content: string
}

type BlogDb() =

    let mutable allBlogPosts : BlogPost list = []

    member this.GetAllPosts = fun() -> allBlogPosts 

    member this.AddPost (newPost : BlogPost) =
        allBlogPosts <- (newPost::allBlogPosts)
        allBlogPosts

type BlogServiceTree = {
    getBlogDb : unit -> BlogDb
}

let getPostsHttpHandler (serviceTree: BlogServiceTree) =
    fun (next : HttpFunc) (ctx : HttpContext) ->
        json (serviceTree.getBlogDb().GetAllPosts()) next ctx

let createPostHttpHandler (serviceTree: BlogServiceTree) =
    fun (next : HttpFunc) (ctx : HttpContext) ->
        task {
            let! newPostJson = ctx.BindJsonAsync<BlogPost>()
            serviceTree.getBlogDb().AddPost(newPostJson) |> ignore
            return! json (newPostJson) next ctx
        }
        // Giraffe uses the native .NET "Task" type which are objects that replace the historic F# async {} workflows.
        // It is useful as it removes the necessity of converting between tasks and async workflows (because ASP.NET Core
        // can only work with tasks)
*)

