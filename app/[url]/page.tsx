export default function Page({ params }: { params: { url: string } }) {
  console.log(params.url);
  return (
    <main className="min-h-screen">
      <div className="flex items-center justify-center w-full min-h-screen">
        <div className="flex justify-center items-center space-x-1 text-sm text-gray-400">
          <div className="w-10 h-10 animate-spin border-4 border-gray-300 rounded-full border-l-white m-4" />
          <p className="text-2xl">Locating satellites...</p>
        </div>
      </div>
    </main>
  );
}
