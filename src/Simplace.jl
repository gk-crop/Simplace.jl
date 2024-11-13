module Simplace

import JavaCall

export initSimplace

export openProject
export closeProject

export runProject
export setProjectLines

export createSimulation
export runSimulations
export resetSimulationQueue
export getSimulationIDs

export setLogLevel
export setCheckLevel
export setSlotCount

export setSimplaceDirectories
export getSimplaceDirectories

# export setSimulationValues
# export setAllSimulationValues
# export stepSimulation
# export stepAllSimulations

# export varmapToDict

export getResult

export getVariablenamesOfResult
export getUnitsOfResult
export getDatatypesOfResult

export resultToDict


helper = JavaCall.@jimport net.simplace.sim.wrapper.util.JuliaWorkarounds
wrapper = JavaCall.@jimport net.simplace.sim.wrapper.SimplaceWrapper
datacontainer = JavaCall.@jimport net.simplace.sim.wrapper.DataContainer

JDouble = JavaCall.@jimport java.lang.Double
JInteger = JavaCall.@jimport java.lang.Integer
JBoolean = JavaCall.@jimport java.lang.Boolean

JStringArray = Array{JavaCall.JString,1}
 
"Initializes the JVM and creates the SimplaceWrapper object which is used to interact with Simplace."
function initSimplace(installDir::String, workDir::String, outputDir::String,
    additionalClasspathList=[], javaParameters::String="")
    cpliblist = [(joinpath(rp,filenm)) for (rp, dir, fil) in walkdir(joinpath(installDir,"simplace_core","lib")) for filenm in filter(f->f[end-3:end]==".JAR" || f[end-3:end]==".jar",fil)]
    cplist = [
          "simplace_core/build/classes",
          "simplace_core/conf",
          "simplace_modules/build/classes",
          "simplace_run/build/classes",
          "simplace_run/conf",
          "simplace_core/res/files"
     ]
     fullpathcplist = [joinpath(installDir, s) for s in cplist]

     allcplist = vcat(fullpathcplist , cpliblist, additionalClasspathList)
     cpth = "-Djava.class.path=" * reduce((x,y) -> x*";"*y,allcplist)

     try
        jv = JavaCall.init([cpth,javaParameters])
     catch y
     end

     sh = wrapper((JavaCall.JString,JavaCall.JString,),workDir,outputDir)

     return sh

end

"Opens a Simplace project from a solution and optional project file"
function openProject(simplace, solution, project=JavaCall.JString(C_NULL), parameterList=[])
    jsess = JavaCall.@jimport net.simplace.sim.FWSimSession
	names = Array{JavaCall.JString,1}
    val = Array{JavaCall.JObject,1}
    (n,v) = paramListToJArray(parameterList)
    return JavaCall.jcall(helper, "callPrepareSession", jsess, (wrapper, JavaCall.JString, JavaCall.JString,names, val),simplace, project, solution, n, v)
end

"Closes the actual Simplace project"
function closeProject(simplace)
    JavaCall.jcall(simplace, "shutDown", Nothing,())
end

"Runs the opened project"
function runProject(simplace)
  return JavaCall.jcall(simplace,"run",Nothing,())
end

"Sets the lines of the project data files that should be used when running a project."
function setProjectLines(simplace, lines)
    JavaCall.jcall(simplace,"setProjectLines",Nothing, JavaCall.JString, lines)
end 


"Creates a simulation and substitute parameters"
function createSimulation(simplace, parameterList=[], queue = true)
    if !queue
	    JavaCall.jcall(simplace,"resetSimulationQueue", Nothing);
	end
	sim = JavaCall.@jimport net.simplace.sim.FWSimSimulation
    names = Array{JavaCall.JString,1}
    val = Array{JavaCall.JObject,1}
    (n,v) = paramListToJArray(parameterList)
	
    sm = JavaCall.jcall(helper,"callCreateSimulation", sim, (wrapper, names, val), simplace, n, v)
    id = JavaCall.jcall(sm,"getID",JavaCall.JString)
    return id
end

