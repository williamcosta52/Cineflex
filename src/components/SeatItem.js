import { useState } from "react"
import styled from "styled-components"


export default function SeatItem( { seat, seatSelected, select, setSeatSelected, index }){
    const [changeColor, setChangeColor] = useState(false);
    let arr = [];

    return (
        <Seat
        onClick={() => {
            if (seat.isAvailable){
                if (!seatSelected.includes(seat)){
                    setSeatSelected([...seatSelected, seat])
                    setChangeColor(true);
                }else {
                    console.log("deu ruim");
                    setChangeColor(false);
                    arr = [...seatSelected];
                    arr = arr.filter((s) => s.id !== seat.id);
                    setSeatSelected(arr);
                }
            }else {
                alert("não disponível");
            }
        } 
        }
        seat={seat} seatSelected={seatSelected} select={select} changeColor={changeColor} key={index}>
        {seat.name}
        </Seat>
    )
}
const Seat= styled.div`
    border: 1px solid ${props => props.seat.isAvailable ? "#808F9D" : "#F7C52B"};
    background-color: ${props => props.seat.isAvailable && props.changeColor && "#1AAE9E" || props.seat.isAvailable && "#C3CFD9" || "#FBE192"} !important;
    height: 25px;
    width: 25px;
    border-radius: 25px;
    font-family: 'Roboto';
    font-size: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`