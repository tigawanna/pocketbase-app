import React from "react";
import {
  useQuery,
  useQueryClient,
} from "react-query";
import { client } from "../../pb/config";

interface HomeProps {}

export const Home: React.FC<HomeProps> = ({}) => {
  const queryClient = useQueryClient();
  const getUser = async () => {
    return await client.authStore.model;
  };
  const userQuery = useQuery(["user"], getUser);
  console.log("user query Home.tsx==== ", userQuery);

  const logout = () => {
    client.authStore.clear();
    queryClient.invalidateQueries(["user"]);
  };
  const user = userQuery.data;
  return (
    <div className="w-full h-screen  flex-center text-3xl">
      <div className="w-full h-full text-3xl flex-center-col">
        HOME
        {user?.email}
        <button
          className="bg-purple-900 p-2"
          onClick={() => logout()}
        >
          logout
        </button>
      </div>
    </div>
  );
};
