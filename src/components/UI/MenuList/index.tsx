import { useSelector } from 'react-redux';
import { RootState } from '../../../redaxTK/store';

const MenuList = () => {
    const { users } = useSelector((state: RootState) => state.users);

    return (
        <ul className='container__list'>
            {users.length ? (
                users.map((item) => (
                    <li className='container__list-item' key={item.id}>
                        <div className='container__list-item-content'>
                            <p>
                                <span>Користувач під індексом:</span> {item.id}
                            </p>
                            <p>
                                <span>Ім'я:</span> {item.name}
                            </p>
                            <p>
                                <span>Ім'я користувача:</span> {item.username}
                            </p>
                            <p>
                                <span>E-mail користувача:</span> {item.email}
                            </p>
                            <p>
                                <span>Номер телефону користувача:</span> {item.phone}
                            </p>
                        </div>
                    </li>
                ))
            ) : (
                <div className='container__list-notfound'>
                    <div className='container__list-notfound-item'>
                        Користувачі не знайдені <span>😕</span>
                    </div>
                </div>
            )}
        </ul>
    );
};

export default MenuList;
