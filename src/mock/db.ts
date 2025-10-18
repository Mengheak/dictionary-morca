type TRelatedWord = {
  term: string;
  partOfSpeech: string;
  meaning: string;
};
export type Word = {
  id: string;
  term: string;
  phonetic?: string;
  partOfSpeech?: string;
  meaning: string;
  category?: "normal" | string;
  relatedWords?: TRelatedWord;
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
    meaning: "ហូប, ទទួលទាន, ជាពាក្យសម្រាប់និយាយជាមួយស្ដេច។",
    examples: ["ព្រះអង្គសោយអាហារ។"],
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
    synonyms: ["ពន្យាពេល", "យឺតយ៉ាវ"],
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
    synonyms: ["បច្ចេកទេស", "វិទ្យាសាស្ត្រ​ប្រើប្រាស់"],
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
    synonyms: ["សម្ព័ន្ធភាព", "ភាពជាមិត្ត"],
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
    synonyms: ["ក្បួនពាក្យ", "វចនានុក្រមភាសា"],
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

  // ---------- More samples (monastic, royal, vowels, phonetic, audio) ----------

  {
    id: "22",
    term: "បរិភោគ",
    partOfSpeech: "កិរិយា",
    category: "សង្ឃសព្ទ",
    singKhmer: "Bori-phok",
    meaning: "ទទួលទានអាហារ (សម្រាប់ព្រះសង្ឃ)។",
    examples: ["ព្រះសង្ឃបរិភោគក្នុងពេលពេលព្រឹក។"],
    synonyms: ["ទទួលទាន", "ស៊ី"],
    audioUrl: "/audio/km/បរិភោគ.mp3",
  },
  {
    id: "23",
    term: "យាង",
    partOfSpeech: "កិរិយា",
    category: "សង្ឃសព្ទ",
    singKhmer: "Yeang",
    meaning: "ទៅ/ធ្វើដំណើរ (បែបគោរពសម្រាប់ព្រះសង្ឃ)។",
    examples: ["ព្រះអង្គយាងទៅវត្តផ្សេង។"],
    synonyms: ["ទៅ", "ដំណើរ"],
  },
  {
    id: "24",
    term: "ព្រះតម",
    partOfSpeech: "នាម",
    category: "សង្ឃសព្ទ",
    singKhmer: "Preah Tam",
    meaning: "ពាក្យគោរពសម្រាប់រាងកាយព្រះសង្ឃ/របស់ព្រះសង្ឃ (ប្រើខ្លះៗ)។",
    examples: ["គេថែរក្សាព្រះតមឱ្យបានស្អាត។"],
    synonyms: ["រាងកាយព្រះសង្ឃ"],
  },
  {
    id: "25",
    term: "ព្រះរាជក្រឹត្យ",
    partOfSpeech: "នាម",
    category: "ព្រះរាជសព្ទ",
    singKhmer: "Preah Reacheakret",
    meaning: "ឯកសារច្បាប់ចេញដោយព្រះមហាក្សត្រ។",
    examples: ["ព្រះរាជក្រឹត្យត្រូវបានបោះពុម្ពផ្សាយ។"],
    synonyms: ["ក្រឹត្យ", "បៀប័ន"],
  },
  {
    id: "26",
    term: "ទ្រង់",
    partOfSpeech: "នាមសព្វនាម",
    category: "ព្រះរាជសព្ទ",
    singKhmer: "Trong",
    meaning: "ពាក្យសម្ដែងទៅកាន់ព្រះមហាក្សត្រ ឬមហាក្សត្រី។",
    examples: ["ទ្រង់បានមានព្រះរាជប្រកាស។"],
    synonyms: ["ព្រះអង្គ"],
  },
  {
    id: "27",
    term: "កីឡា",
    partOfSpeech: "នាម",
    singKhmer: "Kila",
    meaning: "សកម្មភាពកាយសម្ពាធសម្រាប់ការកំសាន្ត ឬប្រកួតប្រជែង។",
    examples: ["កីឡាបាល់ទាត់ពេញនិយម។"],
    synonyms: ["លំហាត់កាយ", "ការប្រកួត"],
    audioUrl: "/audio/km/កីឡា.mp3",
  },
  {
    id: "28",
    term: "កិច្ចសន្យា",
    partOfSpeech: "នាម",
    singKhmer: "Keck San-nea",
    meaning: "កិច្ចព្រមព្រៀងផ្លូវច្បាប់រវាងភាគីពីរឬច្រើន។",
    examples: ["ត្រូវចុះកិច្ចសន្យាមុនចាប់ផ្តើមការងារ។"],
    synonyms: ["កិច្ចព្រមព្រៀង", "កិច្ចព្រមព្រៀងសរសេរ"],
  },
  {
    id: "29",
    term: "កែ",
    partOfSpeech: "កិរិយា",
    singKhmer: "Kae",
    meaning: "ធ្វើឱ្យត្រឹមត្រូវ ឬផ្លាស់ប្តូរឲ្យល្អឡើង។",
    examples: ["សូមកែកំហុសក្នុងអត្ថបទនេះ។"],
    synonyms: ["កែប្រែ", "កែតម្រូវ"],
  },
  {
    id: "30",
    term: "កុមារ",
    partOfSpeech: "នាម",
    singKhmer: "Komar",
    meaning: "ក្មេងប្រុស ឬក្មេងស្រីដែលមានអាយុក្មេង។",
    examples: ["កុមារត្រូវបានថែទាំល្អនៅសាលា។"],
    synonyms: ["កូនក្មេង", "កុមារភាព"],
  },
  {
    id: "31",
    term: "កូន",
    partOfSpeech: "នាម",
    singKhmer: "Kon",
    meaning: "ពូជពង្ស ឬក្មេងដែលជាកូនរបស់មាតាបិតា។",
    examples: ["គាត់មានកូនពីរនាក់។"],
    synonyms: ["កូនចៅ"],
  },
  {
    id: "32",
    term: "កេរ្តិ៍",
    partOfSpeech: "នាម",
    singKhmer: "Ker",
    meaning: "កេរ្តិ៍ឈ្មោះ ឬកេរ្តិ៍ដំណែល។",
    examples: ["គាត់រក្សាកេរ្តិ៍របស់គ្រួសារ។"],
    synonyms: ["កេរ្តិ៍ឈ្មោះ", "ឈ្មោះល្បី"],
  },
  {
    id: "33",
    term: "កោរ",
    partOfSpeech: "កិរិយា",
    singKhmer: "Kor",
    meaning: "កាត់សក់ ឬដុះសក់ចេញ។",
    examples: ["ព្រះសង្ឃកោរសក់ជាប្រចាំ។"],
    synonyms: ["កាត់សក់"],
  },
  {
    id: "34",
    term: "កៅអី",
    partOfSpeech: "នាម",
    singKhmer: "Kao Ei",
    meaning: "វត្ថុសម្រាប់អង្គុយ។",
    examples: ["សូមយកកៅអីមកមួយ។"],
    synonyms: ["កៅអីអង្គុយ", "កាឡែងអង្គុយ"],
  },
  {
    id: "35",
    term: "កើត",
    partOfSpeech: "កិរិយា",
    singKhmer: "Koet",
    meaning: "មានលេចឡើង ឬកើតមាន។",
    examples: ["គាត់កើតនៅខេត្តបាត់ដំបង។"],
    synonyms: ["លេចឡើង", "បង្កើត"],
  },
  {
    id: "36",
    term: "ជឿ",
    partOfSpeech: "កិរិយា",
    singKhmer: "Chue",
    meaning: "មានការជឿជាក់ ឬទុកចិត្ត។",
    examples: ["យើងត្រូវជឿលើខ្លួនឯង។"],
    synonyms: ["ទុកចិត្ត", "ជឿជាក់"],
  },
  {
    id: "37",
    term: "ឧត្តមភាព",
    partOfSpeech: "នាម",
    singKhmer: "Uttamapheap",
    meaning: "ភាពខ្ពង់ខ្ពស់ ឬល្អឥតខ្ចោះជាង។",
    examples: ["គោលបំណងគឺស្វែងរកឧត្តមភាពក្នុងការងារ។"],
    synonyms: ["ភាពល្អឥតខ្ចោះ", "កម្រិតខ្ពស់"],
  },
  {
    id: "38",
    term: "បង្គំ",
    partOfSpeech: "កិរិយា",
    category: "សង្ឃសព្ទ",
    singKhmer: "Bangkom",
    meaning: "ស្នាក់នៅ ឬសម្រាក (ប្រើសម្រាប់ព្រះសង្ឃ/បែបគោរព)។",
    examples: ["ព្រះសង្ឃបង្គំនៅវត្តនោះ។"],
    synonyms: ["ស្នាក់នៅ", "សម្រាក"],
  },
  {
    id: "39",
    term: "ព្រះរាជពិធី",
    partOfSpeech: "នាម",
    category: "ព្រះរាជសព្ទ",
    singKhmer: "Preah Reach Pithi",
    meaning: "ពិធីការដែលធ្វើក្នុងរាជវាំង ឬពាក់ព័ន្ធនឹងព្រះមហាក្សត្រ។",
    examples: ["ព្រះរាជពិធីត្រូវបានរៀបចំយ៉ាងទាន់សម័យ។"],
    synonyms: ["ពិធីរាជការ"],
  },
  {
    id: "40",
    term: "ការសិក្សា",
    partOfSpeech: "នាម",
    singKhmer: "Kar Siksaa",
    meaning: "ដំណើរការរៀន និងស្វែងយល់ចំណេះដឹង។",
    examples: ["ការសិក្សាជួយបង្កើនឱកាសការងារ។"],
    synonyms: ["សិក្សា", "អប់រំ"],
  },
];

