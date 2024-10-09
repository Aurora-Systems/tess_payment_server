
const repeat_process=(n, fn)=>{
    return  Array.from({length:n}).forEach(fn)
}

module.exports =  repeat_process;