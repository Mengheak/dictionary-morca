// Tiny in-memory "DB" + repo-like functions with paging + search.

export type Word = {
  id: string;
  term: string;
  phonetic?: string;
  partOfSpeech?: string;
  meaning: string;
  category?: "normal" | string;
  singKhmer?: string; 
  examples?: string[];
  synonyms?: string[];
  audioUrl?: string;
};

const WORDS: Word[] = [
  {
    id: "1",
    term: "សៀវភៅ",
    partOfSpeech: "នាម",
    category: "ធម្មតា",
    singKhmer: "Siev Phov",
    meaning: "ឯកសារដែលត្រូវបានបោះពុម្ព ឬចងក្រងសម្រាប់អាន ឬសិក្សា។",
    examples: ["ខ្ញុំយកសៀវភៅទៅបណ្ណាល័យរៀងរាល់សប្ដាហ៍។"],
    synonyms: ["ក្បួន", "អត្ថបទ"],
  },
  {
    id: "2",
    term: "គ្រូ",
    partOfSpeech: "នាម",
    singKhmer: "Kruu",
    meaning: "មនុស្សដែលបង្រៀនចំណេះដឹង ឬជំនាញឱ្យអ្នកដទៃ។",
    examples: ["គ្រូបានបកស្រាយមេរៀនយ៉ាងច្បាស់លាស់។"],
    synonyms: ["អធិការបង្រៀន", "គ្រូបង្រៀន"],
  },
  {
    id: "3",
    term: "សិស្ស",
    partOfSpeech: "នាម",
    singKhmer: "Ses",
    meaning: "មនុស្សដែលកំពុងសិក្សានៅសាលា ឬទទួលការបង្រៀន។",
    examples: ["សិស្សទាំងអស់ត្រូវតែយកចិត្តទុកដាក់ពេលរៀន។"],
    synonyms: ["អ្នកសិក្សា", "និស្សិត"],
  },
  {
    id: "21",
    term: "សោយ",
    partOfSpeech: "កិរិយា",
    category: "ព្រះរាជសព្ទ",
    singKhmer: "Saoy",
    meaning: "ហូប, ទទួលទាន, ជាពាក្យសម្រាប់និយាយជាមួយស្ដេច",
    examples: ["ព្រះអង្គសោយអាហារ"],
    synonyms: ["ហូប", "ស៊ី"],
  },
  {
    id: "4",
    term: "រៀន",
    partOfSpeech: "កិរិយា",
    singKhmer: "Rien",
    meaning: "ធ្វើសកម្មភាពដើម្បីទទួលយកចំណេះដឹង ឬជំនាញថ្មី។",
    examples: ["គាត់កំពុងរៀនភាសាអង់គ្លេសរៀងរាល់ថ្ងៃ។"],
    synonyms: ["សិក្សា", "បណ្តុះបណ្តាល"],
  },
  {
    id: "5",
    term: "អាន",
    partOfSpeech: "កិរិយា",
    singKhmer: "Aan",
    meaning: "មើលអក្សរ ឬសៀវភៅ ដើម្បីយល់ពីអត្ថន័យ។",
    examples: ["ខ្ញុំចូលចិត្តអានវចនានុក្រមមុនពេលសរសេរ។"],
    synonyms: ["ពិនិត្យអត្ថបទ", "ស្គាល់អត្ថន័យ"],
  },
  {
    id: "6",
    term: "សរសេរ",
    partOfSpeech: "កិរិយា",
    singKhmer: "Sorsae",
    meaning: "បង្កើតអត្ថបទ ឬអក្សរនៅលើក្រដាស ឬឧបករណ៍អេឡិចត្រូនិក។",
    examples: ["សូមសរសេរពាក្យនេះ។"],
    synonyms: ["ចងក្រងអត្ថបទ", "រៀបរាប់"],
  },
  {
    id: "7",
    term: "លឿន",
    partOfSpeech: "គុណនាម",
    singKhmer: "Luen",
    meaning: "មានល្បឿនខ្ពស់ ឬកើតឡើងយ៉ាងរហ័ស។",
    examples: ["ការឆ្លើយតបរបស់គាត់លឿនណាស់។"],
    synonyms: ["រហ័ស", "ឆាប់"],
  },
  {
    id: "8",
    term: "យឺត",
    partOfSpeech: "គុណនាម",
    singKhmer: "Yuet",
    meaning: "មានល្បឿនទាប ឬធ្វើដោយខានចុង។",
    examples: ["អ៊ីនធឺណិតយឺតធ្វើឱ្យការស្រាវជ្រាវពិបាក។"],
    synonyms: ["ពន្យាពេល", "ឆ្ងាយពេល"],
  },
  {
    id: "9",
    term: "សុខភាព",
    partOfSpeech: "នាម",
    singKhmer: "Sokhapheap",
    meaning: "សភាពរបស់រាងកាយ និងចិត្ត ដែលគ្មានជំងឺ ឬការរងរបួស។",
    examples: ["ការហាត់ប្រាណជួយបង្កើនសុខភាព។"],
    synonyms: ["សុភមង្គលរាងកាយ", "ភាពរឹងមាំ"],
  },
  {
    id: "10",
    term: "បច្ចេកវិទ្យា",
    partOfSpeech: "នាម",
    singKhmer: "Bachek Vityea",
    meaning: "ចំណេះដឹង និងវិធីសាស្រ្តប្រើប្រាស់ឧបករណ៍ ដើម្បីដោះស្រាយបញ្ហា។",
    examples: ["បច្ចេកវិទ្យាឌីជីថលជួយពង្រីកការសិក្សាផ្ទាល់ខ្លួន។"],
    synonyms: ["បច្ចេកទេស", "វិទ្យាសាស្រ្តប្រើប្រាស់"],
  },
  {
    id: "11",
    term: "ភាសា",
    partOfSpeech: "នាម",
    singKhmer: "Pheasa",
    meaning: "ប្រព័ន្ធនៃពាក្យ និងវេយ្យាករណ៍សម្រាប់ទំនាក់ទំនង។",
    examples: ["ភាសាខ្មែរ​មានអក្សរពិសេសផ្ទាល់ខ្លួន។"],
    synonyms: ["មាតុភាសា", "របៀបនិយាយ"],
  },
  {
    id: "12",
    term: "មិត្តភាព",
    partOfSpeech: "នាម",
    singKhmer: "Mittapheap",
    meaning: "ទំនាក់ទំនងល្អៗរវាងមនុស្សដែលគ្នាគាំទ្រ និងគិតល្អ។",
    examples: ["មិត្តភាពពិតប្រាកដត្រូវការការគោរព និងជឿទុកចិត្ត។"],
    synonyms: ["មិត្តភាពជិតស្និទ្ធ", "កម្តៅចិត្ត"],
  },
  {
    id: "13",
    term: "រីករាយ",
    partOfSpeech: "គុណនាម",
    singKhmer: "Rikreay",
    meaning: "មានអារម្មណ៍សប្បាយចិត្ត និងពេញចិត្ត។",
    examples: ["ទាំងក្រុមរីករាយពេលឈ្នះប្រកួត។"],
    synonyms: ["សប្បាយចិត្ត", "រីករស់"],
  },
  {
    id: "14",
    term: "អ្នកនិពន្ធ",
    partOfSpeech: "នាម",
    singKhmer: "Neak Nipoan",
    meaning: "មនុស្សដែលសរសេរសៀវភៅ អត្ថបទ ឬស្នាដៃ។",
    examples: ["អ្នកនិពន្ធបានចេញសៀវភៅថ្មីអំពីប្រវត្តិសាស្រ្ត។"],
    synonyms: ["អ្នករៀបរាប់", "អ្នកចងក្រង"],
  },
  {
    id: "15",
    term: "វចនានុក្រម",
    partOfSpeech: "នាម",
    singKhmer: "Vochananukrom",
    meaning: "សៀវភៅ ឬមូលដ្ឋានទិន្នន័យដែលរួមបញ្ចូលពាក្យ និងន័យ។",
    examples: ["ខ្ញុំប្រើវចនានុក្រមដើម្បីរកន័យពាក្យ។"],
    synonyms: ["ក្បួនពាក្យ", "និពន្ធន័យ"],
  },
  {
    id: "16",
    term: "បកប្រែ",
    partOfSpeech: "កិរិយា",
    singKhmer: "Bak Brae",
    meaning: "ផ្ទេរព្រះន័យពីភាសាមួយទៅភាសាម្ដងទៀត។",
    examples: ["សូមបកប្រែអត្ថបទនេះពីអង់គ្លេសទៅខ្មែរ។"],
    synonyms: ["បម្លែងភាសា", "បកស្រាយ"],
  },
  {
    id: "17",
    term: "គន្លង",
    partOfSpeech: "នាម",
    singKhmer: "Konlong",
    meaning: "ផ្លូវ ឬវិធីសាស្រ្តដែលអាចធ្វើតាមបាន។",
    examples: ["គន្លងសិក្សាថ្មីធ្វើឲ្យសិស្សយល់បានឆាប់។"],
    synonyms: ["ផ្លូវការ", "ទិសដៅ"],
  },
  {
    id: "18",
    term: "យល់ដឹង",
    partOfSpeech: "នាម",
    singKhmer: "Yol Doeng",
    meaning: "សមត្ថភាពយល់ និងដឹងអំពីអ្វីមួយ។",
    examples: ["ការអានរៀងរាល់ថ្ងៃបន្ថែមយល់ដឹង។"],
    synonyms: ["ចំណេះដឹង", "ការយល់ច្បាស់"],
  },
  {
    id: "19",
    term: "គោរព",
    partOfSpeech: "កិរិយា",
    singKhmer: "Kourop",
    meaning: "បង្ហាញការគិតល្អ និងគោរពតម្លៃរបស់អ្នកដទៃ។",
    examples: ["យើងគួរគោរពមតិយោបល់របស់គ្នាទៅវិញទៅមក។"],
    synonyms: ["កិត្តិយស", "គោរពទុកចិត្ត"],
  },
  {
    id: "20",
    term: "បរិបទ",
    partOfSpeech: "នាម",
    singKhmer: "Boribot",
    meaning: "ស្ថានភាព ឬលក្ខណៈពាក់ព័ន្ធជុំវិញពាក្យ ឬព្រឹត្តិការណ៍។",
    examples: ["ន័យពាក្យអាស្រ័យលើបរិបទដែលប្រើ។"],
    synonyms: ["ស្ថានភាពជុំវិញ", "បរិយាកាសអត្ថន័យ"],
  },
];

const wait = (ms: number) => new Promise((res) => setTimeout(res, ms));

export async function repoSearchWords(
  q: string,
  page: number,
  pageSize: number
) {
  await wait(250);
  const query = q.trim().toLowerCase();
  const filtered = query
    ? WORDS.filter((w) => {
        const term = w.term.toLowerCase();
        const meaning = w.meaning.toLowerCase();
        const sing = (w.singKhmer ?? "").toLowerCase();
        const syns = (w.synonyms ?? []).map((s) => s.toLowerCase());
        return (
          term.includes(query) ||
          meaning.includes(query) ||
          sing.includes(query) ||
          syns.some((s) => s.includes(query))
        );
      })
    : [];

  const total = filtered.length;
  const start = (page - 1) * pageSize;
  const items = filtered.slice(start, start + pageSize);
  return { items, total };
}

export async function repoGetWord(id: string) {
  await wait(200);
  return WORDS.find((w) => w.id === id) ?? null;
}
