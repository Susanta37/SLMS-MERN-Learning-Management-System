import { useDispatch } from 'react-redux';
import './App.css';
import Route from './Utilities/Route';
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import { getAllCourses } from './store/courseReducer';
function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllCourses())
  }, [])
  return (
    <>
      <Toaster />
      <Route />
    </>
  );
}

export default App;
