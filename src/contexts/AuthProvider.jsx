import { createContext, useMemo, useState, useCallback, useEffect, useContext } from 'react';
import * as klantenApi from '../api/klanten';
import * as api from '../api';
import config from '../config.json';

import {Buffer} from 'buffer';

const JWT_TOKEN_KEY = config.token_key;
const AuthContext = createContext();

function parseJwt(token) {
  if (!token) return {};
  const base64Url = token.split('.')[1];
  const payload = Buffer.from(base64Url, 'base64');
  const jsonPayload = payload.toString('utf8');
  return JSON.parse(jsonPayload);
  
}

function parseExp(exp) {
  if (!exp) return null;
  if (typeof exp !== 'number') exp = Number(exp);
  if (isNaN(exp)) return null;
  return new Date(exp * 1000);
  
}

const useAuth = () => useContext(AuthContext);

export const useSession = () => {
  const { token, klant, ready, loading, error, setError, hasRole, setSession } = useAuth();
  return {
    token,
    klant,
    ready,
    error,
    setError,
    loading,
    isAuthed: Boolean(token),
    hasRole,
    setSession
  };
};

export const useLogin = () => {
  const { login } = useAuth();
  return login;
};

export const useLogout = () => {
  const { logout } = useAuth();
  return logout;
};

export const useRegister = () => {
  const { register } = useAuth();
  return register;
};

export const AuthProvider = ({
  children,
}) => {
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [token, setToken] = useState(localStorage.getItem(JWT_TOKEN_KEY));
  const [klant, setKlant] = useState(null);
  const [roles, setRoles] = useState([]);

  const setSession = useCallback(async (token, klant) => {
    setKlant(klant);
    const {exp, roles} = parseJwt(token);
    console.log(parseJwt(token));
    setRoles(roles);
    const expiry = parseExp(exp);
    const stillValid = expiry >= new Date();

    if (token) {
      if (stillValid) {
        localStorage.setItem(JWT_TOKEN_KEY, token);
      } else {
        localStorage.removeItem(JWT_TOKEN_KEY);
        token = null;
        setError("Session expired, please sign in again")
      }
    } else {
      localStorage.removeItem(JWT_TOKEN_KEY);
    }
    
    api.setAuthToken(token);
    setToken(token);
    setReady(token && stillValid);
    
  }, []);

  useEffect(() => {
    setSession(token, klant);
  });

  

  const login = useCallback(async (gebruikersnaam, wachtwoord) => {
    try {
      setLoading(true);
      setError(null);
      const { token, user } = await klantenApi.login(gebruikersnaam, wachtwoord);
      await setSession(token, user);
      return true;
    } catch (error) {
      setError('Login failed, try again');
      return false;
    } finally {
      setLoading(false);
    }
  }, [setSession]);

  const register = useCallback(async (data) => {
    try {
      setLoading(true);
      setError(null);
      const { token, klant } = await klantenApi.register(data);
      await setSession(token, klant);
      return true;
    } catch (error) {
      setError(error);
      return false;
    } finally {
      setLoading(false);
    }
  }, [setSession]);

  const logout = useCallback(() => {
    setSession(null, null);
  }, [setSession]);

  const hasRole = useCallback((role) => {
    return roles.includes(role);
  }, [roles]);

  const value = useMemo(() => ({
    token,
    klant,
    ready,
    loading,
    error,
    setError,
    login,
    logout,
    register,
    hasRole,
  }), [token, klant, ready, loading, error, login, logout, register, setError, hasRole]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};