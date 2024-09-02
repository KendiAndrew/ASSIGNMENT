import { useEffect } from 'react';
import './scss/App.scss';
import { Header } from './components/Header';
import MainContent from './components/MainContent';
import { fetchUsers } from './redaxTK/slices/usersSlice';
import { useAppDispatch } from './redaxTK/store';

function App() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    return (
        <div className='wrapper'>
            <div className='container'>
                <Header />
                <MainContent/>
            </div>
        </div>
    );
}

export default App;
