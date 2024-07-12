import styled from 'styled-components';

export const Input = styled.input`
  cursor: pointer;
  position: absolute;
  width: 200px;
  height: 42px;
  box-sizing: border-box;
  opacity: 0;
  &::-webkit-file-upload-button {
    cursor: pointer;
  }
`;

export const FileInput = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #fff;
  box-sizing: border-box;
  border: 1px solid #4da7bc;
  width: 200px;
  border-radius: 4px;
  padding: 5px 10px;
  transition: 0.3s ease-in-out;
  background-color: #4da7bc;
  margin-bottom: 10px;
  margin-top: 10px;
`;

export const DeletePicture = styled.div`
  display: none;
  position: absolute;
  align-items: center;
  background-color: #00000050;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.2);
  border-radius: 50%;
  margin: 5px;
  padding: 5px;
  color: #dc3545;
  box-sizing: content-box;
  width: 10px;
  height: 10px;
  transition: 0.3s ease-in-out;
  &:hover {
    background-color: #00000090;
  }
`;

export const PictureContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 160px;
  height: 120px;
  border-radius: 4px;
  cursor: pointer;
  border: 4px solid transparent;
  &:hover {
    ${DeletePicture} {
      display: flex;
    }
  }

  &.selected {
    border: 4px solid #4da7bc;
    background-color: #4da7bc50;
  }
`;

export const Picture = styled.img`
  width: 100%;
  height: 100%;
`;

export const Pictures = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
`;

export const Thumbnail = styled.div`
  width: 100%;
  height: 200px;
  margin-bottom: 10px;
`;
