export default function DoctorModalReadOnlyField({
  label,
  value,
}: {
  label: string;
  value: string | number | null | undefined;
}) {
  return (
    <div className="flex flex-col gap-1 ">
      <span className="text-sm font-light">{label}</span>
      <p className="min-h-14 whitespace-pre-wrap rounded-md border px-2 py-1 text-center  ">{value ?? "-"}</p>
    </div>
  );
}