const wait = (ms: number) => new Promise((res) => setTimeout(res, ms));

// --- NORMALIZATION + TOKEN HELPERS (unchanged) ---
const ZWSP = /\u200B|\u200C|\u200D|\u2060/g;
function normKm(s: string) {
  return (s ?? "").normalize("NFC").replace(ZWSP, "").trim();
}
function lowerKm(s: string) {
  return normKm(s).toLowerCase();
}
function tokens(q: string) {
  return lowerKm(q).split(/\s+/).filter(Boolean);
}

// --- KHMER RANGES (unchanged) ---
const KH_CONS = /[\u1780-\u17A2]/;
const KH_DEP = /[\u17B6-\u17D3\u17DD]/;
const KH_SIGN = /[\u17C6-\u17D3\u17DD]/;
const KH_VOWEL_ONLY = /[\u17B6-\u17C5\u17BE-\u17C1\u17C4\u17C5]/;

// --- CUSTOM ORDERING YOU REQUESTED ---
// Consonant order: ក ខ គ ឃ … អ
const CONSONANT_ORDER = [
  "ក",
  "ខ",
  "គ",
  "ឃ",
  "ង",
  "ច",
  "ឆ",
  "ជ",
  "ឈ",
  "ញ",
  "ដ",
  "ឋ",
  "ឌ",
  "ឍ",
  "ណ",
  "ត",
  "ថ",
  "ទ",
  "ធ",
  "ន",
  "ប",
  "ផ",
  "ព",
  "ភ",
  "ម",
  "យ",
  "រ",
  "ល",
  "វ",
  "ស",
  "ហ",
  "ឡ",
  "អ",
] as const;
const CONSONANT_INDEX = new Map(CONSONANT_ORDER.map((c, i) => [c, i]));

