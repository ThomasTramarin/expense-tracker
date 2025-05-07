"use client";
import { FormEvent, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error";
  }>({
    text: "",
    type: "error", // Default to "error"
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: FormEvent) => {
    setLoading(true);
    e.preventDefault();

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();
      console.log(data);

      if (data.message) {
        setMessage({
          text: data.message,
          type: data.success ? "success" : "error",
        });
      }

      if (data.error) {
        setErrors(data.error);
      } else {
        setErrors({});
      }

      if (data.success) {
        setFormData({
          email: "",
          password: "",
        });

        // redirect to dashboard
        router.push("/dashboard/overview");
      }
    } catch (error) {
      setMessage({ text: "Something went wrong", type: "error" });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="w-full flex flex-col gap-4"
      method="POST"
      onSubmit={handleRegister}
    >
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="email@gmail.com"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          value={formData.email}
          className={`border ${
            errors.email ? "border-red-500" : "border-gray-300"
          } p-2`}
        />
        {errors.email && <span className="text-red-500">{errors.email}</span>}
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="********"
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          value={formData.password}
          className={`border ${
            errors.password ? "border-red-500" : "border-gray-300"
          } p-2`}
        />
        {errors.password && (
          <span className="text-red-500">{errors.password}</span>
        )}
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 font-medium flex justify-center items-center gap-2"
      >
        Login
        {loading && <AiOutlineLoading3Quarters className="animate-spin" />}
      </button>
      {message.text && (
        <p
          className={` ${
            message.type === "error" ? "text-red-500" : "text-green-500"
          }`}
        >
          {message.text}
        </p>
      )}
    </form>
  );
};
export default LoginForm;
