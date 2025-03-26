import { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import ChatApp from './pages/Chat';
import ManageUsers from './pages/ManageUsers';
import { AuthContext } from './context/AuthContext';

function App() {
  const { currentUser } = useContext(AuthContext);
  
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  return (
    <Routes>
      <Route path="/" element={
        <ProtectedRoute>
          <ChatApp />
        </ProtectedRoute>
      } />
      <Route path="/manage-users" element={
        <ProtectedRoute>
          <ManageUsers />
        </ProtectedRoute>
      } />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