// Vowel order: ា ិ ី ឹ ឺ(= “ឺ”) ុ(= “ុ”) ូ(= “ូ”) ួ ើ ឿ ៀ េ ែ ៃ ោ ៅ
const VOWEL_ORDER = [
  "ា",
  "ិ",
  "ី",
  "ឹ",
  "ឺ",
  "ុ",
  "ូ",
  "ួ",
  "ើ",
  "ឿ",
  "ៀ",
  "េ",
  "ែ",
  "ៃ",
  "ោ",
  "ៅ",
] as const;
const VOWEL_INDEX = new Map(VOWEL_ORDER.map((v, i) => [v, i]));

// Ending/sign combos order: ុំ្ etc. (deduped & normalized)
const ENDING_ORDER = [
  "ុំ", // U+17BB U+17C6
  "ំ", // U+17C6
  "ាំ", // U+17B6 U+17C6
  "ះ", // U+17CB
  "ុះ", // U+17BB U+17CB
  "េះ", // U+17C1 U+17CB
  "ោះ", // U+17C4 U+17CB
] as const;
const ENDING_INDEX = new Map(ENDING_ORDER.map((e, i) => [e, i]));

// --- FIRST MATCH HELPERS (reuse your ranges) ---
function firstConsonant(s: string): string {
  const m = s.match(KH_CONS);
  return m ? m[0] : "";
}
function firstDependentVowel(s: string): string {
  const m = s.match(KH_VOWEL_ONLY);
  return m ? m[0] : "";
}

