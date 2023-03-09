import { Sidebar } from 'flowbite-react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import { AnswersProvider } from './context/Answers';
import ArrayPage from './pages/ArrayPage';
import TestPage from './pages/TestPage';
import TypeCoercionPage from './pages/TypeCoercionPage';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <ArrayPage/>
    },
    {
      path: "/test",
      element: <TestPage></TestPage>
    },
    {
      path: "/coercion",
      element: <TypeCoercionPage></TypeCoercionPage>
    }
  ],)
  return (
    <div className="App container py-10 h-full">
      <AnswersProvider>
        <div className='flex h-full'>
          <Sidebar className='border-r-2 h-full mr-8'>
            <Sidebar.Items>
              <Sidebar.ItemGroup>
                <Sidebar.Item
                  onClick={() => router.navigate("/test")}
                >
                  Test
                </Sidebar.Item>
                <Sidebar.Item
                  onClick={() => router.navigate("/")}
                >
                  Arrays
                </Sidebar.Item>
                <Sidebar.Item
                  onClick={() => router.navigate("/coercion")}
                >
                  Type Coercion
                </Sidebar.Item>
              </Sidebar.ItemGroup>
            </Sidebar.Items>
          </Sidebar>
          <div className='flex-grow h-full overflow-auto pr-4'>
            <RouterProvider router={router}></RouterProvider>
          </div>
        </div>
      </AnswersProvider>
    </div>
  );
}

export default App;
