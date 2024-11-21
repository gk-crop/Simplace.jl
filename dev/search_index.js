var documenterSearchIndex = {"docs":
[{"location":"#Simplace-Documentation","page":"Simplace Documentation","title":"Simplace Documentation","text":"","category":"section"},{"location":"","page":"Simplace Documentation","title":"Simplace Documentation","text":"Simplace is a Julia package to interact with the modeling framework Simplace.","category":"page"},{"location":"","page":"Simplace Documentation","title":"Simplace Documentation","text":"","category":"page"},{"location":"#Installing-the-Simplace-Framework","page":"Simplace Documentation","title":"Installing the Simplace Framework","text":"","category":"section"},{"location":"","page":"Simplace Documentation","title":"Simplace Documentation","text":"For installing Simplace, please consult the webpage www.simplace.net. Notice that Simplace version 5.1, svn revision >=403 is required.","category":"page"},{"location":"","page":"Simplace Documentation","title":"Simplace Documentation","text":"A brief guide to install Simplace:","category":"page"},{"location":"","page":"Simplace Documentation","title":"Simplace Documentation","text":"If you don't have installed Java, please install an appropriate version of the (JRE or JDK) from openjdk.org or adoptium.net (recommended).\nGet Simplace from www.simplace.net\nInstall the Simplace package in Julia:  ","category":"page"},{"location":"","page":"Simplace Documentation","title":"Simplace Documentation","text":"julia> using Pkg; Pkg.add(\"Simplace\")","category":"page"},{"location":"#Functions","page":"Simplace Documentation","title":"Functions","text":"","category":"section"},{"location":"","page":"Simplace Documentation","title":"Simplace Documentation","text":"Modules = [Simplace]","category":"page"},{"location":"#Simplace.closeProject-Tuple{Any}","page":"Simplace Documentation","title":"Simplace.closeProject","text":"closeProject(simplace)\n\nCloses the actual Simplace project\n\n\n\n\n\n","category":"method"},{"location":"#Simplace.createSimulation","page":"Simplace Documentation","title":"Simplace.createSimulation","text":"simid = createSimulation(simplace, parameterList)\n\nCreates a simulation and substitute parameters.\n\nReturns the id of the currently created simulation.\n\nArguments\n\nsimplace handle to the framework returned by initSimplace\nparameterList::Dict a dictionary where the keys correspond to parameter names\nqueue::Bool is the simulation added to existing list or does it starts a new list\n\nExamples\n\nCreate two simulations and run them\n\ncreateSimulation(sh, Dict(\"vLUE\" => 3.0))\ncreateSimulation(sh, Dict(\"vLUE\" => 3.2))\nrunSimulations(sh)\n\nCreate a new simulation, but remove previous simulations\n\ncreateSimulation(sh, Dict(\"vLUE\" => 3.1), false)\nrunSimulations(sh)\n\n\n\n\n\n\n","category":"function"},{"location":"#Simplace.findFirstSimplaceInstallation","page":"Simplace Documentation","title":"Simplace.findFirstSimplaceInstallation","text":"installDir = findFirstSimplaceInstallation()\n\nFinds first installation of Simplace\n\n\n\n\n\n","category":"function"},{"location":"#Simplace.findSimplaceInstallations","page":"Simplace Documentation","title":"Simplace.findSimplaceInstallations","text":"installDirs = findSimplaceInstallations()\n\nReturns a list of simplace installation folders.\n\nThe function checks in common locations if there are simplace_core, simplace_modules and (optionally) simplace_run subfolders.\n\nOne can give also a list of own candidate folders. Using autodetection makes the scripts more portable.\n\nArguments\n\ndirectories::Union{String, Vector{String}} List of potential folders\ntryStandardDirs::Bool searches in common places like ~/workspace or d:/workspace/\nfirstMatchOnly::Bool returns only the first folder that matches\nsimulationDir::String name of the folder where simulations are stored\nignoreSimulationDir::Bool ignores the existance of simulationDir in candidate folder\n\n\n\n\n\n","category":"function"},{"location":"#Simplace.getDatatypesOfResult-Tuple{Any}","page":"Simplace Documentation","title":"Simplace.getDatatypesOfResult","text":"dtypes = getDatatypesOfResult(result)\n\nGet the datatypes of the simulation result variables\n\n\n\n\n\n","category":"method"},{"location":"#Simplace.getResult","page":"Simplace Documentation","title":"Simplace.getResult","text":"result = getResult(simplace, outputId)\n\nFetch output from a simulation.\n\nArguments\n\nsimplace handle to the framework returned by initSimplace\noutputId::String output id defined in the simulation setup (solution or project)\nsimulationId::String optional id of the simulation, default \"\" returns result of all simulations\n\nExamples\n\nrunSimulations(sh)\nresult = getResult(sh, \"PhenologyOutput\")\ndata = resultToDict(result)\n\n\n\n\n\n","category":"function"},{"location":"#Simplace.getSimplaceDirectories-Tuple{Any}","page":"Simplace Documentation","title":"Simplace.getSimplaceDirectories","text":"dirs = getSimplaceDirectories(simplace)\n\nGet the directories (work-, output-, projects- and data-dir)\n\n\n\n\n\n","category":"method"},{"location":"#Simplace.getSimulationIDs-Tuple{Any}","page":"Simplace Documentation","title":"Simplace.getSimulationIDs","text":"ids = getSimulationIDs(simplace)\n\nGet IDs of the simulations in the simulation list\n\n\n\n\n\n","category":"method"},{"location":"#Simplace.getUnitsOfResult-Tuple{Any}","page":"Simplace Documentation","title":"Simplace.getUnitsOfResult","text":"units = getUnitsOfResult(result)\n\nGet the units of the simulation result variables\n\n\n\n\n\n","category":"method"},{"location":"#Simplace.getVariablenamesOfResult-Tuple{Any}","page":"Simplace Documentation","title":"Simplace.getVariablenamesOfResult","text":"names = getVariablenamesOfResult(result)\n\nGet the variable names of simulation result\n\n\n\n\n\n","category":"method"},{"location":"#Simplace.initSimplace","page":"Simplace Documentation","title":"Simplace.initSimplace","text":"sh = initSimplace(installDir, workDir, outputDir)\n\nInitializes the Java Virtual Machine and instantiates the SimplaceWrapper object.\n\nThe function returns a handle to the Simplace framework which has to be used for subsequent function calls to the framework.\n\nArguments\n\ninstallDir::String - folder where the subfolders simplace_core and simplace_modules\n\nare located.\n\nworkDir::String - folder where simulation data and parameter files are located\noutputDir::String - folder where simulation results are written\nadditionalClasspathList::Union{String, Vector{String}} - list of additional classpaths\njavaParameters::Union{String, Vector{String}} - parameters to initialise the JVM (e.g. amount of memory the JVM should use)\n\nExamples\n\nsh = initSimplace(\"~/ws/\", \"~/ws/simplace_run/simulation/\", \"~/output/\")\nopenProject(sh, \"~/ws/simplace_run/simulation/example/Simulation.sol.xml\")\nrunProject(sh)\ncloseProject(sh)\n\n\n\n\n\n","category":"function"},{"location":"#Simplace.initSimplaceDefault","page":"Simplace Documentation","title":"Simplace.initSimplaceDefault","text":"sh = initSimplaceDefault(setting)\n\nInitialises Simplace with work- and outputdir for different settings.\n\nAvailable settings are \"run\", \"modules\", \"lapclient\" and \"wininstall\".\n\nrun: use first simplace installation with workdir \"simplace_run/simulation/\" (default)\nmodules: use first simplace installation with workdir \"simplace_modules/test/\"\nlapclient: use first simplace installation with workdir \"lapclient/data/\"\nwininstall: use the local or system installation of Simplace GUI  with workdir \"SIMPLACE_WORK\" in the users home directory\n\n\n\n\n\n","category":"function"},{"location":"#Simplace.openProject","page":"Simplace Documentation","title":"Simplace.openProject","text":"openProject(simplace, solution)\n\nOpens a Simplace project from a solution and optional project file\n\nArguments\n\nsimplace handle to the framework returned by initSimplace\nsolution::String path to a solution file (.sol.xml)\nproject::String optional path to a project file (.proj.xml) - default \"\" means no project\nparameterList::Dict a dictionary where the keys correspond to parameter names\n\nExamples\n\nparam = Dict(\"startdate\" => \"2020-01-01\", \"vLUE\" => 3.0)\nopenProject(sh, \"Yield.sol.xml\", \"\", param)\n\n\n\n\n\n","category":"function"},{"location":"#Simplace.resetSimulationQueue-Tuple{Any}","page":"Simplace Documentation","title":"Simplace.resetSimulationQueue","text":"resetSimulationQueue(simplace)\n\nClears the list of simulations\n\n\n\n\n\n","category":"method"},{"location":"#Simplace.resultToDict","page":"Simplace Documentation","title":"Simplace.resultToDict","text":"data = resultToDict(result, from::Integer = 0, to::Integer = 0)\n\nConvert simulation result to Dict()\n\nIf from and to are given, then only the according subset of data is returned. If the expand argument is set to false, then array values are not converted but returned as java object arrays.\n\n\n\n\n\n","category":"function"},{"location":"#Simplace.runProject-Tuple{Any}","page":"Simplace Documentation","title":"Simplace.runProject","text":"runProject(simplace)\n\nRuns the opened project\n\n\n\n\n\n","category":"method"},{"location":"#Simplace.runSimulations","page":"Simplace Documentation","title":"Simplace.runSimulations","text":"runSimulations(simplace, selectsimulation::Bool=false)\n\nRun the created simulations in the simulation list.\n\n\n\n\n\n","category":"function"},{"location":"#Simplace.setCheckLevel-Tuple{Any, String}","page":"Simplace Documentation","title":"Simplace.setCheckLevel","text":"setCheckLevel(simplace, level::String)\n\nSets the check level of the framework\n\n\n\n\n\n","category":"method"},{"location":"#Simplace.setLogLevel-Tuple{String}","page":"Simplace Documentation","title":"Simplace.setLogLevel","text":"setLogLevel(level::String)\n\nSets the log level of the framework\n\nValid log levels - sorted by verbosity - are \"FATAL\", \"ERROR\", \"WARN\", \"INFO\" and \"DEBUG\".\n\n\n\n\n\n","category":"method"},{"location":"#Simplace.setProjectLines-Tuple{Any, String}","page":"Simplace Documentation","title":"Simplace.setProjectLines","text":"setProjectLines(simplace, lines)\n\nSets the lines of the project data files that should be used when running a project.\n\nArguments\n\nsimplace handle to the framework returned by initSimplace\nlines::String - string with line numbers or ranges of lines, separated by comma, e.g. \"2,5,7,10-15,30\"\n\nExamples\n\nsetProjectLines(sh, \"2,5,7,10-15,30\")\nrunProject(sh)\n\n\n\n\n\n","category":"method"},{"location":"#Simplace.setSimplaceDirectories-Tuple{Any}","page":"Simplace Documentation","title":"Simplace.setSimplaceDirectories","text":"setSimplaceDirectories(simplace; \nWorkDir::String = \"\", \nOutputDir::String = \"\", \nProjectsDir::String = \"\", \nDataDir::String = \"\" )\n\nSet working-, output-, projects- and data-directory\n\n\n\n\n\n","category":"method"},{"location":"#Simplace.setSlotCount-Tuple{Integer}","page":"Simplace Documentation","title":"Simplace.setSlotCount","text":"setSlotCount(count::Integer)\n\nSets number of used CPUs\n\n\n\n\n\n","category":"method"},{"location":"#Examples","page":"Simplace Documentation","title":"Examples","text":"","category":"section"},{"location":"#Running-a-project","page":"Simplace Documentation","title":"Running a project","text":"","category":"section"},{"location":"","page":"Simplace Documentation","title":"Simplace Documentation","text":"using Simplace\n\n# directory where simplace is installed\ninstallDir = \"d:/simplace/\"\n\n# configure path and choose simulation setup (solution, project)\nworkDir = joinpath(installDir, \"simplace_run/simulation/\")\noutputDir = joinpath(installDir, \"simplace_run/output/\")\nsol = joinpath(workDir, \"gk/solution/complete/Complete.sol.xml\")\nproj = joinpath(workDir, \"gk/project/complete/CompleteSensitivity.proj.xml\")\n\n# initialise simplace\nsh = initSimplace(installDir, workDir, outputDir)\n\nsess = openProject(sh, sol, proj)\nrunProject(sh)\ncloseProject(sh)","category":"page"},{"location":"#Run-a-solution-with-changed-parameters","page":"Simplace Documentation","title":"Run a solution with changed parameters","text":"","category":"section"},{"location":"","page":"Simplace Documentation","title":"Simplace Documentation","text":"using Simplace\n\n# Directory where simplace is installed\ninstallDir = \"d:/simplace/\"\n\nworkDir = joinpath(installDir, \"simplace_run/simulation/\")\noutputDir = joinpath(installDir, \"simplace_run/output/\")\nsol = joinpath(workDir, \"gk/solution/complete/Complete.sol.xml\")\n\n# initialise simplace\nsh = initSimplace(installDir, workDir, outputDir)\n\nsess = openProject(sh, sol, \"\", Dict(\"enddate\" => \"1999-12-31\"))\n\n# create a simulation that starts in 1995 and set the light use efficiency parameter to 3.2\nsimid=createSimulation(sh, Dict(\"startdate\" => \"1995-01-01\", \"vBaseLUE\" => 3.2))\n\nsetLogLevel(\"WARN\")\nrunSimulations(sh)\nsetLogLevel(\"INFO\")\n\ncloseProject(sh)\n\n# fetch the result (java object) and convert it into a Julia Dict()\nres = getResult(sh, \"DIAGRAM_OUT\", simid)\nd = resultToDict(res)\nprint(d[\"AnthesisDate\"])","category":"page"},{"location":"#Using-default-locations-for-framework-and-simulations","page":"Simplace Documentation","title":"Using default locations for framework and simulations","text":"","category":"section"},{"location":"","page":"Simplace Documentation","title":"Simplace Documentation","text":"If you keep the Simplace installation and simulations data in standard folders (e.g. ~/workspace/ or D:/workspace/ etc.), you can omit  the specification of folders.","category":"page"},{"location":"","page":"Simplace Documentation","title":"Simplace Documentation","text":"using Simplace\n\n# define filenames relative to workdir\nsol = \"gk/solution/complete/Complete.sol.xml\"\nproj = \"gk/project/complete/CompleteSensitivity.proj.xml\"\n\n# initialise simplace - it will auto-detect the framework location\nsh = initSimplace()\n\nsess = openProject(sh, sol, proj)\nrunProject(sh)\ncloseProject(sh)","category":"page"},{"location":"#Index","page":"Simplace Documentation","title":"Index","text":"","category":"section"},{"location":"","page":"Simplace Documentation","title":"Simplace Documentation","text":"","category":"page"}]
}
