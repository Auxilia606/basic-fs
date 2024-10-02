import { api } from "@shared/configuration/api";

import { useMutation } from "@tanstack/react-query";

type ReqDTO = {
  email: string; // 'testuser01@test.com';
  password: string; // 'dweax123!@#';
};

type ResDTO = {
  token: string;
  user: {
    id: string;
    username: string; // 'testuser01';
    email: string; // 'testuser01@test.com';
  };
};

export type UserDTO = {
  id: string;
  username: string; // 'testuser01';
  email: string; // 'testuser01@test.com';
};

const request = (body: ReqDTO) => {
  return api.post<ResDTO>("/auth/login", body);
};

const useApiAuthLogin = () => {
  return useMutation({
    mutationFn: (body: ReqDTO) => request(body),
  });
};

export default useApiAuthLogin;
export type LoginReqDTO = ReqDTO;
