'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  Phone, 
  PhoneOff,
  Monitor,
  Settings,
  Users,
  MessageSquare,
  ArrowLeft,
  CheckCircle2,
  Clock
} from 'lucide-react';

// Mock appointment data
const mockAppointmentData = {
  '2': {
    id: '2',
    patientName: 'James Thompson',
    patientId: 'IDC987654321',
    appointmentType: 'telehealth',
    date: '2024-12-25',
    time: '10:30',
    duration: 20,
    reason: 'COPD medication review',
    status: 'confirmed'
  }
};

function JoinVideoContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const appointmentId = searchParams.get('appointmentId') || '2';
  
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'waiting' | 'connecting' | 'connected' | 'ended'>('waiting');
  const [showChat, setShowChat] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([
    {
      id: '1',
      sender: 'system',
      message: 'Waiting for patient to join...',
      timestamp: new Date().toLocaleTimeString()
    }
  ]);

  const appointment = mockAppointmentData[appointmentId as keyof typeof mockAppointmentData] || mockAppointmentData['2'];

  const handleJoinCall = async () => {
    setIsConnecting(true);
    setConnectionStatus('connecting');
    
    // Simulate connection process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsConnecting(false);
    setConnectionStatus('connected');
    
    // Add system message
    setChatMessages(prev => [...prev, {
      id: Date.now().toString(),
      sender: 'system', 
      message: `${appointment.patientName} has joined the call`,
      timestamp: new Date().toLocaleTimeString()
    }]);
  };

  const handleEndCall = () => {
    setConnectionStatus('ended');
    
    // Redirect after 3 seconds
    setTimeout(() => {
      router.push('/provider/appointments');
    }, 3000);
  };

  const sendChatMessage = () => {
    if (!chatMessage.trim()) return;
    
    setChatMessages(prev => [...prev, {
      id: Date.now().toString(),
      sender: 'provider',
      message: chatMessage,
      timestamp: new Date().toLocaleTimeString()
    }]);
    
    setChatMessage('');
    
    // Simulate patient response after 2 seconds
    setTimeout(() => {
      setChatMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        sender: 'patient',
        message: 'Thank you, I can see you clearly now.',
        timestamp: new Date().toLocaleTimeString()
      }]);
    }, 2000);
  };

  if (connectionStatus === 'ended') {
    return (
      <div className="min-h-screen bg-gray-900 p-4 sm:p-6 flex items-center justify-center">
        <Card className="max-w-md w-full">
          <CardContent className="p-8 text-center">
            <CheckCircle2 className="mx-auto h-16 w-16 text-green-500 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Call Ended</h2>
            <p className="text-gray-600 mb-4">
              The telehealth session with {appointment.patientName} has ended successfully.
            </p>
            <div className="text-sm text-gray-500">
              Redirecting to appointments...
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              onClick={() => router.back()}
              className="mr-4 text-white hover:bg-gray-700"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-lg font-semibold">{appointment.patientName}</h1>
              <p className="text-sm text-gray-400">{appointment.reason}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm ${
              connectionStatus === 'connected' ? 'bg-green-600' : 
              connectionStatus === 'connecting' ? 'bg-yellow-600' : 'bg-gray-600'
            }`}>
              <div className={`w-2 h-2 rounded-full ${
                connectionStatus === 'connected' ? 'bg-green-300' : 
                connectionStatus === 'connecting' ? 'bg-yellow-300 animate-pulse' : 'bg-gray-300'
              }`} />
              {connectionStatus === 'connected' && 'Connected'}
              {connectionStatus === 'connecting' && 'Connecting...'}
              {connectionStatus === 'waiting' && 'Waiting'}
            </div>
            <Clock className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-400">{appointment.duration} min</span>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Main Video Area */}
        <div className="flex-1 relative">
          {/* Patient Video */}
          <div className="h-full bg-gray-800 flex items-center justify-center relative">
            {connectionStatus === 'connected' ? (
              <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                <div className="text-center">
                  <Users className="h-24 w-24 mx-auto mb-4 text-white opacity-50" />
                  <p className="text-white text-lg">Patient Video</p>
                  <p className="text-blue-100 text-sm">{appointment.patientName}</p>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <Video className="h-24 w-24 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-400 text-lg">Waiting for patient to join...</p>
              </div>
            )}
            
            {/* Provider Video (Picture-in-Picture) */}
            <div className="absolute bottom-4 right-4 w-48 h-36 bg-gray-700 rounded-lg border-2 border-gray-600 flex items-center justify-center">
              {isVideoOn ? (
                <div className="w-full h-full bg-gradient-to-br from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-white text-sm font-medium">Dr. Johnson</p>
                    <p className="text-green-100 text-xs">You</p>
                  </div>
                </div>
              ) : (
                <VideoOff className="h-8 w-8 text-gray-400" />
              )}
            </div>
          </div>

          {/* Controls */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
            <div className="bg-gray-800 rounded-full p-4 flex items-center space-x-4">
              <Button
                variant={isAudioOn ? "secondary" : "destructive"}
                size="lg"
                className="rounded-full h-12 w-12"
                onClick={() => setIsAudioOn(!isAudioOn)}
              >
                {isAudioOn ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
              </Button>
              
              <Button
                variant={isVideoOn ? "secondary" : "destructive"}  
                size="lg"
                className="rounded-full h-12 w-12"
                onClick={() => setIsVideoOn(!isVideoOn)}
              >
                {isVideoOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
              </Button>

              <Button
                variant="secondary"
                size="lg"
                className="rounded-full h-12 w-12"
                onClick={() => setShowChat(!showChat)}
              >
                <MessageSquare className="h-5 w-5" />
              </Button>

              <Button
                variant="secondary"
                size="lg"
                className="rounded-full h-12 w-12"
              >
                <Monitor className="h-5 w-5" />
              </Button>

              <Button
                variant="secondary"
                size="lg"
                className="rounded-full h-12 w-12"
              >
                <Settings className="h-5 w-5" />
              </Button>

              {connectionStatus === 'waiting' ? (
                <Button
                  size="lg"
                  className="rounded-full h-12 px-6 bg-green-600 hover:bg-green-700"
                  onClick={handleJoinCall}
                  disabled={isConnecting}
                >
                  {isConnecting ? (
                    <>
                      <Clock className="mr-2 h-5 w-5 animate-spin" />
                      Connecting...
                    </>
                  ) : (
                    <>
                      <Phone className="mr-2 h-5 w-5" />
                      Start Call
                    </>
                  )}
                </Button>
              ) : (
                <Button
                  size="lg"
                  variant="destructive"
                  className="rounded-full h-12 px-6"
                  onClick={handleEndCall}
                >
                  <PhoneOff className="mr-2 h-5 w-5" />
                  End Call
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Chat Sidebar */}
        {showChat && (
          <div className="w-80 bg-gray-800 border-l border-gray-700 flex flex-col">
            <div className="p-4 border-b border-gray-700">
              <h3 className="font-semibold">Chat</h3>
            </div>
            
            <div className="flex-1 p-4 overflow-y-auto">
              <div className="space-y-3">
                {chatMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`p-3 rounded-lg text-sm ${
                      msg.sender === 'provider' 
                        ? 'bg-blue-600 ml-4' 
                        : msg.sender === 'patient'
                        ? 'bg-gray-600 mr-4'
                        : 'bg-gray-700 text-gray-300 text-center'
                    }`}
                  >
                    {msg.sender !== 'system' && (
                      <div className="font-medium text-xs mb-1">
                        {msg.sender === 'provider' ? 'You' : appointment.patientName}
                      </div>
                    )}
                    <div>{msg.message}</div>
                    <div className="text-xs opacity-70 mt-1">{msg.timestamp}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="p-4 border-t border-gray-700">
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendChatMessage()}
                  className="flex-1 bg-gray-700 text-white rounded-lg px-3 py-2 text-sm border border-gray-600 focus:outline-none focus:border-blue-500"
                />
                <Button
                  size="sm"
                  onClick={sendChatMessage}
                  disabled={!chatMessage.trim()}
                >
                  Send
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function JoinVideo() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <JoinVideoContent />
    </Suspense>
  );
}
