export const forgotPasswordTemplate = (otp: number) => {
    return `
    <div style="font-family: Arial, sans-serif; padding: 20px;">
      <h2>Reset Your Password</h2>
      <p>Your OTP code is: <strong>${otp}</strong></p>
      <p>This code will expire in 15 minutes.</p>
    </div>
  `;
};
