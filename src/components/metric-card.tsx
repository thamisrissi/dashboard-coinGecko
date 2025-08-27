type Props = {
    title: string;
    value: number;
    onClick?: () => void;
};

export function MetricCard({ title, value, onClick }: Props) {
    return (
        <div
            className="bg-white shadow-lg rounded-sm p-6 flex gap-6 items-center hover:bg-gray-200 cursor-pointer border border-gray-400"
            onClick={onClick}
        >
            <h3 className="text-sm break-words">{title}</h3>
            <h3 className="text-xl font-bold truncate">{value.toLocaleString()}</h3>
        </div>
    );
}
