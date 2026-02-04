
export const ZWSP = /\u200B|\u200C|\u200D|\u2060/g;
export const KH_CONS = /[\u1780-\u17A2]/;              
export const KH_DEP  = /[\u17B6-\u17D3\u17DD]/;         
export const KH_SIGN = /[\u17C6-\u17D3\u17DD]/;

export function normKm(s: string) {
  return (s ?? "").normalize("NFC").replace(ZWSP, "").trim();
}

export function splitKCC(input: string): string[] {
  const s = normKm(input);
  const out: string[] = [];
  let cluster = "";
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (KH_CONS.test(ch)) { if (cluster) out.push(cluster); cluster = ch; continue; }
    if (KH_DEP.test(ch) || KH_SIGN.test(ch)) { cluster += ch; continue; }
    if (cluster) { out.push(cluster); cluster = ""; }
    if (!/\s/.test(ch)) out.push(ch);
  }
  if (cluster) out.push(cluster);
  return out.filter(Boolean);
}
