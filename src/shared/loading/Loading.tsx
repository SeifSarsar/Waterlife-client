import ReactLoading, { LoadingType } from 'react-loading';
import { LoadingContainer } from './Loading.style';

interface Props {
  type: LoadingType;
}

const Loading = (props: Props) => {
  return (
    <LoadingContainer>
      <ReactLoading
        type={props.type}
        color="#4da7bc"
        width={'15em'}
        height={'15em'}
      ></ReactLoading>
    </LoadingContainer>
  );
};

export default Loading;
