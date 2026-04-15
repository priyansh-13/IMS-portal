import { createContext, useContext, useState, ReactNode } from "react";

export type UserRole = "university" | "college" | "standalone" | null;

interface UserInfo {
  role: UserRole;
  username: string;
  aisheCode: string;
  instituteName: string;
  userRoleLabel: string;
  state: string;
}

interface AuthContextType {
  user: UserInfo | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const CREDENTIALS: Record<string, { password: string; info: UserInfo }> = {
  mdurohtak: {
    password: "Niche@213",
    info: {
      role: "university",
      username: "mdurohtak",
      aisheCode: "U-0167",
      instituteName: "Maharshi Dayanand University, Rohtak",
      userRoleLabel: "University Nodal Officer",
      state: "Haryana",
    },
  },
  ptesbba: {
    password: "Niche@213",
    info: {
      role: "college",
      username: "ptesbba",
      aisheCode: "C-10034",
      instituteName:
        "PEOPLETREE EDUCATION SOCIETY'S BBA/BCA AND BCOM COLLEGE, AP NEHARU NAGAR, BELAGAVI",
      userRoleLabel: "College",
      state: "Karnataka",
    },
  },
  PKP92: {
    password: "Niche@213",
    info: {
      role: "standalone",
      username: "PKP92",
      aisheCode: "S-18256",
      instituteName: "Prabhu Kailash Polytechnic college",
      userRoleLabel: "Polytechnic",
      state: "Bihar",
    },
  },
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => false,
  logout: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserInfo | null>(() => {
    const stored = sessionStorage.getItem("ims_user");
    return stored ? JSON.parse(stored) : null;
  });

  const login = (username: string, password: string): boolean => {
    const entry = CREDENTIALS[username];
    if (entry && entry.password === password) {
      setUser(entry.info);
      sessionStorage.setItem("ims_user", JSON.stringify(entry.info));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem("ims_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
