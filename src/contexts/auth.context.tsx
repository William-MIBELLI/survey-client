import {
  createContext,
  useContext,
} from "react";
import type { User } from "../gql/graphql";
import { useMutation, useQuery } from "@apollo/client/react";
import type { MeQuery, SignoutMutation } from "../gql/generated";
import { ME } from "../lib/queries/auth.query";
import { LOGOUT } from "../lib/mutations/auth.mutation";
import { client } from "../lib/apollo";

type AuthUser = Pick<
  User,
  "id" | "email" | "firstname" | "lastname" | "isPremium"
>;

type TAuth = {
  user: AuthUser | null;
  loading: boolean;
  logout: () => Promise<void>
};

const authContext = createContext<TAuth>({} as TAuth);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
  }) => {
  
  const { data, loading } = useQuery<MeQuery>(ME);
  const [signout] = useMutation<SignoutMutation>(LOGOUT)
  
  const logout = async (): Promise<void> => {
    await signout({
      onCompleted: async (data) => {
        if (data?.signout.success) {
          await client.resetStore()
        }
      },
      onError: (error) => {
        console.warn("Error logout : ", error?.message)
      }
    })
  }

  const user = data?.me ?? null;

  const value: TAuth = {
    user,
    loading,
    logout
  };
  return <authContext.Provider value={value}>{children}</authContext.Provider>;
};

export const useAuthContext = () => useContext(authContext);
