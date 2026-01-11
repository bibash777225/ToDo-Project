

// Create these components
 export function ErrorPage() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-600">Oops!</h1>
        <p className="text-xl mt-4">Something went wrong</p>
        <a href="/" className="text-blue-500 underline mt-4 block">
          Go back home
        </a>
      </div>
    </div>
  );
}

 export function NotFound() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold">404</h1>
        <p className="text-xl mt-4">Page not found</p>
        <a href="/" className="text-blue-500 underline mt-4 block">
          Go back home
        </a>
      </div>
    </div>
  );
}
