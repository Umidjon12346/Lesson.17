import { useMutation } from "@tanstack/react-query";
import type { SignIn } from "../types/auth";
import { authService } from "../service/auth.service";

export const useAuth = () => {
  return useMutation({
    mutationFn: async ({ data, role }: { data: SignIn; role: string }) =>
      authService.signIn(data, role),
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: async (body: { email: string; role: string }) =>
      authService.forgotPassword(body),
  });
};

export const useVerifyOtp = () => {
  return useMutation({
    mutationFn: async (body: { otp: number }) =>
      authService.verifyOTP(body),
  });
};
