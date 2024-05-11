open System
open Microsoft.AspNetCore.Builder
open Microsoft.AspNetCore.Hosting
open Microsoft.Extensions.Hosting
open Microsoft.Extensions.Logging
open Microsoft.Extensions.DependencyInjection
open Microsoft.AspNetCore.Cors

open Handlers
open Giraffe

(* Web App Configuration *)

let webApp = 
    choose [
        route "/" >=> GET >=> text "Server Online"
        route "/login" >=> POST >=> warbler (fun _ -> loginHttpHandler)
        route "/project" >=> GET >=> warbler (fun _ -> projectHttpHandler)
    ]
    // Note: warbler is used when the route is returning a dynamic (not static) response, hence wrap the function in a "warbler()"
    // This is because functions in f# are eagerly evaluated, hence a normal route will only be evaluated the first time.
    // warbler will ensure that the function is evaluated every time a route is hit.

(* Infrastructure Configuration *)

// Define the error handler function
let errorHandler (ex : Exception) (logger : ILogger) =
    logger.LogError(EventId(), ex, "An unhandled exception has occurred while executing the request.")
    clearResponse
    >=> ServerErrors.INTERNAL_ERROR ex.Message

// Register all ASP.NET Core middleware
let configureApp (app : IApplicationBuilder) =
    let env = app.ApplicationServices.GetService<IWebHostEnvironment>()
    (match env.IsDevelopment() with
    | true  ->
        app.UseDeveloperExceptionPage()
    | false ->
        app .UseGiraffeErrorHandler(errorHandler)
            // .UseAuthentication() // If you were doing authentication
            .UseHttpsRedirection())

        .UseCors(fun builder -> builder.WithOrigins("http://localhost:5173").AllowAnyMethod().AllowAnyHeader() |> ignore)
        //.UseStaticFiles() // If sending whole files
        .UseGiraffe(webApp)
    (*
    app.UseGiraffeErrorHandler(errorHandler)
       .UseGiraffe webApp
    app.UseCors(fun builder -> builder.WithOrigins("http://localhost:1234").AllowAnyMethod().AllowAnyHeader() |> ignore)
       |> ignore
    *)


let configureServices (services : IServiceCollection) =
    services.AddCors()    |> ignore
    services.AddGiraffe() |> ignore

[<EntryPoint>]
let main _ =
    Host.CreateDefaultBuilder()
        .ConfigureWebHostDefaults(
            fun webHostBuilder ->
                webHostBuilder
                    // Calling Configure to set up all middleware
                    .Configure(configureApp)
                    .ConfigureServices(configureServices)
                    .UseUrls("http://localhost:1234")
                    |> ignore)
        .Build()
        .Run()
    0