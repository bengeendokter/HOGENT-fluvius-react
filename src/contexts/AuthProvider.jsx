import { createContext, useMemo, useState, useCallback, useEffect, useContext } from 'react';
import * as klantenApi from '../api/klanten';
import * as api from '../api';
import config from '../config.json';

const JWT_TOKEN_KEY = config.token_key;
const AuthContext = createContext();

function parseJwt(token) {
  if (!token) return {};
  const base64Url = token.split('.')[1];
  const payload = Buffer.from(base64Url, 'base64');
  const jsonPayload = payload.toString('ascii');
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
  const { token, klant, ready, loading, error, setError, hasRole } = useAuth();
  return {
    token,
    klant,
    ready,
    error,
    setError,
    loading,
    isAuthed: Boolean(token),
    hasRole,
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

  const setSession = useCallback(async (token, klant) => {
    const { exp, klantID } = parseJwt(token);
    const expiry = parseExp(exp);
    const stillValid = expiry >= new Date();

    if (token) {
      if (stillValid) {
        localStorage.setItem(JWT_TOKEN_KEY, token);
      } else {
        localStorage.removeItem(JWT_TOKEN_KEY);
        token = null;
        setError("session expired")
      }
    } else {
      localStorage.removeItem(JWT_TOKEN_KEY);
    }

    

    api.setAuthToken(token);
    setToken(token);
    setReady(token && stillValid);

    if (!klant && stillValid) {
      klant = await klantenApi.getKlantById(klantID);
    }
    setKlant(klant);
  }, []);

  useEffect(() => {
    setSession(token, null);
  }, [token, setSession]);

  

  const login = useCallback(async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      const { token, klant } = await klantenApi.login(email, password);
      await setSession(token, klant);
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
    if (!klant) return false;
    return klant.roles.includes(role);
  }, [klant]);

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