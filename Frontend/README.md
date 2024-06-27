# FYP Frontend

# Fable.Elmish.React Template

This template can be used to generate a simple web app with [Fable](http://fable.io/) and [Elmish](https://fable-elmish.github.io/).
You can find more templates by searching `Fable.Template` packages in [Nuget](https://www.nuget.org).

## Requirements

* [.NET 2.0](https://www.microsoft.com/en-us/download/details.aspx?id=6041)
* [node.js](https://nodejs.org) 4.8.2 or higher
* npm: JS package manager

## Building and running the app

Run `dotnet fsi build.fsx --watch` to start the development server. Whenever you modify a file, the server will be updated automatically.

You can then access the app at http://localhost:5173. If the port is already used another port will be chosen automatically (look at your console to know which one).

If you are using VS Code + [Ionide](http://ionide.io/), you can also use VSCode task runner. This also has the advantage that Fable-specific errors will be highlighted in the editor along with other F# errors.

1. Press `Ctrl+Shift+P` (Cmd+Shift+P on macOS) and type `Run task` to build the project.
2. Select `Tasks: Run Task` and press Enter.
3. Select `Start` and press Enter.

Any modification you do to the F# code will be reflected in the web page after saving.

When you want to build you application, run `dotnet fsi build.fsx`. You will find the result in the `src/dist/` folder.

## Project structure

### Paket

[Paket](https://fsprojects.github.io/Paket/) is the package manager used for F# dependencies. It doesn't need a global installation, the binary is included in the `.paket` folder. Other Paket related files are:

- **paket.dependencies**: contains all the dependencies in the repository.
- **paket.references**: there should be one such a file next to each `.fsproj` file.
- **paket.lock**: automatically generated, but should committed to source control, [see why](https://fsprojects.github.io/Paket/faq.html#Why-should-I-commit-the-lock-file).
- **Nuget.Config**: prevents conflicts with Paket in machines with some Nuget configuration.

> Paket dependencies will be installed in the `packages` directory. See [Paket website](https://fsprojects.github.io/Paket/) for more info.
> To add a package to a project, go to the project's ".fsproj" directory and enter "paket add <package>" (e.g "paket add Fable.React --version 9.3.0")

### npm

- **package.json**: contains the JS dependencies together with other info, like development scripts.
- **package-lock.json**: is the lock file created by npm5.

> JS dependencies will be installed in `node_modules`. See [npm](https://www.npmjs.com/) website for more info.

### Vite

[Vite](https://vitejs.dev/) is a bundler, which links different JS sources into a single file making deployment much easier. It also offers other features, like a static dev server that can automatically refresh the browser upon changes in your code or a minifier for production release. Fable interacts with Vite like any JavaScript code.

- **vite.config.ts**: is the configuration file for Vite. It allows you to set many things: like the path of the bundle, the port for the development server, etc. See [Vite website](https://vitejs.dev/) for more info.

### build.fsx

`build.fsx` is a script which is responsible for controlling the build process. It use [Fun.Build](https://github.com/slaveOftime/Fun.Build).