function splitKCC(input: string): string[] {
  const s = normKm(input);
  const out: string[] = [];
  let cluster = "";
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (KH_CONS.test(ch)) {
      if (cluster) out.push(cluster);
      cluster = ch;
      continue;
    }
    if (KH_DEP.test(ch) || KH_SIGN.test(ch)) {
      cluster += ch;
      continue;
    }
    if (cluster) {
      out.push(cluster);
      cluster = "";
    }
    if (!/\s/.test(ch)) out.push(ch);
  }
  if (cluster) out.push(cluster);
  return out.filter(Boolean);
}

// ---------- Category hints ----------
const royalHint = (q: string) => /ព្រះ|រាជ|ម្ចាស់/.test(q);
const monkHint = (q: string) =>
  /សង្ឃ|ភិក្ខុ|ព្រះសង្ឃ|សមណ|វត្ត|ធម៌|សាសនា/.test(q);

// --- PHONEME MAP + FUZZY KEY (unchanged) ---
const PHONEME_MAP: Record<string, string> = {
  ក: "k",
  ខ: "kh",
  គ: "k",
  ឃ: "kh",
  ង: "ng",
  ច: "ch",
  ឆ: "chh",
  ជ: "ch",
  ឈ: "chh",
  ញ: "nh",
  ដ: "d",
  ឋ: "th",
  ឌ: "d",
  ឍ: "th",
  ណ: "n",
  ត: "t",
  ថ: "th",
  ទ: "t",
  ធ: "th",
  ន: "n",
  ប: "b",
  ផ: "ph",
  ព: "p",
  ភ: "ph",
  ម: "m",
  យ: "y",
  រ: "r",
  ល: "l",
  វ: "v",
  ស: "s",
  ហ: "h",
  ឡ: "l",
  អ: "a",
  ឣ: "a",
  ឤ: "a",
  "ា": "aa",
  "ិ": "i",
  "ី": "ii",
  "ឹ": "oe",
  "ឺ": "oe",
  "ុ": "u",
  "ូ": "uu",
  "ួ": "ua",
  "េ": "e",
  "ែ": "ae",
  "ៃ": "ai",
  "ោ": "o",
  "ៅ": "au",
  "ៀ": "ia",
  "ឿ": "ue",
  "ើ": "oe",
  "ំ": "m",
  "ះ": "h",
  "៉": "",
  "៊": "",
  "់": "",
  "៌": "r",
  "៍": "",
  "័": "",
  "៎": "",
  "៍ំ": "m",
};
function phonemeKey(str: string): string {
  const kccs = splitKCC(str);
  let out = "";
  for (const kcc of kccs) {
    for (const ch of kcc) out += PHONEME_MAP[ch] ?? ch;
    out += "-";
  }
  return out.replace(/-+$/, "");
}

// --- LEVENSHTEIN (unchanged) ---
function lev(a: string, b: string): number {
  const m = a.length,
    n = b.length;
  if (!m) return n;
  if (!n) return m;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + cost
      );
    }
  }
  return dp[m][n];
}

