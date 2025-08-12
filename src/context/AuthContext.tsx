// AuthContext.tsx (contoh)
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  user: any; // Replace 'any' with your user type if available
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {

  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null); // Replace 'any' with your user type if available
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await axios.get("/api/v1/auth/me", { withCredentials: true });
        setUser(res.data.user);
      } catch (error: any) {
        setUser(null);
        if (error.response?.status === 401 || error.response?.status === 403) {
          navigate("/signin");
        }
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, []);
   const login = async (email: string, password: string) => {
    await axios.post("/api/v1/auth/login", { email, password }, { withCredentials: true });
    // setelah login sukses, panggil fetchUser ulang
    const res = await axios.get("/api/v1/auth/me", { withCredentials: true });
    setUser(res.data.user);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login }}>
      {children}
    </AuthContext.Provider>
  );
}
export function useAuth() {
  return useContext(AuthContext);
}
