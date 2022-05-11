import styled from "styled-components";

export const CommonQuestionsCardView = styled.article`
`

export const FaqQuestionsCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  flex-direction: row;

  margin-top: 53px;

  width: 100%;

  img {
    cursor: pointer;
  }
`
interface CardBodyInterface {
  showCardBody: boolean;
}
export const FaqQuestionsCardBody = styled.div<CardBodyInterface>`
  display: ${props => props.showCardBody? 'flex' : 'none'};

  margin-bottom: 20px;

  p {
    font-weight: 400;
    font-size: 14px;
    line-height: 12px;

    letter-spacing: 0.5px;

    color: rgba(0, 0, 0, 0.6);
  }
`
