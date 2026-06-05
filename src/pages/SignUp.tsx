import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import type { SignUpForm } from "../types/signUpForm";
import { SignUpSchema } from "../validations/signUpSchema";

const SignUp = () => {
  const [ShowPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpForm>({
    resolver: zodResolver(SignUpSchema),
  });

  const onSubmit = async (data: SignUpForm) => {
    console.log(data);
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder="Full Name" {...register("fullName")} />
        {errors.fullName && <p>{errors.fullName.message}</p>}
        <input type="email" placeholder="Email" {...register("email")} />
        {errors.email && <p>{errors.email.message}</p>}
        <div>
          <input
            type={ShowPassword ? "text" : "password"}
            placeholder="Password"
            {...register("password")}
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {ShowPassword ? <EyeOff /> : <Eye />}
          </button>
        </div>
        {errors.password && <p>{errors.password.message}</p>}
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              {" "}
              <Loader2 className="animate-spin" /> Sign Up...{" "}
            </>
          ) : (
            "Sign Up"
          )}
        </button>
        <p>
          Already have an account? <Link to={"/login"}>Log In</Link>
        </p>
      </form>
    </>
  );
};

export default SignUp;
