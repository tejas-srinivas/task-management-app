import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router';

import { Loader, NotFound, ProtectedRoute } from '@/components';

const Board = lazy(() => import('./board'));
const Boards = lazy(() => import('./boards'));
const Client = lazy(() => import('./client'));
const Clients = lazy(() => import('./clients'));
const Dashboard = lazy(() => import('./dashboard'));
const Login = lazy(() => import('./login'));
const Member = lazy(() => import('./member'));
const Members = lazy(() => import('./members'));
const ResetPassword = lazy(() => import('./reset-password'));
const Settings = lazy(() => import('./settings'));
const BoardSettings = lazy(() => import('./board/Settings'));

export default function AppRoutes() {
  return (
    <Suspense
      fallback={
        <div className="fixed inset-0 flex justify-center items-center bg-background/80 backdrop-blur-sm z-50">
          <Loader />
        </div>
      }
    >
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/boards">
          <Route
            index
            element={
              <ProtectedRoute>
                <Boards />
              </ProtectedRoute>
            }
          />
          <Route
            path=":id"
            element={
              <ProtectedRoute>
                <Board />
              </ProtectedRoute>
            }
          />
          <Route
            path=":id/settings"
            element={
              <ProtectedRoute>
                <BoardSettings />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="/clients">
          <Route
            index
            element={
              <ProtectedRoute>
                <Clients />
              </ProtectedRoute>
            }
          />
          <Route
            path=":id"
            element={
              <ProtectedRoute>
                <Client />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="/members">
          <Route
            index
            element={
              <ProtectedRoute>
                <Members />
              </ProtectedRoute>
            }
          />
          <Route
            path=":id"
            element={
              <ProtectedRoute>
                <Member />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
