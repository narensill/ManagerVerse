import React from "react";
import styled from "styled-components";

const Card = ({ hoverText, hoverImage }) => {
  return (
    <StyledWrapper>
      <div className="card">
        <img src={hoverImage} alt="Card Icon" className="card-image" />
        <span className="card-text">{hoverText}</span>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .card {
    position: relative;
    width: 250px;
    height: 350px;
    background: lightblue;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 15px;
    cursor: pointer;
    overflow: hidden;
    transition: all 0.5s;
  }

  .card-image {
    width: 80px;
    height: 80px;
    transition: transform 0.5s, top 0.5s, opacity 0.5s;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }

  .card-text {
    position: absolute;
    font-size: 20px;
    font-weight: bold;
    color: white;
    text-align: center;
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.5s, transform 0.5s;
  }

  .card:hover .card-image {
    top: 20%; /* Move to the top center */
    transform: translateY(0);
  }

  .card:hover .card-text {
    opacity: 1;
    transform: translateY(50%);
  }
`;

export default Card;
