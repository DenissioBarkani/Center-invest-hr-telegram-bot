// // import { useState } from 'react'

// // import reactLogo from './assets/react.svg'
// // import viteLogo from '/vite.svg'
// // import './App.css'
// import { Routes, Route } from "react-router-dom";
// import Home from "./pages/Home.tsx";
// import LoginPage from "./pages/LoginPage.tsx";
// import AddBot from "./pages/AddBot.tsx";
// import BotPage from "./pages/BotPage.tsx";

// function App() {
//     return (
//         <>
//             {/* <Header /> */}
//             {/* <SideBar></SideBar> */}
//             <Routes>
//                 <Route path="/" element={<Home />} >
//                   <Route path="/add-bot" element={<AddBot />} />
//                   <Route path="/login" element={<LoginPage></LoginPage>}></Route>
//                   <Route path="/bots/:id" element={<BotPage />} />
//                 </Route>
                
//                 {/* <Route path="*" element={<NotFound></NotFound>}></Route> */}
//             </Routes>
//         </>
//     );
// }

// export default App;


import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import AddBot from "./pages/AddBot.tsx";
import BotPage from "./pages/BotPage.tsx";
import { Layout } from "./Layout.tsx";

function App() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/add-bot" element={<AddBot />} />
                <Route path="/bots/:id" element={<BotPage />} />
            </Route>
            <Route path="/login" element={<LoginPage />} />
        </Routes>
    );
}

export default App;