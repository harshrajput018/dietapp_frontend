import React from "react";
import formContext from "./formcontext";

const FormState=(props)=>{
    

    const [re,inc]=React.useState(0);

    

    

    



    return(
        <formContext.Provider value={{ re,inc}}>
            {props.children}
        </formContext.Provider>
    )
}

export default FormState;



