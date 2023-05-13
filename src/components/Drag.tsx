import { DragEvent, useRef, useState } from 'react';
import '../style/Drag.css';

export const Drag = () => {
    const value = useRef<string>();
    const endValue = useRef<string>();
    const [itemList, setItemList] = useState([0,1,2,3,4,5,6,7]);

    //드래그 시작
    const handleDrag = (e: DragEvent<HTMLElement>) => {
        value.current = e.currentTarget.innerText;
    }

    //드래그 중 드랍할 요소의 영역에 진입
    const handleDragEnter = (e:DragEvent<HTMLElement>) => {
        endValue.current = e.currentTarget.innerText;
    }

    //드랍
    const handleDragEnd = (e: DragEvent<HTMLElement>) => {
        //변수선언
        const newList = [...itemList];
        const dragItemValue = newList[Number(value.current)];
        const dropItemValue = newList[Number(endValue.current)];

        //배열 값 위치 맞교환
        const temp = dragItemValue;
        newList[Number(value.current)] = dropItemValue;
        newList[Number(endValue.current)] = temp;

        //드래그, 드랍 값 초기화
        value.current = '';
        endValue.current = '';

        //기존 배열에 바뀐 배열 적용
        setItemList(newList);
    }

    return (
        <ul className='itemWrap'>
            {
                itemList.map((res, i) => (
                    <li className='item' key={i} draggable onDragStart={handleDrag} onDragEnter={handleDragEnter} onDragEnd={handleDragEnd}>{res}</li>       
                ))
            }           
        </ul>
    )
}