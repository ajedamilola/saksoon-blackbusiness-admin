import {
  Button,
  Card,
  CardContent,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Typography,
} from "@mui/joy";
import dayjs from "dayjs";
import { Report } from "notiflix";
import React, { useContext, useState } from "react";
import { MdLock } from "react-icons/md";
import { useImmer } from "use-immer";
import { Context } from "../Protected";
import axios from "axios";

function Login() {
  const [form, setForm] = useImmer({ email: "", password: "" });
  const { loginState } = useContext(Context);
  const [loading, setLoading] = useState(false);
  const login = async (e) => {
    try {
      setLoading(true);
      e.preventDefault();
      const { err } = (await axios.post("/api/login", form)).data;
      if (!err) {
        localStorage.setItem("loggedIn", dayjs().add(5, "day").toISOString());
        loginState[1](true);
      } else {
        Report.failure("Error", err);
      }
    } catch (error) {
      Report.failure(
        "Error",
        "Unable to connect check internet connection and try again"
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card>
        <CardContent>
          <Typography level="h3">Login</Typography>
          <Typography level="body-sm">
            Type in correct credentials to gain access
          </Typography>
          <form onSubmit={login}>
            <Stack gap={3} mt={3}>
              <FormControl>
                <FormLabel>Input Email address</FormLabel>
                <Input
                  required
                  type="email"
                  placeholder="e.g johndoe@gmail.com"
                  onChange={(e) => {
                    setForm((f) => {
                      f.email = e.target.value;
                    });
                  }}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Input Password</FormLabel>
                <Input
                  required
                  type="password"
                  placeholder="*******"
                  onChange={(e) => {
                    setForm((f) => {
                      f.password = e.target.value;
                    });
                  }}
                />
              </FormControl>

              <Button
                startDecorator={<MdLock />}
                type="submit"
                loading={loading}
              >
                Login
              </Button>
            </Stack>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Login;
