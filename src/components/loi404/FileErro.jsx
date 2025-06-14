


const FileEmpty = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">File Not Found</h1>
            <p className="text-lg text-gray-600 mb-6">
                The file you are looking for does not exist.
            </p>
            <a href="/" className="text-blue-500 hover:underline">
                Go back to home
            </a>
        </div>
    );
};

export default FileEmpty;
