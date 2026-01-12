import React, { useState } from "react";

// Lucide React icons for the visual flair (if available, otherwise using SVG or text)
// Since I don't know if lucide-react is installed, I'll use simple SVGs or text for now to be safe.
// Checking package.json... it wasn't there. So I will use standard SVGs.

const FlagIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-blue-500 mb-4"
  >
    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path>
    <line x1="4" y1="22" x2="4" y2="15"></line>
  </svg>
);

const EyeIcon = ({ visible, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300 focus:outline-none"
  >
    {visible ? (
      // Eye Open
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
    ) : (
      // Eye Closed
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
    )}
  </button>
);

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    username: "",
    teamName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData, isLogin ? "Login Mode" : "Signup Mode");
    
    // Placeholder auth logic
    if (isLogin) {
       // Simulate login
       alert("Initiating Login Sequence...");
    } else {
       // Simulate signup
       alert("Initializing Sign Up Sequence...");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 font-mono relative overflow-hidden">
        {/* Background Grid Effect */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" 
             style={{ 
                 backgroundImage: 'linear-gradient(#1e293b 1px, transparent 1px), linear-gradient(90deg, #1e293b 1px, transparent 1px)', 
                 backgroundSize: '40px 40px' 
             }}
        ></div>

      <div className="w-full max-w-md z-10 relative">
        <div className="flex flex-col items-center mb-8">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 shadow-[0_0_30px_rgba(37,99,235,0.1)]">
                <FlagIcon />
            </div>
            
            <h1 className="text-3xl font-bold text-white mt-6 tracking-widest uppercase">
                {isLogin ? "System Login" : "Join the Grid"}
            </h1>
            {isLogin && <p className="text-blue-500 mt-2 text-sm tracking-widest uppercase animate-pulse">
                Identify yourself to the terminal
            </p>}
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
            
            {!isLogin && (
                <div className="space-y-1">
                    <label className="text-xs uppercase text-gray-500 font-bold ml-1">Username</label>
                    <input
                        type="text"
                        name="username"
                        placeholder="[USER_ID]"
                        value={formData.username}
                        onChange={handleChange}
                        className="w-full bg-slate-900/50 border border-slate-800 text-gray-300 px-4 py-3 rounded focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder-gray-600"
                        required={!isLogin}
                    />
                </div>
            )}

             {/* On Login, this is "User ID" (which maps to username/identity). 
                 On Signup, this is "Team Name" or we can keep it strictly separate.
                 Looking at the image: 
                 Login: "Identity" [USER_ID]
                 Signup: "Username" [USER_ID] (Wait, the first image shows Username [USER_ID] and Team Name [TEAM_TAG])
                 
                 Let's stick to the image fields.
                 Image 1 (Join Grid): Username, Team Name, Email, Password
                 Image 2 (Login): Identity ([USER_ID]), Access Key ([PASSWORD])

                 I'll map "Identity" to username for login.
             */}

            {isLogin ? (
                 <div className="space-y-1">
                    <label className="text-xs uppercase text-gray-500 font-bold ml-1">Identity</label>
                    <input
                        type="text"
                        name="username"
                        placeholder="[ USER_ID ]"
                        value={formData.username}
                        onChange={handleChange}
                        className="w-full bg-slate-900/50 border border-slate-800 text-gray-300 px-4 py-3 rounded focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder-gray-600"
                        required
                    />
                </div>
            ) : (
                <>
                {/* Signup Fields Extra */}
                 <div className="space-y-1">
                    <label className="text-xs uppercase text-gray-500 font-bold ml-1">Team Name</label>
                    <input
                        type="text"
                        name="teamName"
                        placeholder="[TEAM_TAG]"
                        value={formData.teamName}
                        onChange={handleChange}
                        className="w-full bg-slate-900/50 border border-slate-800 text-gray-300 px-4 py-3 rounded focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder-gray-600"
                        required
                    />
                </div>
                 <div className="space-y-1">
                    <label className="text-xs uppercase text-gray-500 font-bold ml-1">Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="[EMAIL_ADDRESS]"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-slate-900/50 border border-slate-800 text-gray-300 px-4 py-3 rounded focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder-gray-600"
                        required
                    />
                </div>
                </>
            )}

            <div className="space-y-1 relative">
                <label className="text-xs uppercase text-gray-500 font-bold ml-1">
                    {isLogin ? "Access Key" : "Password"}
                </label>
                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder={isLogin ? "[ PASSWORD ]" : "[SECRET_KEY]"}
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full bg-slate-900/50 border border-slate-800 text-gray-300 px-4 py-3 rounded focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder-gray-600"
                        required
                    />
                    <EyeIcon visible={showPassword} onClick={() => setShowPassword(!showPassword)} />
                </div>
            </div>

            <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] transition-all duration-300 uppercase tracking-wider"
            >
                {isLogin ? "Login" : "Sign Up"}
            </button>
        </form>
        
        <div className="mt-8 text-center text-sm">
            {isLogin ? (
                <>
                    <p className="text-slate-500 text-xs mb-4">FORGOT CREDENTIALS? <span className="text-blue-500 cursor-pointer hover:underline">RESET</span></p>
                    <p className="text-slate-600">
                        Don't have an account?{" "}
                        <button 
                            onClick={() => setIsLogin(false)}
                            className="text-blue-500 font-bold hover:text-blue-400 transition-colors"
                        >
                            Create an account
                        </button>
                    </p>
                </>
            ) : (
                 <>
                    <p className="text-slate-600">
                        Already registered?{" "}
                        <button 
                            onClick={() => setIsLogin(true)}
                            className="text-blue-500 font-bold hover:text-blue-400 transition-colors"
                        >
                            Login
                        </button>
                    </p>
                </>
            )}
        </div>

      </div>
    </div>
  );
};

export default AuthPage;
