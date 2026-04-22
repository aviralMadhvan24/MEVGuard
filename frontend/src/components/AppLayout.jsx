import Header from "./Header";

export default function AppLayout({ children, headerProps }) {
  return (
    <div className="min-h-screen bg-background-dark text-white flex flex-col font-display">
      {/* Ensure Header is always visible at the top */}
      <Header {...headerProps} />
      
      {/* Main content area that expands to fill space */}
      <main className="flex-1 overflow-x-hidden overflow-y-auto">
        {children}
      </main>
      
      {/* Optional: Add a footer if needed for legal/versioning */}
    </div>
  );
}