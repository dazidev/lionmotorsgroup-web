import { LoginForm } from "./ui/LoginForm";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen/2 bg-zinc-900/95 rounded-2xl shadow-2xl border border-gold-500/10 slide-in px-4 py-4 sm:px-24 sm:py-10 ">
      <div className="flex justify-center pb-5 sm:pb-10">
        <Image
          src="/logo-sin-fondo-leon.png"
          alt="Logo"
          width={250}
          height={250}
        ></Image>
      </div>
      <h1 className={`text-3xl sm:text-5xl mb-2 text-center font-bold`}>
        Welcome Back
      </h1>
      <p className="text-center text-xm sm:text-xl text-shadow-neutral-500 mb-5 sm:mb-10">
        Please enter your info to sign in
      </p>

      <LoginForm />

      <div className="flex items-center my-8">
        <div className="flex-1 h-px bg-gold-500/15"></div>
      </div>

      <div className="flex justify-center">
        <Image
          src="/logo-sin-fondo-letras.png"
          alt="Logo"
          width={300}
          height={300}
        ></Image>
      </div>
    </div>
  );
}
