import { useCallback, useEffect, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import LabelInput from '../components/LabelInput';
import logo from "../images/logo.png";
//import { useRegister, useSession } from '../contexts/AuthProvider';
export default function Register() {
  const navigate = useNavigate();
  //const { loading, error } = useSession();
  //const { loading, error, isAuthed } = useSession();
  //const register = useRegister();
  const methods = useForm();
  const {
    handleSubmit,
    reset,
    getValues,
  } = methods;
  // useEffect(() => {
  //   if (isAuthed) {
  //     navigate("/", { replace: true });
  //   }
  // }, [isAuthed, navigate]);

  // const handleLogin = useCallback(async ({ name, email, password }) => {
  //   const success = await register({
  //     name,
  //     email,
  //     password,
  //   });

  //   if (success) {
  //     navigate("/geregistreerd", { replace: true });
  //   }
  // }, [navigate, register]);

  // const handleCancel = useCallback(() => {
  //   reset();
  // }, [reset]);

  const validationRules = useMemo(() => ({
    name: {
      required: true
    },
    email: {
      required: true
    },
    password: {
      required: true
    },
    confirmPassword: {
      required: true,
      validate: {
        notIdentical: value => {
          const password = getValues('password');
          return password === value ? null : 'Both passwords need to be identical';
        }
      }
    },
  }), [getValues]);

  return (
    <FormProvider {...methods}>
      <div className="mx-auto w-2/3 xl:w-4/5 pt-10">
        
        {/* <form className="grid grid-cols-1 gap-y-4" onSubmit={handleSubmit(handleLogin)}> */}
        <form className="grid grid-cols-1 gap-y-4 text-left" >
        

               
        <h1 className="text-[#004C69] text-xl font-bold justify-self-center">Registreer</h1>
        {/* <form className="grid grid-cols-1 gap-y-4" onSubmit={handleSubmit(handleLogin)}> */}
          {/* {
            error ? (
              <p className="text-red-500">
                {JSON.stringify(error)}
              </p>
            ) : null
          } */}
          <LabelInput
          name="name"
            label="Naam"
            type="text"
            defaultValue=""
            placeholder="Naam"
            validation={validationRules.name} />

          <LabelInput
          name="gebruikersnaam"
            label="Gebruikersnaam"
            type="text"
            defaultValue=""
            placeholder="Gebruikersnaam"
            validation={""} />

          <LabelInput
          name="password"
            label="Wachtwoord"
            type="password"
            defaultValue=""
            validation={validationRules.password} />

          <LabelInput
          name="confirmPassword"
            label="Bevestig wachtwoord"
            type="password"
            defaultValue=""
            validation={validationRules.confirmPassword} />

          {/* <div className="flex flex-row justify-end"> */}
            {/* <button type="submit" disabled={loading} className="disabled:opacity-50 block mt-2 lg:inline-block m-3 lg:mt-0 text-teal-200 hover:text-black bg-yellow-500 xl:text-sm p-1.5 xl:p-1 rounded-xl text-white"> */}
                          
            <button data-cy="submit_btn" type="submit" className="disabled:opacity-50 block mt-2 lg:inline-block  lg:mt-0 text-white  bg-[#004C69] xl:p-1 xl:text-xl  p-1.5  text-white">
              Registreer
            </button>

            {/* <button type="button" onClick={handleCancel} className=" block mt-2 lg:inline-block m-3 lg:mt-0 text-teal-200 hover:text-black bg-yellow-500  p-1.5 xl:p-1 xl:text-sm rounded-xl text-white"> */}

            <button type="button" className="disabled:opacity-50 block mt-2 lg:inline-block  lg:mt-0 text-white  bg-[rgb(255,70,21)] xl:p-1 xl:text-xl  p-1.5  text-white">
              Cancel
            </button>
          {/* </div> */}
        </form>
      </div>
    </FormProvider>
  );
}
