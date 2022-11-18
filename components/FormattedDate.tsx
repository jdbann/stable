const fullDate = new Intl.DateTimeFormat("en-GB", { dateStyle: "long" });

type DateProps = {
  className?: string;
  date: Date;
};

export function FormattedDate({ className, date }: DateProps) {
  return (
    <time className={className} dateTime={date.toISOString()}>
      {fullDate.format(date)}
    </time>
  );
}
