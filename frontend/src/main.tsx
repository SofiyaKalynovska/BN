import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ToastContainer } from 'react-toastify';
import { QueryClientProvider } from 'react-query';
import { queryClient } from './services/query-client.tsx';
import { AuthProvider } from './context/Auth.tsx';

import "react-toastify/dist/ReactToastify.css";
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <>
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <App />
            </AuthProvider>
            <ToastContainer
                position="bottom-center"
                autoClose={5000}
                closeButton={false}
            />
        </QueryClientProvider>
    </>
);