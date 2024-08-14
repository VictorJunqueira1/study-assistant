import ClipLoader from 'react-spinners/ClipLoader';

const Loader = () => (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-75 z-50">
        <ClipLoader color="#ffffff" size={50} />
    </div>
);

export default Loader;