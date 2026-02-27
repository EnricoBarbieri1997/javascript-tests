import { Sidebar } from 'flowbite-react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import { AnswersProvider } from './context/Answers';
import ArrayPage from './pages/ArrayPage';
import AsyncPage from './pages/AsyncPage';
import ObjectCreation from './pages/ObjectCreation';
import TypeCoercionPage from './pages/TypeCoercionPage';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <ArrayPage/>
    },
    {
      path: "/coercion",
      element: <TypeCoercionPage></TypeCoercionPage>
    },
    {
      path: "objects",
      element: <ObjectCreation></ObjectCreation>
    },
    {
      path: "async",
      element: <AsyncPage></AsyncPage>,
    },
  ], {
    basename: process.env.PUBLIC_URL || '/',
  })
  return (
    <div className="App container py-10 h-full">
      <AnswersProvider>
        <div className='flex h-full'>
          <Sidebar className='border-r-2 h-full mr-8'>
            <Sidebar.Items>
              <Sidebar.ItemGroup>
                <Sidebar.Item
                  onClick={() => router.navigate(process.env.PUBLIC_URL + "/")}
                >
                  Arrays
                </Sidebar.Item>
                <Sidebar.Item
                  onClick={() => router.navigate(process.env.PUBLIC_URL + "/coercion")}
                >
                  Type Coercion
                </Sidebar.Item>
                <Sidebar.Item
                  onClick={() => router.navigate(process.env.PUBLIC_URL + "/objects")}
                >
                  Objects
                </Sidebar.Item>
                <Sidebar.Item
                  onClick={() => router.navigate(process.env.PUBLIC_URL + "/async")}
                >
                  Async
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
