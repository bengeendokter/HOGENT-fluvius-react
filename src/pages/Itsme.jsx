import {FormProvider, useForm} from 'react-hook-form';
import LabelInput from '../components/LabelInput';
import { useLogin, useSession } from '../contexts/AuthProvider';
import {useNavigate} from 'react-router';
import itsme from "../images/itsme.avif";
import {useCallback, useState} from 'react';

export default function Itsme()
{
  const [error, setError] = useState(0)
  const navigate = useNavigate ();
  const login = useLogin();
  const {loading} = useSession();
  const methods = useForm();
  const {
    handleSubmit,
  } = methods;


  const handleLogin = useCallback(async ({gsmnummer}) =>
  {
    
    if(gsmnummer.length >= 9){
      const success = await login("stakeholder", "123456789");
      if(success)
      {
        navigate("/", {replace: true});
      }
    } else{
      setError(1);
    }
  }, [navigate, login]);

  return (
    <>
    <FormProvider {...methods}>
      <div className="mx-auto w-2/3 xl:w-1/5 pt-10">
        <form className="grid grid-cols-1 gap-y-4 text-left" onSubmit={handleSubmit(handleLogin)}>
          <img
            src={itsme}
            alt="itsme"
            className="bg-[#ff4714] p-3 w-1/4 block lg:block lg:mt-0 justify-self-center rounded-full "
          />
          <h1 className="text-[#055063] text-xl font-bold justify-self-center">Identificeer je</h1>
          <LabelInput
            name="gsmnummer"
            label="Gsm-nummer"
            type="text"
            defaultValue=""
            placeholder="BE(+32):"
            data-cy="Gsmnummer_input" />
            {
            error ? (
              <p data-cy="login-error" className="text-red-500">
                Gelieve een correct gsm-nummer in te geven
              </p>
            ) : null
          }
          <button disabled={loading} data-cy="submit_btn" type="submit" className="disabled:opacity-50 block mt-2 lg:inline-block  lg:mt-0 text-white  bg-[#055063] xl:p-1 xl:text-xl  p-1.5  text-white">
    Verstuur
  </button>

        </form>
      </div>
    </FormProvider>
    
  </>
  );
}