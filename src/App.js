import React, {useState} from "react";
import {Form, Label, TermCont, CentButton, Button, OkMessage, MessageError} from "./elements/Forms"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import InputComp from "./components/input";

const App = () => {
  const [username, setUsername] = useState({blank: '', valid: null});
  const [name, setName] = useState({blank: '', valid: null});
  const [password, setPassword] = useState({blank: '', valid: null});
  const [password2, setPassword2] = useState({blank: '', valid: null});
  const [mail, setMail] = useState({blank: '', valid: null});
  const [phone, setPhone] = useState({blank: '', valid: null});
  const [terms, setTerms] = useState(false)
  const [validForm, setValidForm] = useState(null)

  const expressions = {
    username: /^[a-zA-Z0-9_-]{4,16}$/, // Letters, numbers, hyphen and underscore
		name: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letters and spaces can have an accent mark.
		password: /^.{4,12}$/, // 4 to 12 digits.
		mail: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
		phone: /^\d{7,14}$/ // 7 to 14 numbers.
  }

  const validatePassword2 = () => {
    if(password.blank.length > 0){
      if(password.blank !== password2.blank){
        setPassword2((prevState) => {
          return {...prevState, valid: 'false'}
        });
      } else {
        setPassword2((prevState) => {
          return {...prevState, valid: 'true'}
        });
      }
    }
  }

  const onChangeTerms = (e) => {
    setTerms(e.target.checked)
  }

  const onSubmit = (e) => {
    e.preventDefault();

    if(
      username.valid === 'true' && 
      name.valid === 'true' &&
      password.valid === 'true' &&
      password2.valid === 'true' &&
      mail.valid === 'true' &&
      phone.valid === 'true' &&
      terms
      ){
        setValidForm(true);
        setUsername({blank: '', valid: null});
        setName({blank: '', valid: null});
        setPassword({blank: '', valid: null});
        setPassword2({blank: '', valid: null});
        setMail({blank: '', valid: null});
        setPhone({blank: '', valid: null});
    } else {
      setValidForm(false)
    }
  }

  return (
    <main>
      <Form action="" onSubmit={onSubmit}>
        <InputComp
          state={username}
          setState={setUsername}
          type="text" 
          label="Username"
          placeholder="jonas123"
          name="username"
          errorMessage="Your username must contain from 4 to 16 characters with numbers, letters and underscore."
          regularExpression={expressions.username}
        />
        <InputComp
          state={name}
          setState={setName}
          type="text" 
          label="Name"
          placeholder="John Doe"
          name="name"
          errorMessage="Your username must contain letter and spaces."
          regularExpression={expressions.name}
        />
        <InputComp
          state={password}
          setState={setPassword}
          type="password" 
          label="Password"
          name="password1"
          errorMessage="Your password must contain from 4 to 12 characters."
          regularExpression={expressions.password}
        />
        <InputComp
          state={password2}
          setState={setPassword2}
          type="password" 
          label="Repeat password"
          name="password2"
          errorMessage="Both passwords must match."
          funcion={validatePassword2}
        />
        <InputComp
          state={mail}
          setState={setMail}
          type="email" 
          label="E-mail"
          placeholder="john@email.com"
          name="email"
          errorMessage="Your e-mail must contain letters, numbers, dots, hyphens and underscores."
          regularExpression={expressions.mail}
        />
        <InputComp
          state={phone}
          setState={setPhone}
          type="text" 
          label="Phone number"
          placeholder="4491234567"
          name="phone"
          errorMessage="Your phone number must contain 14 characters."
          regularExpression={expressions.phone}
        />

        <TermCont>
          <Label>
            <input type="checkbox" 
            name="terms" 
            id="terms" 
            checked={terms}
            onChange={onChangeTerms}
            />
            I accept the terms and conditions
          </Label>
        </TermCont>
        {validForm === false && <MessageError>
          <p>
            <FontAwesomeIcon icon={faExclamationTriangle}/>
            <b>Error:</b> Please fill the form correctly
            </p>
        </MessageError>}
        <CentButton>
          <Button type="submit">Send</Button>
          {validForm === true && <OkMessage>Form was submitted succesfully!</OkMessage>}
        </CentButton>
      </Form>
    </main>
  )
}

export default App;