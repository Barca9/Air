import {useCallback} from 'react'
export  const useMessage =()=>{
    return useCallback(text =>{
        if(window.M && text){            //если оъект виндов существует и мы передали текст то
            window.M.toast({html:text})
        }
    },[])
}