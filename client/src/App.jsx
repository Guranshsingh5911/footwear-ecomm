import { useEffect, useState } from "react";

function App() {
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetch("http://localhost:5000/")
            .then((res) => res.text())
            .then((data) => setMessage(data))
            .catch((err) => console.error("Error fetching data:", err));
    }, []);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-900">
            <h1 className="text-3xl font-bold mb-4">FootWear Store</h1>
            <p className="text-lg">{message}</p>
        </div>
    );
}

export default App;