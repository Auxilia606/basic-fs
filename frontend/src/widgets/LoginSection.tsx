import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  FormControl,
  FormLabel,
  TextField,
  Typography,
} from "@mui/material";

import useApiAuthLogin, { LoginReqDTO } from "@shared/api/auth/login";

const LoginSection = () => {
  const { register, handleSubmit } = useForm<LoginReqDTO>();

  const navigate = useNavigate();

  const apiAuthLogin = useApiAuthLogin();

  const onSubmit: SubmitHandler<LoginReqDTO> = async (data) => {
    try {
      await apiAuthLogin.mutateAsync(data);

      navigate("/");
    } catch (error) {
      console.error(`[ERROR] ${error}`);
    }
  };

  return (
    <Card variant="outlined" sx={{ padding: "2rem 1.5rem", margin: "2rem" }}>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          gap: 2,
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Typography
          component="h1"
          variant="h4"
          sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
        >
          로그인
        </Typography>
        <FormControl>
          <FormLabel htmlFor="email">이메일</FormLabel>
          <TextField
            {...register("email")}
            slotProps={{ input: { sx: { height: "2.5rem" } } }}
          ></TextField>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="password">비밀번호</FormLabel>
          <TextField
            {...register("password")}
            placeholder="••••••"
            slotProps={{ input: { sx: { height: "2.5rem" } } }}
          ></TextField>
        </FormControl>
        <Button type="submit" fullWidth variant="contained">
          로그인
        </Button>
      </Box>
    </Card>
  );
};

export default LoginSection;
