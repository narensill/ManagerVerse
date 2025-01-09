import React from 'react';
import styled from 'styled-components';

const ConvertCard = ({ hoverText, hoverImage, darkMode, animationDelay }) => {
  return (
    <StyledCard darkMode={darkMode} style={{ animationDelay }}>
      
      <p className="card-text">{hoverText}</p>
    </StyledCard>
  );
};

export default ConvertCard;

const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.25rem;
  border-radius: 8px;
  width: 200px;
  height: 150px;
  transition: transform 0.3s ease;
  background: ${(props) => (props.darkMode ? "#1E293B" : "lightblue")};
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
  }

  .card-image {
    width: 80px;
    height: 80px;
    object-fit: cover;
    margin-bottom: 10px;
  }

  .card-text {
    font-size: 1.2rem;
    font-weight: bold;
    text-align: center;
    color: ${(props) => (props.darkMode ? "#9CA3AF" : "#1E293B")};
  }
`;
