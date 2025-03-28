import { useState, useRef, useEffect } from "react";
import { Card, InputGroup, FormControl, Button, ListGroup, Alert } from "react-bootstrap";
import { SendFill, PersonFill, Headset, ClockHistory } from "react-bootstrap-icons";

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'engineer';
  timestamp: Date;
}

const ChatConIngeniero = () => {
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hola, has contactado al equipo de soporte técnico de NexLogix. Un ingeniero atenderá tu solicitud pronto.",
      sender: 'engineer',
      timestamp: new Date()
    },
    {
      id: 2,
      text: "Por favor describe detalladamente el problema o consulta que necesitas resolver.",
      sender: 'engineer',
      timestamp: new Date()
    }
  ]);
  const [isWaiting, setIsWaiting] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (inputMessage.trim() === "") return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages([...messages, userMessage]);
    setInputMessage("");
    setIsWaiting(true);

    // Simulate waiting for engineer response
    setTimeout(() => {
      setIsWaiting(false);
    }, 3000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="container-fluid px-4 py-5">
      <Card className="shadow-sm">
        <Card.Header className="bg-primary text-white d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <Headset size={24} className="me-2" />
            <h5 className="mb-0">Chat con Ingeniero de NexLogix</h5>
          </div>
          <div className="badge bg-light text-dark">
            <ClockHistory className="me-1" /> En espera de respuesta
          </div>
        </Card.Header>
        
        <Card.Body className="p-0">
          <div 
            className="p-3" 
            style={{ 
              height: '60vh', 
              overflowY: 'auto',
              backgroundColor: '#f8f9fa'
            }}
          >
            <ListGroup variant="flush">
              {messages.map((message) => (
                <ListGroup.Item 
                  key={message.id} 
                  className="border-0 bg-transparent"
                >
                  <div 
                    className={`d-flex mb-2 ${message.sender === 'user' ? 'justify-content-end' : 'justify-content-start'}`}
                  >
                    <div 
                      className={`p-3 rounded-3 ${message.sender === 'user' 
                        ? 'bg-primary text-white' 
                        : 'bg-white border'}`}
                      style={{ maxWidth: '80%' }}
                    >
                      <div className="d-flex align-items-center mb-1">
                        {message.sender === 'engineer' ? (
                          <Headset className="me-2 text-primary" />
                        ) : (
                          <PersonFill className="me-2" />
                        )}
                        <small className={message.sender === 'user' ? 'text-white-50' : 'text-muted'}>
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </small>
                      </div>
                      <p className="mb-0">{message.text}</p>
                    </div>
                  </div>
                </ListGroup.Item>
              ))}
              
              {isWaiting && (
                <ListGroup.Item className="border-0 bg-transparent">
                  <div className="d-flex mb-2 justify-content-start">
                    <Alert variant="info" className="w-100">
                      <div className="d-flex align-items-center">
                        <Headset className="me-2" />
                        <div>
                          <strong>Un ingeniero de NexLogix revisará tu mensaje</strong>
                          <p className="mb-0 small">Por favor espera, te responderemos lo antes posible.</p>
                        </div>
                      </div>
                    </Alert>
                  </div>
                </ListGroup.Item>
              )}
              
              <div ref={messagesEndRef} />
            </ListGroup>
          </div>
          
          <div className="border-top p-3">
            <InputGroup>
              <FormControl
                placeholder="Escribe tu mensaje para el ingeniero..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <Button 
                variant="primary" 
                onClick={handleSendMessage}
                disabled={inputMessage.trim() === ""}
              >
                <SendFill />
              </Button>
            </InputGroup>
            <small className="text-muted d-block mt-2">
              Describe tu problema técnico con detalles. Presiona Enter para enviar.
            </small>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ChatConIngeniero;