import { useEffect } from "react";
import { useStore } from "../../../lib/store";
import FavoritePage from "./FavoritePage";
import HistoryPage from "./HistoryPage";
import WordDetails from "./WordDetails";
import WordList from "./WordList";
import { useSearchParams } from "react-router-dom";

export default function DictionaryPage() {
    const query = useStore(s => s.query);
    const setQuery = useStore(s => s.setQuery);
    const toggleHistory = useStore(s => s.toggleShowHistory)
    const IsOpen = useStore(s => s.isDetailsOpen)
    const isShowHistory = useStore(s => s.isShowHistory)
    const isShowFavourite = useStore(s => s.isShowFavourite)
    const toggleShowFavourite = useStore(s => s.toggleShowFavourite)
    const [params, setParams] = useSearchParams()
    const qFromUrl = params.get("q") || ""

    useEffect(() => {
        if (qFromUrl !== query) {
            setQuery(qFromUrl);
        }
    }, [qFromUrl]);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);
        setParams(value ? { q: value } : {}); // updates URL
    };
    return (
        <div className="space-y-4 p-4">
            <h1 className="text-2xl text-center text-[#E6F7FF] py-3">វចនានុក្រមខ្មែរ</h1>
            <div className="flex gap-3 items-center justify-center">
                <input
                    value={query}
                    onChange={handleChange}
                    placeholder="ស្វែងរកពាក្យ...."
                    className="border px-3 py-2 rounded w-80"
                />
                <button className="hover:text-black text-blue-500"  onClick={toggleHistory}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-history-icon lucide-history">
                        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" />
                        <path d="M12 7v5l4 2" />
                    </svg>
                </button>
                <button className="" onClick={toggleShowFavourite}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-star-icon lucide-star"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" /></svg>
                </button>
            </div>
            {!isShowHistory && !isShowFavourite && <div className="grid grid-cols-2 gap-6​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​ max-md:hidden gap-3">
                <WordList />
                <WordDetails />
            </div>}
            {isShowHistory && !isShowFavourite && <HistoryPage />}
            {isShowFavourite && !isShowHistory && <FavoritePage />}
            <div className="md:hidden">
                {!IsOpen ? <WordList /> : <WordDetails />}
            </div>
        </div>
    );
}
