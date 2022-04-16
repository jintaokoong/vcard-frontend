/* header structure */
export const header =
  (label: string) =>
  (key: string): [string, string] =>
    [label, key];

const table = { header };

export default table;
