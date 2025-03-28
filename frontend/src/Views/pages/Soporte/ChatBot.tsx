import { useState, useRef, useEffect } from "react";
import { Card, InputGroup, FormControl, Button, ListGroup } from "react-bootstrap";
import { SendFill, Robot, PersonFill, ArrowCounterclockwise } from "react-bootstrap-icons";

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const ChatBot = () => {
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "¡Hola! Soy el bot de soporte de NexLogix. ¿En qué puedo ayudarte hoy?",
      sender: 'bot',
      timestamp: new Date()
    },
    {
      id: 2,
      text: "Puedes preguntarme sobre: rutas, vehículos, conductores o reportar un problema.",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
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
    setIsTyping(true);

    // Simulate bot response after a delay
    setTimeout(() => {
      const botResponses = [
        "Entiendo tu consulta sobre ese tema. Déjame verificarlo...",
        "Tengo información sobre eso. ¿Necesitas detalles específicos?",
        "Para esa consulta, te recomiendo contactar al área de soporte técnico.",
        "Voy a buscar esa información para ti. Un momento por favor.",
        "¿Podrías darme más detalles sobre lo que necesitas?"
      ];
      
      const botMessage: Message = {
        id: messages.length + 2,
        text: botResponses[Math.floor(Math.random() * botResponses.length)],
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: 1,
        text: "¡Hola! Soy el bot de soporte de NexLogix. ¿En qué puedo ayudarte hoy?",
        sender: 'bot',
        timestamp: new Date()
      },
      {
        id: 2,
        text: "Puedes preguntarme sobre: rutas, vehículos, conductores o reportar un problema.",
        sender: 'bot',
        timestamp: new Date()
      }
    ]);
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
            <Robot size={24} className="me-2" />
            <h5 className="mb-0">ChatBot de Soporte</h5>
          </div>
          <Button 
            variant="light" 
            size="sm" 
            onClick={handleResetChat}
            title="Reiniciar conversación"
          >
            <ArrowCounterclockwise size={16} />
          </Button>
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
                        {message.sender === 'bot' ? (
                          <Robot className="me-2 text-primary" />
                        ) : (
                          <PersonFill className="me-2" />
                        )}
                        <small className="text-muted">
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </small>
                      </div>
                      <p className="mb-0">{message.text}</p>
                    </div>
                  </div>
                </ListGroup.Item>
              ))}
              {isTyping && (
                <ListGroup.Item className="border-0 bg-transparent">
                  <div className="d-flex mb-2 justify-content-start">
                    <div className="p-3 rounded-3 bg-white border">
                      <div className="d-flex align-items-center">
                        <Robot className="me-2 text-primary" />
                        <div className="typing-indicator">
                          <span></span>
                          <span></span>
                          <span></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </ListGroup.Item>
              )}
              <div ref={messagesEndRef} />
            </ListGroup>
          </div>
          
          <div className="border-top p-3">
            <InputGroup>
              <FormControl
                placeholder="Escribe tu mensaje..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyPress}
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
              Presiona Enter para enviar o haz clic en el botón
            </small>
          </div>
        </Card.Body>
      </Card>

      <style>{`
        .typing-indicator {
          display: flex;
          padding: 8px 0;
        }
        .typing-indicator span {
          height: 8px;
          width: 8px;
          margin: 0 2px;
          background-color: #6c757d;
          border-radius: 50%;
          display: inline-block;
          opacity: 0.4;
        }
        .typing-indicator span:nth-child(1) {
          animation: pulse 1s infinite;
        }
        .typing-indicator span:nth-child(2) {
          animation: pulse 1s infinite 0.2s;
        }
        .typing-indicator span:nth-child(3) {
          animation: pulse 1s infinite 0.4s;
        }
        @keyframes pulse {
          0% {
            opacity: 0.4;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
          100% {
            opacity: 0.4;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default ChatBot;