import React, {
  useState,
  useContext,
  createContext,
  ReactNode,
  useEffect,
} from 'react';
import Cookie from 'js-cookie';
import axios from 'axios';
import endPoints from '@services/api';

import User from '@interfaces/user';

interface AuthContextType {
  user: User | null;
  signIn: (credentials: { email: string; password: string }) => any;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function ProviderAuth({ children }: { children: ReactNode }) {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser utilizado dentro de un ProviderAuth');
  }
  return context;
};

function useProvideAuth() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Intenta recuperar el token de las cookies cuando se monta el componente
    const token = Cookie.get('token');
    if (token) {
      axios.defaults.headers.Authorization = `Bearer ${token}`;
      // Realiza una solicitud para obtener el perfil del usuario
      axios
        .get(endPoints.auth.profile)
        .then((response) => {
          const user = response.data;
          setUser(user);
        })
        .catch((error) => {
          console.error('Error al obtener el perfil del usuario:', error);
        });
    }
  }, []); // Solo se ejecuta una vez al montar el componente

  const signIn = async (credentials: { email: string; password: string }) => {
    const options = {
      headers: {
        accept: '*/*',
        'Content-Type': 'application/json',
      },
    };

    const { data: access_token } = await axios.post(
      endPoints.auth.login,
      credentials,
      options
    );

    if (access_token) {
      const token = access_token.access_token;

      Cookie.set('token', token, {
        expires: 5,
        sameSite: 'none',
        secure: true,
      });

      axios.defaults.headers.Authorization = `Bearer ${token}`;

      const { data: user } = await axios.get(endPoints.auth.profile);

      setUser(user);
    }
  };

  const logout = () => {
    Cookie.remove('token');
    setUser(null);
    delete axios.defaults.headers.Authorization;
    window.location.href = '/login';
  };

  return {
    user,
    signIn,
    logout,
  };
}
