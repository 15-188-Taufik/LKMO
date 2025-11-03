import { Metadata } from "next";
import { LoginGoogleButton } from "../components/login-button";

const SignInPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-2 text-gray-800 text-center">Sign In</h1>
        <p className="text-gray-500 mb-8 text-center">Sign in to your account</p>

        <div className="text-center">
          <LoginGoogleButton />
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
