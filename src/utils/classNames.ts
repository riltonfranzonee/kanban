// eslint-disable-next-line @typescript-eslint/no-explicit-any
const classNames = (...classes: any) => classes?.filter(Boolean)?.join(" ");
export default classNames;
