import { FC, useEffect, useRef, useState } from 'react';
import { setSortedType, User } from '../../../redaxTK/slices/usersSlice';
import PopUp from '../PopUp';
import { useAppDispatch } from '../../../redaxTK/store';
import { TSortList } from '../MenuSort';

interface SortItemProps{
    sortList: TSortList;
}

const SortItem: FC<SortItemProps> = ({sortList}) => {
    const [sortType, setSortType] = useState<keyof User>('id');
    const handleSortChange = (newSortType: keyof User) => {
        setSortType(newSortType);
        setIsVisible(false);
    };
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const popupRe = useRef<HTMLDivElement>(null);
    const buttonRe = useRef<HTMLDivElement>(null);
    const dispath = useAppDispatch();
    useEffect(() => {
        dispath(setSortedType({ sortType }));
    }, [sortType, dispath]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                popupRe.current &&
                !popupRe.current.contains(event.target as Node) &&
                buttonRe.current &&
                !buttonRe.current.contains(event.target as Node)
            ) {
                setIsVisible(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [setIsVisible]);
    return (
        <>
            <div className='container__sort'>
                <div className='container__sort-top'>
                    <div>
                        <b>Сортування за: </b>
                        <span>{sortList[sortType]}</span>
                    </div>
                    <div
                        className='container__sort-top-svg'
                        onClick={() => setIsVisible(!isVisible)}
                        ref={buttonRe}
                    >
                        <svg
                            width='10'
                            height='6'
                            viewBox='0 0 10 6'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                        >
                            <path
                                d='M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z'
                                fill='#2C2C2C'
                            />
                        </svg>
                    </div>
                </div>
                {isVisible && (
                    <PopUp
                        popupRef={popupRe}
                        handleSortChange={handleSortChange}
                        sortListType={sortList}
                    />
                )}
            </div>
        </>
    );
};

export default SortItem;
