



export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full min-h-screen grid place-content-center place-items-center overflow-hidden">
      {children}
    </div>
  );
}