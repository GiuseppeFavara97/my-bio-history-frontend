import DashboardPatientData from "./dashboardPatientData";

export default function Page({ params }: { params: { id: Number } }) {
  return <DashboardPatientData params={{ id: Number(params.id) }} />;
}