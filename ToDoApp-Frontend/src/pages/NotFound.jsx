function NotFound() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-800 to-gray-600">
            <div className="text-center text-white p-8 bg-gray-900 rounded-lg shadow-lg transform transition duration-300 hover:scale-105">
                <h1 className="text-6xl font-extrabold mb-4">404</h1>
                <h2 className="text-2xl font-semibold mb-6">
                    Page Not Found
                </h2>
                <p className="text-lg mb-8">
                    The page you're looking for doesn't exist or has been moved.
                </p>
                <a
                    href="/"
                    className="inline-block px-6 py-3 text-lg font-medium text-gray-900 bg-white rounded-lg shadow-md hover:bg-gray-100 transition duration-300"
                >
                    Go Back Home
                </a>
            </div>
        </div>
    );
}

export default NotFound;
