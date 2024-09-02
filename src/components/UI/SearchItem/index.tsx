import { ChangeEvent, FC, useEffect, useRef, useState } from 'react';
import { setSearchedArray, User } from '../../../redaxTK/slices/usersSlice';
import PopUp from '../PopUp';
import { useAppDispatch } from '../../../redaxTK/store';
import { TSortList } from '../MenuSort';

interface SortItemProps {
    sortList: TSortList;
}

const SearchItems: FC<SortItemProps> = ({ sortList }) => {
    const [sortType, setSortType] = useState<keyof User>('id');
    const handleSortChange = (newSortType: keyof User) => {
        setSortType(newSortType);
        setIsVisible(false);
    };
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const dispath = useAppDispatch();
    const [inputValue, setInputValue] = useState<string>('');
    const inputRef = useRef<HTMLInputElement>(null);
    const onClickSvg = () => {
        setInputValue('');
        inputRef.current?.focus();
    };
    const popupRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLDivElement>(null);
    const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };
    useEffect(() => {
        dispath(setSearchedArray({ key: sortType, query: inputValue }));
    }, [dispath, inputValue]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                popupRef.current &&
                !popupRef.current.contains(event.target as Node) &&
                buttonRef.current &&
                !buttonRef.current.contains(event.target as Node)
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
        <div className='container__sort'>
            <div className='container__sort-top'>
                <div className='container__sort-top-search'>
                    <p>Пошук за:</p>
                    <input
                        ref={inputRef}
                        type='text'
                        placeholder={sortList[sortType]}
                        value={inputValue}
                        onChange={(e) => onChangeInput(e)}
                    />
                    {inputValue ? (
                        <svg
                            onClick={() => onClickSvg()}
                            fill='none'
                            height='24'
                            viewBox='0 0 24 24'
                            width='24'
                            xmlns='http://www.w3.org/2000/svg'
                        >
                            <path
                                d='M6.2253 4.81108C5.83477 4.42056 5.20161 4.42056 4.81108 4.81108C4.42056 5.20161 4.42056 5.83477 4.81108 6.2253L10.5858 12L4.81114 17.7747C4.42062 18.1652 4.42062 18.7984 4.81114 19.1889C5.20167 19.5794 5.83483 19.5794 6.22535 19.1889L12 13.4142L17.7747 19.1889C18.1652 19.5794 18.7984 19.5794 19.1889 19.1889C19.5794 18.7984 19.5794 18.1652 19.1889 17.7747L13.4142 12L19.189 6.2253C19.5795 5.83477 19.5795 5.20161 19.189 4.81108C18.7985 4.42056 18.1653 4.42056 17.7748 4.81108L12 10.5858L6.2253 4.81108Z'
                                fill='currentColor'
                            />
                        </svg>
                    ) : (
                        <></>
                    )}
                </div>
                <div
                    className='container__sort-top-svg'
                    onClick={() => setIsVisible(!isVisible)}
                    ref={buttonRef}
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
                    popupRef={popupRef}
                    handleSortChange={handleSortChange}
                    sortListType={sortList}
                />
            )}
        </div>
    );
};

export default SearchItems;
