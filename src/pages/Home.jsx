// import AuthPage from "./AuthPage";
// const Home = () => {
//   return (
//     <div className="flex flex-col items-center justify-center h-screen">
//       <h1 className="text-4xl font-bold">IEEE presents CTF Challenge</h1>
//       <AuthPage/>
//     </div>
//   );
// };

// export default Home;

import AuthPage from "./AuthPage";

const Home = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-yellow flex flex-col items-center px-4 py-16">
      {/* Top spacing controlled by py-16 */}
      <h1 className="text-4xl font-bold mb-10 text-center">
        IEEE presents CTF Challenge
      </h1>

      <AuthPage />
    </div>
  );
};

export default Home;
