"use cl";
export default function Fields({ fieldName }: { fieldName: string }) {
  return (
    <div id={fieldName} className="w-full h-fit mb-8">
      <h1 className="border-b-4 border-blue-500 items-center px-6 text-4xl font-semibold">
        {fieldName}
      </h1>
      {/* <div id="matches1" className="grid grid-cols-4 gap-2 mt-2"></div> */}
    </div>
  );
}
