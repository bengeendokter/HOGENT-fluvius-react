import { useCallback } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate , Navigate } from 'react-router';
import LabelInput from '../components/LabelInput';
// import { useLogin, useSession } from '../contexts/AuthProvider';
import logo from "../images/logo.png";
import itsme from "../images/itsme.avif";
import {Link } from "react-router-dom";

const validationRules = {
  email: {
    required: true
  },
  password: {
    required: true
  }
};

export default function Login() {
  // const navigate = useNavigate ();
  // const { loading, error, isAuthed } = useSession();
  // const login = useLogin();
  const methods = useForm();

  const {
    handleSubmit,
    reset,
  } = methods;

  // const handleLogin = useCallback(async ({ Email, Wachtwoord }) => {
  //   const success = await login(Email, Wachtwoord);
   
  //   if (success) {
  //     navigate("/", { replace: true });
  //   }
  // }, [navigate, login]);

  // const handleCancel = useCallback(() => {
  //   reset();
  // }, [reset]);

  // if (isAuthed) {
  //   return <Navigate from="/login" to="/" />
  // }

  return (
    <FormProvider {...methods}>
      <div className="mx-auto w-2/3 xl:w-4/5 pt-10">
        
        {/* <form className="grid grid-cols-1 gap-y-4" onSubmit={handleSubmit(handleLogin)}> */}
        <form className="grid grid-cols-1 gap-y-4 text-left" >
        

               
        <h1 className="text-[#004C69] text-xl font-bold justify-self-center">Meld aan</h1>
          {/* {
            error ? (
              <p className="text-red-500">
                {error}
              </p>
            ) : null
          } */}
          <LabelInput
          name="Gebruikersnaam"
            label="Gebruikersnaam"
            type="text"
            defaultValue=""
            data-cy="gebruikersnaam_input"/>
          <LabelInput
          name="Wachtwoord"
            label="Wachtwoord"
            type="password"
            defaultValue=""
            data-cy="password_input"
            validation={validationRules.password} />
            {/* disabled={loading} */}
            <button data-cy="submit_btn" type="submit" className="disabled:opacity-50 block mt-2 lg:inline-block  lg:mt-0 text-white  bg-[#004C69] xl:p-1 xl:text-xl  p-1.5  text-white">
              Meld aan
            </button>
            {/* onClick={handleCancel} */}
            <div className="grid grid-cols-1 md:grid-cols-2 bg-[rgb(255,70,21)]">
              <div className="md:justify-self-end justify-self-center mt-3">
            <Link to="/itsme" href="#responsive-header">
            <button type="button" className="md:justify-self-end justify-self-center mt-2 lg:inline-block  lg:mt-0   bg-[rgb(255,70,21)] xl:p-1 xl:text-xl  text-white">
              Aanmelden met
              
            </button>
            </Link>
            </div>
            <img
                  src={itsme}
                  alt="itsme"
                  className="w-1/6   lg:mt-0 md:justify-self-begin justify-self-center "
                />
            </div>
            

        </form>
      </div>
    </FormProvider>
  );
}