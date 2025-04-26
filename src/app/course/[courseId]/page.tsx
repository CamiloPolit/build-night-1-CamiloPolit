'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CoursePage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to home since we're handling course views on the main page now
    router.replace('/');
  }, [router]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <div className="text-3xl mb-4">🔄</div>
        <h2 className="text-xl font-medium text-gray-700 mb-2">Redirigiendo...</h2>
        <p className="text-gray-500">Volviendo a la página principal</p>
      </div>
    </div>
  );
} 