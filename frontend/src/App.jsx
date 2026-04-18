import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Applications from './pages/Applications';
import Reminders from './pages/Reminders';
import Performance from './pages/Performance';
import Analyzer from './pages/Analyzer';
import Profile from './pages/Profile';
import Landing from './pages/Landing';
import AddReminder from './pages/AddReminder';
import AddApplication from './pages/AddApplication';
import { ProfileProvider } from './context/ProfileContext';

function AppContent() {
  return (
    <Routes>
      <Route path="/signin" element={<Navigate to="/login" replace />} />
      <Route path="/signup" element={<Navigate to="/register" replace />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/add-reminder" element={<AddReminder />} />
      <Route path="/add-application" element={<AddApplication />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/applications" element={<Applications />} />
      <Route path="/reminders" element={<Reminders />} />
      <Route path="/performance" element={<Performance />} />
      <Route path="/analyzer" element={<Analyzer />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/" element={<Landing />} />
    </Routes>
  );
}

function App() {
  return (
    <ProfileProvider>
      <Router>
        <AppContent />
      </Router>
    </ProfileProvider>
  );
}

export default App;