"Clears the list of simulations"
function resetSimulationQueue(simplace)
    JavaCall.jcall(simplace,"resetSimulationQueue", Nothing);
end

"Lists IDs of the performed simulations"
function getSimulationIDs(simplace) 
    simid = JavaCall.jcall(simplace,  "getSimulationIDs", JStringArray)
    return unpackStringArray(simid)
end

"Run the created simulations"
function runSimulations(simplace, selectsimulation=false)
  return JavaCall.jcall(simplace, "runSimulations", Nothing, (JavaCall.jboolean,), selectsimulation )
end



# configure framework

"Set working-, output-, projects- and data-directory"
function setSimplaceDirectories(simplace; WorkDir = JavaCall.JString(C_NULL), OutputDir = JavaCall.JString(C_NULL), ProjectsDir = JavaCall.JString(C_NULL), DataDir = JavaCall.JString(C_NULL))
  JavaCall.jcall(simplace,"setDirectories", Nothing, (JavaCall.JString, JavaCall.JString,JavaCall.JString, JavaCall.JString), WorkDir, OutputDir, ProjectsDir, DataDir)
end
  
"Get the directories (work-, output-, projects- and data-dir)"
function getSimplaceDirectories(simplace)
  res = unpackStringArray(JavaCall.jcall(simplace,"getDirectories", Vector{JavaCall.JString}))
  names =["_WORKDIR_", "_OUTPUTDIR_", "_PROJECTSDIR_", "_DATADIR_"]
  return Dict(zip(names,res))
end

"Sets the check level of the framework"
function setCheckLevel(simplace, level)
  JavaCall.jcall(simplace,"setCheckLevel",Nothing, (JavaCall.JString,),level)
end

"Sets number of used CPUs"
function setSlotCount(count)
  engine = JavaCall.@jimport net.simplace.sim.FWSimEngine
  JavaCall.jcall(engine,"setSlotCount",Nothing, (JavaCall.jint,),count)
end

"Sets the log level of the framework"
function setLogLevel(level)
  jlog = JavaCall.@jimport net.simplace.core.logging.Logger
  jlevel = JavaCall.@jimport net.simplace.core.logging.Logger$LOGLEVEL
  llevel = JavaCall.jcall(jlevel,"valueOf",jlevel,(JavaCall.JString,),"INFO")
  if level == "FATAL" || level == "ERROR" || level == "WARN" || level == "INFO" || level == "DEBUG"
    llevel = JavaCall.jcall(jlevel,"valueOf",jlevel,(JavaCall.JString,),level)
  end
  JavaCall.jcall(jlog,"setLogLevel",Nothing,(jlevel,),llevel)
end


# results

"Fetch output from a simulation"
function getResult(simplace, outputId, simulationId = C_NULL)
   return JavaCall.jcall(simplace, "getResult", datacontainer, (JavaCall.JString, JavaCall.JString,),outputId, simulationId)
end

"Get the variable names of simulation result"
function getVariablenamesOfResult(result)
    names = unpackStringArray(JavaCall.jcall(result,"getHeaderStrings",JStringArray))
    return names
end

"Get the units of the simulation result variables"
function getUnitsOfResult(result)
    units = unpackStringArray(JavaCall.jcall(result,"getHeaderUnits", JStringArray))
    names = getVariablenamesOfResult(result)
    return(Dict(zip(names, units)))
end

"Get the datatypes of the simulation result variables"
function getDatatypesOfResult(result)
    types = unpackStringArray(JavaCall.jcall(result,"getTypeStrings", JStringArray))
    names = getVariablenamesOfResult(result)
    return(Dict(zip(names, types)))
end

"Convert simulation result to Dict()"
function resultToDict(result, from = Nothing, to = Nothing) 
    types = getDatatypesOfResult(result)
    names = getVariablenamesOfResult(result)
    data = Nothing
    if(from !=Nothing && to !=Nothing && from >=0 && to > from)
        data = JavaCall.jcall(result,"getDataObjects",Array{JavaCall.JObject,1}, (JavaCall.jint, JavaCall.jint), from, to)
    else
        data = JavaCall.jcall(result,"getDataObjects",Array{JavaCall.JObject,1})
    end
    d = Dict()
    for i in eachindex(names)
        d[names[i]] = convertFromType(data[i],types[names[i]])
    end
    return d
