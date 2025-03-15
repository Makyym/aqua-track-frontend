import { CircleLoader } from 'react-spinners';

const LoaderComponent = ({ size }) => {
  return (
    <CircleLoader
      loading={true}
      size={size}
      color="#9be1a0"
      aria-label="circle-loader"
    />
  );
};

export default LoaderComponent;
