import ExpenseForm from "../../../components/expense-form";

export default async function ExpensesPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Event {params.id}</h1>
      <ExpenseForm eventId={Number(params.id)} />
      {/* Add a list of expenses here */}
    </div>
  );
}