// --- SCORING (unchanged) ---
function scoreWord(
  w: Word,
  qNorm: string,
  queryInitial?: string | null
): number {
  const tks = tokens(qNorm);

  const termRaw = w.term;
  const term = lowerKm(termRaw);
  const meaning = lowerKm(w.meaning);
  const sing = lowerKm(w.singKhmer ?? "");
  const syns = (w.synonyms ?? []).map(lowerKm);

  let score = 0;

  if (term === qNorm) score += 2000;
  for (const tk of tks) {
    if (term === tk) score += 400;
    else if (term.startsWith(tk)) score += 260;
    else {
      const pos = term.indexOf(tk);
      if (pos >= 0) score += 180 - Math.min(pos, 120) * 0.6;
    }
  }

  if (queryInitial && firstConsonant(termRaw) === queryInitial) score += 240;

  for (const tk of tks) {
    if (meaning.startsWith(tk)) score += 120;
    else {
      const pos = meaning.indexOf(tk);
      if (pos >= 0) score += 90 - Math.min(pos, 160) * 0.3;
    }
  }

  for (const tk of tks) {
    if (sing.startsWith(tk)) score += 80;
    else if (sing.includes(tk)) score += 55;
  }

  for (const syn of syns) {
    for (const tk of tks) {
      if (syn === tk) score += 100;
      else if (syn.startsWith(tk)) score += 70;
      else if (syn.includes(tk)) score += 45;
    }
  }

  score += Math.max(0, 40 - Math.min(term.length, 40));

  if (
    (w.category === "ព្រះរាជសព្ទ" || w.category === "រាជសព្ទ") &&
    royalHint(qNorm)
  )
    score += 80;
  if (w.category === "សង្ឃសព្ទ" && monkHint(qNorm)) score += 80;

  return score;
}

export type TKhVowels =
  | "ា"
  | "ិ"
  | "ី"
  | "ឹ"
  | "ឺ"
  | "ុ"
  | "ូ"
  | "ួ"
  | "ើ"
  | "ឿ"
  | "ៀ"
  | "េ"
  | "ែ"
  | "ៃ"
  | "ោ"
  | "ៅ";
export type TKhConsonant =
  | "ក"
  | "ខ"
  | "គ"
  | "ឃ"
  | "ង"
  | "ច"
  | "ឆ"
  | "ជ"
  | "ឈ"
  | "ញ"
  | "ដ"
  | "ឋ" | "ឌ" | "ឍ" | "ណ"
  | "ត"
  | "ថ"
  | "ទ"
  | "ធ"
  | "ន"
  | "ប"
  | "ផ"
  | "ព"
  | "ភ"
  | "ម"
  | "យ"
  | "រ"
  | "ល"
  | "វ"
  | "ស"
  | "ហ"
  | "ឡ"
  | "អ";
export type TKhEndingVowels = (typeof ENDING_ORDER)[number];
// --- ORDERING HELPERS ---
function firstConsonantIndexKM(s: string): number {
  const c = firstConsonant(s) as TKhConsonant;
  return CONSONANT_INDEX.has(c) ? (CONSONANT_INDEX.get(c) as number) : 999;
}
function firstVowelIndexKM(s: string): number {
  const v = firstDependentVowel(s) as TKhVowels;
  return VOWEL_INDEX.has(v) ? (VOWEL_INDEX.get(v) as number) : 999;
}
function endingTagKM(s: string): string {
  for (const e of ENDING_ORDER) {
    if (s.includes(e)) return e;
  }
  return "";
}
function endingIndexKM(s: string): number {
  const tag = endingTagKM(s) as TKhEndingVowels;
  return ENDING_INDEX.has(tag) ? (ENDING_INDEX.get(tag) as number) : 999;
}

