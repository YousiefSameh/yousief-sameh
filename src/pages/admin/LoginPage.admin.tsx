// pages/admin/LoginPage.admin.tsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SpecialHeader } from "../../components";

const LoginPageAdmin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const adminUsername = import.meta.env.VITE_ADMIN_USERNAME;
    const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;

    if (username === adminUsername && password === adminPassword) {
      localStorage.setItem("isLoggedIn", "true");
      navigate("/admin/home")
    } else {
      setError("اسم المستخدم أو كلمة المرور غير صحيحة.");
    }
  };

	return (
		<main
			className="bg-light-container-color dark:bg-dark-container-color border-[2px] border-light-border-color dark:border-dark-border-color p-4 md:p-8 rounded-lg w-full relative"
			role="login"
			aria-labelledby="login-title"
		>
			<nav
				className="bg-light-border-color dark:bg-dark-border-color px-3 md:px-6 py-3 rounded-s-md rounded-tl-md rounded-tr-md md:rounded-tr-none w-full md:w-fit absolute top-0 left-0"
				aria-label="الرئيسية"
			>
				<ul className="flex items-center justify-center gap-5">
					<li>
						<Link
							to="/"
							className="text-black dark:text-white font-bold hover:text-primary-color dark:hover:text-primary-color transition-colors text-[13px] md:text-base"
							aria-current="page"
						>
							الرئيسية
						</Link>
					</li>
					<li>
						<Link
							to="/projects"
							className="text-black dark:text-white font-bold hover:text-primary-color dark:hover:text-primary-color transition-colors text-[13px] md:text-base"
						>
							معرض اعمالي
						</Link>
					</li>
					<li>
						<Link
							to="/blogs"
							className="text-black dark:text-white font-bold hover:text-primary-color dark:hover:text-primary-color transition-colors text-[13px] md:text-base"
						>
							المدونات
						</Link>
					</li>
					<li>
						<Link
							to="/contact"
							className="text-black dark:text-white font-bold hover:text-primary-color dark:hover:text-primary-color transition-colors text-[13px] md:text-base"
						>
							تواصل معي
						</Link>
					</li>
				</ul>
			</nav>
			<div className="content">
				<SpecialHeader title="تسجيل دخول" id="login-title" />
				<form onSubmit={handleLogin} className="form my-8 space-y-6">
					<div className="username space-y-3">
						<label
							htmlFor="username"
							className="text-lg font-medium text-black dark:text-white"
						>
							اسم المستخدم او البريد الالكتروني
						</label>
						<input
							type="text"
							id="username"
							name="username"
							placeholder="اكتب اسم المستخدم او البريد الالكتروني هنا ..."
							className="input"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
              autoComplete="off"
						/>
					</div>
					<div className="password space-y-3">
						<label
							htmlFor="password"
							className="text-lg font-medium text-black dark:text-white"
						>
							كلمة المرور
						</label>
						<input
							type="password"
							id="password"
							name="password"
							placeholder="اكتب كلمة المرور هنا ..."
							className="input"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
              autoComplete="off"
						/>
					</div>
					{error && <p className="text-red-500">{error}</p>}
					<button
						type="submit"
						className="btn-primary w-full shadow-card-shadow shadow-primary-color/40"
					>
						تسجيل الدخول
					</button>
				</form>
			</div>
		</main>
	);
};

export default LoginPageAdmin;
