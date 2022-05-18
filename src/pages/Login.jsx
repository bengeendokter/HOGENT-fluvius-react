import {useCallback} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {useNavigate, Navigate} from 'react-router';
import LabelInput from '../components/LabelInput';
import itsme from "../images/itsme.avif";
import {Link} from "react-router-dom";
import {useLogin, useSession} from '../contexts/AuthProvider';

const validationRules = {
  email: {
    required: true
  },
  password: {
    required: true
  }
};

export default function Login()
{
  const navigate = useNavigate();
  const {loading, error, isAuthed} = useSession();
  const login = useLogin();
  const methods = useForm();

  const {
    handleSubmit,
  } = methods;

  const handleLogin = useCallback(async ({gebruikersnaam, wachtwoord}) =>
  {
    const success = await login(gebruikersnaam, wachtwoord);

    if(success)
    {
      navigate("/", {replace: true});
    }

  }, [navigate, login]);

  if(isAuthed)
  {
    return <Navigate from="/login" to="/" />
  }

  const css = `
  .itsme_login
  {
    background: var(--clr-negative);
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.9em;
    padding: 0.6em;
  }
  .itsme_tekst
  {
    color: white;
  }
  .itsme_afb
  {
    width: 2.7em;
    height: auto;
  }
      `

  return (
    <FormProvider {...methods}>
      <div className="mx-auto w-2/3 xl:w-1/5 pt-10">

        <form className="grid grid-cols-1 gap-y-4" onSubmit={handleSubmit(handleLogin)}>
          <h1 className={`text-[#055063] text-xl font-bold justify-self-center`}>Meld aan</h1>
          {
            error ? (
              <p data-cy="login-error" className="text-red-500">
                {error}
              </p>
            ) : null
          }
          <LabelInput
            name="gebruikersnaam"
            label="Gebruikersnaam"
            type="text"
            defaultValue=""
            data-cy="gebruikersnaam_input" />
          <LabelInput
            name="wachtwoord"
            label="Wachtwoord"
            type="password"
            defaultValue=""
            data-cy="password_input"
            validation={validationRules.password} />
          <button disabled={loading} data-cy="submit_btn" type="submit" className="disabled:opacity-50 block mt-2 lg:inline-block  lg:mt-0 text-white  bg-[#055063] xl:p-1 xl:text-xl  p-1.5  text-white ">
            Meld aan
          </button>

          <Link to="/itsme" href="#responsive-header" className="itsme_login">
            <p className="itsme_tekst" >Aanmelden met</p>
            <img
              src={itsme}
              alt="itsme"
              className="itsme_afb"
            />
          </Link>

          <style>
            {css}
          </style>


        </form>
      </div>
    </FormProvider>
  );
}