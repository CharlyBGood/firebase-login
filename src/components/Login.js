import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Alert } from "./Alert";

export function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState();

  const handleChange = ({ target: { name, value } }) =>
    setUser({ ...user, [name]: value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(user.email, user.password);
      navigate("/Home");
    } catch (error) {
      if (error.code === "auth/wrong-password") {
        setError("La contraseña no es válida.");
      }
      if (error.code === "auth/user-not-found") {
        setError("El usuario no existe.");
      }
      if (
        error.code === "auth/invalid-email" ||
        error.code === "auth/internal-error"
      ) {
        setError("Proporciona un email válido y una contraseña.");
      }
      // setError(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      navigate("/Home");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-black w-full max-w-xs m-auto">
      <form
        className="bg-black shadow-md rounded px-8 pt-6"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label
            className="block text-orange-300 text-sm font-fold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="email"
            name="email"
            placeholder="youremail@example.com"
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-orange-300 text-sm font-fold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            name="password"
            id="password"
            onChange={handleChange}
            placeholder="******"
          />
        </div>

        <button className="bg-orange-600 hover:bg-orange-400 w-100 border-none text-black font-bold block border rounded mb-2 py-2 px-4 w-full">
          Iniciar sesión
        </button>
        <div className="mb-4 text-center py-2">
          <Link
          to="/ResetPassword"
            href="#!"
            className="inline-block align-center font-bold text-sm"
            // onClick={handleResetPassword}
          >
            ¿Olvidaste tu contraseña?
          </Link>
        </div>
        <div className="mb-4">
          <button
            className="bg-orange-600 hover:bg-orange-400 w-100 border-none text-black font-bold text-sm block border rounded mb-2 py-2 px-4 w-full"
            onClick={handleGoogleLogin}
          >
            Ingresar con Google
          </button>
        </div>        
        <div className="mb-4 flex items-center">
          <p className="mb-2 text-sm justify-between">
            ¿No tienes cuenta?            
          </p>
          <Link
              className="bg-orange-600 py-1 outline-none hover:bg-orange-400 border-none px-3 text-black font-bold border rounded"
              to="/register"
            >
              Registrarse
            </Link>
        </div>
      </form>
      {error && <Alert message={error} />}
    </div>
  );
}
