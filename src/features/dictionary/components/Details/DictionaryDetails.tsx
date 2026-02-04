"use client";

import { BookOpenText, X } from "lucide-react";
import type { Word } from "../../../../lib/api";

export default function DictionaryDetails({
  isOpen,
  isLoading,
  word,
  isFav,
  onToggleFavorite,
  onClose,
  onClickSynonym,
}: {
  isOpen: boolean;
  isLoading: boolean;
  word: Word;
  isFav: boolean;
  onToggleFavorite: () => void;
  onClose: () => void;
  onClickSynonym: (s: string) => void;
}) {
  if (!isOpen) {
    return (
      <div className="h-full overflow-y-auto">
        <div className="mx-auto max-w-4xl px-4 py-10 md:px-8">
          <div className="flex items-center justify-center h-[60vh] text-center">
            <div className="space-y-2 flex flex-col items-center">
              <BookOpenText />
              <div className="text-lg font-semibold text-slate-900">រើសពាក្យមួយ</div>
              <div className="text-sm text-gray-500">ចុចពាក្យនៅ Sidebar ដើម្បីមើលព័ត៌មានលម្អិត</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="h-full overflow-y-auto">
        <div className="mx-auto max-w-4xl px-4 py-10 md:px-8">
          <div className="flex items-center justify-center h-[60vh]">
            <div className="space-y-3 text-center">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto" />
              <div className="text-sm text-gray-300">សូមរង់ចាំ...</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!word) {
    return (
      <div className="h-full overflow-y-auto">
        <div className="mx-auto max-w-4xl px-4 py-10 md:px-8">
          <div className="flex items-center justify-center h-[60vh] text-center">
            <div className="space-y-2">
              <div className="text-4xl"><X /></div>
              <div className="text-sm font-medium text-slate-700">រកមិនឃើញពាក្យ</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  console.log(word)
  return (
    <div className="h-full overflow-y-auto">
      <div className=" max-w-full px-4 py-4 md:px-8 md:py-8">
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-slate-200 p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h2 className="text-3xl font-bold text-red-600 mb-2 break-words">{word.term}</h2>
                {word.phonetic && <div className="text-blue-600 text-lg italic mb-1">{"[ " + word.phonetic + " ]"}</div>}
              </div>

              <div className="flex gap-2">
                <button
                  className={[
                    "border-2 px-4 py-2 rounded-xl font-medium transition shadow-sm hover:shadow",
                    isFav ? "border-orange-200 bg-orange-50" : "border-slate-300 bg-white text-slate-700",
                  ].join(" ")}
                  onClick={onToggleFavorite}
                  type="button"
                >
                  {isFav ? <Star /> : <UnfilledStar />}
                </button>

                <button
                  className="border-2 border-slate-300 bg-white px-4 py-2 rounded-xl font-medium hover:bg-slate-50 transition"
                  onClick={onClose}
                  type="button"
                >
                  ✕
                </button>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6">
            <div className="bg-slate-50 rounded-xl p-4 border-l-4 border-gray-200 flex items-start gap-3">
              <span className="text-blue-600">{"(" + word.part_of_speech + ")" || ""}</span><div className="text-slate-800 leading-relaxed text-base">{word.meaning}</div>
            </div>
            <div className="flex items-center gap-1">
              <p className="text-red-600 font-semibold">{"ឧ. "}</p>
              {
                word.examples && word.examples.map((s) => {
                  return <i className="">{s}</i>
                })
              }
            </div>

            {word.synonyms?.length ? (
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-slate-900">សង្ឃសព្ទ</h3>
                <div className="flex flex-wrap gap-2">
                  {word.synonyms.map((s: string) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => onClickSynonym(s)}
                      className="bg-yellow-50 text-yellow-600 border border-yellow-200 px-3 py-1.5 rounded-full text-sm font-medium hover:bg-yellow-100 transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}
            {word.royal_voc ? (
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-slate-900">រាជសព្ទ</h3>
                <div className="flex flex-wrap gap-2">
                  {word.royal_voc &&
                    <button
                      type="button"
                      onClick={() => onClickSynonym(word.royal_voc as string)}
                      className="bg-yellow-50 text-yellow-600 border border-yellow-200 px-3 py-1.5 rounded-full text-sm font-medium hover:bg-yellow-100 transition-colors"
                    >
                      {word.royal_voc || "មិនមាន"}
                    </button>
                  }
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}


const Star = () => {
  return <svg xmlns="http://www.w3.org/2000/svg"
    width="16" height="16"
    viewBox="0 0 24 24"
    fill="orange"
    stroke="orange"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    className="lucide lucide-star-icon lucide-star">
    <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
  </svg>
}

const UnfilledStar = () => {
  return <svg xmlns="http://www.w3.org/2000/svg"
    width="16" height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    className="lucide lucide-star-icon lucide-star">
    <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
  </svg>
}