import { Outlet } from 'react-router-dom';
import AdminNavbar from '../components/AdminNavbar';

const AdminLayout = () => {
  return (
    <div className="admin-layout flex">
      <AdminNavbar />
      <div className="admin-content flex-1 ml-64 mt-16">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
