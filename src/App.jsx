
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css'
import { Button } from './components/ui/button';
import AppLayout from './layouts/app-layout';
import LandingPage from './pages/landing-page';
import Onboarding from './pages/onboarding';
import JobListing from './pages/job-listings';
import JobPage from './pages/job';
// import LandingPage from './pages/landing-page';
import MyJobs from './pages/my-jobs';
import PostJob from './pages/post-job';
import SavedJobs from './pages/saved-jobs';
import { ThemeProvider } from "@/components/ui/theme-provider"
import ProtectedRoute from './components/protected-routes';
// import { ThemeProvider } from './components/ui/theme-provider';


function App() {
 
  const router = createBrowserRouter([
    {
     
      element:<AppLayout/>,
      children:[
        {
          path:'/',
          element:<LandingPage></LandingPage>
        },
        {
          path:'/onboarding',
          element:(
            <ProtectedRoute>
              <Onboarding/>
            </ProtectedRoute>
          )
        },
        {
          path:'/jobs',
          element:(
            <ProtectedRoute>
              <JobListing/>
            </ProtectedRoute>
          )
        },
        {
          path:'/job/:id',
          element:(
            <ProtectedRoute>
              <JobPage/>
            </ProtectedRoute>
          )
        },
        {
          path:'/my-jobs',
          element:(
            <ProtectedRoute>
              <MyJobs/>
            </ProtectedRoute>
          )
        },
        {
          path:'/post-job',
          element:(
            <ProtectedRoute>
              <PostJob/>
            </ProtectedRoute>
          )
        },
        {
          path:'/saved-jobs',
          element:(
            <ProtectedRoute>
              <SavedJobs/>
            </ProtectedRoute>
          )
        },
        
      ]
  }
])
  return (

    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router}></RouterProvider>
    </ThemeProvider>
    
  );
  
}

export default App
