import { useEffect } from 'react';
import { useWordDetail } from '../queries';
import { useStore } from '../../../lib/store';

export default function WordDetails() {
    const isOpen = useStore(s => s.isDetailsOpen);
    const close = useStore(s => s.closeDetails);
    const id = useStore(s => s.selectedWordId);
    const pushHistory = useStore(s => s.pushHistory);
    const toggleFavorite = useStore(s => s.toggleFavorite);
    const favoriteIds = useStore(s => s.favoriteIds);
    const { data: word, isLoading } = useWordDetail(id)
    const setQuery = useStore(s => s.setQuery);;
    useEffect(() => {
        if (word) pushHistory({ id: word.id, term: word.term, viewedAt: Date.now() });
    }, [word, pushHistory]);

    if (!isOpen) {
        return (
            <div className="flex items-center justify-center h-64 text-slate-400">
                <div className="text-center space-y-2">
                    <div className="text-4xl">📖</div>
                    <div className="text-sm font-medium">រើសពាក្យមួយដើម្បីបង្ហាញ</div>
                </div>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="space-y-3 text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                    <div className="text-sm text-slate-500">សូមរង់ចាំ...</div>
                </div>
            </div>
        );
    }

    if (!word) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-center space-y-2">
                    <div className="text-4xl">❌</div>
                    <div className="text-sm font-medium text-slate-600">រកមិនឃើញពាក្យ</div>
                </div>
            </div>
        );
    }

    const isFav = favoriteIds.includes(word.id);

    return (
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-slate-200 p-6">
                <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                        <h2 className="text-3xl font-bold text-slate-900 mb-2 break-words">{word.term}</h2>
                        {word.phonetic && (
                            <div className="text-slate-600 text-lg italic mb-1">{word.phonetic}</div>
                        )}
                        <span className='flex gap-3'>
                            {word.partOfSpeech && (
                                <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
                                    {word.partOfSpeech}
                                </span>
                            )}
                            {
                                word?.category && (
                                    <span className='inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full'>
                                        {word.category}
                                    </span>
                                )
                            }</span>

                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                        <button
                            className={`${isFav
                                ? 'bg-yellow-400 text-yellow-900 border-yellow-500 hover:bg-yellow-500'
                                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                                } border-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-sm hover:shadow flex items-center gap-1.5`}
                            onClick={() => toggleFavorite(word.id)}
                        >
                            <span className="text-lg">{isFav ? '★' : '☆'}</span>
                            <span className="hidden sm:inline">{isFav ? 'Favorited' : 'Favorite'}</span>
                        </button>
                        <button
                            className="bg-white text-slate-700 border-2 border-slate-300 px-4 py-2 rounded-lg font-medium hover:bg-slate-50 transition-all duration-200 shadow-sm hover:shadow"
                            onClick={close}
                        >
                            ✕
                        </button>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-6 space-y-6">
                {/* Definition */}
                <div className="bg-slate-50 rounded-lg p-4 border-l-4 border-blue-500">
                    <div className="text-slate-800 leading-relaxed text-base">{word.meaning}</div>
                </div>

                {/* Examples */}
                {word.examples?.length ? (
                    <div className="space-y-3">
                        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                            <span className="text-emerald-600">💬</span>
                            ឧទាហរណ៍
                        </h3>
                        <div className="space-y-2">
                            {word.examples.map((e, i) => (
                                <div key={i} className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 pl-4">
                                    <div className="text-slate-700 italic">"{e}"</div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : null}

                {word.synonyms?.length ? (
                    <div className="space-y-3">
                        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                            <span className="text-purple-600">🔗</span>
                            ពាក្យន័យដូចនឹង <span className='text-yellow-800'>"{word.term}"</span>
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {word.synonyms.map(s => (
                                <span
                                    key={s}
                                    onClick={() => { setQuery(s) }}
                                    className="bg-purple-50 text-purple-700 border border-purple-200 px-3 py-1.5 rounded-full text-sm font-medium hover:bg-purple-100 transition-colors cursor-pointer"
                                >
                                    {s}
                                </span>
                            ))}
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    );
}