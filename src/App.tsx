import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home.tsx';
import LoginPage from './pages/LoginPage.tsx';
import AddBot from './pages/AddBot.tsx';
import BotPage from './pages/BotPage.tsx';
import { Layout } from './Layout.tsx';
import type { JSX } from 'react';

// Компонент для защищённых маршрутов
const PrivateRoute = ({ children }: { children: JSX.Element }) => {
    const isAuthenticated = true; // Здесь ваша логика проверки авторизации

    // Если пользователь НЕ вошёл в систему
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

const GuestRoute = ({ children }: { children: JSX.Element }) => {
    const isAuthenticated = true;

    // Если пользователь УЖЕ вошёл в систему
    if (isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return children;
};

function App() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route
                    path="/"
                    element={
                        <PrivateRoute>
                            <Home />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/add-bot"
                    element={
                        <PrivateRoute>
                            <AddBot />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/bots/:id"
                    element={
                        <PrivateRoute>
                            <BotPage />
                        </PrivateRoute>
                    }
                />
            </Route>

            <Route
                path="/login"
                element={
                    <GuestRoute>
                        <LoginPage />
                    </GuestRoute>
                }
            />

            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}

export default App;
