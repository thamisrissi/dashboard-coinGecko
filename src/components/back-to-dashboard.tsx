import { useNavigate } from "react-router-dom";

interface BackToDashboardProps {
    title: string;
}

export function BackToDashboard({ title }: BackToDashboardProps) {
    const navigate = useNavigate();

    return (
        <button
            onClick={() => navigate("/")}
            className={`mt-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 transition text-white font-semibold rounded-lg shadow cursor-pointer`}
        >
            {title}
        </button>
    );
}
