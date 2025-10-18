import { useStore } from "../../../lib/store";
import WordDetails from "./WordDetails";
import WordList from "./WordList";


export default function DictionaryPage() {
    const query = useStore(s => s.query);
    const setQuery = useStore(s => s.setQuery);
    const IsOpen = useStore(s => s.isDetailsOpen)
    return (
        <div className="space-y-4">
            <h1 className="text-2xl font-semibold text-center text-yellow-700">វចនានុក្រមខ្មែរ</h1>

            <div className="flex gap-3 items-center">
                <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="ស្វែងរកពាក្យ...."
                    className="border px-3 py-2 rounded w-80 mx-auto"
                />
            </div>

            <div className="grid grid-cols-2 gap-6​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​ max-md:hidden gap-3">
                <WordList />
                <WordDetails />
            </div>
            <div className="md:hidden">
                {!IsOpen ? <WordList /> : <WordDetails />}
            </div>
        </div>
    );
}
