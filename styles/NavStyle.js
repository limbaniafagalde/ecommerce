import styled from "styled-components";

export const NavStyle = styled.nav`
    min-height: 15vh;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1rem;
    a{
        font: 1.2rem;
    }
`;

export const NavItems = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;

    div{
        margin-left: 3rem;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    h3{
        font-size: 1rem;
        padding: 0.25rem;
    }

    svg{
        font-size: 1.5rem;
    }

    span{
        background: #ff2626;
        color: white;
        width: 0.8rem;
        height: 0.8rem;
        border-radius: 50%;
        font-size: 0.5rem;
        pointer-events: none;
        /* For the relative position of the div */
        position: absolute;
        right: -10%;
        top: -20%;
        /* put it on the center */
        display: flex;
        justify-content: center;
        align-items: center;
    }

`;