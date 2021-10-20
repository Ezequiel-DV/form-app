import React from "react";
import {Input, Label, InputGroup, ErrorMessage, ValidIcon} from "../elements/Forms"
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons'

const InputComp = ( {state, setState, type, label, placeholder, name, errorMessage, regularExpression, funcion} ) => {
  const onChange = (e) => {
    setState({...state, blank: e.target.value});
  }
  
const validation = () => {
  if(regularExpression){
    if(regularExpression.test(state.blank)){
      setState({...state, valid: 'true'});
    } else {
      setState({...state, valid: 'false'});
    }
  }
  if(funcion){
    funcion();
  }
}
  
  return (
        <div>
        <Label htmlFor={name} valid={state.valid}>{label}</Label>
        <InputGroup>
          <Input 
            type={type} 
            placeholder={placeholder} 
            id={name} 
            value={state.blank}
            onChange={onChange}
            onKeyUp={validation}
            onBlur={validation}
            valid={state.valid}
          />
          <ValidIcon 
            icon={state.valid === 'true' ? faCheckCircle : faTimesCircle} 
            valid={state.valid}/>
        </InputGroup>
        <ErrorMessage valid={state.valid}>{errorMessage}</ErrorMessage>
      </div>
    );
}

export default InputComp;