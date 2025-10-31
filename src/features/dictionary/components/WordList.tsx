import { useStore } from '../../../lib/store';
import { useWordList } from '../queries';
import { useTTS } from '../../../lib/useTTS';
export default function WordList() {

    const q = useStore(s => s.query);
    const page = useStore(s => s.page);
    const pageSize = useStore(s => s.pageSize);
    const setPage = useStore(s => s.setPage);
    const setSelectedWordId = useStore(s => s.setSelectedWordId);
    const openDetails = useStore(s => s.openDetails);
    const { speak, speaking } = useTTS();
    const { data, isLoading, isFetching } = useWordList(q, page, pageSize);

    if (!q.trim()) {
        return (
            <div className="flex items-center justify-center h-64 text-slate-400">
                <div className="text-center space-y-3 flex flex-col items-center justify-center">
                    <div className="text-5xl" aria-hidden><svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-search-icon lucide-search"><path d="m21 21-4.34-4.34"/><circle cx="11" cy="11" r="8"/></svg></div>
                    <div className="text-slate-500 font-medium">សូមវាយពាក្យដើម្បីស្វែងរក</div>
                    <div className="text-sm text-slate-400">បញ្ចូលពាក្យដើម្បីមើលន័យ</div>
                </div>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64" role="status" aria-live="polite">
                <div className="space-y-3 text-center">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto"></div>
                    <div className="text-sm text-slate-500">កំពុងស្វែងរក…</div>
                </div>
            </div>
        );
    }

    if (!data?.items?.length) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-center space-y-3">
                    <div className="text-5xl" aria-hidden>📭</div>
                    <div className="text-slate-600 font-medium">មិនមានលទ្ធផល</div>
                    <div className="text-sm text-slate-400">សាកល្បងពាក្យផ្សេងទៀត</div>
                </div>
            </div>
        );
    }

    const totalPages = Math.ceil((data?.total ?? 0) / pageSize);
    const hasNextPage = page < totalPages;

    const renderCategory = (cat?: string) => {
        if (!cat) return null;
        const isRoyal = cat === 'ព្រះរាជសព្ទ' || cat === 'រាជសព្ទ';
        const base = 'text-xs px-2 py-0.5 rounded-full border';
        const royalCls = 'bg-yellow-50 text-yellow-700 border-yellow-200';
        const normalCls = 'bg-slate-100 text-slate-700 border-slate-200';
        return (
            <span
                className={`${base} ${isRoyal ? royalCls : normalCls}`}
                title={isRoyal ? 'ពាក្យប្រើជូនព្រះមហាក្សត្រ' : cat}
            >
                {cat}
            </span>
        );
    };

    const handleSpeak = (term: string) => {
        if (speaking) {
            stop();
        } else {
            speak(term)
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200 px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="text-sm font-semibold text-slate-700">
                        {isFetching ? (
                            <span className="flex items-center gap-2">
                                <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600" aria-hidden />
                                កំពុងបច្ចុប្បន្នភាព…
                            </span>
                        ) : (
                            <span className="flex items-center gap-2">
                                <span className="text-blue-600">{data.total}</span>
                                <span className="text-slate-500">លទ្ធផល</span>
                            </span>
                        )}
                    </div>
                    <div className="text-xs text-slate-500 bg-white px-3 py-1 rounded-full border border-slate-200">
                        ទំព័រ {page} / {totalPages}
                    </div>
                </div>
            </div>

            <ul className="divide-y divide-slate-100 overflow-y-auto" role="list">
                {data.items.map(w => (
                    <li
                        key={w.id}
                        className="px-6 py-4 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 cursor-pointer transition-all duration-200 group overflwoys"
                        onClick={() => { setSelectedWordId(w.id); openDetails(); }}
                    >
                        <div className="flex items-start justify-between gap-3">
                            <button
                                type="button"
                                className="flex-1 min-w-0 text-left"
                                onClick={() => { setSelectedWordId(w.id); openDetails(); }}
                                aria-label={`បើកពាក្យ ${w.term}`}
                            >
                                <div className="flex items-baseline gap-2 mb-1">
                                    <span className="font-bold text-lg text-slate-900 group-hover:text-blue-600 transition-colors">
                                        {w.term}
                                    </span>
                                    {w.phonetic && (
                                        <span className="text-sm text-slate-500 italic">{w.phonetic}</span>
                                    )}
                                    {renderCategory(w.category)}
                                </div>
                                <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed">
                                    {w.meaning}
                                </p>
                            </button>

                            <div className="flex items-center gap-2 opacity-0">
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleSpeak(w.term || "");
                                    }}
                                    className=" border px-2 py-1 rounded-lg text-slate-700 hover:bg-white hover:shadow-sm border-slate-300"
                                    title="ស្តាប់"
                                    aria-label={`ស្តាប់ ${w.term}`}
                                >
                                    {speaking ? '⏹️' : '🔊'}
                                </button>

                                <svg className="w-5 h-5 text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>

            <div className="bg-slate-50 border-t border-slate-200 px-6 py-4">
                <div className="flex items-center justify-between">
                    <button
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${page === 1
                            ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                            : 'bg-white text-slate-700 border-2 border-slate-300 hover:bg-slate-50 hover:border-slate-400 shadow-sm hover:shadow'
                            }`}
                        onClick={() => setPage(Math.max(1, page - 1))}
                        disabled={page === 1}
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        មុន
                    </button>

                    <div className="text-sm text-slate-600 font-medium">
                        បង្ហាញ {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, data.total)} / {data.total}
                    </div>

                    <button
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${!hasNextPage
                            ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                            : 'bg-white text-slate-700 border-2 border-slate-300 hover:bg-slate-50 hover:border-slate-400 shadow-sm hover:shadow'
                            }`}
                        onClick={() => setPage(page + 1)}
                        disabled={!hasNextPage}
                    >
                        បន្ទាប់
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}