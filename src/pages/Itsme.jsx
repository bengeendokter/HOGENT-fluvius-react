import { useCallback } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate , Navigate } from 'react-router';
import LabelInput from '../components/LabelInput';
// import { useLogin, useSession } from '../contexts/AuthProvider';
import itsme from "../images/itsme.avif";

const validationRules = {
  email: {
    required: true
  },
  password: {
    required: true
  }
};

export default function Itsme() {
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
      <div className="mx-auto w-1/4 xl:w-4/5 pt-10">
        
        {/* <form className="grid grid-cols-1 gap-y-4" onSubmit={handleSubmit(handleLogin)}> */}
        <form className="grid grid-cols-1 gap-y-4 text-left" >
        
      <img
                  src={itsme}
                  alt="itsme"
                  className="w-1/4 block lg:block lg:mt-0 justify-self-center rounded-full "
                />
               
        <h1 className="text-[#004C69] text-xl font-bold justify-self-center">Identificeer je</h1>
          {/* {
            error ? (
              <p className="text-red-500">
                {error}
              </p>
            ) : null
          } */}
          <LabelInput
          name="Gsm-nummer"
            label="Gsm-nummer"
            type="text"
            defaultValue=""
            placeholder="BE(+32):"
            data-cy="Gsmnummer_input"/>

            {/* disabled={loading} */}
            <button data-cy="submit_btn" type="submit" className="disabled:opacity-50 block mt-2 lg:inline-block  lg:mt-0 text-white  bg-[#004C69] xl:p-1 xl:text-xl  p-1.5  text-white">
              Verstuur
            </button>

        </form>
      </div>
    </FormProvider>
  );
}