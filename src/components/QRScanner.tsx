'use client';

import { useEffect, useRef } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { Card } from "@/components/ui/card";

interface QRScannerProps {
  onScanSuccess: (result: string) => void;
}

export default function QRScanner({ onScanSuccess }: QRScannerProps) {
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);

  useEffect(() => {
    if (!scannerRef.current) {
      scannerRef.current = new Html5QrcodeScanner(
        'reader',
        {
          qrbox: {
            width: 250,
            height: 250,
          },
          fps: 5,
        },
        false
      );

      scannerRef.current.render((result) => {
        // Handle the scanned QR code
        onScanSuccess(result);
        
        // Stop scanning after successful scan
        if (scannerRef.current) {
          scannerRef.current.clear().catch(console.error);
        }
      }, (error) => {
        console.log(error);
      });
    }

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch(console.error);
      }
    };
  }, [onScanSuccess]);

  return (
    <Card className="bg-white p-4 rounded-lg shadow-sm">
      <div id="reader" className="w-full"></div>
    </Card>
  );
}
