'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sidebar } from '@/components/Sidebar';

const QRScanner = dynamic(() => import('@/components/QRScanner'), {
  ssr: false,
});

export default function Home() {
  const router = useRouter();
  const [isRegistered, setIsRegistered] = useState(false);
  const [isScanning, setIsScanning] = useState(false);

  const handleRegister = () => {
    router.push('/register');
  };

  const handleScanSuccess = (result: string) => {
    // Assuming the QR code contains a group ID
    router.push('/group');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar userName="Alex Johnson" userRole="Student" />
      
      <main className="md:mr-[280px] min-h-screen transition-all duration-200">
        <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8 -mt-16">
          {/* Logo and Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <Image
                src="/Logo.png"
                alt="QA Center Logo"
                width={180}
                height={180}
                className="object-contain w-full"
                priority
              />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome to QA Center
            </h1>
            <p className="text-gray-600 mb-8">
              {isRegistered 
                ? 'Scan QR code to join a group'
                : 'Join our community by creating an account'}
            </p>
          </div>

          {/* Main Content */}
          <div className="w-full max-w-md">
            <Card className="bg-white shadow-md">
              <CardContent className="p-6">
                {!isRegistered ? (
                  <div className="text-center py-6">
                    <Button
                      onClick={handleRegister}
                      className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-6 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      Create Account
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {!isScanning ? (
                      <div className="text-center py-6">
                        <Button
                          onClick={() => setIsScanning(true)}
                          className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-6 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                          Scan QR Code
                        </Button>
                      </div>
                    ) : (
                      <>
                        <QRScanner onScanSuccess={handleScanSuccess} />
                        <Button
                          variant="outline"
                          onClick={() => setIsScanning(false)}
                          className="w-full"
                        >
                          Cancel Scanning
                        </Button>
                      </>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
