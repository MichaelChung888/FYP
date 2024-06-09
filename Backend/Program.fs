open System
open Microsoft.AspNetCore.Builder
open Microsoft.AspNetCore.Hosting
open Microsoft.Extensions.Hosting
open Microsoft.Extensions.Logging
open Microsoft.Extensions.DependencyInjection
open Microsoft.AspNetCore.Cors

// Authentication
open Microsoft.AspNetCore.Authentication.JwtBearer
open Microsoft.IdentityModel.Tokens
open System.Text

open Handlers
open Giraffe
open JWT

(* Web App Configuration *)

let authorize =
    requiresAuthentication (challenge JwtBearerDefaults.AuthenticationScheme >=> text "Please Authenticate")

let webApp = 
    choose [
        route "/" >=> GET >=> text "Server Online"
        route "/login" >=> POST >=> loginHttpHandler
        authorize >=> 
            choose [
                route "/new-projects" >=> GET >=> newProjectHttpHandler
                route "/preferences" >=> GET >=> preferenceHttpHandler
                route "/projects" >=> GET >=> projectHttpHandler
                route "/search-projects" >=> POST >=>  searchProjectHttpHandler
            ]

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
        app.UseGiraffeErrorHandler(errorHandler)
           .UseHttpsRedirection())
           .UseCors(fun builder -> builder.WithOrigins("http://localhost:5173").AllowAnyMethod()
                                                                               .AllowAnyHeader()
                                                                               .AllowCredentials() 
                                                                               |> ignore)
            .UseStaticFiles()
            .UseAuthentication()
            .UseGiraffe(webApp)

let configureServices (services : IServiceCollection) =
    //let sp  = services.BuildServiceProvider()
    //let env = sp.GetService<IHostEnvironment>() // IHostingEnvironment
    //let viewsFolderPath = Path.Combine(env.ContentRootPath, "Views")

    services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(fun options ->
                options.TokenValidationParameters <- TokenValidationParameters (
                    ValidateActor = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = "jwtwebapp.net",
                    ValidAudience = "jwtwebapp.net",
                    IssuerSigningKey = SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey)))
            ) |> ignore
    //services.AddRazorEngine viewsFolderPath |> ignore
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