function khAlphabetCompare(aTerm: string, bTerm: string): number {
  const ca = firstConsonantIndexKM(aTerm);
  const cb = firstConsonantIndexKM(bTerm);
  if (ca !== cb) return ca - cb;

  const va = firstVowelIndexKM(aTerm);
  const vb = firstVowelIndexKM(bTerm);
  if (va !== vb) return va - vb;

  const ea = endingIndexKM(aTerm);
  const eb = endingIndexKM(bTerm);
  if (ea !== eb) return ea - eb;

  const la = lowerKm(aTerm).length;
  const lb = lowerKm(bTerm).length;
  if (la !== lb) return la - lb;

  return lowerKm(aTerm).localeCompare(lowerKm(bTerm), "km");
}

function vowelComparator(a: Word, b: Word, queryInitial: string | null) {
  if (!queryInitial) return 0;

  const aStarts = firstConsonant(a.term) === queryInitial;
  const bStarts = firstConsonant(b.term) === queryInitial;
  if (aStarts && !bStarts) return -1;
  if (!aStarts && bStarts) return 1;
  if (!aStarts && !bStarts) return 0;

  const va = firstDependentVowel(a.term) as TKhVowels;
  const vb = firstDependentVowel(b.term) as TKhVowels;

  const ia = VOWEL_INDEX.has(va) ? (VOWEL_INDEX.get(va) as number) : -1;
  const ib = VOWEL_INDEX.has(vb) ? (VOWEL_INDEX.get(vb) as number) : -1;

  if (ia !== ib) return ia - ib;

  // tie-breakers
  const la = lowerKm(a.term).length;
  const lb = lowerKm(b.term).length;
  if (la !== lb) return la - lb;
  return lowerKm(a.term).localeCompare(lowerKm(b.term), "km");
}

export async function repoSearchWords(q: string, page: number, pageSize: number) {
  await wait(250);

  const qNorm = lowerKm(q);

  if (!qNorm) {
    const all = [...WORDS].sort((a, b) => {
      const alpha = khAlphabetCompare(a.term, b.term);
      if (alpha !== 0) return alpha;

      const la = lowerKm(a.term).length;
      const lb = lowerKm(b.term).length;
      if (la !== lb) return la - lb;

      return lowerKm(a.term).localeCompare(lowerKm(b.term), "km");
    });

    const total = all.length;
    const start = Math.max(0, (page - 1) * pageSize);
    const items = all.slice(start, start + pageSize);
    return { items, total };
  }

  const isSingleConsonant = qNorm.length === 1 && KH_CONS.test(qNorm);
  const queryInitial: string | null = isSingleConsonant ? qNorm : null;

  let scored = WORDS.map(w => ({ w, score: scoreWord(w, qNorm, queryInitial) }))
                    .filter(x => x.score > 0);

  const WANT_MIN = 8;
  if (scored.length < WANT_MIN) {
    const qKey = phonemeKey(qNorm);
    const fuzzy = WORDS
      .filter(w => !scored.some(s => s.w.id === w.id))
      .map(w => ({ w, d: lev(qKey, phonemeKey(w.term)) }))
      .filter(x => x.d <= 2)
      .map(x => ({ w: x.w, score: Math.max(1, 120 - x.d * 40) }));
    scored = scored.concat(fuzzy);
  }

  scored.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;

    if (queryInitial) {
      const vc = vowelComparator(a.w, b.w, queryInitial);
      if (vc !== 0) return vc;
    }

    const alpha = khAlphabetCompare(a.w.term, b.w.term);
    if (alpha !== 0) return alpha;

    const la = lowerKm(a.w.term).length;
    const lb = lowerKm(b.w.term).length;
    if (la !== lb) return la - lb;

    return lowerKm(a.w.term).localeCompare(lowerKm(b.w.term), "km");
  });

  const filtered = scored.map(s => s.w);
  const total = filtered.length;
  const start = Math.max(0, (page - 1) * pageSize);
  const items = filtered.slice(start, start + pageSize);
  return { items, total };
}


export async function repoGetWord(id: string) {
  await wait(200);
  return WORDS.find((w) => w.id === id) ?? null;
}

export const getAllWord = async () => {
  await wait(200)
  return WORDS
}