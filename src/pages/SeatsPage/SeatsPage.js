import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import SeatItem from "../../components/SeatItem";

export default function SeatsPage( { setInfoSucess } ) {

    const [movieID, setMovieID] = useState([]);
    const [cardMovie, setCardMovie] = useState([]);
    const [movieInfo, setMovieInfo] = useState([]);
    const [movieDay, setMovieDay] = useState([]);
    const [select, setSelect] = useState("#1AAE9E");
    const [unselected, setUnselected] = useState("#FBE192");
    const [available, setAvailable] = useState("#C3CFD9");
    const [seatSelected, setSeatSelected] = useState([]);
    const [changeColor, setChangeColor] = useState(false);
    const [cpf, setCPF] = useState("");
    const [name, setName] = useState("");
    let id = [];
    const { idMovie } = useParams();
    const { idSession } = useParams();
    const navigate = useNavigate();

    useEffect(() => {

        const url = `https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${idMovie}/seats`;
        const promise = axios.get(url);
        promise.then((resp) => {
            setMovieID(resp.data.seats);
            setCardMovie(resp.data.movie)
            setMovieInfo(resp.data);
            setMovieDay(resp.data.day.weekday);
            setInfoSucess(movieInfo);
        })
        promise.catch((err) => {
            console.log(err);
        })
    }, [idSession])

    function confirm(e){
        e.preventDefault();

        for (let i = 0; i < seatSelected.length; i++){
            id.push(seatSelected[i].id);
        }
        const infos = {
            ids: id,
            name: name,
            cpf: cpf
        }

        const url = "https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many";
        const promise = axios.post(url, infos);

        promise.then((resp) => navigate("/sucess"));
        promise.catch((err) => alert(err.data.response.message));
        id = [];
    }
    return (
        <PageContainer>
            Selecione o(s) assento(s)
            <SeatsContainer>
                {movieID.map((seat, index) => (
                    <SeatItem 
                    seat={seat}
                    seatSelected={seatSelected}
                    setSeatSelected={setSeatSelected}
                    select={select}
                    index={index}
                    key={index}
                    cardMovie={cardMovie}
                    />
                ))}
            </SeatsContainer>
            <CaptionContainer>
                <CaptionItem>
                    <CaptionCircle select={select} />
                    Selecionado
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle available={available} />
                    Disponível
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle unselected={unselected} />
                    Indisponível
                </CaptionItem>
            </CaptionContainer>
            <FormContainer>
                <form onSubmit={confirm}>
                    Nome do Comprador:
                    <input
                    placeholder="Digite seu nome..." 
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                    />
                    CPF do Comprador:
                    <input 
                    placeholder="Digite seu CPF..." 
                    type="number"
                    value={cpf}
                    onChange={e => setCPF(e.target.value)}
                    required
                    />
                    <button type="submit">Reservar Assento(s)</button>
                </form>
            </FormContainer>
            <FooterContainer>
                <div>
                    <img src={cardMovie.posterURL} alt="poster" />
                </div>
                <div>
                    <p>{cardMovie.title}</p>
                    <p>{movieDay} - {movieInfo.name}</p>
                </div>
            </FooterContainer>
        </PageContainer>
    )
}
const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
`
const SeatsContainer = styled.div`
    width: 330px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`
const FormContainer = styled.div`
    width: calc(100vw - 40px); 
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 20px 0;
    font-size: 18px;
    button {
        align-self: center;
    }
    input {
        width: calc(100vw - 60px);
    }
`
const CaptionContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 300px;
    justify-content: space-between;
    margin: 20px;
`
const CaptionCircle = styled.div`
    border: 1px solid ${props => props.select === "#1AAE9E" && "#0E7D71" || props.unselected === "#FBE192" && "#F7C52B" || props.available === "#C3CFD9" && "#7B8B99"};
    background-color: ${props => props.select} ${props => props.unselected} ${props => props.available};
    height: 25px;
    width: 25px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`
const CaptionItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
`
const FooterContainer = styled.div`
    width: 100%;
    height: 120px;
    background-color: #C3CFD9;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 20px;
    position: fixed;
    bottom: 0;

    div:nth-child(1) {
        box-shadow: 0px 2px 4px 2px #0000001A;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        margin: 12px;
        img {
            width: 50px;
            height: 70px;
            padding: 8px;
        }
    }
    div:nth-child(2) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        p {
            text-align: left;
            &:nth-child(2) {
                margin-top: 10px;
            }
        }
    }
`