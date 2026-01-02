export const registrationOtpTemplate = (otp: number) => {
    return `
    <div style="font-family: Arial, sans-serif; padding: 20px;">
      <h2>Welcome to Swift Learn!</h2>
      <p>Your registration OTP is: <strong>${otp}</strong></p>
      <p>This code will expire in 5 minutes.</p>
    </div>
  `;
};
