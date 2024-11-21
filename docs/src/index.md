# Simplace Documentation

Simplace is a Julia package to interact with the modeling framework Simplace.

```@contents
```

## Installing the Simplace Framework

For installing Simplace, please consult the webpage [www.simplace.net](https://www.simplace.net/).
Notice that Simplace version 5.1, svn revision >=403 is required.

A brief guide to install Simplace:

- If you don't have installed Java, please install an appropriate version of the (JRE or JDK) from [openjdk.org](https://openjdk.org/) or [adoptium.net](https://adoptium.net) (recommended).
- Get Simplace from [www.simplace.net](https://www.simplace.net/)
- Install the `Simplace` package in Julia:  
```julia
julia> using Pkg; Pkg.add("Simplace")
```

## Functions

```@autodocs
Modules = [Simplace]
```

## Examples 

### Running a project

```{julia}
using Simplace

# directory where simplace is installed
installDir = "d:/simplace/"

# configure path and choose simulation setup (solution, project)
workDir = joinpath(installDir, "simplace_run/simulation/")
outputDir = joinpath(installDir, "simplace_run/output/")
sol = joinpath(workDir, "gk/solution/complete/Complete.sol.xml")
proj = joinpath(workDir, "gk/project/complete/CompleteSensitivity.proj.xml")

# initialise simplace
sh = initSimplace(installDir, workDir, outputDir)

sess = openProject(sh, sol, proj)
runProject(sh)
closeProject(sh)
```

### Run a solution with changed parameters

```{julia}
using Simplace

# Directory where simplace is installed
installDir = "d:/simplace/"

workDir = joinpath(installDir, "simplace_run/simulation/")
outputDir = joinpath(installDir, "simplace_run/output/")
sol = joinpath(workDir, "gk/solution/complete/Complete.sol.xml")

# initialise simplace
sh = initSimplace(installDir, workDir, outputDir)

sess = openProject(sh, sol, "", Dict("enddate" => "1999-12-31"))

# create a simulation that starts in 1995 and set the light use efficiency parameter to 3.2
simid=createSimulation(sh, Dict("startdate" => "1995-01-01", "vBaseLUE" => 3.2))

setLogLevel("WARN")
runSimulations(sh)
setLogLevel("INFO")

closeProject(sh)

# fetch the result (java object) and convert it into a Julia Dict()
res = getResult(sh, "DIAGRAM_OUT", simid)
d = resultToDict(res)
print(d["AnthesisDate"])
```

### Using default locations for framework and simulations

If you keep the Simplace installation and simulations data in standard
folders (e.g. `~/workspace/` or `D:/workspace/` etc.), you can omit 
the specification of folders.

```{julia}
using Simplace

# define filenames relative to workdir
sol = "gk/solution/complete/Complete.sol.xml"
proj = "gk/project/complete/CompleteSensitivity.proj.xml"

# initialise simplace - it will auto-detect the framework location
sh = initSimplace()

sess = openProject(sh, sol, proj)
runProject(sh)
closeProject(sh)
```


## Index

```@index
```