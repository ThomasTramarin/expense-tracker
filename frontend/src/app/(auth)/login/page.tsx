import React from "react";
import LoginForm from "./_components/LoginForm";

const RegisterPage = () => {
  return (
    <div className="h-[100dvh] flex items-center justify-center">
      <div className="max-w-md w-full p-6 flex items-center justify-center flex-col">
        <h1 className="text-4xl">Create an Account!</h1>
        <p className="font-semibold text-lg mb-6">
          Register to keep track your expenses
        </p>

        <LoginForm />
      </div>
    </div>
  );
};

export default RegisterPage;
