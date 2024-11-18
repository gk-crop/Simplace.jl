# Simplace

[![Build Status](https://github.com/gk-crop/Simplace.jl/actions/workflows/CI.yml/badge.svg?branch=main)](https://github.com/gk-crop/Simplace.jl/actions/workflows/CI.yml?query=branch%3Amain)

Julia package to interact with the modeling framework Simplace

## Introduction
This package provides methods to interact with the modelling framework <span style="font-variant:small-caps;">Simplace</span> - 
**S**<span style="font-variant:small-caps;">cientific</span> 
**I**<span style="font-variant:small-caps;">mpact assessment and</span> 
**M**<span style="font-variant:small-caps;">odelling</span>
**PL**<span style="font-variant:small-caps;">atform for</span> 
**A**<span style="font-variant:small-caps;">dvanced</span> 
**C**<span style="font-variant:small-caps;">rop and</span> 
**E**<span style="font-variant:small-caps;">cosystem management</span>. 
See [www.simplace.net](https://www.simplace.net/) for more information on Simplace. Simplace is written in Java (and some parts in Scala) so one can access it from `Julia` via `JavaCall` package. The purpose of this package is to simplify the interaction between Julia and Simplace, by providing functions to:

- initialize and configure Simplace
- load a simulation (solution and project)
- parameterize the simulation
- run the simulation
- get simulation output and convert it to formats suitable for Julia


## Installing the Simplace Framework

For installing <span style="font-variant:small-caps;">Simplace</span>, please consult the webpage [www.simplace.net](https://www.simplace.net/).
Notice that Simplace version 5.1, svn revision >=403 is required.

A brief guide to install <span style="font-variant:small-caps;">Simplace</span>:

- If you don't have installed Java, please install an appropriate version of the (JRE or JDK) from [openjdk.org](https://openjdk.org/) or [adoptium.net](https://adoptium.net) (recommended).
- Get Simplace from [www.simplace.net](https://www.simplace.net/)
- Install the `Simplace` package in Julia:  
```julia
julia> using Pkg; Pkg.add("Simplace")
```
If you encounter errors, make sure to install the package `JavaCall`.

## Basic Usage

The usage of <span style="font-variant:small-caps;">Simplace</span> in Julia follows roughly this scheme:

- init <span style="font-variant:small-caps;">Simplace</span> by providing the path to your simplace installation directory, your working directory and your outputs
- open a <span style="font-variant:small-caps;">Simplace</span> project form a solution (and project) file
- create a list of simulation parameters you want to change
- create and run a Simulation
- get the result from the simulation
- convert the result to a Julia object (`Dict()`)

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