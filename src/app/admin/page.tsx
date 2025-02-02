'use client';

import { useState } from 'react';
import Image from 'next/image';
import { QRCodeSVG } from 'qrcode.react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Sidebar } from '@/components/Sidebar';

interface Session {
  id: string;
  name: string;
  subscriberCount: number;
  qrCode: string;
}

export default function AdminPage() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [newSessionName, setNewSessionName] = useState('');
  const [showQRCode, setShowQRCode] = useState<string | null>(null);

  const createSession = async () => {
    if (!newSessionName.trim()) return;

    // Generate a unique session ID
    const sessionId = Math.random().toString(36).substring(2, 15);
    
    // Create QR code data (this would be your group page URL with session ID)
    const qrCodeData = `${window.location.origin}/group/${sessionId}`;

    const newSession: Session = {
      id: sessionId,
      name: newSessionName,
      subscriberCount: 0,
      qrCode: qrCodeData
    };

    setSessions([...sessions, newSession]);
    setNewSessionName('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar userName="Admin" userRole="Administrator" />
      
      <main className="md:mr-[280px] min-h-screen transition-all duration-200">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <Image
                src="/Logo.png"
                alt="QA Center Logo"
                width={150}
                height={150}
                className="object-contain w-full"
                priority
              />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Admin Dashboard
            </h1>
            <p className="text-gray-600">
              Create and manage your sessions
            </p>
          </div>

          {/* Create Session Section */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex gap-4">
                <Input
                  type="text"
                  placeholder="Enter session name"
                  value={newSessionName}
                  onChange={(e) => setNewSessionName(e.target.value)}
                  className="flex-1"
                />
                <Button
                  onClick={createSession}
                  className="bg-gray-900 hover:bg-gray-800 text-white"
                >
                  Create Session
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Sessions List */}
          <div className="grid gap-6">
            {sessions.map((session) => (
              <Card key={session.id} className="bg-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {session.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {session.subscriberCount} subscribers
                      </p>
                    </div>
                    <div className="flex gap-4">
                      <Button
                        onClick={() => setShowQRCode(session.id)}
                        variant="outline"
                      >
                        Show QR Code
                      </Button>
                    </div>
                  </div>

                  {/* QR Code Display */}
                  {showQRCode === session.id && (
                    <div className="mt-4 flex flex-col items-center">
                      <div className="bg-white p-4 rounded-lg shadow-sm">
                        <QRCodeSVG
                          value={session.qrCode}
                          size={200}
                          level="H"
                          includeMargin={true}
                        />
                      </div>
                      <p className="mt-2 text-sm text-gray-500">
                        Scan this QR code to join the session
                      </p>
                      <Button
                        variant="ghost"
                        onClick={() => setShowQRCode(null)}
                        className="mt-2"
                      >
                        Hide QR Code
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
