import { createContext,useReducer } from "react";
import React from 'react'

const MenuAndModalControl = createContext();

const controlReducer = (controls,actions)=>{
    switch(actions.type){
        case toggleDiagnosis:
            return{diagnosisControl:!controls.diagnosisControl}
    }
}

export const MenuAndModalControlProvider=({children})=> {
    const [controls, dispatch] = useReducer(controlReducer, {diagnosisControl:false})
    console.log(controls.diagnosisControl);
    return(
        <MenuAndModalControl.Provider value={{}}>
            {children}
        </MenuAndModalControl.Provider>
    )
}

export default MenuAndModalControl