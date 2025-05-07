import React from "react";
import RegisterForm from "./_components/RegisterForm";

const RegisterPage = () => {
  return (
    <div className="h-[100dvh] flex items-center justify-center">
      <div className="max-w-md w-full p-6 flex items-center justify-center flex-col">
        <h1 className="text-4xl">Create an Account!</h1>
        <p className="font-semibold text-lg mb-6">
          Register to keep track your expenses
        </p>

        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;
