import { Stack } from "@mui/material";

import LoginSection from "@widgets/LoginSection";

const Login = () => {
  return (
    <Stack sx={{ height: "100vh", padding: 0, justifyContent: "center" }}>
      <LoginSection />
    </Stack>
  );
};

export default Login;
