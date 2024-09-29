import EventForm from "../../components/event-form";

export default async function EventsPage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Cooba</h1>
      <EventForm />
      {/* Add a list of events here */}
    </div>
  );
}
