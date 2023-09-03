export default function Calendar() {
  return (
    <div className="w-full h-fit mb-8">
      <h1 className="border-b-4 border-blue-500 items-center px-6 text-4xl font-semibold">
        Agenda
      </h1>
      <div id="calendar" className="grid grid-cols-2 gap-2 mt-2"></div>
    </div>
  );
}
