import { DragEvent, useRef, useState } from 'react';
import '../assets/style/Drag.css';
import bull from '../assets/img/bull.jpeg';
import chi from '../assets/img/chi.jpeg';
import gol from '../assets/img/gol.jpeg';
import mal from '../assets/img/mal.jpeg';
import pa from '../assets/img/pa.jpeg';
import poo from '../assets/img/poo.jpeg';
import rab from '../assets/img/rab.jpeg';
import shu from '../assets/img/shu.jpeg';

interface itemObjType {
    key:number,
    img:string,
    name:string
}

export const Drag = () => {
    const value = useRef<string>('');
    const endValue = useRef<string>('');
    const itemObj = [{
        'key': 0,
        'img':bull,
        'name':'불독'
    },{
        'key': 1,
        'img':chi,
        'name':'치와와'
    },{
        'key': 2,
        'img':gol,
        'name':'골든리트리버'
    },{
        'key': 3,
        'img':mal,
        'name':'말티즈'
    },{
        'key': 4,
        'img':pa,
        'name':'파피용'
    },{
        'key': 5,
        'img':poo,
        'name':'푸들'
    },{
        'key': 6,
        'img':rab,
        'name':'래브라도'
    },{
        'key': 7,
        'img':shu,
        'name':'슈나우저'
    }]
    const [itemList, setItemList] = useState<itemObjType[]>(itemObj);

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
        let dragItemValue = newList.find(res => res.name === value.current);
        let dropItemValue = newList.find(res => res.name === endValue.current);
        let dragItemIndex = newList.findIndex(res => res.name === value.current);
        let dropItemIndex = newList.findIndex(res => res.name === endValue.current);

        //배열 값 위치 맞교환
        if(dragItemValue !== undefined && dropItemValue !== undefined) {
            let temp = dragItemValue;
            newList[Number(dragItemIndex)] = dropItemValue;
            newList[Number(dropItemIndex)] = temp;
        }

        //드래그, 드랍 값 초기화
        value.current = '';
        endValue.current = '';
        dragItemValue = undefined;
        dropItemValue = undefined;

        //기존 배열에 바뀐 배열 적용
        setItemList(newList);
    }

    return (
        <ul className='itemWrap'>
            {
                itemList.map((res, i) => (
                    <li className='item' key={i} draggable onDragStart={handleDrag} onDragEnter={handleDragEnter} onDragEnd={handleDragEnd}>
                        <img src={res.img}/>
                        <span>{res.name}</span>
                    </li>       
                ))
            }
            <img src="assets/img/poo.jpeg"/>   
        </ul>
    )
}