'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sidebar } from '@/components/Sidebar';

// WebSocket connection URL - replace with your actual WebSocket server URL
const WS_URL = 'ws://localhost:3001';

export default function GroupPage() {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);
  const [subscriberCount, setSubscriberCount] = useState(0);
  const [ws, setWs] = useState<WebSocket | null>(null);

  useEffect(() => {
    // Initialize WebSocket connection
    const websocket = new WebSocket(WS_URL);

    websocket.onopen = () => {
      console.log('Connected to WebSocket');
    };

    websocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'subscriberCount') {
        setSubscriberCount(data.count);
      }
    };

    websocket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    setWs(websocket);

    return () => {
      websocket.close();
    };
  }, []);

  const handleReady = () => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({
        type: 'subscribe',
        status: !isReady
      }));
      setIsReady(!isReady);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar userName="Alex Johnson" userRole="Student" />
      
      <main className="md:mr-[280px] min-h-screen transition-all duration-200">
        <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8 -mt-16">
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
              Group Session
            </h1>
            <p className="text-gray-600 mb-4">
              {isReady ? 'You are subscribed to this group' : 'Click ready to subscribe to this group'}
            </p>
            {subscriberCount > 0 && (
              <p className="text-sm text-gray-500">
                {subscriberCount} {subscriberCount === 1 ? 'person' : 'people'} subscribed
              </p>
            )}
          </div>

          <div className="w-full max-w-md">
            <Card className="bg-white shadow-md">
              <CardContent className="p-6">
                <div className="text-center py-6">
                  <Button
                    onClick={handleReady}
                    className={`px-8 py-6 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ${
                      isReady 
                        ? 'bg-green-600 hover:bg-green-700 text-white'
                        : 'bg-gray-900 hover:bg-gray-800 text-white'
                    }`}
                  >
                    {isReady ? 'Subscribed' : 'Ready to Subscribe'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
