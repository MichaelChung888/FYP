module Handlers

open Shared

open System
open System.IO
open System.Threading.Tasks
open Microsoft.AspNetCore.Http
open Microsoft.Data.SqlClient
open Giraffe
open System.Data
open Newtonsoft.Json

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
//                                      Main code                                       //
//--------------------------------------------------------------------------------------//

let loginHttpHandler =
    fun (next : HttpFunc) (ctx : HttpContext) ->
        task {
            let! data = ctx.BindJsonAsync<LoginInfo>()

            let loginAuthenticateCmd = new SqlCommand ("SELECT * FROM dbo.Person WHERE Username = @username;", conn)
            loginAuthenticateCmd.Parameters.AddWithValue("@username", data.Username) |> ignore
            let jsonQuery = ExecuteQuery(loginAuthenticateCmd)
            
            let query = JsonConvert.DeserializeObject<List<AccountInfo>>(jsonQuery);
            let res = query |> List.tryFind (fun record -> record.Username = data.Username && record.Password = data.Password)

            match res with 
            | Some result -> ctx.SetStatusCode 200; return! json result next ctx // ("Logged In")
            | None -> ctx.SetStatusCode 400; return! json ("Incorrect Username or Password") next ctx // Task.FromResult None        
        }

let projectHttpHandler = 
    fun (next : HttpFunc) (ctx : HttpContext) ->
        task {
            let projectCmd = new SqlCommand ("SELECT * FROM dbo.Project", conn)
            let jsonQuery = ExecuteQuery(projectCmd)
            
            let query = JsonConvert.DeserializeObject<List<ProjectInfo>>(jsonQuery);
            return! json query next ctx 
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
