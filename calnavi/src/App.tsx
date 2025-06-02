import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, useHistory, Redirect } from 'react-router-dom';
import MouseFollower from './components/MouseFollower';
import Layout from "./components/Layout";
import LoginPage from './components/user/LoginPage';
import SignUpPage from './components/user/SignUpPage';
import MainPage from './components/MainPage';
import NoticesPage from "./components/NoticesPage";
import NoticeListPage from "./components/NoticeListPage";
import AttendancePage from "./components/AttendancePage";
import AdminPage from "./components/admin/AdminPage";
import UsersPage from './components/admin/UsersPage';
import AdminNoticesPage from './components/admin/AdminNoticesPage';
import WriteNoticePage from './components/admin/WriteNoticePage';
import AdminAttendancePage from './components/admin/AdminAttendancePage';
import { decodeToken, getTokenRemainingTime } from './auth';
import AdminSalaryPage from './components/admin/AdminSalaryPage';
import SalaryPage from './components/SalaryPage';

// 자동 로그아웃 체크용 컴포넌트
const AuthChecker: React.FC = () => {
  const history = useHistory();

  useEffect(() => {
    function logout() {
      sessionStorage.removeItem('token');
      history.push('/login');
    }

    function checkToken() {
      const token = sessionStorage.getItem('token');
      if (!token) {
        logout();
        return;
      }
      const remaining = getTokenRemainingTime(token);
      if (remaining <= 0) {
        logout();
      }
    }

    // 페이지 진입시 한번 체크
    checkToken();

    // 1분마다 체크
    const intervalId = setInterval(checkToken, 60 * 1000);

    return () => clearInterval(intervalId);
  }, [history]);

  return null; // UI 렌더링 안함
};

const App: React.FC = () => {

  useEffect(() => {
    document.body.style.cursor = 'url("/images/wepon1.png") 0 0, auto';
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, []);

  return (
      <Router>
        <AuthChecker />
        <Switch>
          <Route path="/login" component={LoginPage} />
          <Route path="/signup" component={SignUpPage} />
          <Route path="/" exact component={LoginPage} />

          <Route
            path="/mainPage"
            render={() => (
              <Layout>
                <MainPage />
              </Layout>
            )}
          />
          <Route
            path="/notices"
            render={() => (
              <Layout>
                <NoticesPage />
              </Layout>
            )}
          />
          <Route
            path="/NoticeListPage"
            render={() => (
              <Layout>
                <NoticeListPage />
              </Layout>
            )}
          />
          <Route
            path="/AttendancePage"
            render={() => (
              <Layout>
                <AttendancePage />
              </Layout>
            )}
          />
          <Route
            path="/SalaryPage"
            render={() => (
              <Layout>
                <SalaryPage />
              </Layout>
            )}
          />

          <Route
            path="/AdminPage"
            render={() => (
              <Layout>
                <AdminPage />
              </Layout>
            )}
          />
          <Route
            path="/UsersPage"
            render={() => (
              <Layout>
                <UsersPage />
              </Layout>
            )}
          />
          <Route
            path="/AdminNoticesPage"
            render={() => (
              <Layout>
                <AdminNoticesPage />
              </Layout>
            )}
          />
          <Route
            path="/WriteNoticePage"
            render={() => (
              <Layout>
                <WriteNoticePage />
              </Layout>
            )}
          />
          <Route
            path="/AdminAttendancePage"
            render={() => (
              <Layout>
                <AdminAttendancePage />
              </Layout>
            )}
          />
          <Route
            path="/AdminSalaryPage"
            render={() => (
              <Layout>
                <AdminSalaryPage />
              </Layout>
            )}
          />
        </Switch>
      </Router>
  );
};

export default App;