end

# helper functions

# input parameters

function convertToObject(x) 
    res = Nothing
     if x isa Vector
         if x isa Vector{String}
             res = Array{JavaCall.JObject,1}(x)
         elseif x isa Vector{Float64} 
             res = Array{JavaCall.JObject,1}([JavaCall.jcall(JDouble,"valueOf",JDouble, (JavaCall.jdouble,),e) for e in x])
         elseif x isa Vector{Int64} 
             res = Array{JavaCall.JObject,1}([JavaCall.jcall(JInteger,"valueOf",JInteger, (JavaCall.jint,),e) for e in x])
         elseif x isa Vector{Bool} 
             res = Array{JavaCall.JObject,1}([JavaCall.jcall(JBoolean,"valueOf",JBoolean, (JavaCall.jboolean,),e) for e in x])
         end
         res = JavaCall.jcall(helper, "castArrayToObject", JObject, (Array{JObject,1},),res)
     else
         if x isa Float64
             res = JavaCall.jcall(JDouble,"valueOf",JDouble,(JavaCall.jdouble,),x)
         elseif x isa Int64
             res = JavaCall.jcall(JInteger,"valueOf",JInteger,(JavaCall.jint,),x)
         elseif x isa Bool
             res = JavaCall.jcall(JBoolean,"valueOf",JBoolean,(JavaCall.jboolean,),x)
         else 
             res = convert(JavaCall.JString,x)
         end
     end
     return res
 end
 
 function paramListToJArray(paramList)
     ([ i[1] for i in paramList ],Array{JavaCall.JObject,1}([convertToObject(i[2]) for i in paramList]))
 end

# output result

function unpackStringArray(strArr::JStringArray)
    try
        return map(x -> JavaCall.jcall(x, "toString", JavaCall.JString),strArr)
    catch
        return map(x -> try JavaCall.jcall(x, "toString", JavaCall.JString) catch e missing end,strArr)       
    end
end


function convertFromType(n, type)
    if type == "DOUBLE" 
        n = convert(Vector{JavaCall.JObject}, n)
        return map(x -> try convert(JavaCall.jdouble,convert(JDouble,x)) catch e missing end, n)
    elseif type == "DOUBLEARRAY"
        n = convert(Vector{Vector{JavaCall.JObject}}, n)
        map(y -> map(x -> try convert(JavaCall.jdouble,convert(JDouble,x)) catch e missing end, y), n)
    elseif type == "INT"
        n = convert(Vector{JavaCall.JObject}, n)
        return map(x -> try convert(JavaCall.jint,convert(JInteger,x)) catch e missing end, n)
    elseif type == "INTARRAY"
        n = convert(Vector{Vector{JavaCall.JObject}}, n)
        map(y -> map(x -> try convert(JavaCall.jint,convert(JInteger,x)) catch e missing end, y), n)
    elseif type == "BOOLEAN"
        n = convert(Vector{JavaCall.JObject}, n)
        return map(x -> try convert(JavaCall.jboolean,convert(JBoolean,x)) catch e missing end, n)
    elseif type == "BOOLEANARRAY"
        n = convert(Vector{Vector{JavaCall.JObject}}, n)
        map(y -> map(x -> try convert(JavaCall.jboolean,convert(JBoolean,x)) catch e missing end, y), n)
    elseif type == "CHAR" || type == "DATE"
        n = convert(Vector{JavaCall.JObject}, n)
        return map(x -> try JavaCall.jcall(x,"toString", JavaCall.JString) catch e missing end, n)
    elseif type == "CHARARRAY" || type == "DATEARRAY"
        n = convert(Vector{Vector{JavaCall.JObject}}, n)
        return map(y -> map(x -> try JavaCall.jcall(x,"toString", JavaCall.JString) catch e missing end, y), n)
    else
        return convert(Vector{JavaCall.JObject}, n)
    end 
end

end # module
