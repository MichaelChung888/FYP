open System
open Microsoft.AspNetCore.Builder
open Microsoft.AspNetCore.Hosting
open Microsoft.Extensions.Hosting
open Microsoft.Extensions.Logging
open Microsoft.Extensions.DependencyInjection
open Microsoft.AspNetCore.Cors
//open Microsoft.AspNetCore.Authentication.JwtBearer

open Handlers
open Giraffe

(* Web App Configuration *)

let webApp = 
    choose [
        route "/" >=> GET >=> text "Server Online"
        route "/login" >=> POST >=> warbler (fun _ -> loginHttpHandler)
        route "/projects" >=> GET >=> warbler (fun _ -> projectHttpHandler)
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
            //.UseStaticFiles()
            //.UseAuthentication() // <-- Add here, before UseGiraffe
            .UseGiraffe(webApp)

let configureServices (services : IServiceCollection) =
    services.AddCors()    |> ignore
    services.AddGiraffe() |> ignore
(*
    services.AddAuthentication(fun opt -> 
        // See Note 1
        opt.DefaultAuthenticateScheme <- JwtBearerDefaults.AuthenticationScheme

        // Not needed, see Note 2 below
        // opt.DefaultChallengeScheme <- JwtBearerDefaults.AuthenticationScheme

    // Second, we configure our middleware
    ).AddJwtBearer(fun (opt : JwtBearerOptions)-> 

        // You can set general options of JWT authentication here.  
        // Find more details at:
        //   https://docs.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.authentication.jwtbearer.jwtbeareroptions?view=aspnetcore-5.0
        // Note, however, most of it is not relevant for our simple case
        
        opt.TokenValidationParameters <- TokenValidationParameters(
            // You can configure the actual authentication parameters and options.  
            // See more at:
            //   https://docs.microsoft.com/en-us/dotnet/api/microsoft.identitymodel.tokens.tokenvalidationparameters?view=azure-dotnet

            // SecurityKey that is to be used for signature validation.
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key)),

            // boolean to control if the issuer will be validated during token validation.
            ValidateIssuer = true,

            // String that represents a valid issuer that will be used to check against the token's issuer. The default is null.
            ValidIssuer = issuer,

            // boolean to control if the audience will be validated during token validation.
            ValidateAudience = true,

            // string that represents a valid audience that will be used to check against the token's audience. The default is null.
            ValidAudience = audience
        )) |> ignore
*)
    
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