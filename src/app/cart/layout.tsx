export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="py-10">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  );
}
